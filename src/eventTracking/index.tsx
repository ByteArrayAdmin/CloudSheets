import { Amplify, Analytics } from 'aws-amplify';
import { current_UserInfo } from '../API_Manager/index';
Analytics.enable();

export const track_Screen = (eventName: string, screenName: string) => {
     current_UserInfo().then((response: any) => {
          let userEmail = ''
          if (response != undefined) {
               userEmail = response.attributes.email
          } else {
               userEmail = 'guestUser'
          }
          Analytics.record({ name: eventName, attributes: { screenName: screenName, userEmail: userEmail }, immediate: true }).then((response)=>{
               console.log("trackResponse============",response)
          }).catch((error)=>{
               console.log("trackScreenErr============",error)
          })
     }).catch((error) => {
          console.log("CurrUser======", error)
     })
}

export const track_Click_Event = (eventName: string, clickName: string) => {
     current_UserInfo().then((response: any) => {
          let userEmail = ''
          if (response != undefined) {
               userEmail = response.attributes.email
          } else {
               userEmail = 'guestUser'
          }
          Analytics.record({ name: eventName, attributes: { clickName: clickName, userEmail: userEmail }, immediate: true })
     }).catch((error) => {
          console.log("CurrUser======", error)
     })
}

export const track_Success_Event = (eventName: string, actionName: string) => {
     current_UserInfo().then((response: any) => {
          let userEmail = ''
          if (response != undefined) {
               userEmail = response.attributes.email
          } else {
               userEmail = 'guestUser'
          }
          Analytics.record({ name: eventName, attributes: { actionName: actionName, userEmail: userEmail }, immediate: true })
     }).catch((error) => {
          console.log("CurrUser======", error)
     })
}

export const track_Error_Event = (eventName: string, actionName: string) => {
     current_UserInfo().then((response: any) => {
          let userEmail = ''
          if (response != undefined) {
               userEmail = response.attributes.email
          } else {
               userEmail = 'guestUser'
          }
          Analytics.record({ name: eventName, attributes: { actionName: actionName, userEmail: userEmail }, immediate: true })
     }).catch((error) => {
          console.log("CurrUser======", error)
     })
}

export const signOut_Event = () => {
     current_UserInfo().then((response: any) => {
          let userEmail = ''
          if (response != undefined) {
               userEmail = response.attributes.email
          } else {
               userEmail = 'guestUser'
          }
          Analytics.record({ name: "_userauth.sign_out", attributes: { actionName: "userSign_out", userEmail: userEmail }, immediate: true })
     }).catch((error) => {
          console.log("CurrUser======", error)
     })
}

export const signIn_Event = () => {
     current_UserInfo().then((response: any) => {
          let userEmail = ''
          if (response != undefined) {
               userEmail = response.attributes.email
          } else {
               userEmail = 'guestUser'
          }
          Analytics.record({ name: "_userauth.sign_in", attributes: { actionName: "userSign_in", userEmail: userEmail }, immediate: true })
     }).catch((error) => {
          console.log("CurrUser======", error)
     })
}

export const signUp_Event = (email: string, userLocation: string) => {
     current_UserInfo().then((response: any) => {
          let userEmail = ''
          if (response != undefined) {
               userEmail = response.attributes.email
          } else {
               userEmail = 'guestUser'
          }
          Analytics.record({ name: "_userauth.sign_up", attributes: { actionName: "userSign_up", userEmail: email, userLocation: userLocation }, immediate: true })
     }).catch((error) => {
          console.log("CurrUser======", error)
     })
}



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