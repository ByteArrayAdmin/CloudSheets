import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import NewCommonHeader from "../../commonComponents/NewCommonHeader";
import BackButton from "../../commonComponents/Backbutton";
import Folder from "../../assets/Images/folder12.svg";
import labels from "../../utils/ProjectLabels.json";
import SpreadsheetCard from "./SpreardsheetCard";
import Addbutton from "../../assets/Images/Add.svg";
import { COLOURS } from "../../utils/Constant";
import Createspreadstyle from "./style";
import Custombutton from "../../commonComponents/Button";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

const CreatSpreadsheet = () => {
  const navigation = useNavigation();
  const [Data, setData] = useState([{ id: 1 }]);
  const { control, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {};

  const AddColoumn = () => {
    const newIndex = Data.length;
    setData((oldArray) => [...Data, { id: newIndex }]);
  };
  const renderItems = ({ index }) => (
    <SpreadsheetCard control={control} index={index} />
  );
  return (
    <>
      <ScrollView>
        <View>
          <NewCommonHeader
            BackButton={<BackButton />}
            Folder={<Folder />}
            heading={labels.Creatcloudsheetlabels.ClassAttendance}
            onPress={navigation.canGoBack()}
          />
          <View>
            <FlatList data={Data} renderItem={renderItems} />
            <View style={Createspreadstyle.buttonview}>
              <TouchableOpacity
                onPress={() => AddColoumn()}
                style={Createspreadstyle.addcoloumbutton}
              >
                <View>
                  <Addbutton />
                </View>
                <View>
                  <Text style={Createspreadstyle.Addcolumnbuttontext}>
                    {labels.Creatcloudsheetlabels.AddNewColumn}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Custombutton
                onPress={handleSubmit(onSubmit)}
                Register={labels.Creatcloudsheetlabels.CreateSpreadsheet}
              />
            </View>

            <View style={Createspreadstyle.Bottomgap}></View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default CreatSpreadsheet;
