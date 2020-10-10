import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const AccountIcon = ({ active }) => {
  return (
    <View>
      <Svg
        width="25px"
        height="25px"
        viewBox="0 0 24 24"
        fill={active ? '#FFF' : '#CCC'}
        stroke={active ? '#FFF' : '#CCC'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-user"
      >
        <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <Circle cx="12" cy="7" r="4" />
      </Svg>
    </View>
  );
};

export default AccountIcon;
