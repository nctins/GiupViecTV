import { StatusBar as DefaultStatusBar } from 'react-native'
import React from 'react';
import useTheme from '~hooks/useTheme';
import * as ObjMapper from "object-mapper";

const StatusBar = ({
  backgroundColor = "BackgroundBlue", 
  barStyle = "light-content",
  hidden = false
}) => {
  const {colors} = useTheme();

  return (
    <DefaultStatusBar 
      backgroundColor = {ObjMapper.getKeyValue(colors, backgroundColor)} 
      barStyle = {barStyle}
      hidden = {hidden}
      />
  )
}

export default StatusBar