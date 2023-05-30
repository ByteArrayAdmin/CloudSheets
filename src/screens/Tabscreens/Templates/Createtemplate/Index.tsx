import React, { useRef, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  DeviceEventEmitter
} from "react-native";
import BackgroundLayout from "../../../../commonComponents/Backgroundlayout/BackgroundLayout";
import Smlogo from "../../../../assets/Images/smalllogo.svg";
import AuthCard from "../../../../commonComponents/AuthCard";
import Custombutton from "../../../../commonComponents/Button";
import CreateTemplatescreen from "../../../../utils/ProjectLabels.json";
import Templatelogo from "../../../../assets/Images/Templatelogo.svg";
import { Tempatestyle } from "./Style";
import { useNavigation } from "@react-navigation/native";
import CommonBottomsheet from "../../../../commonComponents/CommonBottomsheet";
import CreateTemplatePopup from "./../../../Popups/CreateTemplatePopup";
import EditDeleteCloudsheet from "../../../../screens/Popups/Edit_Delete_Cloudsheet";
import { create_Template, update_Template, current_UserInfo, get_Template_List, delete_Template, get_ColumnByTemplateId, Template_Soft_Delete, soft_delete_template } from '../../../../API_Manager/index';
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
import CommonLoader from '../../../../commonComponents/CommonLoader';

