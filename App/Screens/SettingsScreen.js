import React from "react"
import { StyleSheet, View, Text, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import color from "../constant/color.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import TopNavbar from "../Navigation/topNavbar.js"
import commonStyle from "../common/style.js"
import { Feather as Icons } from "@expo/vector-icons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
/**
 * TODO: Edit Products
 * Unlimited Stock [enable/disable]
 * Qr Code Scanner [enable/disable]
 *
 */
function SettingScreen(props) {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <TopNavbar title="Settings" />
            <Pressable onPress={() => props.navigation.navigate("Products")}>
                <View style={styles.settingsItem}>
                    <Icons name="package" size={30} color={color.primary} />
                    <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1, }]}>Products</Text>
                    <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="chevron-right" color={color.primary} size={30} />
                </View>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("Products")}>
                <View style={styles.settingsItem}>
                    <Icons name="codesandbox" size={30} color={color.primary} />
                    <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1, }]}>Category</Text>
                    <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="chevron-right" color={color.primary} size={30} />
                </View>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("Suppliers")}>
                <View style={styles.settingsItem}>
                    <Icons name="truck" size={30} color={color.primary} />
                    <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1, }]}>Suppliers</Text>
                    <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="chevron-right" color={color.primary} size={30} />
                </View>
            </Pressable>
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}

export default SettingScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,
    },
    settingsItem: {
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingVertical: 20,
        borderRadius: 5,
        backgroundColor: color.white,
    },

})
