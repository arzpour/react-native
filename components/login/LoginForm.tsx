import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";

const color = Platform.select({
  default: "black",
  web: "black",
  android: "white",
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      router.push("/home");
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputField}>
        <TextInput
          placeholder="phone number, email or id"
          placeholderTextColor={"#444"}
          style={styles.input}
          textContentType="emailAddress"
          autoCapitalize="none"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <Text style={styles.errorStyle}>{formik.errors.email}</Text>
        ) : null}
      </View>

      <View style={styles.inputField}>
        <TextInput
          placeholder="password"
          placeholderTextColor={"#444"}
          style={styles.input}
          textContentType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />

        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.errorStyle}>{formik.errors.password}</Text>
        ) : null}
      </View>

      <Pressable
        onPress={() => formik.handleSubmit()}
        style={styles.loginButton}
      >
        <Text style={styles.login}>Login</Text>
      </Pressable>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 15,
  },
  inputField: {
    width: "100%",
    color: color,
  },
  input: {
    outline: "none",
    outlineWidth: 0,
    borderWidth: 1,
    borderColor: "#444",
    padding: 5,
    borderRadius: 3,
    marginTop: 12,
    color: color,
  },
  login: {
    color: "white",
    backgroundColor: "#5780f2",
    marginTop: 20,
    padding: 8,
    paddingVertical: 7,
    borderRadius: 3,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  loginButton: {
    width: "100%",
  },
  errorStyle: {
    color: "red",
    textAlign: "left",
    marginTop: 4,
    fontSize: 10,
  },
  lightColor: {
    color: "black",
  },
  darkColor: {
    color: "white",
  },
});
