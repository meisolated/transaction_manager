import color from "../constant/color.js"
import font from "../constant/font.js"
export default {
    container: {
        borderRadius: 10,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#fff",
    },
    divider: {
        height: 1,
        width: "80%",
        backgroundColor: color.littleDarkGrey,
        marginTop: 10,
        marginBottom: 10,
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    center_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    basic_text: {
        fontFamily: font.bold,
        fontSize: 22,
    },
    basic_text_semiBold_20: {
        fontFamily: font.semiBold,
        fontSize: 20,
    },
    number_text: {
        fontFamily: font.bold,
        fontSize: 16,
    },
    pd_left: {
        paddingLeft: 10,
    },
    pd_right: {
        paddingRight: 10,
    },
    btn_primary: {
        backgroundColor: color.primary,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    text_lite: (size) => {
        return {
            fontFamily: font.lite,
            fontSize: size,
        }
    }
}
