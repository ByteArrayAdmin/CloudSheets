import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from "../screens/Tabscreens/Home/Homescreen";
import Home from "../assets/Images/Home.svg";
import { COLOURS, FONTS } from "../utils/Constant";
import Boldhome from "../assets/Images/Boldhome.svg";
import ClousheetList from "../screens/Tabscreens/Cloudsheet/RecentCloudsheet_List/Index";
import CreateTemplate from "../screens/Tabscreens/Templates/Createtemplate/Index";
import Documenticon from "../assets/Images/document.svg";
import Template from "../assets/Images/Template.svg";
import UserSection from "../screens/Tabscreens/UserTab/UserSection";
import UserCircle from "../assets/Images/usercircle.svg";
import Boldcheetsheet from "../assets/Images/Boldcheatsheet.svg";
import Boldtemplateicon from "../assets/Images/Bloldtemplateicon.svg";
import UpdateCloudsheet from "../screens/Tabscreens/Cloudsheet/Updatecloudsheet";
import TabBarTemplateList from "../screens/Tabscreens/Templates/TabBarTemplateList";
import SubcriptionScreen from "../screens/Tabscreens/UserTab/SubscriptionPlanScreen";
import EditProfile from "../screens/Tabscreens/UserTab/EditProfile";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
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
      <Stack.Screen
        name="TabBarTemplateList"
        component={TabBarTemplateList}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const User = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserSection"
        component={UserSection}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="SubcriptionScreen"
        component={SubcriptionScreen}
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
          // opacity: 0.9,
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
          },
          tabBarActiveTintColor: COLOURS.Skyblue,
          tabBarInactiveTintColor: COLOURS.inActiveTabColor,
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
          },
          tabBarActiveTintColor: COLOURS.Skyblue,
          tabBarInactiveTintColor: COLOURS.inActiveTabColor,
          tabBarLabel: "CloudSheets",
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
          },
          tabBarActiveTintColor: COLOURS.Skyblue,
          tabBarInactiveTintColor: COLOURS.inActiveTabColor,
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
          },
          tabBarActiveTintColor: COLOURS.Skyblue,
          tabBarInactiveTintColor: COLOURS.inActiveTabColor,
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
