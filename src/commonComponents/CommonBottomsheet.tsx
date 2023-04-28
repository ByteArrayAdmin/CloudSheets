import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import BottomSheet, { BottomSheetModal ,BottomSheetBackdrop} from "@gorhom/bottom-sheet";
import { COLOURS } from "../utils/Constant";

const CommonBottomsheet = forwardRef((props: any, ref: any) => {
  const sheetRef = useRef<BottomSheet>(null);
  useImperativeHandle(ref, () => ({
    childFunction1() {
      handlePresentModalPress();
     
    },
  }));

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    if(bottomSheetModalRef.current?.present()){
      bottomSheetModalRef.current?.close();
    }else{
      bottomSheetModalRef.current?.present();
    }
    
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    
    // bottomSheetModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props:any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    // <BottomSheetModalProvider>
       <View>
        {/* <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        /> */}
        <BottomSheetModal
        backdropComponent={renderBackdrop}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </View>
    // </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
export default CommonBottomsheet;
