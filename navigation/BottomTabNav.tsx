import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import Main from "../src/MainScreens/Main";
import CommunityStackNav from "./CommunityStackNav";
import SettingStackNav from "./SettingStackNav";
import { BottomStackNavList } from "../types/NavigationParamsType";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerToBottom } from "../types/PropsBetweenNav.js";
import I18n from "../i18n/index.js";
import axios from "axios";

const Tab = createBottomTabNavigator<BottomStackNavList>();

const BottomTabNav = (props: DrawerToBottom) => {
  const [clickIcon, setClickIcon] = useState("Home");
  return (
    //BOTTOM TAB NAVIGATION
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        listeners={{
          focus: () => {
            setClickIcon("Home");
          },
        }}
        name={"Home"}
        component={Main}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Icon
              name="home"
              size={30}
              color={clickIcon === "Home" ? "#0064ff" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        listeners={{
          focus: () => {
            setClickIcon("Community");
          },
        }}
        name={"Community"}
        component={CommunityStackNav}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Icon
              name="blackboard"
              size={30}
              color={clickIcon === "Community" ? "#0064ff" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        listeners={{
          focus: () => {
            setClickIcon("Setting");
          },
        }}
        name={"Setting"}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Icon
              name="grid"
              size={30}
              color={clickIcon === "Setting" ? "#0064ff" : "gray"}
            />
          ),
        }}
        component={SettingStackNav}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNav;
