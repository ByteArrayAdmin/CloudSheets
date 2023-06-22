import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import { FONTS, COLOURS } from "../../../../utils/Constant";
import Downarrow from "../.././../../assets/Images/dropdown.svg";
import Ic_upArrow from '../../../../assets/Images/Ic_upArrow.svg';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Threedot from "../.././../../assets/Images/Darkthreedots.svg";
import moment from 'moment';

const ListCard = (props: any) => {
  console.log("items=======", props?.items)
  const [open, setopen] = useState(false);
  const [rowData, setRowData] = useState(JSON.parse(props?.items?.items))
  const toggle = () => {
    setopen(!open);
  };
  const toggleButton = () => {
    setopen((prev) => !prev);
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 300,
    });
  };

  const isDate = (value) => {
    const newDate = new Date(value);
    // return !isNaN(newDate.getTime());
    return !isNaN(newDate.getTime()) && Object.prototype.toString.call(newDate) === '[object Date]'
  };

  return (
    <View style={[style.innercontainer, { borderWidth: 1, borderColor: open ? COLOURS.lightgrey : COLOURS.cardBorder_lightBlue }]}>
      <View style={style.subview}>
        <View>
          <Text style={style.texthead}>{Object.values(rowData)[0]}</Text>
        </View>
        <View style={style.Space}></View>
        <TouchableOpacity
          style={style.arrowstyle}
          onPress={() => toggleButton()}
        >
          {open ? <Ic_upArrow /> : <Downarrow />}
        </TouchableOpacity>
        <TouchableOpacity style={style.threeDotStyle}
          onPress={props.onPressThreeDot}
        >
          <Threedot />
        </TouchableOpacity>
      </View>
      {open ? (
        <Animated.View style={style.horizontalspacing}>
          <Animated.View style={style.seprator}></Animated.View>
          {
            Object.keys(rowData).map((key) => {
              return (
                <Animated.View style={style.detailview}>
                  <Animated.Text style={style.labelheading}>{key}</Animated.Text>
                  <Animated.View style={style.emptyview}></Animated.View>
                  <Animated.Text style={style.detailnametext}>{isDate((rowData)[key]) ? moment((rowData)[key]).format("MMM DD, YYYY") : (rowData)[key]}</Animated.Text>
                </Animated.View>
              )
            })}
        </Animated.View>
      ) : null}
    </View>
  );
};

export default ListCard;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  subview: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    height: 50,
  },
  texthead: {
    fontFamily: FONTS.inter_medium,
    fontSize: 14,
    color: COLOURS.black,
  },
  Space: {
    flex: 1,
  },
  arrowstyle: {
    marginRight: 16,
    paddingHorizontal: 18,
    paddingVertical: 10
  },
  innerhoeizontaline: {
    flex: 1,
    height: 1,
    backgroundColor: COLOURS.lightgrey,
  },
  horizontallineview: {
    flexDirection: "row",
    alignItems: "center",
  },
  innercontainer: {
    paddingHorizontal: 16,

    backgroundColor: COLOURS.white,
    borderRadius: 8,
    marginBottom: 20,
  },
  carddetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  subheadingtext: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    opacity: 0.5,
    color: COLOURS.black,
  },
  headingvalue: {
    fontFamily: FONTS.inter_regular,
    fontSize: 12,
    color: COLOURS.black,
  },
  horizontalspacing: { marginBottom: 20 },
  ThreeDotview: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  detailview: { marginTop: 16, flexDirection: "row", alignItems: "center" },
  labelheading: {
    fontSize: 12,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
    opacity: 0.5,
  },
  emptyview: {
    flex: 1,
  },
  detailnametext: {
    fontSize: 14,
    fontFamily: FONTS.inter_regular,
    color: COLOURS.black,
  },
  threeDotStyle: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  seprator: {
    borderWidth: 1,
    borderColor: COLOURS.lightgrey
  }
});
