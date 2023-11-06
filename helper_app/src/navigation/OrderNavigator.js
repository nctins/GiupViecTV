import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartDetail from '~screens/CartDetail';
import MessageDetail from '~screens/Message/MessageDetail';
import OrderScreen from '~screens/Order/OrderScreen';

const CartStack = createNativeStackNavigator();

const OrderNavigator = () => {
    return (
        <CartStack.Navigator 
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,
            }}
            initialRouteName="CartScreen" 
        >
            <CartStack.Screen name="CartScreen" component={OrderScreen} />
            <CartStack.Screen name="CartDetail" component={CartDetail} />
            <CartStack.Screen name="MessageScreen" component={MessageDetail} />
        </CartStack.Navigator>
    );
}
export default OrderNavigator
