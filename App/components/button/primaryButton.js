import React from "react"
import { View, Text, StyleSheet } from "react-native"
import * as color from "../../constant/color.js"

const componentName = (props) => (
    <View style={styles.container}>
        <Text style={styles.name}>{props.name}</Text>
    </View>
)
export default componentName

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color.purple400,
        elevation: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,

    },
    name: {
        color: color.white
    }
})
