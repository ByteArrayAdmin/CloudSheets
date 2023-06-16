import React from "react";
import { View, Text, StyleSheet,ScrollView } from "react-native";
import Label from "../../../utils/ProjectLabels.json";
import { FONTS, COLOURS } from "../../../utils/Constant";
import { Colors } from "react-native/Libraries/NewAppScreen";

const PasswordInstruction = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.passwordPolicyText}>
          {Label.PasswordInstruction.creatingaPasswordPolicy}
        </Text>
      </View>
      <View style={styles.pointsView}>
        <Text style={styles.bulletText}>{"\u2B24"}</Text>
        <Text style={{ paddingLeft: 12 }}>
          <Text> {Label.PasswordInstruction.A} </Text>
          <Text style={styles.HeighlitedText}>
            {Label.PasswordInstruction.passwordMinimumLenght}
          </Text>

          <Text style={styles.normalText}>
            {" "}
            {Label.PasswordInstruction.descriptionPoints}
          </Text>
        </Text>
      </View>
      <View style={styles.pointsView}>
        <View>
          <Text style={styles.bulletText}>{"\u2B24"}</Text>
        </View>
        <View>
          <Text style={{ paddingLeft: 12 }}>
            <Text style={styles.normalText}>
              {" "}
              {Label.PasswordInstruction.secondDiscription}{" "}
            </Text>
            <Text style={styles.HeighlitedText}>
              {Label.PasswordInstruction.containsAtleastOne}
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: FONTS.inter_regular,
              }}
            >
              {Label.PasswordInstruction.nextParaSecondLine}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.numberView}>
        <Text style={{ fontSize: 6, paddingRight: 6 }}>{"\u2B24"}</Text>
        <Text style={styles.HeighlitedText}>
          {Label.PasswordInstruction.number}
        </Text>
      </View>
      <View style={styles.numberView}>
        <Text style={{ fontSize: 6, paddingRight: 6, paddingBottom: 32 }}>
          {"\u2B24"}
        </Text>
        <Text>
          <Text style={styles.HeighlitedText}>
            {Label.PasswordInstruction.specialCharacter}
          </Text>{" "}
          <Text style={styles.normalText}>
            {Label.PasswordInstruction.speacialCharacterPara}
          </Text>
        </Text>
      </View>
      <View style={styles.characterView}>
        <Text>{Label.PasswordInstruction.characters}</Text>
      </View>
      <View style={styles.upperCaseView}>
        <Text style={{ fontSize: 6, paddingRight: 6 }}>{"\u2B24"}</Text>
        <Text style={styles.HeighlitedText}>
          {Label.PasswordInstruction.upperCase}{" "}
        </Text>
        <Text style={styles.letterText}>
          {Label.PasswordInstruction.basicLatin}{" "}
        </Text>
        <Text style={styles.HeighlitedText}>
          {Label.PasswordInstruction.letter}
        </Text>
      </View>
      <View style={styles.upperCaseView}>
        <Text style={{ fontSize: 6, paddingRight: 6 }}>{"\u2B24"}</Text>
        <Text style={styles.HeighlitedText}>
          {Label.PasswordInstruction.loweCase}{" "}
        </Text>
        <Text style={styles.letterText}>
          {Label.PasswordInstruction.basicLatin}{" "}
        </Text>
        <Text style={styles.HeighlitedText}>
          {Label.PasswordInstruction.letter}
        </Text>
      </View>
    </ScrollView>
  );
};

export default PasswordInstruction;

const styles = StyleSheet.create({
  container: {},
  passwordPolicyText: {
    fontSize: 20,
    fontFamily: FONTS.manrope_semibold,
    paddingLeft: 30,
  },
  HeighlitedText: {
    fontFamily: FONTS.inter_semibold,
    fontSize: 14,
  },
  pointsView: {
    marginHorizontal: 50,
    flexDirection: "row",
    marginTop: 15,
  },
  numberView: {
    marginTop: 10,
    marginHorizontal: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  normalText: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
  },
  characterView: {
    marginHorizontal: 50,
    marginTop: 15,
    padding: 20,
    backgroundColor: COLOURS.GREY,
    borderRadius: 10,
  },
  upperCaseView: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 50,
  },
  letterText: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.Skyblue,
  },
  bulletText: {
    fontSize: 6,
    paddingTop: 6,
    position: "absolute",
    left: 0,
  },
});
