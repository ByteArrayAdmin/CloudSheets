import React from 'react';
import {TouchableOpacity} from 'react-native';

import Bacakarrow from '../assets/Images/backlatest.svg';

const BackButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onpress}>
      <Bacakarrow />
    </TouchableOpacity>
  );
};

export default BackButton;
