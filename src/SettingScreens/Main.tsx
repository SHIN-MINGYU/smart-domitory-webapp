import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Modal, Switch } from "react-native";
import AppHeader from "../Custom/AppHeaders";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CheckIcon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import I18n from "../../i18n";
import { logout } from "../../redux/actions";
import reduxState from "../../types/reduxStateType";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomStackNavList } from "../../types/NavigationParamsType";

//환경 설정에 대한 페이지

type Props = NativeStackScreenProps<BottomStackNavList>;
//이 Props안에는 navigation과 route에 대한 정보들이 담겨져 있음
function SettingMain({ navigation }: { navigation: Props["navigation"] }) {
  /**
   * URL : API URL
   * user : 현재 이용하는 유저에 대한 정보가 담겨져 있음
   * isVisible : modal의 visible을 정하는 변수
   * onChangeLanguage : 설정해 준 언어를 현재 locale에서 쓰도록 해주는 함수
   * logout : logout 로그아웃을 해주고 dispatch를 실시해주는 함수
   */
  const URL = useSelector((state: reduxState) => state.API.URL);
  const user = useSelector((state: reduxState) => state.User);
  const dispatch = useDispatch();
  const [isVisiable, setIsVisiable] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(I18n.locale);
  /*   const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0); */
  const [isEnabled, setIsEnabled] = useState(false);
  /*   const toggleSwitch = useCallback(
    () => setIsEnabled((previousState) => !previousState),
    []
  ); */
  const onChagneLanguage = useCallback(async (Language: string) => {
    await AsyncStorage.setItem("Language", Language);
    I18n.locale = Language;
    navigation.reset({ routes: [{ name: "Home" }] });
  }, []);
  const Logout = useCallback(() => {
    axios.post(URL + "/auth/logout").then((res) => dispatch(logout()));
  }, []);
  /*   const onLayout = (event) => {
    const { height, width } = event.nativeEvent.layout;
    setParentHeight(height);
    setParentWidth(width);
  }; */
  return (
    <>
      <AppHeader title={"Setting"} navigation={navigation}></AppHeader>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Avatar.Image
            source={require("../public/annonymous.png")}
            size={100}></Avatar.Image>
          <Text style={{ color: "black" }}>
            {user.isLogined ? user.info.std_name : I18n.t("PleaseLogin")}
          </Text>
        </View>
        {/*         <TouchableOpacity
          style={{
            height: "10%",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "black", marginLeft: "10%" }}>댓글 알림</Text>
          <Switch
            style={{ marginRight: "10%" }}
            trackColor={{ false: "#767577", true: "0064ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => setIsVisiable(true)}
          style={{
            height: "10%",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#e9e9e9",
            justifyContent: "center",
          }}>
          <Text style={{ color: "black", marginLeft: "10%" }}>
            {I18n.t("LanguagueSetting")}
          </Text>
        </TouchableOpacity>
        <Modal animationType={"fade"} visible={isVisiable} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(1,1,1,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }} //모달 백그라운드
          >
            {
              //모달 안쪽
            }
            <View
              style={{ backgroundColor: "white", height: "40%", width: "60%" }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#e9e9e9",
                }}>
                <Text
                  style={{
                    marginLeft: "10%",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}>
                  언어설정
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    onChagneLanguage("ko");
                  }, 100);
                }}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10%",
                  }}>
                  {selectedLanguage === "ko" ? (
                    <CheckIcon
                      name={"circle"}
                      size={18}
                      color={"#0064ff"}></CheckIcon>
                  ) : (
                    <CheckIcon
                      name={"circle-thin"}
                      size={15}
                      color={"gray"}></CheckIcon>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}>
                  <Text style={{ fontSize: 15, marginRight: "10%" }}>
                    한국어
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    onChagneLanguage("ch");
                  }, 100);
                }}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    padding: 10,
                    marginLeft: "10%",
                  }}>
                  {selectedLanguage === "ch" ? (
                    <CheckIcon
                      name={"circle"}
                      size={15}
                      color={"#0064ff"}></CheckIcon>
                  ) : (
                    <CheckIcon
                      name={"circle-thin"}
                      size={15}
                      color={"gray"}></CheckIcon>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}>
                  <Text style={{ fontSize: 15, marginRight: "10%" }}>
                    中国語
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    onChagneLanguage("en");
                  }, 100);
                }}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    padding: 10,
                    marginLeft: "10%",
                  }}>
                  {selectedLanguage === "en" ? (
                    <CheckIcon
                      name={"circle"}
                      size={15}
                      color={"#0064ff"}></CheckIcon>
                  ) : (
                    <CheckIcon
                      name={"circle-thin"}
                      size={15}
                      color={"gray"}></CheckIcon>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}>
                  <Text style={{ fontSize: 15, marginRight: "10%" }}>
                    English
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            height: "10%",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderColor: "#e9e9e9",
          }}
          onPress={() => alert("v.0.0.1")}>
          <Text style={{ color: "black", marginLeft: "10%" }}>Version</Text>
        </TouchableOpacity>
        {user.isLogined ? (
          <TouchableOpacity
            style={{
              height: "10%",
              borderWidth: 1,
              borderColor: "#e9e9e9",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={async () => {
              Logout();
              await AsyncStorage.removeItem("user_info");
              navigation.reset({ routes: [{ name: "Home" }] });
            }}>
            <Icon
              name="log-out"
              size={20}
              style={{
                marginLeft: "10%",
                marginRight: "2%",
                color: "black",
              }}></Icon>
            <Text style={{ color: "black", fontWeight: "500" }}>SIGN OUT</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </>
  );
}
export default SettingMain;
