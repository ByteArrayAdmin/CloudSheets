import React, { useEffect, useState } from "react";
import Rootnavigation from "./src/navigations/Rootnavigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { current_UserInfo } from "./src/API_Manager/index";
import { Amplify, Auth,API } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { navigationRef } from "./src/navigations/navigationReference";
import { getAppConstants } from "./src/API_Manager/index";
import labels from "./src/utils/ProjectLabels.json";
import {listAppConstants} from './src/graphql/queries'
Amplify.configure(awsconfig);
Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'listAppConstants',
        endpoint: 'https://nxfhla5oejdz7pvi7nuzhi4n3e.appsync-api.us-east-1.amazonaws.com/graphql',
        apiKey: 'da2-rlimkghtengcziv3r4pxdajkqa',
      },
    ],
  },
});

function App(): JSX.Element {
  const [isLogIn, setIsLogIn] = useState(false);
  global.labels
  useEffect(() => {
    getCurrentUser();
    getConstants();
  }, []);

  const getConstants = async()=>{
    try {
      const response = await API.graphql({
        query: listAppConstants,
        variables: {},
        authMode: 'API_KEY',
      });
      // console.log('constantsResp========', response);
      let parsedLabel = JSON.parse(response.data.listAppConstants.items[0].appLabels)
      if(parsedLabel){
        global.labels = parsedLabel
      }else{
        global.labels = labels
      }
      
      console.log("globalconstants=======",global.labels)
      // Handle the retrieved data
    } catch (error) {
      global.labels = labels
      console.log('ErrorConstants====:', error);
      // Handle the error
    }
    
  };

  const getCurrentUser = () => {
    current_UserInfo()
      .then((response) => {
        console.log("currentUser======", response);
        if (response) {
          console.log("currentUserTrue========");
          global.session = true;
        } else {
          global.session = false;
        }
        setIsLogIn(true);
      })
      .catch((error) => {
        console.log("currentUserErr=======", error);
      });
  };

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer independent={true} ref={navigationRef}>
          <BottomSheetModalProvider>
            {isLogIn ? <Rootnavigation  /> : null}
          </BottomSheetModalProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
}

export default App;
