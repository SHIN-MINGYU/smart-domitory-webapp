import React, { useState } from "react";
import AppHeader from "../Custom/AppHeaders";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import axios from "axios";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";

//비밀번호를 초기화 시켜주는 페이지

function SettingPassword(props: any) {
  /**
   * code : 이메일로 전송된 데이터가 입력한 값과 맞는지 다른지를 비교하기위해 담는 변수
   * isSame : 같으면 true 다르면 false의 값을 가지고 있는 boolean type
   * password : 바꿀 패스워드
   * checkPassword : 패스워드 재확인
   * URL : API_URL
   * onSubmit : 이메일로 인증코드를 재전송 해주는 함수
   */
  const [code, setCode] = useState<string>("");
  const [isSame, setIsSame] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const URL = useSelector((state: reduxState) => state.API.URL);
  const onSubmit = () => {
    axios
      .post(URL + "/auth/chagne/pw", {
        password,
        e_mail: props.route.params.eMail,
      })
      .then((res) => props.navigation.reset({ routes: [{ name: "home" }] }))
      .catch((err) => console.log(err));
  };
  if (!isSame) {
    return (
      <>
        <AppHeader
          title="비밀번호찾기"
          isLeft={true}
          navigation={props.navigation}></AppHeader>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View
            style={{
              width: "100%",
              height: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text>전송받은 인증코드를 입력해주세요</Text>
            <Text style={{ color: "red", fontSize: 12 }}>
              메일 전송까지 수초~수분이 걸릴수 있습니다.
            </Text>
            <TextInput
              value={code}
              style={{
                width: "80%",
                height: "20%",
                borderWidth: 1,
                borderColor: "#e9e9e9",
                marginTop: "2%",
              }}
              onChangeText={(text) => {
                setCode(text);
                text === props.route.params.hash
                  ? setIsSame(true)
                  : setIsSame(false);
              }}></TextInput>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <>
        <AppHeader
          title="비밀번호찾기"
          isLeft={true}
          navigation={props.navigation}></AppHeader>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View
            style={{
              width: "100%",
              height: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text>비밀번호</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              // secureTextEntry={true}
              style={{
                width: "80%",
                height: "20%",
                borderWidth: 1,
                borderColor: "#e9e9e9",
                marginTop: "2%",
              }}
              placeholder="바꿀 비밀번호"></TextInput>
            <Text>비밀번호 재확인</Text>
            <TextInput
              value={checkPassword}
              onChangeText={(text) => setCheckPassword(text)}
              // secureTextEntry={true}
              style={{
                width: "80%",
                height: "20%",
                borderWidth: 1,
                borderColor: "#e9e9e9",
                marginTop: "2%",
              }}
              placeholder="비밀번호 재확인"></TextInput>
          </View>
          <View
            style={{
              width: "80%",
              height: "5%",
              margin: "5%",
            }}>
            <TouchableOpacity
              onPress={() =>
                password === checkPassword
                  ? onSubmit()
                  : alert("비밀번호를 확인해주세요")
              }
              style={{
                width: "100%",
                height: "80%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
                borderRadius: 30,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                }}>
                제출
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
export default SettingPassword;
