import React from "react"
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native"
import * as color from "../../constant/color.js"
import font from "../../constant/font.js"

const componentName = (props) => (
    <Pressable style={{ alignSelf: "center" }} onPress={() => props.onPress()}>
        <View style={[styles.container, { width: props.width }]}>
            <Text style={styles.name}>{props.name}</Text>
        </View>
    </Pressable>
)
export default componentName

const styles = StyleSheet.create({
    container: {
        flex: 1,
        selfAlign: "center",
        alignItems: "center",
        backgroundColor: color.purple400,
        elevation: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
    },
    name: {
        color: color.white,
        fontFamily: font.semiBold,
        fontSize: 20,
    },
})
