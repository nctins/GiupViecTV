import { View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const SafeView = ({children}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1
      }}>
        {children}
    </View>
  )
}

export default SafeView