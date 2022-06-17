import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
// import { transparent } from 'react-native-paper/lib/typescript/styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

///앱 위에서 뜨는 header

const LeftIcon = (props) => {
  //LeftIcon 의 유물르 결정하는 함수
  if (props.isLeft) {
    return (
      <TouchableOpacity
        onPress={() => {
          setTimeout(() => {
            props.goMain ? props.goMain() : props.navigation.goBack();
          });
        }}>
        <View
          style={{
            height: "100%",
            marginLeft: "2%",
            justifyContent: "center",
          }}>
          <Image
            style={{ height: "60%", width: 30 }}
            source={require("../public/goBack.png")}></Image>
        </View>
      </TouchableOpacity>
    );
  } else {
    return <></>;
  }
};

/**
 * PROPS 
 * isLeft
 * navigation
 * goMain
 * title
 * 
 */

const AppHeader = (props) => {
  return (
    <View
      style={{
        height: hp("10%"),
        backgroundColor: "white",
        flexDirection: "row",
        borderBottomColor: "#e9e9e9",
        borderBottomWidth: 1,
        justifyContent: "space-between",
      }}>
      <LeftIcon
        isLeft={props.isLeft}
        navigation={props.navigation}
        goMain={props.goMain}></LeftIcon>
      <View
        style={{ height: "100%", justifyContent: "center", marginLeft: "7%" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#0064ff" }}>
          {props.title}
        </Text>
      </View>
      {
        //setTimeout안에서 사이드바를 열어주지 않으면 중복 오류 발생 가능성 있음.
      }
      <TouchableOpacity
        style={{ justifyContent: "center", marginRight: "3%" }}
        onPress={() => {
          props.navigation.openDrawer();
        }}>
        <View
          style={{
            height: "80%",
            justifyContent: "center",
            borderRadius: 15,
          }}>
          <Image
            source={require("../public/Menubar.png")}
            style={{ width: 40, height: 40 }}></Image>
          {/* <Icon
            name='menu'
            size={50}
            color='#0064ff'
            style={{ borderColor: '#0064ff', borderWidth: 1 }}
          ></Icon> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default AppHeader;
