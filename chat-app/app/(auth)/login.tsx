import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/screenWrapper";
import BackButton from "@/components/backButton";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Typo from "@/components/typo";
import Input from "@/components/input";
import Feather from "@expo/vector-icons/Feather";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Button from "@/components/button";
import { useAuth } from "@/contexts/authContext";
import { IError } from "@/types/types";

const Register = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const emailRef = React.useRef("");
  const passwordRef = React.useRef("");

  const { signIn } = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill all the fields");
      return;
    }

    try {
      setIsLoading(true);
      await signIn(emailRef.current, passwordRef.current);
    } catch (error: unknown) {
      let message = "Login failed";

      if (error && typeof error === "object" && "response" in error) {
        const err = error as IError;
        message = err.response?.data?.msg ?? err.message ?? message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      Alert.alert("Login Error", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScreenWrapper
        showPattern={true}
        style={{
          paddingTop: 10,
          paddingHorizontal: 0,
        }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton />
            <Typo size={14} color={colors.white}>
              Forget your password?
            </Typo>
          </View>

          <View style={styles.content}>
            <ScrollView
              contentContainerStyle={styles.form}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
                <Typo size={20} fontWeight={"600"}>
                  Welcome back
                </Typo>
                <Typo color={colors.neutral600} size={15}>
                  We are happy to see you!
                </Typo>
              </View>
              <View style={{ gap: 20, marginVertical: 20 }}>
                <Input
                  placeholder="Enter your email"
                  onChangeText={(value: string) => (emailRef.current = value)}
                  icon={
                    <Entypo
                      name="email"
                      size={verticalScale(20)}
                      color={colors.neutral600}
                    />
                  }
                  style={{ outline: "none" }}
                />
                <Input
                  placeholder="Enter your password"
                  secureTextEntry
                  onChangeText={(value: string) =>
                    (passwordRef.current = value)
                  }
                  icon={
                    <Feather
                      name="lock"
                      size={verticalScale(20)}
                      color={colors.neutral600}
                    />
                  }
                  style={{ outline: "none" }}
                />
              </View>
              <View style={{ marginTop: spacingY._15, gap: spacingY._15 }}>
                <Button loading={isLoading} onPress={handleSubmit}>
                  <Typo fontWeight={"400"} color={colors.black} size={15}>
                    Login
                  </Typo>
                </Button>
              </View>
              <View style={styles.footer}>
                <Typo>Don&apos;t have an account?</Typo>
                <Pressable onPress={() => router.navigate("/(auth)/register")}>
                  <Typo color={colors.primaryDark} fontWeight={"medium"}>
                    Sign Up
                  </Typo>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacingY._20,
    paddingBottom: spacingY._30,
    paddingHorizontal: spacingX._10,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: radius._50,
    borderTopLeftRadius: radius._50,
    borderCurve: "continuous",
    paddingTop: spacingY._25,
  },
  form: {
    padding: 15,
    paddingHorizontal: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 14,
  },
});
