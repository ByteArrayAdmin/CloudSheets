import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text, Alert } from "react-native";
import NewCommonHeader from "../../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../../commonComponents/Backbutton";
import { useNavigation, useRoute,CommonActions } from "@react-navigation/native";
// import labels from "../../../../../utils/ProjectLabels.json";
import { COLOURS, FONTS } from "../../../../../utils/Constant";
import Ic_customer from "../../../../../assets/Images/Ic_customer.svg";
import Ic_messenger from "../../../../../assets/Images/Ic_messenger.svg";
import AuthCard from "../../../../../commonComponents/AuthCard";
import InputField from "../../../../../commonComponents/InputField";
import { useForm } from "react-hook-form";
import Mesageicon from "../../../../../assets/Images/Message.svg";
import { emailRegex } from "../../../../../utils/Constant";
import Button from "../../../../../commonComponents/Button";
import {
  customerSupport_form,
  current_UserInfo,
} from "../../../../../API_Manager/index";
import CommonLoader from "../../../../../commonComponents/CommonLoader";
import { Auth } from "aws-amplify";

declare global {
  var labels: any;
}
const Customer_Support_Form = () => {
  var labels = global.labels;
  const navigation = useNavigation();
  const route = useRoute()
  const { control, handleSubmit, reset } = useForm();
  const [emailID, setEmailID] = useState("");
  const [userID, setUserID] = useState("");
  const [loader, setLoader] = useState(false);
  const [isSuspended, setIsSuspended] = useState(route?.params?.suspended);


  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    current_UserInfo()
      .then((response: any) => {
        console.log("currUser======", response);
        setEmailID(response.attributes.email);
        setUserID(response.attributes.sub);
      })
      .catch((error) => {
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        console.log("createIssueErr===========", error);
      });
  };

  const submitCustomerForm = async (data: any) => {
    let obj = {
      userID: userID,
      email: emailID,
      subject: data.subject,
      description: data.description,
    };
    console.log("ticketData======", obj);
    setLoader(true);
    customerSupport_form(obj)
      .then((response) => {
        if (response) {
          setLoader(false);
          reset();
          if(isSuspended){
            signOut()
          }else{
          navigation.goBack();
          }
          
        }
      })
      .catch((error) => {
        setLoader(false);
        if (error.isConnected == false) {
          Alert.alert(labels.checkNetwork.networkError);
        }
        console.log("createTicketErr======", error);
      });
  };

  // ------------ Signout Function ------------
  async function signOut() {
    setLoader(true);
    try {
      await Auth.signOut();
      setLoader(false);
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      setLoader(false);
      console.log("error signing out: ", error);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          heading={labels.SubscriptionScreen.Customer_Support}
          Folder={<Ic_customer />}
          SecondImg={<Ic_messenger />}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View style={styles.maincontainer}> */}
          <AuthCard
            subchildren={
              <View style={styles.cardpadding}>
                <View style={styles.textmargin}>
                  <Text style={styles.headingTextStyle}>
                    {labels.SubscriptionScreen.Email_Address}
                  </Text>
                </View>
                <View style={styles.emailStyle}>
                  <Text>{emailID}</Text>
                </View>
                <View style={styles.subscriptiontextspacing}>
                  <Text style={styles.headingTextStyle}>
                    {labels.SubscriptionScreen.Subject}
                  </Text>
                </View>
                <InputField
                  name="subject"
                  control={control}
                  placeholder={labels.SubscriptionScreen.Enter_Subject}
                  Image={Mesageicon}
                  styles={styles.inputview}
                  rules={{
                    required: labels.SubscriptionScreen.Subject_Required,
                  }}
                />
                <View style={styles.discriptionspacing}>
                  <Text style={styles.headingTextStyle}>
                    {labels.SubscriptionScreen.Discription}
                  </Text>
                </View>
                <InputField
                  name="description"
                  control={control}
                  textAlignVertical={"top"}
                  multiline={true}
                  placeholder={labels.SubscriptionScreen.Write_here}
                  // Image={Mesageicon}
                  styles={styles.descriptionView}
                  rules={{
                    required: labels.SubscriptionScreen.Description_Required,
                  }}
                />
                <View>
                  <Button
                    Register={labels.SubscriptionScreen.submit}
                    onPress={handleSubmit(submitCustomerForm)}
                  />
                </View>
              </View>
            }
          />
          {/* </View> */}
        </ScrollView>
        {loader ? <CommonLoader /> : null}
      </View>
    </>
  );
};

export default Customer_Support_Form;

const styles = StyleSheet.create({
  maincontainer: {
    padding: 15,
    marginTop: 25,
    backgroundColor: COLOURS.white,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: COLOURS.lightgrey,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  inputview: {
    height: 50,
    width: "100%",
    fontFamily: FONTS.inter_regular,
    opacity: 0.6,
  },
  headingTextStyle: {
    fontFamily: FONTS.inter_medium,
    fontSize: 14,
  },
  descriptionView: {
    height: 120,
    width: "100%",
    fontFamily: FONTS.inter_regular,
    textAlignVertical: "top",
    opacity: 0.6,
  },
  container: { flex: 1 },
  cardpadding: {
    paddingVertical: 15,
  },
  emailStyle: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 5,
    backgroundColor: "#F6F8FA",
    borderRadius: 8,
  },
  textmargin: { marginLeft: 20 },
  subscriptiontextspacing: { marginLeft: 20, marginTop: 20 },
  discriptionspacing: { marginLeft: 20, marginTop: 20 },
});
