import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartDetail from '~screens/CartDetail';
import CartScreen from '~screens/Cart/CartScreen';

const CartStack = createNativeStackNavigator();

const CartNavigator = () => {
    return (
        <CartStack.Navigator initialRouteName="CartScreen" >
            <CartStack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
            <CartStack.Screen name="CartDetail" component={CartDetail} options={{ headerShown: false }} />
        </CartStack.Navigator>
    );
}
export default CartNavigator
