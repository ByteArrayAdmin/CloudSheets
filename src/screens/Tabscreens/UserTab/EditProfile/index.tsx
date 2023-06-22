import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
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
import { current_UserInfo, updateCurrentAuth, updateUserDetail, get_user_from_table } from '../../../../API_Manager/index';
import CommonLoader from '../../../../commonComponents/CommonLoader';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import codegenNativeCommands from "react-native/Libraries/Utilities/codegenNativeCommands";
import { track_Screen,track_Click_Event,track_Success_Event,track_Error_Event } from '../../../../eventTracking/index';
import {eventName,screenName,clickName,successActionName,errorActionName} from '../../../../utils/Constant';

const EditProfile = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, register, setValue } = useForm();
  const child = useRef();
  const [userDetail, setUserDetail] = useState({})
  const [loader, setLoader] = useState(false)
  const [userDetailTable, setUserDetailTable] = useState({})
  const [userName, setUserName] = useState("")
  const snapPoints = ["35%"];

  // ---------- Initial Rendering ------------
  useEffect(() => {
    getCurrentUser()
    track_Screen(eventName.TRACK_SCREEN,screenName.PROFILE_SCREEN)
  }, [])

  // ---------- Get Current User --------------
  const getCurrentUser = () => {
    setLoader(true)
    current_UserInfo().then((response: any) => {
      console.log("getuserResp======", response)
      setLoader(false)
      setUserDetail(response.attributes)
      setUserName(response.username)
      register("EditName")
      register("editemail")
      setValue("EditName", response.attributes.name)
      setValue("editemail", response.attributes.email)
      get_User_from_Table(response.attributes.sub)
    }).catch((error) => {
      setLoader(false)
      console.log("userErr========", error)
    })
  }

  // ----------- getUser from UserTable ---------
  const get_User_from_Table = (userId: any) => {
    get_user_from_table(userId).then((response: any) => {
      console.log("userDetailFromTable======", response)
      setUserDetailTable(response.data.getUser)
    }).catch((error) => {
      console.log("getUserErr=======", error)
    })
  }

  // ------------ Update userDetail -----------
  const onEditPressed = async (data: any) => {
    track_Click_Event(eventName.TRACK_CLICK,clickName.CLICK_ON_UPDATE_PROFILE)
    console.log("formData=======", data)
    let Cog_Obj = {
      name: data.EditName,
      email: data.editemail
    }
    setLoader(true)
    updateCurrentAuth(Cog_Obj).then((response: any) => {
      console.log("updateResp=========", response)
      let user_obj = {
        id: response.detail.attributes.sub,
        name: data.EditName,
        email: data.editemail,
        _version: userDetailTable._version
      }
      if (response.status == 'SUCCESS') {

        updateUserDetail(user_obj).then((response: any) => {
          console.log("updateuser===", response)
          console.log("oldEmail====", data.editemail)
          console.log("newEmail=====", userDetail.email)
          if (data.editemail != userDetail.email) {
            navigation.navigate("OtpScreen", { isFrom: "Profile", username: userName })
          }
          track_Success_Event(eventName.TRACK_SUCCESS_ACTION,successActionName.UPDATE_PROFILE_SUCCESSFULLY)
          setLoader(false)
          navigation.goBack()
        }).then((error) => {
          track_Error_Event(eventName.TRACK_ERROR_ACTION, errorActionName.UPDATE_PROFILE_ERROR)
          setLoader(false)
          console.log("updateUserErr=======", error)
        })
      }
    }).catch((error) => {
      track_Error_Event(eventName.TRACK_ERROR_ACTION, errorActionName.UPDATE_PROFILE_ERROR)
      setLoader(false)
      console.log("updateCurrAuth=======", error)
    })
  };

  const openDeletePopup = () => {
    child.current.childFunction1();
  };
  return (
    <>
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
            {/* <View style={Styles.lavbelview}>
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
          /> */}
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
            {/* <View style={Styles.lavbelview}>
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
          /> */}
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
      {loader ? <CommonLoader /> : null}
    </>

  );
};

export default EditProfile;
