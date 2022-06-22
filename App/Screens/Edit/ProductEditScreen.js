import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import TextInput from "../../components/Form/TextInput.js"
import BottomNavBar from "../../Navigation/bottomNavbar.js"
import TopNavbar from "../../Navigation/topNavbar.js"



export default function ProductEditScreen(props) {
    let [productData, setProductData] = React.useState({ one: "", two: "" })
    console.log(productData)

    return (
        <SafeAreaView style={style.container}>
            <TopNavbar title="Edit Product" />
            <View style={style.main}>
                <TextInput placeholder="Name" icon="user" onChange={(data) => setProductData({ ...productData, one: data })} />
                <TextInput placeholder="Description (optional)" icon="align-center" onChange={(data) => setProductData({ ...productData, two: data })} />
                <TextInput placeholder="Phone Number" icon="phone" onChange={(data) => setProductData({ ...productData, two: data })} />
                <Text>Attributes</Text>
            </View>
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        alignItems: "flex-start",
        textAlign: "center"
    }

})
