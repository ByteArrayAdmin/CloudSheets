/* eslint-disable react-native/no-inline-styles */
import Verysmalllogo from '../../../../assets/Images/verysmalllogo.svg';
import CrownLogo from '../../../../assets/Images/crownLogo.svg';
import SearcBar from '../../../../commonComponents/Searchbar';
import {styles} from './style';
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Clousheetlistscreen from '../../../../utils/ProjectLabels.json';
import { useNavigation } from "@react-navigation/native";

const FlatListHeader = () => {
  const navigation = useNavigation()
  return (
    <>
      <View>
        <View style={styles.cloudsheetcontainer}>
          <View>
            <Verysmalllogo />
          </View>
          <View style={styles.cloudtextcontainer}>
            <Text style={styles.cloudtext}>
              {Clousheetlistscreen.cloudsheetlistconstant.CLOUDSHEETS}
            </Text>
            <Text style={styles.sheettext}>
              {Clousheetlistscreen.cloudsheetlistconstant.SHEETS}
            </Text>
          </View>
          <View style={styles.upgradeconatinerstyle} />
          <TouchableOpacity style={styles.upgradeContainer} onPress={()=>navigation.navigate("UpdateCloudsheet")}>
            <View>
              <CrownLogo />
            </View>
            <View>
              <Text style={styles.upgradetext}>
                {Clousheetlistscreen.cloudsheetlistconstant.UPGRADE}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputserachview}>
          <SearcBar
            placeholder={
              Clousheetlistscreen.cloudsheetlistconstant.SEARCH_SHEETS
            }
          />
        </View>

        <View style={styles.recentcloudview}>
          <View>
            <Text style={styles.recentcloudtext}>
              {Clousheetlistscreen.cloudsheetlistconstant.RECENT_CLOUD_SHEETS}
            </Text>
          </View>
          <View style={styles.lastview} />
          <View>
            <Text style={styles.viewalltext}>
              {Clousheetlistscreen.cloudsheetlistconstant.VIEWALL}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default FlatListHeader;