const CreateTemplate = () => {
  // --------- File States -----------
  const child = useRef();
  const editTempRef = useRef();
  const navigation = useNavigation();
  const [userId, setUserId] = useState('')
  const [templateList, setTemplateList] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState({})
  const [isEditTemplate, setIsEditTemplate] = useState(false)
  const [extraData, setExtraData] = useState(new Date())
  const bottomTabHeight = useBottomTabBarHeight()
  const [count, setCount] = useState(1)
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    getUserId()
  }, [])

  // -----------------Get Curent userId----------------
  const getUserId = () => {
    current_UserInfo().then((response: any) => {
      setUserId(response.attributes.sub)
      getTemplateList(response.attributes.sub)
      console.log("currentUser=========", response)
    }).catch((error) => {
      console.log("currUserErr======", error)
    })
  }

  // ------------ Select Create Template Popup --------
  const toggleBottomNavigationView = () => {
    setIsEditTemplate(false)
    setSelectedTemplate(null)
    setError("")
    child.current.childFunction1();
  };

  // ----------- Open Create Template popup ----------
  const OpenPopup = (item: any) => {
    console.log("selectedTemp========", item)
    setSelectedTemplate(item)
    editTempRef.current.childFunction1()
  }

  // -----------------Get Curent user TemplateList pull to Refresh----------------
  const onRefreshList = () => {
    getTemplateList(userId)
  }

  // -----------------Get Curent user TemplateList----------------
  const getTemplateList = (userId: any) => {
    let arr = []
    setLoader(true)
    get_Template_List(userId).then((response: any) => {
      console.log("getTempResp=======", response)
      setLoader(false)
      response.data.templatesByUserID.items.forEach(element => {
        if (element._deleted != true) {
          arr.push(element)
        }
      });
      // setTemplateList(response.data.templatesByUserID.items)
      setTemplateList(arr)
    }).catch((error) => {
      console.log("getTempErr======", error)
      setLoader(false)
    })
  }

  // --------- Check Form validation -----------
  const CheckValidation = (templateName: String) => {
    if (templateName == "" || templateName == undefined) {
      setError(labels.TabBarTemplateList.TemplateErr)
    } else {
      onCreateTemplate(templateName)
    }
  }

  // -----------------Create Template functionality----------------
  const onCreateTemplate = (templateName: String) => {
    let arr1 = templateList
    let newTemp
    console.log("templateName===========", templateName)
    let uid = uuid.v1().toString()
    let timeStamp = moment().unix().toString()
    let newUniqueId = uid + "-" + timeStamp
    console.log("UniqueId========", newUniqueId)
    const newTemplate = {
      id: newUniqueId,
      template_name: templateName,
      userID: userId,
      soft_Deleted: false
    }
    console.log("rowData======", newTemplate)
    setLoader(true)
    create_Template(newTemplate).then((response: any) => {
      console.log("createTempResp=======", response)
      setLoader(false)
      arr1.push(response.data.createTemplates)
      setTemplateList(arr1)
      child.current.childFunction2();
      navigation.navigate("CreatSpreadsheet", { template: response.data.createTemplates, isEdit: isEditTemplate, isFrom: "TemplateTab" });
      setExtraData(new Date())
    }).catch((err) => {
      setLoader(false)
      console.log("createTempErr=======", err)
    })
  }

  // -----------------Update Template functionality----------------
  const onUpdateTemplates = (templateName: any, templateId: any, version: any, softDeleted: boolean) => {

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
      _version: version,
      soft_Deleted: softDeleted
    }
    console.log("updatedRow==========", updateTemplate)
    setLoader(true)
    update_Template(updateTemplate).then((response: any) => {
      setLoader(false)
      console.log("updateTemplate========", response)
      navigation.navigate("CreatSpreadsheet", { template: response.data.updateTemplates, isEdit: isEditTemplate });
    }).catch((error) => {
      setLoader(false)
      console.log("updateTempErr=======", error)
    })
  }

  // ----------- Delete Row Alert ------------
  const deleteAlert = () => {
    editTempRef.current.childFunction2();
    Alert.alert(labels.ExpensesList.Delete_Record_Alert, labels.ExpensesList.Delete_Quete, [
      {
        text: labels.ExpensesList.Cancel,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: labels.ExpensesList.OK, onPress: () => onDeleteTemplate() },
    ]);
  }

  // -----------------Delete Template functionality----------------
  const onDeleteTemplate = () => {

    const deleteTemplate = {
      id: selectedTemplate.id,
      template_name: selectedTemplate.template_name,
      userID: selectedTemplate.userID,
      _version: selectedTemplate._version,
      soft_Deleted: true
    }
    setLoader(true)
    soft_delete_template(deleteTemplate).then((response: any) => {
      console.log("colId=======", response)
      let arr1 = templateList
      let index
      arr1.forEach(element => {
        if (element.id == selectedTemplate.id) {
          index = arr1.indexOf(element)
        }
      });
      arr1.splice(index, 1)
      setTemplateList(arr1)
      setExtraData(new Date())
      setLoader(false)
      DeviceEventEmitter.emit('updateSpreadSheetList')
    }).catch((error) => {
      setLoader(false)
      console.log("getColErr======", error)
    })
  }

  // --------------Open Edit Template popup functionality-------------------
  const onEditTemplate = () => {
    editTempRef.current.childFunction2()
    child.current.childFunction1();
    setIsEditTemplate(true)
  }
  const snapPoints = ["45%"];

  // -------------navigate to detail Screen functionality on Double Tap---------------
  const onDoubleTab = (template: any) => {
    setCount(count + 1)
    console.log("totalCount======", count)
    if (count == 2) {
      navigation.navigate("TemplateList", { template: template })

    } else {
      setTimeout(() => {
        setCount(1)
      }, 3000);
    }
  }

  const renderItems = ({ item }: any) => (
    <TouchableOpacity
      //  onPress={() => navigation.navigate("ExpensesList")}
      onPress={() => onDoubleTab(item)}
    >
      <Card item={item} onEditTemplate={() => OpenPopup(item)} />
    </TouchableOpacity>
  )

  return (

    <View style={styles.container}>
      {templateList.length > 0 ?
        <>
          <View style={[styles.container, { marginBottom: bottomTabHeight }]}>
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
            error={error}
            isEditTemplate={isEditTemplate}
            selectedTemplate={selectedTemplate}
            onCreateTemplate={(templateName: String) => CheckValidation(templateName)}
            onUpdateTemplate={(templateName: any, templateId: any, version: any, softDeleted: boolean) => onUpdateTemplates(templateName, templateId, version, softDeleted)}
          />}
      />
      <View>
        <CommonBottomsheet ref={editTempRef} snapPoints={snapPoints} children={
          <EditDeleteCloudsheet
            editTemplate={() => onEditTemplate()}
            deleteTemplate={() => deleteAlert()}
            selectedTemplate={selectedTemplate}
            editlabel={labels.TemplatePopupExpenses.Edit_Template}
            deletelabel={labels.TemplatePopupExpenses["Delete Template"]}
          />
        } />
      </View>
      {loader ? <CommonLoader /> : null}
    </View>

  );
};

export default CreateTemplate;
