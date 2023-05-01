import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import NewCommonHeader from "../../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../../commonComponents/Backbutton";
import { useNavigation } from "@react-navigation/native";
import labels from "../../../../../utils/ProjectLabels.json";
import { COLOURS, FONTS } from "../../../../../utils/Constant";
import Ic_customer from "../../../../../assets/Images/Ic_customer.svg";
import Ic_messenger from "../../../../../assets/Images/Ic_messenger.svg";
import AuthCard from "../../../../../commonComponents/AuthCard";
import InputField from "../../../../../commonComponents/InputField";
import { useForm } from "react-hook-form";
import Mesageicon from "../../../../../assets/Images/Message.svg";
import { emailRegex } from "../../../../../utils/Constant";
import Button from "../../../../../commonComponents/Button";
const Customer_Support_Form = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const submitCustomerForm = async (data: any) => {};

  return (
    <>
      <View style={styles.container}>
        <NewCommonHeader
          BackButton={<BackButton onPress={() => navigation.goBack()} />}
          heading={labels.SubscriptionScreen.Customer_Support}
          Folder={<Ic_customer />}
          SecondImg={<Ic_messenger />}
        />
        <ScrollView>
          {/* <View style={styles.maincontainer}> */}
          <AuthCard
            subchildren={
              <View style={styles.cardpadding}>
                <View style={styles.textmargin}>
                  <Text style={styles.headingTextStyle}>
                    {labels.SubscriptionScreen.Email_Address}
                  </Text>
                </View>
                <InputField
                  name="email"
                  control={control}
                  placeholder={labels.SubscriptionScreen.Enter_Email}
                  Image={Mesageicon}
                  styles={styles.inputview}
                  rules={{
                    required: labels.SubscriptionScreen.EMAIL_VALIDATION,
                    pattern: {
                      value: emailRegex,
                      message: "Email is invalid",
                    },
                  }}
                />
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
  container: { backgroundColor: COLOURS.lightBlue, flex: 1 },
  cardpadding: {
    paddingVertical: 15,
  },
  textmargin: { marginLeft: 20 },
  subscriptiontextspacing: { marginLeft: 20, marginTop: 20 },
  discriptionspacing: { marginLeft: 20, marginTop: 20 },
});
