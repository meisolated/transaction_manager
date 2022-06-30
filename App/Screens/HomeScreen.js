import React from "react"
import { View, Text, Button, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { createTables, deleteAllTables, insertDummyData, localStorage } from "../database/initializeDatabase.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import TopNavbar from "../Navigation/topNavbar.js"
import HomeScreenPrimary from "../components/widgets/HomeScreenPrimary.widget.js"

function HomeScreen(props) {
    let [get, set] = React.useState({})

    return (
        <SafeAreaView style={styles.container}>
            <TopNavbar title={"Home"} />
            <ScrollView>
                <View style={{ flex: 1, marginBottom: 100 }}>
                    <HomeScreenPrimary />
                    <Button title="Go to Transactions" onPress={() => props.navigation.navigate("Transactions")} />
                    <Button title="Add Transactions" onPress={() => props.navigation.navigate("AddTransactions")} />
                    <Button title="Admin" onPress={() => props.navigation.navigate("Admin")} />
                    <Button title="EditProduct" onPress={() => props.navigation.navigate("ProductData")} />
                    <Button title="TestScreen" onPress={() => props.navigation.navigate("TestScreen")} />
                    <Button title="AddOrder" onPress={() => props.navigation.navigate("AddOrder")} />
                    {/* <Button title="CameraScreen" onPress={() => props.navigation.navigate("CameraScreen")} /> */}
                    <Text>Change Things into Database</Text>
                    <Button title="Insert dummy data" onPress={() => insertDummyData()} />
                    <Button title="Create Tables" onPress={() => createTables((x) => set(x))} />
                    <Button title="Delete All Tables" onPress={() => deleteAllTables((x) => set(x))} />
                    <Text>{JSON.stringify(get)}</Text>
                </View>
            </ScrollView>
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },

})

export default HomeScreen