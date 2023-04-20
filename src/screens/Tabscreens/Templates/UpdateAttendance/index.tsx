import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import labels from "../../../../utils/ProjectLabels.json";
import Document from "../../../../assets/Images/documentdark.svg";
import NewInputField from "../../../../commonComponents/NewInputfield";
import { useForm } from "react-hook-form";
import CommonDatepicker from "../../../../commonComponents/CommonDatepicker";
import Calenderlogo from "../../../../assets/Images/calendar.svg";
import Scanimage from "../../../../assets/Images/Scan.svg";
import { Styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SmallButton from "../../../../commonComponents/SmallButton";
import LightSmallButton from "../../../../commonComponents/LightSmallbutton";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const Updateattendance = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const [open, setopen] = useState(false);
  const [defaultdate, setdefaultdate] = useState(new Date());
  const [date, setdate] = useState("");
  const [index, setindex] = useState("");
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  // callbacks
  const handleSnapPress = useCallback((index) => {
    console.log("my bottomindeex======>", index);
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const onSubmitPressed = async (data: any) => {
    const { date } = data;
    navigation.navigate("Attendancelist");
  };

  const toggle = (value: boolean, value2: any) => {
    setdate(value2.toDateString());
    if (value == false) {
      setopen(false);
    }
  };

  useEffect(() => {}, [open]);
  return (
    <KeyboardAwareScrollView>
      <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
      <Button title="Close" onPress={() => handleClosePress()} />
      <View style={Styles.container}>
        <View>
          <NewCommonHeader
            BackButton={<BackButton onPress={() => navigation.goBack()} />}
            Folder={<Document />}
            heading={labels.Rowdetailsform.headerlabel}
            onPress={navigation.canGoBack()}
          />
        </View>

        <View style={Styles.sucontainer}>
          <View style={Styles.formcontainer}>
            <View>
              <Text style={Styles.nametext}>{labels.Rowdetailsform.Name}</Text>
            </View>
            <View>
              <NewInputField
                name="updateform"
                control={control}
                placeholder={labels.Rowdetailsform.Name}
                rules={{
                  required: labels.Rowdetailsform.valodationmessage,
                }}
                styles={Styles.inputview}
              />
            </View>
            <View>
              <Text style={Styles.Attendancetext}>
                {labels.Rowdetailsform.Attendance_Date}
              </Text>
            </View>
            <TouchableOpacity
              style={Styles.datepickerview}
              onPress={() => setopen(true)}
            >
              <View>
                <Text style={Styles.enterdate}>
                  {date ? date : labels.Rowdetailsform.PlaceholderEnterDate}
                </Text>
              </View>
              <View style={Styles.calenderview}></View>
              <View style={Styles.calenderlogview}>
                <Calenderlogo />
              </View>
            </TouchableOpacity>
            <CommonDatepicker
              open={open}
              name={"updatedate"}
              control={control}
              toggle={toggle}
              defaultdate={defaultdate}
            />
            <View>
              <Text style={Styles.presenttextview}>
                {labels.Rowdetailsform.Present}
              </Text>
            </View>
            <View>
              <NewInputField
                name="updatepresent"
                control={control}
                placeholder={labels.Rowdetailsform.PlaceholderPresent}
                rules={{
                  required: labels.Rowdetailsform.valodationmessage,
                }}
                styles={Styles.inputview}
                Scanimage={<Scanimage />}
              />
            </View>
            <View>
              <Text style={Styles.presenttextview}>
                {labels.Rowdetailsform.Samples}
              </Text>
            </View>
            <View>
              <NewInputField
                name="updatesample"
                control={control}
                placeholder={labels.Rowdetailsform.placeholderEnterSamples}
                rules={{
                  required: labels.Rowdetailsform.valodationmessage,
                }}
                styles={Styles.inputview}
              />
            </View>
          </View>
        </View>
        <View style={Styles.buttonview}>
          <TouchableOpacity>
            <LightSmallButton buttontext={labels.updateRowdetaiform.Cancel} />
          </TouchableOpacity>
          <View style={Styles.justgap}></View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ClousheetTab")}
          >
            <SmallButton buttontext={labels.updateRowdetaiform.Update} />
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetView>
          <Text>Awesome 🔥</Text>
        </BottomSheetView>
      </BottomSheet>
      {/* <CommonBottomsheet 
      sheetRef={sheetRef}
      onChange={handleSheetChange}/> */}
    </KeyboardAwareScrollView>
  );
};

export default Updateattendance;
