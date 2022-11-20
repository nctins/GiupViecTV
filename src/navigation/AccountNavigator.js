import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '~screens/Account/AccountScreen';
import AccountLinkScreen from '~screens/Account/AcountLinkScreen';
import ChangePasswordScreen from '~screens/Account/ChangePasswordScreen';
import FeedbackScreen from '~screens/Account/FeedbackScreen';
import UpdateInfoScreen from '~screens/Account/UpdateInfoScreen';

const AccountStack = createNativeStackNavigator();

const AccountNavigator = () => {
    return (
        <AccountStack.Navigator initialRouteName="AccountScreen" >
            <AccountStack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown: false }} />
            <AccountStack.Screen name="AccountLinkScreen" component={AccountLinkScreen} options={{ headerShown: false }} />
            <AccountStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ headerShown: false }} />
            <AccountStack.Screen name="FeedbackScreen" component={FeedbackScreen} options={{ headerShown: false }} />
            <AccountStack.Screen name="UpdateInfoScreen" component={UpdateInfoScreen} options={{ headerShown: false }} />
        </AccountStack.Navigator>
    );
}
export default AccountNavigator
