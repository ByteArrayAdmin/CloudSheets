import React,{useEffect,useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../screens/Auth/signup";
import Login from "../screens/Auth/Login";
import ForgotPassword from "../screens/Auth/Forgotpassword";
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
import RateUs from "../screens/Tabscreens/UserTab/Rateus";
import ResetPassword from '../screens/Auth/Resetpassword/index';

import PrivacyScreen from '../screens/Tabscreens/UserTab/UserSection/Privacy_Policy/index';
import Terms_Conditions_Screen from '../screens/Tabscreens/UserTab/UserSection/Terms_Conditions/index';
import Help_Screen from '../screens/Tabscreens/UserTab/UserSection/Help/index';
import Customer_Support_Screen from '../screens/Tabscreens/UserTab/UserSection/Customer_Support/index';
import Customer_Support_Form from '../screens/Tabscreens/UserTab/UserSection/Customer_Support_Form/index';
import Faq_Screen from '../screens/Tabscreens/UserTab/UserSection/FAQ/index';
import OtpScreen from '../screens/Auth/OTP/index';
import ExistingTemplateList from '../screens/Tabscreens/Cloudsheet/ExistingTemplates/index';
import { Auth } from 'aws-amplify';

const Stack = createNativeStackNavigator();

const Rootnavigation = () => {
  console.log("globlogin=======",global.session)
  
  return (
    <Stack.Navigator initialRouteName={global.session == true?'Tabnavigator':'BoardingScreen'} >
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
        name="ResetPassword"
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
        name="ExistingTemplateList"
        component={ExistingTemplateList}
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
        name="PrivacyScreen"
        component={PrivacyScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Terms_Conditions_Screen"
        component={Terms_Conditions_Screen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Help_Screen"
        component={Help_Screen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Customer_Support_Screen"
        component={Customer_Support_Screen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Customer_Support_Form"
        component={Customer_Support_Form}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Faq_Screen"
        component={Faq_Screen}
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
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
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
