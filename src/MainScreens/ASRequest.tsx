import CheckBox from "expo-checkbox";
import React, { useCallback, useState, useMemo } from "react";
import { View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import AppHeader from "../Custom/AppHeaders";
import axios from "axios";
import I18n from "../../i18n";
import { useSelector } from "react-redux";
import reduxState from "../../types/reduxStateType";
import { DrawerNavigation } from "../../types/NavigationType";
import { DrawerNavList } from "../../types/NavigationParamsType";

// AS요청 페이지

function ASRequest({
  navigation,
  route,
}: {
  navigation: DrawerNavigation;
  route: DrawerNavList["ASRequest"];
}) {
  /**
   * URL : API_URL
   * title : 제목
   * content : 내용
   * vst_chaeck : 부재시 방문 동의
   * as_id : 수정하고 싶을떄는 as_id가 있어야 데이터베이스에서 해당 글을 식별 할 수 있으므로 변수에 담아줌
   * onASSubmit : 수정 상황과 생성 상황 구별해서 제출해주는 함수
   *
   */
  const URL = useSelector((state: reduxState) => state.API.URL);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [vst_check, setVst_check] = useState<boolean>(false);
  const [as_id, setAs_Id] = useState<string>();

  React.useEffect(() => {
    //수정상황이였을 때는 mount될때 변수들에다가 값들을 모두 저장
    if (route) {
      if (route.params) {
        setTitle(route.params.title);
        setContent(route.params.content);
        setAs_Id(route.params.id);
        setVst_check(route.params.vst_check);
      }
    }
  }, []);
  const onASSubmit = useCallback(() => {
    if (route) {
      if (route.params) {
        axios
          .patch(
            URL + "/as/update",
            { title, content, vst_check, as_id },
            { withCredentials: true }
          )
          .then((res) => {
            navigation.navigate("ASInquery");
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(
            URL + "/as/create",
            { title, content, vst_check },
            { withCredentials: true }
          )
          .then((res) => {
            navigation.navigate("ASInquery");
          })
          .catch((err) => console.log(err));
      }
    }
  }, [route, title, content, vst_check]);
  return (
    <>
      <AppHeader
        isLeft={true}
        title={I18n.t("ASRequest")}
        navigation={navigation}></AppHeader>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "white",
        }}>
        <View
          style={{
            height: "10%",
            width: "90%",
            margin: "5%",
          }}>
          <Text style={{ fontWeight: "bold", color: "black" }}>
            {I18n.t("Title")}
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              padding: 0,
              margin: 0,
              height: "80%",
              borderColor: "#212121",
            }}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            maxLength={50}></TextInput>
        </View>

        <View
          style={{
            height: "60%",
            width: "90%",
          }}>
          <Text
            style={{
              fontWeight: "bold",
              color: "black",
              padding: 0,
              margin: 0,
            }}>
            {I18n.t("Content")}
          </Text>
          <TextInput
            style={{ borderWidth: 1, height: "90%", borderColor: "#212121" }}
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
            maxLength={500}></TextInput>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "7%",
          }}>
          <CheckBox
            value={vst_check}
            onValueChange={() => setVst_check(!vst_check)}></CheckBox>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              color: "black",
              fontWeight: "bold",
            }}>
            {I18n.t("BuzaeAgree")}
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            height: "10%",
          }}>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "#0064ff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => {
              onASSubmit();
            }}>
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text style={{ color: "white", fontWeight: "700", fontSize: 15 }}>
                {I18n.t("Request")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default ASRequest;
