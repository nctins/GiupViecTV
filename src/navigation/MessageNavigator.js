import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessageScreen from "~screens/Message/MessageScreen";
import MessageDetail from "~screens/Message/MessageDetail";

const MessageStack = createNativeStackNavigator();

const MessageNavigator = () => {
  return (
    <MessageStack.Navigator initialRouteName="MessageScreen">
      <MessageStack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{ headerShown: false }}
      />
      <MessageStack.Screen
        name="MessageDetail"
        component={MessageDetail}
        options={{ headerShown: false }}
      />
    </MessageStack.Navigator>
  );
};
export default MessageNavigator;
