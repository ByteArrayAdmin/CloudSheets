import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity,SafeAreaView} from "react-native";
import { COLOURS, FONTS } from "../utils/Constant";


const NewCommonHeader = (props: any) => {
  return (
    <><SafeAreaView style={styles.backgroundcolour}>
    </SafeAreaView><View style={styles.maincontainer}>
        <View>
          <View style={styles.headerconatiner}>
            
              {props.BackButton}
          
            <View style={styles.foldericonmargin}>{props.Folder}</View>
            <View>
              <Text style={styles.classattendancetext}>{props.heading}</Text>
            </View>
<<<<<<< HEAD
            <View style={styles.space}></View>
            <View>{props.DeleteIcon}</View>
=======
            <View style={{flex:1}}></View>
            {props.SecondImg?
            <View>{props.SecondImg}</View>:null}
>>>>>>> main
          </View>
        </View>
      </View></>
  );
};

export default NewCommonHeader;

const styles = StyleSheet.create({
  backgroundcolour:{
    backgroundColor: COLOURS.Skyblue
  },
  maincontainer: {
    height: 100,
    backgroundColor: COLOURS.Skyblue,
  },

  headerconatiner: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 22,
  },
  foldericonmargin: {
    marginLeft: 16,
  },
  classattendancetext: {
    paddingLeft: 8,
    fontFamily: FONTS.manrope_semibold,
    fontSize: 18,
    color: "#FFFFFF",
  },
  space:{
    flex:1
  }
});
