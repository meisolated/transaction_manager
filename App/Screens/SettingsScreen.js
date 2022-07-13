import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { StyleSheet, View, Text, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { localStorage } from "../database/localStorage.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import ToastHandler from "../handler/Toast.handler.js"
import { Feather as Icons } from "@expo/vector-icons"
import TopNavbar from "../Navigation/topNavbar.js"
import commonStyle from "../common/style.js"
import color from "../constant/color.js"
import config from "../config/index.js"
import React from "react"
import axios from "axios"
import qs from "qs"

const apiUrl = config.apiUrl
const apiConfig = (path, method, data) =>
    new Promise(async (resolve, reject) => {
        const userToken = await localStorage.retrieveData("userToken").catch((err) => reject(err))
        resolve({
            method: "post",
            timeout: 1000 * 5,
            url: apiUrl + path,
            headers: {
                authorization: userToken,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: qs.stringify({ method, ...data }),
        })
    })

function SettingScreen(props) {
    const onPressLogout = async () => {
        const config = await apiConfig("logout", {}, {})
        axios(config)
            .then((res) => {
                if (res.data.code == 200) {
                    localStorage.removeItem("userToken")
                    ToastHandler("Logout Success")
                } else {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                alert("Logout failed" + err)
            })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title="Settings" />
            <Pressable onPress={() => props.navigation.navigate("Products")}>
                <View style={styles.settingsItem}>
                    <Icons name="package" size={30} color={color.primary} />
                    <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1 }]}>Products</Text>
                    <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="chevron-right" color={color.primary} size={30} />
                </View>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("Categories")}>
                <View style={styles.settingsItem}>
                    <Icons name="codesandbox" size={30} color={color.primary} />
                    <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1 }]}>Category</Text>
                    <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="chevron-right" color={color.primary} size={30} />
                </View>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("Suppliers")}>
                <View style={styles.settingsItem}>
                    <Icons name="truck" size={30} color={color.primary} />
                    <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1 }]}>Suppliers</Text>
                    <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="chevron-right" color={color.primary} size={30} />
                </View>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("Connections")}>
                <View style={styles.settingsItem}>
                    <Icons name="users" size={30} color={color.primary} />
                    <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1 }]}>Connections</Text>
                    <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="chevron-right" color={color.primary} size={30} />
                </View>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("Sync")}>
                <View style={styles.settingsItem}>
                    <Icons name="refresh-cw" size={30} color={color.primary} />
                    <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1 }]}>Sync Database</Text>
                    <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="chevron-right" color={color.primary} size={30} />
                </View>
            </Pressable>
            <Pressable onPress={() => onPressLogout()}>
                <View style={styles.settingsItem}>
                    <Icons name="log-out" size={30} color={color.primary} />
                    <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1 }]}>Logout</Text>
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
