
import React, { useEffect, useState } from 'react'
import Rootnavigation from './src/navigations/Rootnavigation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Auth } from 'aws-amplify';

function App(): JSX.Element {
  const [isLogIn, setIsLogIn] = useState(false)

  useEffect(() => {
    Auth.currentUserInfo().then((response) => {
      console.log("currentUser======", response)
      if (response) {
        console.log("yaha aa raha hai========")
        global.session = true
      } else {
        global.session = false
      }
      setIsLogIn(true)
    }).catch((error) => {
      console.log("currentUserErr=======", error)
    })
  }, [])

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <BottomSheetModalProvider>
            {isLogIn?<Rootnavigation />:null}
          </BottomSheetModalProvider>
        </NavigationContainer>
      </GestureHandlerRootView>





    </>

  );
}

export default App;
