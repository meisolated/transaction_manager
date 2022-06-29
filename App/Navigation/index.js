import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { NavigationContainer } from "@react-navigation/native"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import HomeScreen from "../Screens/HomeScreen.js"
import TransactionsScreen from "../Screens/OrdersScreen.js"
import AddTransaction from "../Screens/NewOrderScreen.js"
import AdminScreen from "../Screens/AdminScreen.js"
import color from "../constant/color.js"
import ProductDataScreen from "../Screens/DataScreens/ProductDataScreen.js"
import QRCodeScanner from "../Screens/QRCodeScannerScreen.js"
import CameraScreen from "../Screens/CameraScreen.js"
import Checkout from "../Screens/addOrder/Checkout.js"
import AddOrder from "../Screens/NewOrderScreen.js"
import Settings from "../Screens/SettingsScreen.js"
import Shops from "../Screens/ShopsScreen.js"
import ShopData from "../Screens/DataScreens/ShopDataScreen.js"
import ProductsScreen from "../Screens/ProductsScreen.js"
import SuppliersScreen from "../Screens/SuppliersScreen.js"
import SuppliersData from "../Screens/DataScreens/SuppliersDataScreen.js"
import CategoryScreen from "../Screens/CategoryScreen.js"
import CategoryData from "../Screens/DataScreens/CategoryDataScreen.js"

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
                <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="AddOrder" component={AddOrder} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="Shops" component={Shops} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="ShopData" component={ShopData} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="ProductData" component={ProductDataScreen} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="Products" component={ProductsScreen} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="Suppliers" component={SuppliersScreen} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="SupplierData" component={SuppliersData} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="Categories" component={CategoryScreen} options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="CategoryData" component={CategoryData} options={{ headerShown: false, animation: "none" }} />
                {/* <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false, animation: "none" }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
