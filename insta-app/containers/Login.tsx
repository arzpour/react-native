import { StyleSheet, View } from "react-native";
import React from "react";
import Brand from "@/components/login/Brand";
import LoginForm from "@/components/login/LoginForm";

const Login = () => {
  return (
    <View className="items-center" style={styles.container}>
      <Brand />
      <LoginForm />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {},
});
