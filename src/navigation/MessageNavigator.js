import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageScreen from '~screens/Message/MessageScreen';
import MessageDetail from '~screens/Message/MessageDetail';

const MessageStack = createNativeStackNavigator();

const MessageNavigator = () => {
    return (
        <MessageStack.Navigator 
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
            }}
            initialRouteName="MessageScreen" 
        >
            <MessageStack.Screen name="MessageScreen" component={MessageScreen} />
            <MessageStack.Screen name="MessageDetail" component={MessageDetail} />
        </MessageStack.Navigator>
    );
}
export default MessageNavigator
