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
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { COLOURS } from "../utils/Constant";

const CommonBottomsheet = forwardRef((props: any, ref: any) => {
  const sheetRef = useRef<BottomSheet>(null);
  useImperativeHandle(ref, () => ({
    childFunction1() {
      handleSnapPress(0);
      handleClosePress();
    },
  }));

  // variables
  const snapPoints = useMemo(() => ["25%%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index: any) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index: any) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  useEffect(() => {
    sheetRef.current?.close();
  }, []);
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["50%", "80%"]}
        onChange={handleSheetChange}
        enablePanDownToClose={true}
        index={-1}
      >
        <BottomSheetView>
          <Text>Awesome 🔥</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    flex: 1,
  },
});
export default CommonBottomsheet;
