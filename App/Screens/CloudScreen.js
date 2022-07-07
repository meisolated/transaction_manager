import React, { useMemo } from "react"
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native"
import { PrimaryButton } from "../components/button/"
import categoriesModel from "../database/models/categories.model.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import TopNavbar from "../Navigation/topNavbar.js"
import D from "../handler/Dimensions.handler.js"
import { SafeAreaView } from "react-native-safe-area-context"
import font from "../constant/font.js"
import color, * as colors from "../constant/color.js"
import commonStyles from "../common/style.js"
import Loading from "../components/widgets/loading"

let d = new D()

const CloudScreen = (props) => {





    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title="Categories" />
            <View style={[styles.container,]}>

                <View style={{ flex: 1, position: "absolute", bottom: 70, width: "100%" }}>
                    <PrimaryButton name="Add Category" width={d.width * 0.95} onPress={() => props.navigation.navigate("CategoryData")} />
                </View>
            </View>
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}
export default CloudScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        backgroundColor: "white",
        padding: 10,
        marginVertical: 8,
        alignItems: "center",
        paddingVertical: 20,
        width: d.width * 0.95,
        borderRadius: 5,
        flexDirection: "row",
    },
})
