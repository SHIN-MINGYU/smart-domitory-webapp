import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import BottomTabNav from "./navigation/BottomTabNav";
import { login } from "./redux/actions";
import store from "./redux/store";
import CustomDrawer from "./src/Custom/CustomDrawer";
import ASInquery from "./src/MainScreens/ASInquery";
import ASRequest from "./src/MainScreens/ASRequest";
import BusInquery from "./src/MainScreens/BusInquery";
import BusRequest from "./src/MainScreens/BusRequest";
import GymInquery from "./src/MainScreens/GymInquery";
import GymRequest from "./src/MainScreens/GymRequest";
import OutInquery from "./src/MainScreens/OutInquery";
import OutRequest from "./src/MainScreens/OutRequest";
import SignIn from "./src/MainScreens/SignIn";
import SignUp from "./src/MainScreens/SignUp";
import ForgotPassword from "./src/MainScreens/ForgotPassword";
import { DrawerNavList } from "./types/NavigationParamsType";
import SettingPassword from "./src/MainScreens/SettingPassword";

const Drawer = createDrawerNavigator<DrawerNavList>(); // DrawerNavigation Type 정의

const App = () => {
  useEffect((): void => {
    AsyncStorage.getItem("user_info", (err, result): void => {
      //처음 접속했을때 user_info에 user정보가 남아있다면 계속 로그인을 유지시키게하기위해서
      if (result) {
        store.dispatch(login(JSON.parse(result))); //redux의 dispatch함수 사용
      }
    }).catch((err) => console.log(err));
  }, []);

  return (
    <Provider store={store}>
      {
        //redux의 전역변수 나눠주는 container
      }
      <SafeAreaView // iphone 혹은 안드로이드의 goty 디자인에서의 안전한 뷰를 확보하기위해서 사용하는 태그
        style={{ flex: 1, backgroundColor: "red", overflow: "hidden" }}>
        <NavigationContainer>
          <Drawer.Navigator
            backBehavior="history" //남긴 발자취를 기준으로 navigate를 시켜줌
            screenOptions={{
              drawerPosition: "right", //drawer navigation의 위피
              headerShown: false, //custom app header를 사용하기 위해 false로 설정 default : true
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}>
            {
              // 모든 화면이 메인화면에 연동되어 있어서 보이지 않더라도 이동을 위해 남겨둠
            }
            <Drawer.Screen
              name="home"
              options={{
                unmountOnBlur: true, //다른페이지로 이동할떄 안에 데이터가 남아 있지 않도록하기위해서 unmount시켜줌
              }}
              component={BottomTabNav}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="ASRequest"
              component={ASRequest}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="ASInquery"
              component={ASInquery}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="OutRequest"
              component={OutRequest}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="OutInquery"
              component={OutInquery}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="GymRequest"
              component={GymRequest}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="GymInquery"
              component={GymInquery}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="BusRequest"
              component={BusRequest}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="BusInquery"
              component={BusInquery}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="LogOut"
              component={BottomTabNav}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="SignUp"
              component={SignUp}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="SignIn"
              component={SignIn}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="ForgotPassword"
              component={ForgotPassword}></Drawer.Screen>
            <Drawer.Screen
              options={{
                unmountOnBlur: true,
                drawerItemStyle: { display: "none" },
              }}
              name="SettingPassword"
              component={SettingPassword}></Drawer.Screen>
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};
export default App;
