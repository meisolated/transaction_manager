import React from "react"
import { View, Text, StyleSheet } from "react-native"

const ShopData = (props) => {
    let shopId = props.route.params.shopId
    let type = shopId ? shopId : "new"
    console.log(props)

    return (
        <View style={styles.container}>
            <Text>{type}</Text>
        </View>
    )
}
export default ShopData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
