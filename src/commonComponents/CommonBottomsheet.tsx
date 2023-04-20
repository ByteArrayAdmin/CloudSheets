import React, { useEffect, useState,useRef,useMemo,useCallback} from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";


const CommonBottomsheet = (props:any) => {
    const snapPoints = useMemo(() => ["50%"], []);

    const handleSnapPress = useCallback((index:any) => {
       props.sheetRef.current?.snapToIndex(0);
      }, []);
  return (
    <View>
       <BottomSheet
        index={0}
        ref={props.sheetRef}
        snapPoints={snapPoints}
        onChange={handleSnapPress}
      >
        <BottomSheetView>
          <Text>Awesome </Text>
        </BottomSheetView>
      </BottomSheet>
      </View>
  )
}

export default CommonBottomsheet
