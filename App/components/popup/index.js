import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import font from "../../constant/font.js"

const Popup = (props) => {
    let options = props.options || ["option1", "option2", "option3"]
    let final_array = options.map((option, index) => {
        if (typeof option === "string") {
            return option
        } else {
            return option.name
        }
    })

    return (
        <View style={styles.container}>
            <Text style={{ color: "#ffff", fontFamily: font.bold, fontSize: 25 }}> Pick One Option</Text>
            {final_array.map((item, index) => (
                <Pressable key={index} onPress={() => props.return(item)}>
                    <View style={styles.options}>
                        <Text style={styles.option_text}>{item}</Text>
                    </View>
                </Pressable>
            ))}
        </View>
    )
}
export default Popup

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        flex: 1,
        width: "100%",
        height: "120%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.85)",
    },
    options: {
        backgroundColor: "#ffff",
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    option_text: {
        fontFamily: font.bold,
        fontSize: 20,
        color: "#000000",
    },
})
