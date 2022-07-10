import React from "react"
import { View, Text, Button, StyleSheet, ScrollView, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { createTables, deleteAllTables, insertDummyData, localStorage } from "../database/initializeDatabase.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import TopNavbar from "../Navigation/topNavbar.js"
import HomeScreenPrimary from "../components/widgets/HomeScreenPrimary.widget.js"
import * as colors from "../constant/color.js"
import { randomIdGenerator } from "../util/functions.js"


function HomeScreen(props) {

    React.useEffect(() => {
        createTables()
        // insertDummyData()
    }, [])

    const onDummyData = () => insertDummyData()



    return (
        <SafeAreaView style={styles.container}>

            <TopNavbar title={"Home"} />
            <ScrollView>
                <View style={{ flex: 1, marginBottom: 100 }}>
                    <HomeScreenPrimary />
                    <Button title={"Admin"} onPress={() => props.navigation.navigate("Admin")} />
                    <Button title={"LoginAndSignup"} onPress={() => props.navigation.navigate("LoginAndSignup")} />
                    <Button title={"Dummy"} onPress={() => onDummyData()} />
                    <Button title={"Delete All Tables"} onPress={() => deleteAllTables(() => console.log("done"))} />
                    <Button title={"randomIdGenerator"} onPress={() => randomIdGenerator()} />
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