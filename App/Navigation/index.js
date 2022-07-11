import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProductDataScreen from "../Screens/DataScreens/ProductDataScreen.js"
import SuppliersData from "../Screens/DataScreens/SuppliersDataScreen.js"
import CategoryData from "../Screens/DataScreens/CategoryDataScreen.js"
import OrderDataScreen from "../Screens/DataScreens/OrderDataScreen.js"
import OrderAdded from "../Screens/addOrder/OrderAddedScreen.js"
import LoginAndSignup from "../Screens/LoginAndSignupScreen.js"
import ShopData from "../Screens/DataScreens/ShopDataScreen.js"
import ConnectionsScreen from "../Screens/ConnectionsScreen.js"
import { NavigationContainer } from "@react-navigation/native"
import QRCodeScanner from "../Screens/QRCodeScannerScreen.js"
import SuppliersScreen from "../Screens/SuppliersScreen.js"
import { localStorage } from "../database/localStorage.js"
import ProductsScreen from "../Screens/ProductsScreen.js"
import CategoryScreen from "../Screens/CategoryScreen.js"
import OrdersScreen from "../Screens/OrdersScreen.js"
import AddOrder from "../Screens/NewOrderScreen.js"
import AdminScreen from "../Screens/AdminScreen.js"
import Settings from "../Screens/SettingsScreen.js"
import HomeScreen from "../Screens/HomeScreen.js"
import Shops from "../Screens/ShopsScreen.js"
import { StatusBar } from "expo-status-bar"
import React from "react"
const Stack = createNativeStackNavigator()
export function Navigation() {
    let [loggedIn, setLoggedIn] = React.useState({ loggedIn: false, show: false })

    React.useEffect(() => {
        setInterval(() => {
            localStorage
                .retrieveData("userToken")
                .then((res) => {
                    if (res) {
                        setLoggedIn({ loggedIn: true, show: true })
                    }
                    else {
                        setLoggedIn({ loggedIn: false, show: true })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }, 2000)

    }, [])

    const LoggedOutStack = () => (
        <Stack.Navigator initialRouteName="LoginAndSignup">
            <Stack.Screen name="LoginAndSignup" component={LoginAndSignup} options={{ headerShown: false, animation: "none" }} />
        </Stack.Navigator>
    )

    const LoggedInStack = () => (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="OrdersScreen" component={OrdersScreen} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="AddOrder" component={AddOrder} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="Shops" component={Shops} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="ShopData" component={ShopData} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="ProductData" component={ProductDataScreen} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="Products" component={ProductsScreen} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="Suppliers" component={SuppliersScreen} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="SupplierData" component={SuppliersData} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="Categories" component={CategoryScreen} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="CategoryData" component={CategoryData} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="OrderAdded" component={OrderAdded} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="OrderData" component={OrderDataScreen} options={{ headerShown: false, animation: "none" }} />
            <Stack.Screen name="Connections" component={ConnectionsScreen} options={{ headerShown: false, animation: "none" }} />

            {/* <Stack.Screen name="LoginAndSignup" component={LoginAndSignup} options={{ headerShown: false, animation: "none" }} /> */}
        </Stack.Navigator>
    )



    return (
        <NavigationContainer>
            <StatusBar backgroundColor={"#fff"} />
            {loggedIn.show ? loggedIn.loggedIn ? LoggedInStack() : LoggedOutStack() : null}
        </NavigationContainer>
    )
}

export default Navigation
