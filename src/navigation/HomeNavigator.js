import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartDetail from '~screens/CartDetail';
import HomeScreen from '~screens/Home/HomeScreen';
import PostDetail from '~screens/Home/PostDetail';

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen" >
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="PostDetail" component={PostDetail} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}
export default HomeNavigator
