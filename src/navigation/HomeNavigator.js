import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartDetail from '~screens/CartDetail';
import HomeScreen from '~screens/Home/HomeScreen';

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen" >
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="OrderDetail" component={CartDetail} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}
export default HomeNavigator
