import { Amplify, Analytics } from 'aws-amplify';
import { current_UserInfo } from '../API_Manager/index';

export const track_Screen = (eventName: string, screenName: string) => {
     current_UserInfo().then((response: any) => {
          let userEmail = ''
          if (response != undefined) {
               userEmail = response.attributes.email
          } else {
               userEmail = 'guestUser'
          }
          Analytics.record({ name: eventName, attributes: { screenName: screenName, userEmail: userEmail }, immediate: true })
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