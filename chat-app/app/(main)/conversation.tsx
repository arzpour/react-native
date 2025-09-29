import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screenWrapper";
import Typo from "@/components/typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import Header from "@/components/header";
import BackButton from "@/components/backButton";
import Avatar from "@/components/avatar";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import MessageItem from "@/components/messageItem";
import { verticalScale } from "@/utils/styling";
import Input from "@/components/input";
import * as ImagePicker from "expo-image-picker";
import Loading from "@/components/loading";
import { uploadFileToCloudinary } from "@/services/imageService";

const dummyMessages = [
  {
    id: "msg_10",
    sender: {
      id: "user_2",
      name: "Jane Smith",
      avatar: null,
    },
    content: "that would be really useful!",
    createdAt: "10:42 AM",
    isMe: false,
  },
  {
    id: "msg_9",
    sender: {
      id: "user",
      name: "Bilmem ne",
      avatar: null,
    },
    content: "that would be really useful!",
    createdAt: "10:42 AM",
    isMe: true,
  },
  {
    id: "msg_8",
    sender: {
      id: "user_0",
      name: "Jane",
      avatar: null,
    },
    content: "that would be really useful!",
    createdAt: "10:42 AM",
    isMe: false,
  },
  {
    id: "msg_7",
    sender: {
      id: "msg",
      name: "Smith",
      avatar: null,
    },
    content: "that would be really useful!",
    createdAt: "10:42 AM",
    isMe: true,
  },
  {
    id: "msg_6",
    sender: {
      id: "user_1",
      name: "thats me",
      avatar: null,
    },
    content: "that would be really useful!",
    createdAt: "10:42 AM",
    isMe: false,
  },
];
type FileType = string | { uri: string } | null;
const Conversation = () => {
  const {
    id: conversationId,
    name,
    avatar,
    type,
    participants: stringifiedParticipants,
  } = useLocalSearchParams();
  const [message, setMessage] = React.useState<string>("");
  const [selectedFile, setSelectedFile] = React.useState<FileType>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { user: currentUser } = useAuth();

  const participants = JSON.parse(stringifiedParticipants as string);

  let conversationAvatar = avatar;
  let isDirect = type === "direct";
  const otherParticipants = isDirect
    ? participants.find((p: any) => p._id !== currentUser?.id)
    : null;

  if (isDirect && otherParticipants)
    conversationAvatar = otherParticipants.avatar;

  let conversationName = isDirect ? otherParticipants.name : name;

  const onPickFile = async () => {
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

      setSelectedFile(file);
    }
  };

  const onSend = async () => {
    if (!message.trim() && !selectedFile) return;
    if (!currentUser) return;

    setIsLoading(true);
    try {
      let attachment = null;
      if (selectedFile) {
        const uploadResult = await uploadFileToCloudinary(
          selectedFile,
          "message-attachments"
        );

        if (uploadResult.success) {
          attachment = uploadResult.data;
        } else {
          setIsLoading(false);
          Alert.alert("Error", "Could not send the image!");
        }
      }
      console.log("🚀 ~ onSend ~ attachment:", attachment);
    } catch (error) {
      console.log("🚀 ~ onSend ~ error:", error);
      Alert.alert("Error", "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper
      style={{
        ...(Platform.OS === "web" && { padding: 0 }),
        padding: 0,
        margin: 0,
      }}
      showPattern={true}
      bgOpacity={0.5}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header
          style={styles.header}
          leftIcon={
            <View style={styles.headerLeft}>
              <BackButton />
              <Avatar
                uri={conversationAvatar as string}
                isGroup={type === "group"}
                size={40}
              />
              <Typo color={colors.white} size={18} fontWeight={"600"}>
                {conversationName}
              </Typo>
            </View>
          }
          rightIcon={
            <TouchableOpacity
              style={{
                position: "relative",
                bottom: 6,
              }}
            >
              <Entypo name="dots-three-vertical" size={18} color="white" />
            </TouchableOpacity>
          }
        />

        {/* messages  */}
        <View style={styles.content}>
          <FlatList
            data={dummyMessages}
            inverted={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <MessageItem item={item.item} isDirect={isDirect} />
            )}
            contentContainerStyle={styles.messagesContent}
          />

          <View style={styles.footer}>
            <Input
              placeholder="Type Message"
              containerStyle={{
                borderWidth: 0,
                paddingHorizontal: 6,
              }}
              inputStyle={{ textAlign: "left", outline: "none" }}
              value={message}
              onChangeText={setMessage}
              icon={
                <TouchableOpacity
                  style={[styles.inputIcon]}
                  onPress={onPickFile}
                >
                  <AntDesign
                    name="plus"
                    size={verticalScale(22)}
                    color="black"
                  />

                  {selectedFile && (
                    <Image
                      source={selectedFile}
                      style={styles.selectedFile}
                      resizeMode="cover"
                    />
                  )}
                </TouchableOpacity>
              }
            />

            <View style={styles.inputRightIcon}>
              <TouchableOpacity style={styles.inputIcon} onPress={onSend}>
                {isLoading ? (
                  <Loading size={21} color={colors.black} />
                ) : (
                  <Feather name="send" size={21} color="black" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacingX._10,
    ...(Platform.OS === "web"
      ? { padding: spacingY._20 }
      : { padding: spacingY._7, marginBottom: spacingY._10 }),
    flexDirection: "row",
    flex: 0.05,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._12,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: radius._50,
    borderTopLeftRadius: radius._50,
    borderCurve: "continuous",
    overflow: "hidden",
    paddingHorizontal: spacingX._10,
  },
  messagesContent: {
    paddingTop: spacingY._20,
    paddingBottom: spacingY._10,
    gap: spacingY._12,
  },
  footer: {
    paddingTop: spacingY._7,
    paddingBottom: verticalScale(22),
    textAlign: "left",
    padding: 5,
  },
  inputIcon: {
    backgroundColor: colors.primary,
    padding: 10,
    paddingHorizontal: 11,
    borderRadius: radius.full,
    position: "relative",
  },
  selectedFile: {
    position: "absolute",
    top: 1,
    height: verticalScale(40),
    width: verticalScale(40),
    borderRadius: radius.full,
    alignSelf: "center",
  },
  inputRightIcon: {
    position: "absolute",
    right: 10,
    top: 11,
    paddingLeft: 10,
    borderLeftWidth: 1.5,
    borderLeftColor: colors.neutral300,
  },
});
