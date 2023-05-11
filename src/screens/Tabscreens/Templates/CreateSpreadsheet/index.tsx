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
import uuid from 'react-native-uuid';
import moment from 'moment';
import { create_Template_Column } from '../../../../API_Manager/index';

const CreatSpreadsheet = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const [Data, setData] = useState([]);
  const [template, setTemplate] = useState(route?.params?.template)
  const [templateID, setTemplateID] = useState(route?.params?.template?.id)
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    console.log("templateName=======", route?.params?.template)
    AddColoumn()
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

    console.log("updatedColumnArray=======", objectsWithPairs);

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
    console.log("updatedArr==========", newArray)
    console.log("arrWithID===========", Data)

    newArray.map((el: any, index) => {
      console.log("arrayIndex======",index)
      el.id = Data[index].id;
      el.templatesID = Data[index].templatesID;
      return el
    }
    );
    console.log("updateArrWithID===========", newArray)
    
    create_Template_Column(newArray).then((response) => {
      console.log("createColmResponse=========", response)
    }).catch((error) => {
      console.log("createColmErr======", error)
    })

    navigation.navigate("AddrowClassattendance",{template:template});
  };

  const AddColoumn = () => {
    const newIndex = Data.length;
    let uid = uuid.v1().toString()
    let timeStamp = moment().unix().toString()
    let newUniqueId = uid + "-" + timeStamp
    setData((oldArray) => [...Data, { id: newUniqueId, templatesID: templateID }]);

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
            heading={template?.template_name}
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
