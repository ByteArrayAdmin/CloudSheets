import React, { useEffect, useState,useRef,useMemo,useCallback, useImperativeHandle,forwardRef} from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert
} from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";


const CommonBottomsheet = (props:any) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  

  const handlePresentModalPress = useCallback(() => {
    console.log("child function callled")
  //  bottomSheetModalRef.current?.present();
  
  }, []);

  

  

  
  
  return (
    <View>
      <BottomSheetModalProvider>
        <View>
          
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={props.snapPoints}
            onChange={props.handleSheetChanges}
          >
            <View>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
}

export default CommonBottomsheet;
