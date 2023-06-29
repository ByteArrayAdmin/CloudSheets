import React, { useRef, useState } from "react";
import label from "../../../../utils/ProjectLabels.json";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import Downarrow from "../.././../../assets/Images/dropdown.svg";
import Ic_upArrow from "../../../../assets/Images/Ic_upArrow.svg";
import Threedot from "../.././../../assets/Images/Darkthreedots.svg";
import { COLOURS, FONTS } from "../../../../utils/Constant";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export const Attendancelistcard = (props: any) => {
  const [items, setItems] = useState(JSON.parse(props?.item.items));
  const [isOpen, setIsOpen] = useState(false);

  const toggleSwitch = () => {
    setIsOpen((prev) => !prev);
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 300,
    });
  };

  return (
    <View style={Styles.container}>
      <View
        style={[
          Styles.innercontainer,
          {
            borderColor: isOpen
              ? COLOURS.lightgrey
              : COLOURS.cardBorder_lightBlue,
          },
        ]}
      >
        <View style={Styles.subcontainer}>
          <View>
            <Text style={Styles.nametext}>{items.Name}</Text>
          </View>
          <View style={Styles.emptyview}></View>
          <TouchableOpacity style={Styles.gap} onPress={toggleSwitch}>
            {isOpen ? <Ic_upArrow /> : <Downarrow />}
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={Styles.ThreeDotview}
              onPress={props.openEditRecord}
            >
              <Threedot />
            </TouchableOpacity>
          </View>
        </View>
        {isOpen ? (
          <Animated.View style={Styles.bottomgap}>
            <View style={Styles.horizontallineview}>
              <View style={Styles.innerhoeizontaline} />
            </View>
            {Object.keys(items).map((key) => {
              return (
                <View style={Styles.detailview}>
                  <Text style={Styles.labelheading}>{key}</Text>
                  <View style={Styles.emptyview}></View>
                  <Text style={Styles.detailnametext}>{items[key]}</Text>
                </View>
              );
            })}
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
};

export default Attendancelistcard;

const Styles = StyleSheet.create({
  container: {},
  innercontainer: {
    paddingHorizontal: 16,
    backgroundColor: COLOURS.white,
    borderRadius: 8,
    borderWidth: 1,
  },
  emptyview: {
    flex: 1,
  },
  subcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  gap: {
    marginRight: 10,
    width: 65,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  nametext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
  },
  detailnametext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
  },
  labelheading: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
    opacity: 0.5,
  },
  horizontallineview: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerhoeizontaline: {
    flex: 1,
    height: 1,
    backgroundColor: COLOURS.lightgrey,
  },
  detailview: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomgap: {
    marginBottom: 20,
  },
  ThreeDotview: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
