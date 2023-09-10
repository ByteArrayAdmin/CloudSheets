import { Amplify, Analytics } from 'aws-amplify';
import { current_UserInfo } from '../API_Manager/index';
import { registerCWErrors, determineChannelType } from "../utils/AWSLog"



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


export const updatePinpointEndpoint = async (data, location) => {

   const channelType = await determineChannelType();
   const data_str = "%%%%%% " + data.name + data.username + data.email + data.mobilenumber + location + channelType;
   
  try {
     
     console.log( data_str );

    // Record the attributes
    if (Analytics && Analytics.updateEndpoint) {

     await Analytics.updateEndpoint({
       address: data.email,
       channelType: channelType,
       attributes: { 
          name: [data.name],
          username: [data.username],
          email: [data.email],
          mobilenumber: [data.mobilenumber],
          customPremium: ["false"],
          customSuspended: ["false"],
          location: [location] // Add location to the attributes
       },    
     });

     await registerCWErrors("Successfully registered PinPoint EndPoint: " + data_str )


   } else {
     await registerCWErrors("Error:  Analytics.updateEndpoint is not available: " + data_str );
   }
  } catch (error) {

     await registerCWErrors( "An error occurred while updating the Pinpoint endpoint:", error?.message  + ": Data : " + data_str );
    
  }
};

   