import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { NavigationContainer } from "@react-navigation/native"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import HomeScreen from "../Screens/HomeScreen.js"
import TransactionsScreen from "../Screens/TransactionsScreen.js"
import AddTransaction from "../Screens/AddOrderScreen.js"
import AdminScreen from "../Screens/AdminScreen.js"
import color from "../constant/color.js"
const Tab = createMaterialBottomTabNavigator()
const Stack = createNativeStackNavigator()

export function Navigation() {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={"#fff"} />
            <Stack.Navigator initialRouteName="Home">
                {/* <Tab.Navigator initialRouteName="Home" activeColor="#f0edf6" inactiveColor="#3e2465" barStyle={{ backgroundColor: "#694fad" }}> */}
                {/* </Tab.Navigator> */}
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="AddTransactions" component={AddTransaction} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false, animation: "none" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
