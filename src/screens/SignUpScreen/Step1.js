import React from 'react';
import { BgImageLayout } from '~components/Layout';
import Typography from '~components/Typography';
import { SIGNUP_BG } from 'assets/images';
import { View } from 'react-native';

const Step1 = () => {
  return (
    <BgImageLayout background={SIGNUP_BG}>
      <View style={{flex:1}}>
      
      </View>
    </BgImageLayout>
  )
}

export default Step1