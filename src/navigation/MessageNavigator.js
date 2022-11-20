import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageAndNotificationScreen from '~screens/Message/MessageAndNotificationScreen';
import MessageDetail from '~screens/Message/MessageDetail';

const MessageStack = createNativeStackNavigator();

const MessageNavigator = () => {
    return (
        <MessageStack.Navigator 
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
            }}
            initialRouteName="HistoryScreen" 
        >
            <MessageStack.Screen name="MessageScreen" component={MessageAndNotificationScreen} />
            <MessageStack.Screen name="AlertScreen" component={MessageDetail} />
        </MessageStack.Navigator>
    );
}
export default MessageNavigator
