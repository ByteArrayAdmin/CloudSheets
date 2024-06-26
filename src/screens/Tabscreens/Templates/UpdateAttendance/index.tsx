import React, { useEffect, useState, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
// import labels from "../../../../utils/ProjectLabels.json";
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
import Deleteicon from "../../../../assets/Images/delete.svg";
import DeletePopuop from "../../../Popups/DeletePopup/index";
declare global {
  var labels: any;
}
const Updateattendance = () => {
  var labels = global.labels;
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const [open, setopen] = useState(false);
  const [open1, setopen1] = useState(false);
  const [defaultdate, setdefaultdate] = useState(new Date());
  const [date, setdate] = useState("");
  const [index, setindex] = useState("");
  const childRef = useRef(null);

  const snapPoints = ["30", "50%"];

  const OpenPopup = () => {
    childRef.current.childFunction1();
  };

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
    <View style={Styles.container}>
      <View>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          Folder={<Document />}
          heading={labels.Rowdetailsform.headerlabel}
          onPress={navigation.canGoBack()}
          SecondImg={<Deleteicon />}
          onpress={OpenPopup}
        />
      </View>
      <KeyboardAwareScrollView>
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
            <TouchableOpacity style={Styles.datepickerview}>
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
          <TouchableOpacity onPress={() => setopen1(!open1)}>
            <LightSmallButton buttontext={labels.updateRowdetaiform.Cancel} />
          </TouchableOpacity>
          <View style={Styles.justgap}></View>
          <SmallButton
            buttontext={labels.updateRowdetaiform.Update}
            onPress={() => navigation.navigate("ClousheetTab")}
          />
        </View>
        <View style={Styles.bottomview}></View>
      </KeyboardAwareScrollView>
      <CommonBottomsheet
        ref={childRef}
        snapPoints={snapPoints}
        children={
          <DeletePopuop
            Textone={labels.Deletpopup.Text}
            Texttwo={labels.Deletpopup.Text2}
            ButtonOnetext={labels.Deletpopup.Cancel}
            ButtonTwotext={labels.DeleteAccountpopups.Delete}
          />
        }
      />
    </View>
  );
};

export default Updateattendance;
