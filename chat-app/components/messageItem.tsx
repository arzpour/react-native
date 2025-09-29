import { StyleSheet, View } from "react-native";
import React from "react";
import { MessageProps } from "@/types/types";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Avatar from "./avatar";
import Typo from "./typo";
import { useAuth } from "@/contexts/authContext";
import moment from "moment";
import { Image } from "expo-image";
import { verticalScale } from "@/utils/styling";

interface IMessageItem {
  item: MessageProps;
  isDirect: boolean;
}

const MessageItem = ({ isDirect, item }: IMessageItem) => {
  const { user: currentUser } = useAuth();
  const isMe = currentUser?.id === item.sender.id;

  const formattedDate = moment(item.createdAt).isSame(moment(), "day")
    ? moment(item.createdAt).format("h:mm A")
    : moment(item.createdAt).format("MMM D, h:mm A");

  return (
    <View
      style={[
        styles.messageContainer,
        isMe ? styles.myMessage : styles.theirMessage,
      ]}
    >
      {!isMe && !isDirect && (
        <Avatar
          uri={item.sender.avatar}
          style={styles.messageAvatar}
          size={30}
        />
      )}

      <View
        style={[
          styles.messageBubble,
          isMe ? styles.myBubble : styles.theirBubble,
        ]}
      >
        {!isMe && !isDirect && (
          <Typo size={14} color={colors.neutral900} fontWeight={"600"}>
            {item.sender?.name}
          </Typo>
        )}

        {item.attachment && (
          <Image
            source={item.attachment}
            contentFit="cover"
            transition={100}
            style={styles.attachment}
          />
        )}

        {!!item.content && <Typo size={15}>{item.content}</Typo>}
        <Typo
          style={{ alignSelf: "flex-end" }}
          size={11}
          color={colors.neutral600}
          fontWeight={"500"}
        >
          {formattedDate}
        </Typo>
      </View>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    gap: spacingX._7,
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
  },
  theirMessage: {
    alignSelf: "flex-start",
  },
  messageAvatar: {
    alignSelf: "flex-end",
  },
  messageBubble: {
    padding: spacingX._10,
    borderRadius: radius._15,
    gap: spacingY._5,
  },
  myBubble: {
    backgroundColor: colors.myBubble,
  },
  theirBubble: {
    backgroundColor: colors.otherBubble,
  },
  attachment: {
    height: verticalScale(180),
    width: verticalScale(180),
    borderRadius: radius._10,
  },
});
