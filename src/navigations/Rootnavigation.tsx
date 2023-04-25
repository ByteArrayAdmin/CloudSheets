import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../screens/Auth/signup";
import Login from "../screens/Auth/Login";
import ForgotPassword from "../screens/Auth/Forgotpassword";
import ResetPassword from "../screens/Auth/Resetpassword";
import BoardingScreen from "../screens/BoardingScreen/Index";
import { Tabnavigator } from "./Tabnavigator";
import CreatSpreadsheet from "../../src/screens/Tabscreens/Templates/CreateSpreadsheet";
import AddrowClassattendance from "../screens/Tabscreens/Templates/AddrowClassattendance";
import RowdetailForm from "../screens/Tabscreens/Templates/RowDetailForm";
import Attendancelist from "../screens/Tabscreens/Templates/AttendanceList";
import Updateattendance from "../screens/Tabscreens/Templates/UpdateAttendance";
import TemplateList from "../screens/Tabscreens/Templates/TemplateList";
import ExpensesList from "../screens/Tabscreens/Templates/ExpensesList";
import EditProfile from "../screens/Tabscreens/UserTab/EditProfile";
import RateUs from "../screens/Tabscreens/UserTab/Rateus"

const Stack = createNativeStackNavigator();

const Rootnavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BoardingScreen"
        component={BoardingScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Signupscreen"
        component={Signup}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="forgetpassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="resetpassword"
        component={ResetPassword}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Tabnavigator"
        component={Tabnavigator}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="CreatSpreadsheet"
        component={CreatSpreadsheet}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="AddrowClassattendance"
        component={AddrowClassattendance}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="RowdetailForm"
        component={RowdetailForm}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Attendancelist"
        component={Attendancelist}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Updateattendance"
        component={Updateattendance}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="TemplateList"
        component={TemplateList}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="ExpensesList"
        component={ExpensesList}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
       <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
       <Stack.Screen
        name="RateUs"
        component={RateUs}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  );
};
export default Rootnavigation;
