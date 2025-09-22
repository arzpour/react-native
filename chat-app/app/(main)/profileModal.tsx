import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screenWrapper";
import Header from "@/components/header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Avatar from "@/components/avatar";
import { MaterialIcons } from "@expo/vector-icons";
import Typo from "@/components/typo";
import Input from "@/components/input";
import { useAuth } from "@/contexts/authContext";
import { UserProps } from "@/types/types";
import { scale, verticalScale } from "@/utils/styling";
import Button from "@/components/button";
import { useRouter } from "expo-router";
import { updateProfile } from "@/socket/socketEvents";
import * as ImagePicker from "expo-image-picker";

const ProfileModal = () => {
  const { user, signOut, updateToken } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const [userData, setUserData] = React.useState<UserProps>({
    name: "",
    email: "",
    avatar: null,
  });

  const processUpdateProfile = (res: any) => {
    console.log("🚀 ~ processUpdateProfile ~ res:", res);

    setLoading(false);

    if (res.success) {
      updateToken(res.data.token);
      router.back();
    } else {
      Alert.alert("User", res.msg);
    }
  };

  React.useEffect(() => {
    updateProfile(processUpdateProfile);

    return () => updateProfile(processUpdateProfile);
  }, []);

  React.useEffect(() => {
    setUserData({
      email: user?.email ?? "",
      name: user?.name ?? "",
      avatar: user?.avatar ?? null,
    });
  }, [user]);

  const onSubmit = () => {
    const { name, avatar } = userData;

    if (!name.trim()) {
      Alert.alert("User", "please enter yourr name");
      return;
    }

    let data = { name, avatar };

    setLoading(true);
    updateProfile(data);
  };

  const handleLogout = async () => {
    router.back();
    await signOut();
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      {
        text: "Cancle",
        onPress: () => console.log("cancle logout"),
        style: "cancel",
      },
      {
        text: " Logout",
        onPress: () => handleLogout(),
        style: "destructive",
      },
    ]);
  };

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos", "livePhotos"],
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUserData({ ...userData, avatar: result.assets[0].uri });
    }
  };

  return (
    <ScreenWrapper isModal={true} style={{ padding: 0 }}>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={
            Platform.OS === "android" && (
              <Ionicons name="chevron-back" size={22} color="black" />
            )
          }
          style={{
            marginVertical: spacingY._15,
            marginTop: 40,
          }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Avatar uri={userData.avatar as string} size={150} />
            <TouchableOpacity style={styles.editIcon} onPress={onPickImage}>
              <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ gap: spacingY._20, paddingTop: 10 }}>
            <View style={styles.inputContainer}>
              <Typo style={{ paddingLeft: spacingX._10 }}>Email</Typo>

              <Input
                value={userData.email}
                containerStyle={{
                  borderColor: colors.neutral350,
                  backgroundColor: colors.neutral300,
                  paddingLeft: spacingX._10,
                }}
                inputStyle={{ textAlign: "left", outline: "none" }}
                onChangeText={(value: string) =>
                  setUserData({ ...userData, email: value })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Typo style={{ paddingLeft: spacingX._10 }}>Name</Typo>

              <Input
                value={userData.name}
                containerStyle={{
                  borderColor: colors.neutral350,
                  backgroundColor: colors.neutral300,
                  paddingLeft: spacingX._10,
                }}
                inputStyle={{ textAlign: "left", outline: "none" }}
                onChangeText={(value: string) =>
                  setUserData({ ...userData, name: value })
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        {!loading && (
          <Button
            style={{
              height: verticalScale(56),
              width: verticalScale(56),
              backgroundColor: colors.rose,
            }}
            onPress={showLogoutAlert}
          >
            <MaterialIcons name="logout" size={24} color="white" />
          </Button>
        )}

        <Button
          style={{
            flex: 1,
            justifyContent: "center",
          }}
          onPress={onSubmit}
          loading={loading}
        >
          <Typo style={{}} fontWeight={"600"}>
            Update
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    padding: spacingY._7,
    borderRadius: radius.full,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    elevation: 4,
    outline: "none",
  },
  inputContainer: {
    gap: spacingY._7,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    marginBottom: spacingY._30,
    marginTop: spacingY._30,
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
});
