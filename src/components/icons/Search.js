import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const SearchIcon = ({ active }) => {
  return (
    <View>
      <Svg width="25px" height="25px" x="0px" y="0px" viewBox="0 0 45 45">
        <Path
          fill={active ? '#FFF' : '#CCC'}
          d="M40.54,33.46l-6.78-6.77a18,18,0,1,0-7.07,7.07l6.77,6.78a5,5,0,0,0,7.08-7.08ZM5,18A13,13,0,1,1,18,31,13,13,0,0,1,5,18Z"
        />
      </Svg>
    </View>
  );
};

export default SearchIcon;
