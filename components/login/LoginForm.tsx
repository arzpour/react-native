import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => console.log(values),
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputField}>
        <TextInput
          placeholder="phone number, email or id"
          placeholderTextColor={"#444"}
          style={styles.input}
          textContentType="emailAddress"
          autoFocus={true}
          autoCapitalize="none"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
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
          onBlur={formik.handleBlur("password")}
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
  },
  input: {
    outline: "none",
    outlineWidth: 0,
    borderWidth: 1,
    borderColor: "#444",
    padding: 5,
    borderRadius: 3,
    marginTop: 12,
    color: "white",
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
  },
});
