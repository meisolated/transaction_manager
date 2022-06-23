import { StatusBar } from "expo-status-bar"
import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import color from "../constant/color.js"
import font from "../constant/font.js"
import { createTables, deleteAllTables, insertDummyData, localStorage } from "../database/initializeDatabase.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import TopNavbar from "../Navigation/topNavbar.js"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { numberSeparator } from "../util/functions.js"
import HomeScreenPrimary from "../components/widgets/HomeScreenPrimary.widget.js"

function HomeScreen(props) {
    let [get, set] = React.useState({})

    return (
        <SafeAreaView style={styles.container}>
            <TopNavbar title={"Home"} />
            <View style={""}>
                <HomeScreenPrimary />
                <Button title="Go to Transactions" onPress={() => props.navigation.navigate("Transactions")} />
                <Button title="Add Transactions" onPress={() => props.navigation.navigate("AddTransactions")} />
                <Button title="Admin" onPress={() => props.navigation.navigate("Admin")} />
                <Button title="EditProduct" onPress={() => props.navigation.navigate("EditProduct")} />
                <Button title="Insert dummy data" onPress={() => insertDummyData()} />
                <Button title="Create Tables" onPress={() => createTables((x) => set(x))} />
                <Button title="Delete All Tables" onPress={() => deleteAllTables((x) => set(x))} />
                <Text>{JSON.stringify(get)}</Text>
            </View>
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,
    },

})

export default HomeScreen