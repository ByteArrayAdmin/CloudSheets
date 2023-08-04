import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Homestyle } from "./style";
import Arrowbutton from "src/assets/Images/btn.svg";
import Cutcard from "src/assets/Images/cutcard.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
// import HomescreenLabel from '../../utils/ProjectLabels.json';
import Largelogo from "../../assets/Images/largelogo.svg";
import Ic_design from "../../assets/Images/Ic_design.svg";
import { listAppConstants } from "../../graphql/queries";
import { Amplify, Auth, API } from "aws-amplify";
import labels from "../../utils/ProjectLabels.json";
import CommonLoader from "../../commonComponents/CommonLoader";

declare global {
  var labels: any;
}

const BoardingScreen = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [HomescreenLabel, setHomeScreenLabel] = useState(global.labels);

  useEffect(() => {
    getConstants();
  }, []);

  const getConstants = async () => {
    try {
      setLoader(true)
      const response = await API.graphql({
        query: listAppConstants,
        variables: {},
        authMode: "API_KEY",
      });
      // console.log('constantsResp========', response);
      let parsedLabel = JSON.parse(
        response.data.listAppConstants.items[0].appLabels
      );
      if (parsedLabel) {
        global.labels = parsedLabel;
        setHomeScreenLabel(parsedLabel);
      } else {
        global.labels = labels;
        setHomeScreenLabel(labels);
      }
      setLoader(false)

      console.log("globalconstants=======", global.labels);
      // Handle the retrieved data
    } catch (error) {
      global.labels = labels;
      setHomeScreenLabel(labels);
      setLoader(false)
      console.log("ErrorConstants====:", error);
      // Handle the error
    }
  };

  return  (
   
    HomescreenLabel ?
    <View style={Homestyle.container}>
      <View style={Homestyle.backgroundImgStyle}>
        <Ic_design style={{width:"100%"}} />
      </View>
      <View style={Homestyle.logoview}>
        <Largelogo  />
        <View style={Homestyle.mainview}>
          <Text style={Homestyle.clousheetstext}>
            {HomescreenLabel?.HomeWelcomeScreen?.CLOUDSHEETS}
          </Text>
          <Text style={Homestyle.sheetstext}>
            {HomescreenLabel?.HomeWelcomeScreen?.SHEETS}
          </Text>
        </View>
        <View>
          <View style={Homestyle.cutcardview}>
            <Cutcard />
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={Homestyle.Arrowbutton}
              >
                <Arrowbutton />
              </TouchableOpacity>
            <View style={Homestyle.cardview}>
              <View>
                <Text style={Homestyle.welcometotext}>
                  {HomescreenLabel?.HomeWelcomeScreen?.WELCOMETO}
                </Text>
              </View>
              <View>
                <Text style={Homestyle.cloudtext}>
                  {HomescreenLabel?.HomeWelcomeScreen?.Clodesheetcardtext}
                </Text>
              </View>
              <View style={Homestyle.cardtextview}>
                <Text style={Homestyle.cardText}>
                  {HomescreenLabel?.HomeWelcomeScreen?.cartext}
                </Text>
              </View>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={Homestyle.Arrowbutton}
              >
                <Arrowbutton />
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    </View>: loader?<CommonLoader/>:null
    
  ) 
};

export default BoardingScreen;
