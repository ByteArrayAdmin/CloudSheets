import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import NewCommonHeader from "../../commonComponents/NewCommonHeader";
import BackButton from "../../commonComponents/Backbutton";
import Folder from "../../assets/Images/folder12.svg";
import labels from "../../utils/ProjectLabels.json";
import InputField from "../../commonComponents/InputField";
import { useForm } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";

const CreatSpreadsheet = () => {
  const { control, handleSubmit } = useForm();
 
  const [value, setValue] = useState(null);
  const Data = [{ id: 1 }];
  const renderItems = () => (
    <View style={styles.container}>
      <View>
        <Text style={styles.columntext}>
          {labels.Creatcloudsheetlabels.ColumnName}
        </Text>
      </View>
      <View style={{width:"100%"}}> 
        <InputField
          name="name"
          control={control}
          placeholder={labels.Creatcloudsheetlabels.PLACEHOLDERTEXT}
          Image={false}
          // rules={{
          //   required: signupLabel.signupcontant.NAME_VALIDATION_MSG,
          // }}
          // placxeholdertextstyle={styles.placeholdertextstyle}
        />
       

        <View>
          <Text>helllo</Text>
        </View>
      </View>
    </View>
  );
  return (
    <>
      <View style={{ flex: 1 }}>
        <NewCommonHeader
          BackButton={<BackButton />}
          Folder={<Folder />}
          heading={labels.Creatcloudsheetlabels.ClassAttendance}
        />
        <FlatList data={Data} renderItem={renderItems} />
      </View>
    </>
  );
};

export default CreatSpreadsheet;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  columntext: {
    paddingTop: 15,
    paddingHorizontal: 22,
  },
});
