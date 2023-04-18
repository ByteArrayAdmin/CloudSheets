import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from "../screens/Tabscreens/Home/Homescreen";
import Home from "../assets/Images/Home.svg";
import { FONTS } from "../utils/Constant";
import React from "react";
import Boldhome from "../assets/Images/Boldhome.svg";
import ClousheetList from "../screens/Tabscreens/Cloudsheet/Index";
import CreateTemplate from "../..//src/screens/Tabscreens/Templates/Index";
import Documenticon from "../assets/Images/document.svg";
import Template from "../assets/Images/Tempate.svg";
import UserDetails from "../screens/Tabscreens/UserTab/User";
import UserCircle from "../assets/Images/usercircle.svg";
import Boldcheetsheet from "../assets/Images/Boldcheatsheet.svg";
import Boldtemplateicon from "../assets/Images/Bloldtemplateicon";
import UpdateCloudsheet from "../screens/Tabscreens/Cloudsheet/Updatecloudsheet";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DashBoardTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Homescreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const CloudsheetList = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClousheetList"
        component={ClousheetList}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="UpdateCloudsheet"
        component={UpdateCloudsheet}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const Templates = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateTemplate"
        component={CreateTemplate}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const User = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="userdetails"
        component={UserDetails}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export const Tabnavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="DashBoardTab"
      screenOptions={{
        lazy: true,
        tabBarStyle: {
          position: "absolute",
          opacity: 0.9,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Tab.Screen
        name="DashBoardTab"
        component={DashBoardTab}
        options={{
          tabBarLabelStyle: {
            fontFamily: FONTS.inter_medium,
            fontSize: 10,
            color: "#0061FF",
          },
          tabBarActiveTintColor: "#0061FF",
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return focused ? <Boldhome /> : <Home />;
          },
        }}
      />

      <Tab.Screen
        name="ClousheetTab"
        component={CloudsheetList}
        options={{
          tabBarLabelStyle: {
            fontFamily: FONTS.inter_medium,
            fontSize: 10,
            color: "#0061FF",
          },
          tabBarActiveTintColor: "#0061FF",
          tabBarLabel: "Cloudsheet",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return focused ? <Boldcheetsheet /> : <Documenticon />;
          },
        }}
      />
      <Tab.Screen
        name="TemplatesTab"
        component={Templates}
        options={{
          tabBarLabelStyle: {
            fontFamily: FONTS.inter_medium,
            fontSize: 10,
            color: "#0061FF",
          },
          tabBarActiveTintColor: "#0061FF",
          tabBarLabel: "Templates",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return focused ? <Boldtemplateicon /> : <Template />;
          },
        }}
      />
      <Tab.Screen
        name="UserTab"
        component={User}
        options={{
          tabBarLabelStyle: {
            fontFamily: FONTS.inter_medium,
            fontSize: 10,
            color: "#0061FF",
          },
          tabBarActiveTintColor: "#0061FF",
          tabBarLabel: "User",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return focused ? <UserCircle /> : <UserCircle />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
