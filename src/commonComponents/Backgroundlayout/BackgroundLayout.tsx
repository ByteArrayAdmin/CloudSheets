import React from 'react';
import {View} from 'react-native';

const BackgroundLayout = () => {
  return (
    <View style={{top: 0, left: 0, right: 0, bottom: 0, position: 'absolute'}}>
      <View style={{flex: 1, backgroundColor: '#0061FF'}} />
      <View style={{flex: 1, backgroundColor: '#F6F8FA'}} />
    </View>
  );
};

export default BackgroundLayout;
