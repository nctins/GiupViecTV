import React from 'react'
import { StyleSheet, View, SafeAreaView, StatusBar, Image } from "react-native";
import { BgImageLayout } from '~components/Layout';
import { START_BG, START_IMG } from 'assets/images';
import useThemeStyles from '~hooks/useThemeStyles';
import Button from '~components/Button';
import Typography from '~components/Typography';

const StartScreen = ({navigation}) => {
  return (
    <BgImageLayout background={START_BG}>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Typography variant='H2' color='Gray.0'>Giúp việc T&V</Typography>
      </View>
      <View style={{flex:4, alignItems:'center'}}>
        <Image source={START_IMG}/>
      </View>
      <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
        <Button size='lg' isShadow variant='secondary' onPress={() => {navigation.push('LoginScreen', { params: 'example' })}} >
          Đăng nhập
        </Button>
        <Button size='lg' isShadow variant='secondary' style={{marginTop: 10}} onPress={() => {navigation.push('Step1', { params: 'example' })}} >
          Đăng ký ngay
        </Button>
      </View>
    </BgImageLayout>
  )
}
export default StartScreen