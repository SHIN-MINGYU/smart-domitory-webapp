import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TextStyle,
  StyleProp,
} from "react-native";
import AppHeader from "../Custom/AppHeaders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import I18n from "../../i18n";

const inputStyle: StyleProp<TextStyle> = {
  marginTop: "3%",
  marginBottom: "1%",
  justifyContent: "center",
  borderWidth: 2,
  borderStyle: "solid",
  width: "80%",
  borderRadius: 10,
  padding: "2%",
};

//login page

function SignIn(props: any) {
  /**
   * username, password : 로그인 시 필요한 정보
   * passwordHidden : 비밀번호를 보여 줄 건지 말건지에 대한 boolean 값
   * URL : API_URL
   * Login : 로그인이 올바르게 성공되면 AsyncStorage에 user의 정보를 넣어주고 dispatch를 통해 올바르게 로그인이 성공되도록 해주는 함수
   *
   */
  const [username, setUserNmae] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const dispatch = useDispatch();
  const URL = useSelector((state: any) => state.API.URL);

  const Login = useCallback(() => {
    //로그인 과정
    axios
      .post(
        URL + "/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then(async (res) => {
        //만약 성공하면 AsyncStorage에 user_info키 값으로 res.data를 stringify 해서 전달 후
        // dispatch함수로 만들어놓은 action으로 전역변수에 로그인 했다고 정보 전달
        // 홈 route로 이동
        try {
          await AsyncStorage.setItem("user_info", JSON.stringify(res.data));
          dispatch(login(res.data));
        } catch (err) {
          console.log(err);
        }
        props.navigation.reset({ routes: [{ name: "home" }] });
      })
      .catch((err) => {
        alert(err.message);
        console.trace(err);
      });
  }, [username, password]);
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={"Sign In"}
        isLeft={true}></AppHeader>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={inputStyle}
            placeholder="학번"
            value={username}
            onChangeText={(text: string) => setUserNmae(text)}
          />
          <TextInput
            style={inputStyle}
            placeholder="비밀번호"
            value={password}
            secureTextEntry={passwordHidden}
            onChangeText={(text: string) => setPassword(text)}
          />
          <View
            style={{
              width: "80%",
              height: "20%",
              margin: "5%",
            }}>
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
                borderRadius: 30,
              }}
              onPress={() => {
                Login();
              }}>
              <Text
                style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
                {I18n.t("Login")}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
              borderTopWidth: 1,
            }}>
            {/*           <TouchableOpacity
            onPress={() => {
              logout();
            }}>
            <Text style={{marginTop: '2%'}}>로그아웃</Text>
          </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ForgotPassword");
              }}>
              <Text style={{ marginTop: "2%" }}>{I18n.t("FindPassword")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("SignUp");
              }}>
              <Text style={{ marginTop: "2%" }}>{I18n.t("SignUp")}</Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        </View>
      </View>
    </>
  );
}
export default SignIn;
