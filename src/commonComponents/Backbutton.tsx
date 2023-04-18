import React from 'react';
import {TouchableOpacity} from 'react-native';

import Bacakarrow from '../assets/Images/backlatest.svg';

const BackButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Bacakarrow />
    </TouchableOpacity>
  );
};

export default BackButton;
