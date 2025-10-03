import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ScreenWrapper from "@/components/screenWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Header from "@/components/header";
import BackButton from "@/components/backButton";
import Avatar from "@/components/avatar";
import * as ImagePicker from "expo-image-picker";
import Input from "@/components/input";
import Typo from "@/components/typo";
import { useAuth } from "@/contexts/authContext";
import Button from "@/components/button";
import { verticalScale } from "@/utils/styling";
import { getContacts, newConversation } from "@/socket/socketEvents";
import { uploadFileToCloudinary } from "@/services/imageService";

interface IConatcts {
  id: string;
  name: string;
  avatar: string;
}

const NewConversationModal = () => {
  const [groupAvatar, setGroupAvatar] = React.useState<string | null>();
  const [groupName, setGroupName] = React.useState<string>();
  const [selectedParticipants, setSelectedParticipants] = React.useState<
    string[]
  >([]);
  const [contacts, setContacts] = React.useState<IConatcts[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>();

  const { isGroup } = useLocalSearchParams();
  const { user: currentUser } = useAuth();
  const router = useRouter();

  const isGroupMode = isGroup === "1";

  React.useEffect(() => {
    getContacts(processGetContacts);
    getContacts(null);
    newConversation(processNewConversation);

    return () => {
      getContacts(processGetContacts, true);
      newConversation(processNewConversation, true);
    };
  }, []);

  const processGetContacts = (res: any) => {
    if (res.success) {
      setContacts(res.data);
    }
  };

  const processNewConversation = (res: any) => {
    setIsLoading(false);
    if (res.success) {
      router.back();
      router.push({
        pathname: "/(main)/conversation",
        params: {
          id: res.data.id,
          name: res.data.name,
          avatar: res.data.avatar,
          type: res.data.type,
          participants: JSON.stringify(res.data.participants),
        },
      });
    } else {
      console.log("Error creating conversation", res.msg);
      Alert.alert("Error", res.msg);
    }
  };

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const file =
        Platform.OS === "web"
          ? `data:image/jpeg;base64,${result.assets[0].base64}`
          : { uri: result.assets[0].uri };

      setGroupAvatar(file as string);
    }
  };

  const toggleParticipant = (user: any) => {
    setSelectedParticipants((prev) => {
      if (prev.includes(user.id)) {
        return prev.filter((id) => id !== user.id);
      }

      return [...prev, user.id];
    });
  };

  const onSelectUser = (user: any) => {
    if (!currentUser) {
      Alert.alert("Authentication", "Please login to start a conversation");
      return;
    }
    if (isGroupMode) {
      toggleParticipant(user);
    } else {
      newConversation({
        type: "direct",
        participants: [currentUser.id, user.id],
      });
    }
  };

  const createGroup = async () => {
    if (!groupName?.trim() || !currentUser || selectedParticipants.length < 2)
      return;

    setIsLoading(true);

    try {
      let avatar = null;

      if (groupAvatar) {
        const uploadResult = await uploadFileToCloudinary(
          groupAvatar,
          "group-avatar"
        );
        if (uploadResult.success) avatar = uploadResult.data;
      }

      newConversation({
        type: "group",
        participants: [currentUser.id, ...selectedParticipants],
        name: groupName,
        avatar,
      });
    } catch (error: any) {
      console.log("Error creating group", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper
      isModal={true}
      style={{ padding: 10, paddingTop: 16, height: "100%" }}
    >
      <View style={styles.container}>
        <Header
          title={isGroupMode ? "New Group" : "Select User"}
          size={20}
          leftIcon={<BackButton color="black" iconSize={20} />}
          style={{
            alignItems: "flex-start",
            flex: 0,
            marginBottom: 20,
          }}
        />

        {isGroupMode && (
          <View style={styles.groupInfoContainer}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={onPickImage}>
                <Avatar uri={groupAvatar ?? null} isGroup={true} size={100} />
              </TouchableOpacity>
            </View>

            <View style={{ width: "100%", marginTop: 20 }}>
              <Input
                placeholder="Group Name"
                value={groupName}
                onChangeText={setGroupName}
                // style={{ textAlign: "left", outline: "none" }}
                style={{ textAlign: "left", borderWidth: 0 }}
              />
            </View>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.contactList,
            { paddingBottom: isGroupMode ? verticalScale(150) : spacingY._12 },
          ]}
        >
          {(contacts ?? []).map((user, index) => {
            const isSelected = selectedParticipants.includes(user.id);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.contactRow,
                  isSelected && styles.selectedContact,
                ]}
                onPress={() => onSelectUser(user)}
              >
                <Avatar uri={user.avatar} size={45} />
                <Typo fontWeight={"500"}>{user.name}</Typo>

                {isGroupMode && (
                  <View style={styles.selectionIndicator}>
                    <View
                      style={[styles.checkbox, isSelected && styles.checked]}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {isGroupMode && selectedParticipants.length >= 2 && (
          <View style={styles.createGroupButton}>
            <Button
              onPress={createGroup}
              disabled={!groupName?.trim()}
              loading={isLoading}
            >
              <Typo fontWeight={"600"} size={17}>
                Create Group
              </Typo>
            </Button>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default NewConversationModal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacingX._12,
    marginVertical: spacingY._10,
    height: "100%",
  },
  groupInfoContainer: {
    marginTop: spacingY._20,
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: spacingY._10,
    marginTop: spacingY._20,
  },
  contactList: {
    gap: spacingY._12,
    paddingTop: spacingY._10,
    marginTop: spacingY._10,
  },
  contactRow: {
    gap: spacingX._10,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacingY._5,
  },
  selectionIndicator: {
    marginLeft: "auto",
    marginRight: spacingX._10,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.primary,
  },
  checked: {
    backgroundColor: colors.primary,
  },
  selectedContact: {
    backgroundColor: colors.neutral100,
    borderRadius: radius._30,
  },
  createGroupButton: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
    backgroundColor: colors.white,
    padding: spacingX._15,
  },
});
