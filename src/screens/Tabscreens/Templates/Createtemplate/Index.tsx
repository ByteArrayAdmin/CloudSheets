import React, { useRef, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  FlatList
} from "react-native";
import BackgroundLayout from "../../../../commonComponents/Backgroundlayout/BackgroundLayout";
import Smlogo from "../../../../assets/Images/smalllogo.svg";
import InputField from "../../../../commonComponents/InputField";
import AuthCard from "../../../../commonComponents/AuthCard";
import Custombutton from "../../../../commonComponents/Button";
import CreateTemplatescreen from "../../../../utils/ProjectLabels.json";
import Templatelogo from "../../../../assets/Images/Templatelogo.svg";
import { Tempatestyle } from "./Style";
import BottomsheetLayout from "../../../../Bottomsheet/BottomsheetLayout";
import { useForm } from "react-hook-form";
import Template from "../../../../assets/Images/Tempate.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import CreateTemplatePopup from "./../../../Popups/CreateTemplatePopup";
import EditDeleteCloudsheet from "../../../../screens/Popups/Edit_Delete_Cloudsheet";

import { create_Template,update_Template, current_UserInfo, get_Template_List , delete_Template} from '../../../../API_Manager/index';

import NewCommonHeader from "../../../../commonComponents/NewCommonHeader";
import Card from "../TabBarTemplateList/Card";
import labels from "../../../../utils/ProjectLabels.json";
import BackButton from "../../../../commonComponents/Backbutton";
import Folder from "../../../../assets/Images/folder12.svg";
import Addwidgeticon from "../../../../assets/Images/Addwidgeticon.svg";
import { styles } from "../TabBarTemplateList/style";
import uuid from 'react-native-uuid';
import moment from 'moment';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const CreateTemplate = () => {
  const child = useRef();
  const editTempRef = useRef();
  const navigation = useNavigation();
  const DATA = useState([{ id: 1 }, { id: 1 }]);
  const [visible, setVisible] = useState(false);
  const { control, handleSubmit } = useForm();
  const [userId, setUserId] = useState('')
  const [templateList, setTemplateList] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isEditTemplate, setIsEditTemplate] = useState(false)
  const [extraData, setExtraData] = useState(new Date())
  const bottomTabHeight = useBottomTabBarHeight()

  const toggleBottomNavigationView = () => {
    setIsEditTemplate(false)
    setSelectedTemplate(null)
    child.current.childFunction1();
  };

  const OpenPopup = (item: any) => {
    console.log("selectedTemp========", item)
    setSelectedTemplate(item)
    editTempRef.current.childFunction1()
  }

  useEffect(() => {
    getUserId()
  }, [])


  const getTemplateList = (userId: any) => {
    get_Template_List(userId).then((response) => {
      console.log("getTempResp=======", response)
      setTemplateList(response.data.templatesByUserID.items)

    }).catch((error) => {
      console.log("getTempErr======", error)
    })
  }

  const onRefreshList = ()=>{
    getTemplateList(userId)
  }

  const getUserId = () => {
    current_UserInfo().then((response) => {
      setUserId(response.attributes.sub)
      getTemplateList(response.attributes.sub)
      console.log("currentUser=========", response)
    }).catch((error) => {
      console.log("currUserErr======", error)
    })
  }

  const onCreateTemplate = (templateName: String) => {
    console.log("templateName===========", templateName)
    let uid = uuid.v1().toString()
    let timeStamp = moment().unix().toString()
    let newUniqueId = uid + "-" + timeStamp
    console.log("UniqueId========", newUniqueId)
    const newTemplate = {
      id: newUniqueId,
      template_name: templateName,
      userID: userId
      
    }
    console.log("rowData======", newTemplate)

    create_Template(newTemplate).then((response) => {
      console.log("createTempResp=======", response)
    }).catch((err) => {
      console.log("createTempErr=======", err)
    })
    child.current.childFunction2();
    // navigation.navigate("CreatSpreadsheet",{templateName:templateName});
  }

  const onUpdateTemplates = (templateName: any, templateId: any, version:any) => {
    let arr1 = templateList
    arr1.forEach(element => {
      if (element.id == templateId) {
        element.template_name = templateName
      }
    });
    setTemplateList(arr1)
    setExtraData(new Date())
    setIsEditTemplate(false)
    child.current.childFunction2();
    const updateTemplate = {
      id: templateId,
      template_name: templateName,
      userID: userId,
      _version:version
    }
    console.log("updatedRow==========",updateTemplate)
    update_Template(updateTemplate).then((response)=>{
      console.log("updateTemplate========",response)
    }).catch((error)=>{
      console.log("updateTempErr=======", error)
    })
  }

  const onDeleteTemplate = (selectedTemplate:any)=>{
    let arr1 = templateList
    let index
    arr1.forEach(element => {
      if(element.id == selectedTemplate.id){
        index = arr1.indexOf(element)
      }
      
    });
    arr1.splice(index,1)
    setTemplateList(arr1)
    setExtraData(new Date())
    const deleteTemplate = {
      id: selectedTemplate.id,
      // template_name: selectedTemplate.template_name,
      // userID: selectedTemplate.userID,
      _version:selectedTemplate._version,
      _deleted:true
    }
    delete_Template(deleteTemplate).then((response)=>{
        console.log("deleteTempResp=======",response)
    }).catch((error)=>{
      console.log("deleteTempErr=======", error)
    })
    console.log("index========",index)
  }

  const onEditTemplate = () => {
    editTempRef.current.childFunction2()
    child.current.childFunction1();
    setIsEditTemplate(true)
  }
  const snapPoints = ["45%"];

  const renderItems = ({ item }: any) => (
    <TouchableOpacity onPress={() => navigation.navigate("ExpensesList")}>
      <Card item={item} onEditTemplate={() => OpenPopup(item)} />
    </TouchableOpacity>
  )


  return (
    <View style={styles.container}>
      {templateList.length > 0 ?
        <>
          <View style={[styles.container,{marginBottom:bottomTabHeight}]}>
            <NewCommonHeader
              BackButton={<BackButton onPress={() => navigation.goBack()} />}
              heading={labels.TabBarTemplateList.Template}
              Folder={<Folder />}
            />

            <View style={styles.Flatlistviewone}>
              <FlatList
                data={templateList}
                renderItem={renderItems}
                extraData={extraData}
                refreshing={false}
                onRefresh={onRefreshList}
                
              />
            </View>
          </View>
          <TouchableOpacity style={styles.widgetposition}
            onPress={() => toggleBottomNavigationView()}
          >
            <Addwidgeticon />
          </TouchableOpacity>
        </>
        :
        <>
          <BackgroundLayout />
          <SafeAreaView style={Tempatestyle.safeareaview}>
            <View style={Tempatestyle.container}>
              <View style={Tempatestyle.logoview}>
                <Smlogo />
              </View>
              <View style={Tempatestyle.cloudview}>
                <Text style={Tempatestyle.cloudtext}>
                  {CreateTemplatescreen.CreateTemplatescreen.Cloud}
                </Text>
                <Text style={Tempatestyle.sheetetxt}>
                  {CreateTemplatescreen.CreateTemplatescreen.Sheets}
                </Text>
              </View>

              <View style={Tempatestyle.authcardview}>
                <AuthCard
                  subchildren={
                    <>
                      <View style={Tempatestyle.Cardcontainer}>
                        <View style={Tempatestyle.subcontainer}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("TabBarTemplateList")
                            }
                          >
                            <Templatelogo />
                          </TouchableOpacity>
                          <View style={Tempatestyle.cartdtetxt}>
                            <View>
                              <Text style={Tempatestyle.cardtextstyle}>
                                {CreateTemplatescreen.CreateTemplatescreen.CARDTEXT}
                              </Text>
                            </View>
                            <View style={Tempatestyle.cardtetxt2}>
                              <Text style={Tempatestyle.cardtextstyle}>
                                {
                                  CreateTemplatescreen.CreateTemplatescreen
                                    .CARDTEXT2
                                }
                              </Text>
                            </View>
                          </View>
                        </View>
                        <Custombutton
                          Register={
                            CreateTemplatescreen.CreateTemplatescreen.CreateTemplate
                          }
                          onPress={() => toggleBottomNavigationView()}
                        />
                      </View>
                    </>
                  }
                />
              </View>
            </View>
          </SafeAreaView>
        </>}

      <CommonBottomsheet
        ref={child}
        snapPoints={snapPoints}
        children={
          <CreateTemplatePopup
            isEditTemplate={isEditTemplate}
            selectedTemplate={selectedTemplate}
            onCreateTemplate={(templateName: String) => onCreateTemplate(templateName)}
            onUpdateTemplate={(templateName: any, templateId: any,version:any) => onUpdateTemplates(templateName, templateId, version)}
          />}
      />
      <View>
        <CommonBottomsheet ref={editTempRef} snapPoints={snapPoints} children={
          <EditDeleteCloudsheet 
          editTemplate={() => onEditTemplate()}
          deleteTemplate={(selectedTemplate:any)=>onDeleteTemplate(selectedTemplate)}
          selectedTemplate={selectedTemplate} 
          editlabel={labels.TemplatePopupExpenses.Edit_Template} 
          deletelabel={labels.TemplatePopupExpenses["Delete Template"]} 
          />
        } />
      </View>
    </View>
  );
};

export default CreateTemplate;
