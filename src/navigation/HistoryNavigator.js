import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartDetail from '~screens/CartDetail';
import HistoryScreen from '~screens/History/HistoryScreen';

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
        </HistoryStack.Navigator>
    );
}
export default HistoryNavigator
