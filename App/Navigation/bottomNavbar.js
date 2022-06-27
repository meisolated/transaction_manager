import React from "react"
import { StyleSheet, View, Text, Pressable } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Home, Transactions, Add, Shop, Settings } from "../assets/svg"
import color from "../constant/color.js"
import font from "../constant/font.js"
import { default as D } from "../handler/Dimensions.handler.js"
let d = new D()
function BottomNavBar({ navigation }) {
    return (
        <View style={styles.bottomNav}>
            <Pressable onPress={() => navigation.navigate("Home")}>
                <View style={styles.bottomNavItem}>
                    {/* <MaterialCommunityIcons name="home" color={"#808080"} size={26} /> */}
                    <Home />
                    <Text style={styles.bottomNavText}>Home</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Transactions")}>
                <View style={styles.bottomNavItem}>
                    {/* <MaterialCommunityIcons name="cash-multiple" color={"#808080"} size={26} /> */}
                    <Transactions />
                    <Text style={styles.bottomNavText}>Orders</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Home")}>
                <View style={styles.bottomNavItem}>
                    {/* <MaterialCommunityIcons name="plus-circle-outline" color={"#808080"} size={26} /> */}
                    <Add />
                    <Text style={styles.bottomNavText}>Add New</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Shops")}>
                <View style={styles.bottomNavItem}>
                    {/* <MaterialCommunityIcons name="store" color={"#808080"} size={26} /> */}
                    <Shop />
                    <Text style={styles.bottomNavText}>Shops</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Settings")}>
                <View style={styles.bottomNavItem}>
                    {/* <MaterialCommunityIcons name="cog" color={"#808080"} size={26} /> */}
                    <Settings />
                    <Text style={styles.bottomNavText}>Settings</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default BottomNavBar

const styles = StyleSheet.create({
    bottomNav: {
        elevation: 1,
        borderTopWidth: 1,
        borderTopColor: color.littleDarkGrey,
        backgroundColor: "#fff",
        height: 60,
        width: d.width,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    bottomNavItem: {
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
    bottomNavText: {
        fontFamily: font.semiBold,
        color: "#808080",
        fontSize: 15,
    },
    bottomNavIcon: {
        color: "#808080",
        fontSize: 30,
    },
})
