import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen'
import TableSelectScreen from './screens/TableSelectScreen'
import OrderScreen from './screens/OrderScreen'

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Order" component={OrderScreen}/>
                <Stack.Screen name="TableSelect" component={TableSelectScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}