import React, {
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";

const CommonBottomsheet = forwardRef((props: any, ref: any) => {
  const { dismiss, dismissAll } = useBottomSheetModal();
  const sheetRef = useRef<BottomSheet>(null);
  useImperativeHandle(ref, () => ({
    childFunction1() {
      handlePresentModalPress();
    },
    childFunction2() {
      CloseModel();
    },
  }));

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => props.snapPoints, []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const CloseModel = () => {
    dismiss();
  };
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
      onDismiss={props.onBackdropPress}
    >
      {props.children ? <View>{props.children}</View> : null}
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
