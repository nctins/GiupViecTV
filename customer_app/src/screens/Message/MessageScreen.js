import React from 'react'
import Header from '~components/Header';
import SafeView from '~components/SafeView';
import StatusBar from '~components/StatusBar';
import TabNavigatorMessage from './TabNavigatorMessage';

const MessageScreen = () => {
  return (
    <>
      <StatusBar/>
      <SafeView>
        <Header title="Tin nhắn" />
        <TabNavigatorMessage />
      </SafeView >
    </>
  )
}
export default MessageScreen