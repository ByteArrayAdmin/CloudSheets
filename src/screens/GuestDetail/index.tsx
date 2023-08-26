import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StyleSheet } from "react-native";
import { COLOURS, FONTS } from "../../utils/Constant";

import awsconfig from "../../aws-exports";


import { Amplify, Auth, API } from "aws-amplify";
import AWS from 'aws-sdk';

Amplify.configure(awsconfig);


const GuestDetail = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const isValidEmail = (email) => {
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegEx.test(email);
  };
  

  const handleContinue = async () => {
    if (email) {
      const isEmailValid = checkEmailFormat();  // Store the result in a variable
      console.log("Is email valid? ", isEmailValid);  // Explicitly log the result
      if (isEmailValid) {
        console.log("$$$ Email format valid; navigating to Login");
        await registerEmail();
        navigation.navigate("Login");
      }
    } else {
      Alert.alert("Hold up! We need your email first.");
    }
  };
  

  const handleSkip = () => {
    registerPromotionSkip();
    navigation.navigate("Login");
  };

  const checkEmailFormat = () => {
    if (isValidEmail(email)) {
      // Proceed with your logic
      console.log("$$$$$Email Format Valid");
      return true;
    } else {
      Alert.alert('Please enter a valid email address');
      return false;
    }
  };



  const registerEmail = async () => {

    //Amplify.configure(awsconfig);
    /*Auth.currentCredentials()
  .then(d => console.log('data: ', d))
  .catch(e => console.log('error: ', e));*/

  const credentials = await Auth.currentCredentials();
  
  AWS.config.update({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
    region: 'us-east-1'  // your region
  })
  

    console.log("Lambda called for Email:", email);
  
    // Initialize the AWS Lambda SDK
    const lambda = new AWS.Lambda({
      region: 'us-east-1', // Change to your region
      credentials: AWS.config.credentials, // should be set by Cognito Identity Pool
    });
  
    // Prepare payload
    const payload = {
      email: email, // OPTIONAL
    };
  
    // Prepare Lambda params
    const lambdaParams = {
      FunctionName: 'registerCloudSheetPromotionEmail', // your Lambda function name
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(payload),
    };
  
    try {
      const result = await lambda.invoke(lambdaParams).promise();
      console.log("Lambda invocation result:", result);
      
      if (result.StatusCode === 200) {
        console.log("Success", JSON.parse(result.Payload));
      } else {
        console.log("Error Scenario");
      }
    } catch (error) {
      console.log("Error invoking Lambda", error);
    }
  };
  


  const registerPromotionSkip = async () => {

    //Amplify.configure(awsconfig);
    /*Auth.currentCredentials()
  .then(d => console.log('data: ', d))
  .catch(e => console.log('error: ', e));*/

  const credentials = await Auth.currentCredentials();
  
  AWS.config.update({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
    region: 'us-east-1'  // your region
  })
  

    console.log("Lambda called for Skipping Promition Email");
  
    // Initialize the AWS Lambda SDK
    const lambda = new AWS.Lambda({
      region: 'us-east-1', // Change to your region
      credentials: AWS.config.credentials, // should be set by Cognito Identity Pool
    });
  
    // Prepare payload
    const payload = {
      email: "$$$Skipping Promotion$$$", // OPTIONAL
    };
  
    // Prepare Lambda params
    const lambdaParams = {
      FunctionName: 'registerCloudSheetPromotionEmail', // your Lambda function name
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(payload),
    };
  
    try {
      const result = await lambda.invoke(lambdaParams).promise();
      console.log("Lambda invocation result:", result);
      
      if (result.StatusCode === 200) {
        console.log("Success", JSON.parse(result.Payload));
      } else {
        console.log("Error Scenario");
      }
    } catch (error) {
      console.log("Error invoking Lambda", error);
    }
  };



  return (
        <View style={Homestyle.container}>
        <View style={Homestyle.logoview}>
            <Text style={Homestyle.clousheetstext}>Howdy, Stranger!</Text>
            <Text style={Homestyle.sheetstext}>Wanna snag a $5 Amazon Gift Card? Register and craft your first CloudSheet to get your digital treat. Just drop your email below to get started!</Text>
        </View>
        
        <TextInput
            style={styles.input}
            placeholder="Your fancy email"
            onChangeText={setEmail}
            value={email}
            //onBlur={registerEmail}
            keyboardType={"email-address"}
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={Homestyle.buttonText}>Proceed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={Homestyle.buttonText}>Maybe later</Text>
        </TouchableOpacity>
        </View>




  );
};

const styles = {
    inputView: {
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: '#78909C',
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
    borderRadius: 5,
    width: '80%',
    color: '#000',
    backgroundColor: '#ECEFF1',
    alignSelf: 'center', // Added for center alignment
    width: '80%', // Added for controlling width
  },
  button: {
    backgroundColor: '#45AAB8', // New appealing green color
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  skipButton: {
    backgroundColor: '#FF5733', // New appealing orange color
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignSelf: 'center',
  },
};

export const Homestyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.Skyblue,
    justifyContent: 'center', // Added for center alignment
    paddingHorizontal: 20, // Added for padding
  },
  logoview: {
    alignItems: "center",
    marginBottom: 30, // Added for spacing
  },
  clousheetstext: {
    color: COLOURS.white,
    //fontFamily: FONTS.manrope_bold,
    fontFamily: FONTS.manrope_bold_italic,
    fontSize: 24, // Reduced size
    fontStyle: 'italic', // Added italics
    textAlign: 'center', 
  },
  sheetstext: {
    color: COLOURS.white,
    fontFamily: FONTS.manrope_bold_italic,
    //fontFamily: FONTS.manrope_medium,
    fontSize: 18, // Reduced size
    fontStyle: 'italic', // Added italics
    textAlign: 'center', 
  },
  // Other styles remain the same

  buttonText: {
    textAlign: 'center', // Center align the text within the buttons
    fontStyle: 'italic', // Added italics

    // ... existing styles ...
  },
});

export default GuestDetail;

