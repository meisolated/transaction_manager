import { StyleSheet, View, Text } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import color from "../constant/color.js"
import font from "../constant/font.js"

function topNavbar(props) {
    return (
        <View style={style.container}>
            <View style={style.topNavItem_wrapper}>
                <View style={style.left_icons}>
                    <Text style={style.screen_title}>{props.title}</Text>
                </View>
                <View style={style.right_icons}>
                    <MaterialCommunityIcons style={style.icon} name="bell" color={color.black} size={26} />
                    <MaterialCommunityIcons style={style.icon} name="plus-circle-outline" color={color.black} size={26} />
                </View>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    left_icons: {
        left: 0,
        flexDirection: "row",
    },
    right_icons: {
        right: 0,
        flexDirection: "row",
        marginRight: 5,
    },
    icon: {
        marginLeft: 5,
    },
    container: {
        backgroundColor: color.white,
        top: 0,
        left: 0,
        width: "100%",
        // flex: 1,
        flexDirection: "column",
    },

    topNavItem_wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: color.white,
        elevation: 2,
        borderTopColor: color.lightGrey,
        height: 60,
        width: "100%",
        top: 0,
    },
    screen_title: {
        fontSize: 20,
        fontFamily: font.bold,
        color: color.black,
    }
})

export default topNavbar
