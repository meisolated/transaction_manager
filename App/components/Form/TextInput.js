import React, { useEffect } from "react"
import { View, Text, StyleSheet, TextInput as RNTextInput, Dimensions } from "react-native"
import { Feather as Icons } from "@expo/vector-icons"
import color from "../../constant/color.js"
import * as otherColors from "../../constant/color.js"


let window = Dimensions.get("window")

export default function TextInput(props) {
    const [text, onChangeText] = React.useState("")
    const [focus, setFocus] = React.useState(false)

    function onInputChange(change) {
        onChangeText(change)
        props.onChange(change)
    }


    let placeholder = props.placeholder || "Enter something here"
    let icon = props.icon || "user"
    let length = props.length || 100
    let type = props.type || "default"
    let defaultValue = props.value || ""
    // if (focus == false) {
    //     props.onChange(text)
    // }
    useEffect(() => {
        onChangeText(props.value)
    }, [])
    return (
        <View style={focus || text?.length > 0 || props.value?.length > 0 ? [style.input_text_container, style.input_text_on_focus] : [style.input_text_container]}>
            <Icons name={icon} style={style.icon} size={20} />
            <RNTextInput maxLength={length} onEndEditing={() => setFocus(false)} onFocus={() => setFocus(true)} style={style.input} onChangeText={onInputChange} value={defaultValue} placeholder={placeholder} keyboardType={type} />
            {text?.length > 0 || props.value?.length > 0 ? <Icons name="check-circle" style={{ color: otherColors.green500, alignContent: "flex-end" }} size={20} /> : null}
        </View>
    )
}

const style = StyleSheet.create({
    input_text_container: {
        width: window.width - 40,
        height: 50,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: otherColors.transparent,
    },
    icon: {
        marginRight: 10
    },
    input_text_on_focus: {
        borderWidth: 1,
        borderColor: otherColors.deepPurpleA100,
    },
    input: {
        width: window.width * 0.7,
    }
})
