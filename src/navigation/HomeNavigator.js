import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '~screens/HomeScreen';
// import IntroduceScreen from '';
import AddressScreen from '~screens/Service/AddressScreen';
import PaymentScreen from '~screens/Service/PaymentScreen';
import ServiceScreen from '~screens/Service/ServiceScreen';
import ServiceTab from '~screens/Service/ServiceTab';

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen" >
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="ServiceTab" component={ServiceTab} options={{ headerShown: false }} />
            {/* <HomeStack.Screen name="AddressScreen" component={AddressScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="ServiceScreen" component={ServiceScreen} options={{ headerShown: false }} /> */}
        </HomeStack.Navigator>
    );
}
export default HomeNavigator
