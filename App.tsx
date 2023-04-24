
import React from 'react'
import Rootnavigation from './src/navigations/Rootnavigation';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <>
    <GestureHandlerRootView style={{flex:1}}>
    <NavigationContainer>
        <Rootnavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
    

    
      
   
   </>
  
  );
}

export default App;
