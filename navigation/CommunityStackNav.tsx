import React, { useEffect, useState } from "react";
import Main from "../src/CommunityScreens/Main";
import Details from "../src/CommunityScreens/Details";
import Write from "../src/CommunityScreens/Write";
import Update from "../src/CommunityScreens/Update";
import { createStackNavigator } from "@react-navigation/stack";
import { CommunityStackNavList } from "../types/NavigationParamsType";
const Stack = createStackNavigator<CommunityStackNavList>();

function CommunityStackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityMain" component={Main}></Stack.Screen>
      <Stack.Screen name="CommunityDetails" component={Details}></Stack.Screen>
      <Stack.Screen name="CommunityWrite" component={Write}></Stack.Screen>
      <Stack.Screen name="CommunityUpdate" component={Update}></Stack.Screen>
    </Stack.Navigator>
  );
}
export default CommunityStackNav;
