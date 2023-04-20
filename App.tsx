import React from 'react'
import Rootnavigation from './src/navigations/Rootnavigation';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function App(): JSX.Element {
  return (
    <>
    <NavigationContainer>
        <Rootnavigation />
      </NavigationContainer>

    
      
   
   </>
  
  );
}

export default App;
