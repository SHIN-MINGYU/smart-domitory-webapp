import React, { useState } from "react";
import AppHeader from "../Custom/AppHeaders";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import crypto from "crypto";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";
import axios from "axios";
const input = StyleSheet.create({
  current: {
    width: "80%",
    height: "20%",
    borderWidth: 1,
    borderColor: "#e9e9e9",
    marginTop: "2%",
  },
  notCurrent: {
    width: "80%",
    height: "20%",
    borderWidth: 1,
    borderColor: "red",
    marginTop: "2%",
  },
});

// 비밀번호 잊어버렸을 때 페이지

function ForgotPassword(props: any) {
  /**
   * eMail : 해당 이메일이 옳은 이메일인지 확인
   * isEmail : 이메일인지 아닌지 확인해주기 위한 boolean
   * re : ~@g.yju.ac.kr 에 대한 정규표현식
   * hash : 랜덤바이트를 해당 페이지에 저장 및 서버에 보내줘서 메일을 보내주기 위해 만든 hash
   * onSubmit : 이메일이 본인 이메일과 동일하면 해당페이지로 전달해주는 함수
   */
  const [eMail, setEMail] = useState("");
  const [isEMail, setIsEMail] = useState(false);

  const re = /^[0-9a-zA-Z]*@g\.yju\.ac\.kr/;
  const hash = crypto.randomBytes(6).toString("hex").substring(0, 5);
  const URL = useSelector((state: reduxState) => state.API.URL);
  const onSubmit = () => {
    axios
      .post(URL + "/auth/find/pw", { hash, e_mail: eMail })
      .then((res) =>
        props.navigation.navigate("SettingPassword", { eMail, hash })
      )
      .catch((err) => console.log(err));
  };
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
          <Text>비밀번호를 잊어버리셨습니까? 이메일을 입력해주세요!</Text>
          <Text>재설정을 도와드리겠습니다!</Text>
          <TextInput
            style={isEMail ? input.current : input.notCurrent}
            value={eMail}
            blurOnSubmit={true}
            onSubmitEditing={() =>
              isEMail
                ? onSubmit()
                : alert("email형식이 맞지않습니다. ex) example@g.yju.ac.kr")
            }
            onChangeText={(text) => {
              setEMail(text);
              setIsEMail(re.test(text));
            }}
            placeholder="e-mail을 입력해주세요"></TextInput>
        </View>
        <View style={{ width: "60%", height: "20%" }}>
          <TouchableOpacity
            onPress={() => {
              isEMail
                ? onSubmit()
                : alert("email형식이 맞지않습니다. ex) example@g.yju.ac.kr");
            }}
            style={{
              borderRadius: 15,
              backgroundColor: "#0064ff",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ color: "white", padding: "2%" }}>제출</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default ForgotPassword;
