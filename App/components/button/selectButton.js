import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import color from "../../constant/color.js"
import font from "../../constant/font.js"

const SelectButton = (props) => {
    let [selected, setSelected] = React.useState(1)
    function handlePress() {
        let x = selected == 1 ? 0 : 1
        setSelected(x)
    }
    return <View style={styles.container}>
        <Pressable onPress={() => handlePress()}>
            <View style={selected == 0 ? [styles.first_selected, styles.not_selected] : [styles.first_selected]}>
                <Text style={styles.text_style}>Paid</Text>
            </View>
        </Pressable>
        <Pressable onPress={() => handlePress()}>
            <View style={selected == 1 ? [styles.secound_selected, styles.not_selected] : [styles.secound_selected]}>
                <Text style={styles.text_style}>Unpaid</Text>
            </View>
        </Pressable>
    </View>
}
export default SelectButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        overflow: "hidden",
    },
    not_selected: {
        backgroundColor: color.darkGrey,
    },
    first_selected: {
        borderRadius: 5,
        flex: 1,
        backgroundColor: "#3EB489",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: "row",
    },
    secound_selected: {
        flex: 1,
        marginLeft: 5,
        backgroundColor: "#3EB489",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
    },
    text_style: {
        color: "#fff",
        fontSize: 15,
        fontFamily: font.semiBold,

    }
})
