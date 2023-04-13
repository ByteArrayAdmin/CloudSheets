import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../screens/signup';
import Login from '../screens/Login';
import ForgotPassword from '../screens/Forgotpassword';
import ResetPassword from '../screens/Resetpassword';
import BoardingScreen from '../screens/BoardingScreen/Index';
import {Tabnavigator} from './Tabnavigator';

const Stack = createNativeStackNavigator();

const Rootnavigation = () => {
  return (
    <Stack.Navigator>
     
      <Stack.Screen
        name="BoardingScreen"
        component={BoardingScreen}
        options={{headerShown: false, gestureEnabled: false, animation: 'fade'}}
      />
      <Stack.Screen
        name="Signupscreen"
        component={Signup}
        options={{headerShown: false, gestureEnabled: false, animation: 'fade'}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false, gestureEnabled: false, animation: 'fade'}}
      />
      <Stack.Screen
        name="forgetpassword"
        component={ForgotPassword}
        options={{headerShown: false, gestureEnabled: false, animation: 'fade'}}
      />
      <Stack.Screen
        name="resetpassword"
        component={ResetPassword}
        options={{headerShown: false, gestureEnabled: false, animation: 'fade'}}
      />
       <Stack.Screen
        name="Tabnavigator"
        component={Tabnavigator}
        options={{headerShown: false, gestureEnabled: false, animation: 'fade'}}
      />
    </Stack.Navigator>
  );
};
export default Rootnavigation;
