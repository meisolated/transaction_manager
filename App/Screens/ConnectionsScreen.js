import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { StyleSheet, View, Text, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import { Feather as Icons } from "@expo/vector-icons"
import TopNavbar from "../Navigation/topNavbar.js"
import commonStyle from "../common/style.js"
import color from "../constant/color.js"
import React from "react"

function ConnectionsScreen(props) {
    const getConnections = () => { }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <TopNavbar title="Connections" />

            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}

export default ConnectionsScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,
    },
    connectionsItem: {
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingVertical: 20,
        borderRadius: 5,
        backgroundColor: color.white,
    },

})
