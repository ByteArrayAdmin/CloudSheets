
import React, { useState } from 'react';


import awsconfig from "../aws-exports";


import { Amplify, Auth, API } from "aws-amplify";
import AWS from 'aws-sdk';

Amplify.configure(awsconfig);


// Hack to Report Errors
export const registerCWErrors = async ( errorString ) => {

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
  
  const customMessage = ""; // Your custom message
    
  const combinedError = `Detailed Message: ${errorString}`;
  
  console.log("", combinedError );
  
    // Initialize the AWS Lambda SDK
    const lambda = new AWS.Lambda({
      region: 'us-east-1', // Change to your region
      credentials: AWS.config.credentials, // should be set by Cognito Identity Pool
    });
  
    // Prepare payload
    const payload = {
      email: combinedError, // OPTIONAL
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