
/** 
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FONTS } from "../utils/Constant";

const Button = (props: any) => {
  return (
    <>
      <TouchableOpacity onPress={props.onPress} style={styles.Button}>
        <Text style={styles.registertext}>{props.Register}</Text>
      </TouchableOpacity>
    </>
  );
};
export default Button;

const styles = StyleSheet.create({
  Button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#0061FF",
    marginHorizontal: 20,
    height: 48,
    borderRadius: 8,
    marginBottom: 20,
  },
  registertext: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: FONTS.inter_semibold,
  },
});
**/

import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FONTS } from "../utils/Constant";

const Button = (props: any) => {
  return (
    <>
      <TouchableOpacity 
          onPress={props.onPress} 
          style={[styles.Button, props.disabled ? styles.disabledButton : null]}
          disabled={props.disabled}
      >
        <Text style={styles.registertext}>{props.Register}</Text>
      </TouchableOpacity>
    </>
  );
};
export default Button;

const styles = StyleSheet.create({
  Button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#0061FF",
    marginHorizontal: 20,
    height: 48,
    borderRadius: 8,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "grey",
  },
  registertext: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: FONTS.inter_semibold,
  },
});




