import React from "react";
import ScreenWrapper from "@/components/screenWrapper";
import Typo from "@/components/typo";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import {
  getConversations,
  newConversation,
  testSocket,
} from "@/socket/socketEvents";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import ConversationItem from "@/components/conversationItem";
import Loading from "@/components/loading";
import Button from "@/components/button";
import { AntDesign } from "@expo/vector-icons";
import { verticalScale } from "@/utils/styling";
import { ConversationProps, ResponseProps } from "@/types/types";

const Home = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [conversations, setConversations] = React.useState<ConversationProps[]>(
    []
  );

  const { user } = useAuth();
  const router = useRouter();

  const processConversations = (res: ResponseProps) => {
    if (res.success) {
      setConversations(res.data);
    }
  };

  React.useEffect(() => {
    testSocket(testSocketCallbackHandler);
    testSocket(null);

    return () => {
      testSocket(testSocketCallbackHandler, true);
    };
  }, []);

  React.useEffect(() => {
    getConversations(processConversations);
    newConversation(newConversationHandler);

    getConversations(null);

    return () => {
      getConversations(processConversations, true);
      newConversation(newConversationHandler, true);
    };
  }, []);

  const newConversationHandler = (res: ResponseProps) => {
    if (res.success && res.data?.isNew) {
      setConversations((prev) => [...prev, res.data]);
    }
  };

  const testSocketCallbackHandler = (data: any) => {
    console.log("got response from testSocket event: ", data);
  };

  const directConversation = conversations
    .filter((item: ConversationProps) => item.type === "direct")
    .sort((a: ConversationProps, b: ConversationProps) => {
      const aDate = a.lastMessage?.createdAt;
      const bDate = b.lastMessage?.createdAt;
      return (
        new Date(bDate as string).getTime() -
        new Date(aDate as string).getTime()
      );
    });

  const groupConversation = conversations
    .filter((item: ConversationProps) => item.type === "group")
    .sort((a: ConversationProps, b: ConversationProps) => {
      const aDate = a.lastMessage?.createdAt;
      const bDate = b.lastMessage?.createdAt;
      return (
        new Date(bDate as string).getTime() -
        new Date(aDate as string).getTime()
      );
    });

  return (
    <ScreenWrapper
      showPattern={true}
      bgOpacity={0.4}
      style={{ padding: 0, width: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Typo
              color={colors.neutral200}
              size={15}
              textProps={{ numberOfLines: 1 }}
            >
              Welcome back,{" "}
              <Typo color={colors.white} size={18} fontWeight={"500"}>
                {user?.name}{" "}
              </Typo>
              🤙
            </Typo>
          </View>

          <TouchableOpacity
            style={styles.settingIcon}
            onPress={() => router.push("/(main)/profileModal")}
          >
            <Ionicons name="settings" size={17} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: spacingY._20 }}
          >
            <View style={styles.navbar}>
              <View style={styles.tabs}>
                <TouchableOpacity
                  style={[
                    styles.tabStyle,
                    selectedTab === 0 && styles.activeTabStyle,
                  ]}
                  onPress={() => setSelectedTab(0)}
                >
                  <Typo>Direct Messages</Typo>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabStyle,
                    selectedTab === 1 && styles.activeTabStyle,
                  ]}
                  onPress={() => setSelectedTab(1)}
                >
                  <Typo>Groups</Typo>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.conversationList}>
              {selectedTab === 0 &&
                directConversation.map((item: ConversationProps, index) => (
                  <ConversationItem
                    item={item}
                    key={index}
                    router={router}
                    showDivider={directConversation.length !== index + 1}
                  />
                ))}
              {selectedTab === 1 &&
                groupConversation.map((item: ConversationProps, index) => (
                  <ConversationItem
                    item={item}
                    key={index}
                    router={router}
                    showDivider={groupConversation.length !== index + 1}
                  />
                ))}
            </View>

            {!loading &&
              selectedTab === 0 &&
              directConversation.length === 0 && (
                <Typo style={{ textAlign: "center" }}>
                  You don&apos;t have any messages
                </Typo>
              )}

            {!loading &&
              selectedTab === 1 &&
              groupConversation.length === 0 && (
                <Typo style={{ textAlign: "center" }}>
                  You have&apos;t joined any groups yet
                </Typo>
              )}

            {loading && <Loading />}
          </ScrollView>
        </View>
      </View>

      <Button
        style={styles.floatingButton}
        onPress={() =>
          router.push({
            pathname: "/(main)/newConversationModal",
            params: { isGroup: selectedTab },
          })
        }
      >
        <AntDesign name="plus" size={24} color="black" />
      </Button>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: spacingY._25,
    ...(Platform.OS === "web" && { paddingTop: spacingY._20 }),
    paddingHorizontal: spacingX._15,
  },
  settingIcon: {
    padding: spacingY._7,
    backgroundColor: colors.neutral700,
    borderRadius: radius.full,
    position: "relative",
    top: 8,
    ...(Platform.OS === "web" && { top: 4 }),
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: radius._50,
    borderTopLeftRadius: radius._50,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._15,
    paddingHorizontal: spacingX._10,
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacingX._10,
  },
  tabStyle: {
    paddingHorizontal: spacingY._25,
    paddingVertical: spacingX._7,
    backgroundColor: colors.neutral100,
    borderRadius: radius.full,
  },
  activeTabStyle: {
    backgroundColor: colors.primaryLight,
  },
  conversationList: {
    paddingVertical: spacingY._20,
    paddingHorizontal: spacingX._20,
  },
  floatingButton: {
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: radius.full,
  },
});
