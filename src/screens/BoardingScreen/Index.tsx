
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Homestyle} from './style';
import {Homescreen} from '../../utils/Constant';
import Arrowbutton from 'src/assets/Images/btn.svg';
import Cutcard from 'src/assets/Images/cutcard.svg';
import {useNavigation} from '@react-navigation/native';
import HomescreenLabel from '../../utils/ProjectLabels.json';
import Largelogo from '../../assets/Images/largelogo.svg'

const BoardingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={Homestyle.container}>
      <View style={Homestyle.logoview}>
        <Largelogo />
        <View style={Homestyle.mainview}>
          <Text style={Homestyle.clousheetstext}>
            {HomescreenLabel.HomeWelcomeScreen.CLOUDSHEETS}
          </Text>
          <Text style={Homestyle.sheetstext}>
            {HomescreenLabel.HomeWelcomeScreen.SHEETS}
          </Text>
        </View>
        <View>
          <View style={Homestyle.cutcardview}>
            <Cutcard />
            <View style={Homestyle.cardview}>
              <View>
                <Text style={Homestyle.welcometotext}>
                  {HomescreenLabel.HomeWelcomeScreen.WELCOMETO}
                </Text>
              </View>
              <View>
                <Text style={Homestyle.cloudtext}>
                  {HomescreenLabel.HomeWelcomeScreen.Clodesheetcardtext}
                </Text>
              </View>
              <View style={Homestyle.cardtextview}>
                <Text style={Homestyle.cardText}>
                  {HomescreenLabel.HomeWelcomeScreen.cartext}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={Homestyle.Arrowbutton}>
                <Arrowbutton />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BoardingScreen;
