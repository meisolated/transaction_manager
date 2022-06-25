import React from "react"
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from "react-native"

import commonStyle from "../../common/style.js"
import * as colors from "../../constant/color.js"
const window = Dimensions.get("window")

const OuterLineBtn = (props) => (
    <View style={styles.container}>
        <Text style={commonStyle.basic_text}>{props.text}</Text>
    </View>
)
export default OuterLineBtn

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: window.width * 0.9,
        height: 50,
        borderColor: colors.deepPurpleA100,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        marginBottom: 10,

    }
})