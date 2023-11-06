import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartDetail from '~screens/CartDetail';
import CartScreen from '~screens/Cart/CartScreen';
import MessageDetail from '~screens/Message/MessageDetail';

const CartStack = createNativeStackNavigator();

const CartNavigator = () => {
    return (
        <CartStack.Navigator 
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
            }}
            initialRouteName="CartScreen" 
        >
            <CartStack.Screen name="CartScreen" component={CartScreen} />
            <CartStack.Screen name="CartDetail" component={CartDetail} />
            <CartStack.Screen name="MessageScreen" component={MessageDetail} />
        </CartStack.Navigator>
    );
}
export default CartNavigator
