import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartDetail from '~screens/CartDetail';
import HistoryScreen from '~screens/History/HistoryScreen';
import MessageDetail from '~screens/Message/MessageDetail';

const HistoryStack = createNativeStackNavigator();

const HistoryNavigator = () => {
    return (
        <HistoryStack.Navigator 
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
            }}
            initialRouteName="HistoryScreen" 
        >
            <HistoryStack.Screen name="HistoryScreen" component={HistoryScreen} />
            <HistoryStack.Screen name="CartDetail" component={CartDetail} />
            <HistoryStack.Screen name="MessageScreen" component={MessageDetail} />
        </HistoryStack.Navigator>
    );
}
export default HistoryNavigator
