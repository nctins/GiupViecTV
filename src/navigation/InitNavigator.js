import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Step1 from '~screens/SignUpScreen/Step1';
import Step2 from '~screens/SignUpScreen/Step2';
import StartScreen from '~screens/StartScreen';
import LoginScreen from '~screens/LoginScreen';
import RootComponent from './RootNavigator';

const Stack = createNativeStackNavigator();

const InitNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="StartScreen" >
            <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Step1" component={Step1} options={{ headerShown: false }} />
            <Stack.Screen name="Step2" component={Step2} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={RootComponent} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
export default InitNavigator
