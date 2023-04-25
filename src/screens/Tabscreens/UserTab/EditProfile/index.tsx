import React from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
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
import {Styles} from'./style'



const EditProfile = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const onEditPressed = async (data: any) => {
    const { youremail, yourpasswaord } = data;

    navigation.navigate("Tabnavigator");
  };
  return (
    <ScrollView>
    <View style={Styles.container}>
      <NewCommonHeader
        BackButton={<BackButton onPress={() => navigation.goBack()} />}
        heading={labels.EditProfile.Edit_Profile}
        Folder={<EditProfileLogo />}
        DeleteIcon={<DeleteLogo />}
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
          <Text style={Styles.nametext}>{labels.EditProfile.PhoneNumber}</Text>
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
          <Text style={Styles.nametext}>{labels.EditProfile.EmailAddress}</Text>
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
          <Text style={Styles.nametext}>{labels.EditProfile.DateofBirth}</Text>
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
    </ScrollView>
  );
};

export default EditProfile;


