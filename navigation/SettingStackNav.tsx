import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingMain from "../src/SettingScreens/Main";
import { SettingStackNavList } from "../types/NavigationParamsType";

const Stack = createStackNavigator<SettingStackNavList>();

function SettingStackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingMain" component={SettingMain}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default SettingStackNav;
