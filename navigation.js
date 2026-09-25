import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import TableSelectScreen from './screens/TableSelectScreen'
import OrderScreen from './screens/OrderScreen'

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Cart" component={CartScreen}/>
                <Stack.Screen name="TableSelect" component={TableSelectScreen}/>
                <Stack.Screen name="Order" component={OrderScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}