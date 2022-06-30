import React from "react"
import { View, Text, StyleSheet } from "react-native"

const OrderDataScreen = (props) => (
    <View style={styles.container}>
        <Text>OrderDataScreen</Text>
    </View>
)
export default OrderDataScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
