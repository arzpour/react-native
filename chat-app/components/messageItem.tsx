import { StyleSheet, View } from "react-native";
import React from "react";
import { MessageProps } from "@/types/types";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Avatar from "./avatar";
import Typo from "./typo";

interface IMessageItem {
  item: MessageProps;
  isDirect: boolean;
}

const MessageItem = ({ isDirect, item }: IMessageItem) => {
  const isMe = item.isMe;

  return (
    <View
      style={[
        styles.messageContainer,
        isMe ? styles.myMessage : styles.theirMessage,
      ]}
    >
      {!isMe && !isDirect && (
        <Avatar uri={null} style={styles.messageAvatar} size={30} />
      )}

      <View
        style={[
          styles.messageBubble,
          isMe ? styles.myBubble : styles.theirBubble,
        ]}
      >
        {!isMe && !isDirect && (
          <Typo size={13} color={colors.neutral900} fontWeight={"600"}>
            {item.sender?.name}
          </Typo>
        )}
        {!!item.content && <Typo size={15}>{item.content}</Typo>}
        <Typo
          style={{ alignSelf: "flex-end", marginTop: 1 }}
          size={11}
          color={colors.neutral600}
          fontWeight={"500"}
        >
          {item.createdAt}
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
});
