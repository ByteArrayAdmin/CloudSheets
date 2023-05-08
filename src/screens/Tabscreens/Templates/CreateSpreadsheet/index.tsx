import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import BackButton from "../../../../commonComponents/Backbutton";
import Folder from "../../../../assets/Images/folder12.svg";
import labels from "../../../../utils/ProjectLabels.json";
import SpreadsheetCard from "./SpreardsheetCard";
import Addbutton from "../../../../assets/Images/Add.svg";
import Createspreadstyle from "./style";
import Custombutton from "../../../../commonComponents/Button";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";

const CreatSpreadsheet = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const [Data, setData] = useState([{ id: 1 }]);
  const [templateName, setTemplateName] = useState(route?.params?.templateName)
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    console.log("templateName=======", route.params.templateName)
  }, [])

  const onSubmit = async (data: any) => {
    console.log("ColumnArray=======", data)
    const pairs = Object.entries(data);

    const objectsWithPairs = pairs.reduce((result, [key, value], index) => {
      if (index % 2 === 0) {
        // Create a new object with pairs of keys and values
        result.push({ [key]: value });
      } else {
        // Add the value to the previous object
        result[result.length - 1][key] = value;
      }
      return result;
    }, []);

    console.log("updatedColumnArray=======",objectsWithPairs);

    const newArray = objectsWithPairs.map(obj => {
      const keys = Object.keys(obj); // Get the keys of the object
      const newKeys = keys.map(key => { // Map over the keys array and modify the keys
        return key.slice(0, key.lastIndexOf(" ")); // Remove the last word from the key
      });
      const newObj = {}; // Create a new object
      keys.forEach((key, i) => { // Iterate over the keys of the original object
        newObj[newKeys[i]] = obj[key]; // Assign the modified key and value to the new object
      });

      
      return newObj; // Return the modified object
    });
    console.log("updatedArr==========",newArray)

    navigation.navigate("AddrowClassattendance",{columns:newArray, templateName:templateName});
  };

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
            BackButton={<BackButton onPress={() => navigation.goBack()} />}
            Folder={<Folder />}
            heading={templateName}
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
