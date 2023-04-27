import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
  Children,
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
import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { COLOURS } from "../utils/Constant";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CommonBottomsheet = forwardRef((props: any, ref: any) => {
  const { dismiss, dismissAll } = useBottomSheetModal();
  const sheetRef = useRef<BottomSheet>(null);
  useImperativeHandle(ref, () => ({
    childFunction1() {
      handlePresentModalPress();
    },
    childFunction2(){
      CloseModel()
    }
  }));

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => props.snapPoints, []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, []);
  const CloseModel =()=>{
    dismiss()
  }
  const handleSheetChanges = useCallback((index: number) => {}, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enableDismissOnClose={true}
      >
        {props.children ? <View>{props.children}</View>:null}
      </BottomSheetModal>
    
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
export default CommonBottomsheet;
