import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { FONTS, COLOURS, emailRegex } from "../../../../utils/Constant";
import EditProfileLogo from "../../../../assets/Images/profile-edit.svg";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import { useNavigation } from "@react-navigation/native";
import labels from "../../../../utils/ProjectLabels.json";
import DeleteLogo from "../../../../assets/Images/delete.svg";
import InputField from "../../../../commonComponents/InputField";
import { useForm } from "react-hook-form";
import CommonButton from "../../../../commonComponents/Button";
import { Styles } from "./style";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import DeletePopup from "../../../../screens/Popups/DeletePopup";

const EditProfile = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const child = useRef();
  const snapPoints = ["35%"];

  const onEditPressed = async (data: any) => {
    const { youremail, yourpasswaord } = data;

    navigation.navigate("Tabnavigator");
  };

  const openDeletePopup = () => {
    child.current.childFunction1();
  };
  return (
    <ScrollView>
      <View style={Styles.container}>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          heading={labels.EditProfile.Edit_Profile}
          Folder={<EditProfileLogo />}
          SecondImg={<DeleteLogo />}
          onpress={openDeletePopup}
        />

        <View style={Styles.Cardcolour}>
          <View style={Styles.lavbelview}>
            <Text style={Styles.nametext}>{labels.EditProfile.Name}</Text>
          </View>
          <InputField
            name="EditName"
            control={control}
            styles={Styles.inputview}
            rules={{
              required: labels.EditProfile.ValidationName,
            }}
          />
          <View style={Styles.lavbelview}>
            <Text style={Styles.nametext}>
              {labels.EditProfile.PhoneNumber}
            </Text>
          </View>
          <InputField
            name="editphonenumber"
            control={control}
            styles={Styles.inputview}
            rules={{
              required: labels.EditProfile.ValidationPhone,
            }}
          />
          <View style={Styles.lavbelview}>
            <Text style={Styles.nametext}>
              {labels.EditProfile.EmailAddress}
            </Text>
          </View>
          <InputField
            name="editemail"
            control={control}
            styles={Styles.inputview}
            rules={{
              required: labels.EditProfile.Validation_Email,
              pattern: {
                value: emailRegex,
                message: "Email is invalid",
              },
            }}
          />
          <View style={Styles.lavbelview}>
            <Text style={Styles.nametext}>
              {labels.EditProfile.DateofBirth}
            </Text>
          </View>
          <InputField
            name="Editphonenumber"
            control={control}
            styles={Styles.inputview}
            rules={{
              required: labels.EditProfile.Validation_Date,
            }}
          />
        </View>
        <TouchableOpacity style={Styles.buttonTop}>
          <CommonButton
            onPress={handleSubmit(onEditPressed)}
            Register={labels.EditProfile.Update_Profile}
          />
        </TouchableOpacity>
      </View>
      <CommonBottomsheet
        ref={child}
        snapPoints={snapPoints}
        children={
          <DeletePopup
            Textone={labels.DeleteAccountpopups.TextFirst}
            Texttwo={labels.DeleteAccountpopups.TextSecond}
            ButtonOnetext={labels.DeleteAccountpopups.Cancel}
            ButtonTwotext={labels.DeleteAccountpopups.Delete}
          />
        }
      />
    </ScrollView>
  );
};

export default EditProfile;
