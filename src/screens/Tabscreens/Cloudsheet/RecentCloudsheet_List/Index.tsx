/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, View} from 'react-native';
import FlatListHeader from './FlatlistHeader';
import Cloudsheetcard from './Cloudsheetcard';
import {styles} from './style';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Addwidget from '../../../../assets/Images/Addwidgeticon.svg';

const ClousheetList = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  const Data = [{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}];
  const Footer = () => {
    return <View style={{height: bottomTabHeight}} />;
  };

  const renderItems = () => <Cloudsheetcard />;

  return (
    <>
      <View style={styles.backgroundlayout}>
        <View style={styles.secondview} />
        <View style={styles.thirdview} />
      </View>
      <View style={styles.flatlistview}>
        <FlatListHeader />

        <FlatList
          data={Data}
          renderItem={renderItems}
          //keyExtractor={item => item._id}
          ListFooterComponent={<Footer />}
        />
        <View style={styles.widgetstyle}>
          <Addwidget />
        </View>
      </View>
    </>
  );
};

export default ClousheetList;
