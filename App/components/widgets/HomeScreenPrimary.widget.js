import { View, Text, StyleSheet } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import color from "../../constant/color.js"
import font from "../../constant/font.js"
import { numberSeparator } from "../../util/functions.js"

function HomeScreenPrimary() {
    return (
        <View style={styles.daily_turnover}>
            <View style={styles.primary_info}>
                <View style={styles.daily_turnover_wrapper}>
                    <View style={styles.daily_turnover_number}>
                        <Text style={styles.common_text_style}>{numberSeparator(500000)}</Text>
                        <View style={styles.change_in_turnover_wrapper}>
                            <Text style={styles.change_in_turnover}>20%</Text>
                            <MaterialCommunityIcons name="arrow-up-bold-circle" size={20} color={color.green} />
                        </View>
                    </View>
                    <Text style={styles.primary_info_bottom_text_style}>Daily Turnover</Text>
                </View>
                {/* <MaterialCommunityIcons name="minus" size={25} color={color.black} /> */}
                <View style={styles.bottom_not_received_text}>
                    <Text style={styles.common_text_style}>{numberSeparator(5000)}</Text>
                    <Text style={styles.primary_info_bottom_text_style}>Receivable/Unpaid/StockLeft</Text>
                </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.secondary_info}>
                <View style={styles.todays_profit}>
                    <Text style={styles.common_text_style}>{numberSeparator(5808)}</Text>
                    <Text style={styles.primary_info_bottom_text_style}>Today's Profit</Text>
                </View>
                <View style={styles.todays_opex}>
                    <Text style={styles.common_text_style}>{numberSeparator(5808)}</Text>
                    <Text style={styles.primary_info_bottom_text_style}>Today's Operating Expense (OPEX)</Text>
                </View>
            </View>
        </View>
    )
}

export default HomeScreenPrimary

const styles = StyleSheet.create({
    common_text_style: {
        fontFamily: font.bold,
        fontSize: 22,
    },

    daily_turnover: {
        elevation: 2,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,

        flexDirection: "column",
        padding: 10,
        backgroundColor: color.white,
    },
    daily_turnover_number: {
        flexDirection: "row",
    },
    primary_info: {
        padding: 10,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    change_in_turnover_wrapper: {
        top: -5,
        marginLeft: 5,
        flexDirection: "row",
    },
    change_in_turnover: {
        fontFamily: font.bold,
        color: color.green,
        fontSize: 15,
    },
    daily_turnover_wrapper: {
        flex: 1,
        flexDirection: "column",
    },
    divider: {
        height: 1,
        backgroundColor: color.littleDarkGrey,
        marginTop: 10,
        marginBottom: 10,
    },
    primary_info_bottom_text_style: {
        fontFamily: font.medium,
        color: color.darkGrey,
        fontSize: 12,
    },
    secondary_info: {
        padding: 10,
        flexDirection: "row",
    },
    bottom_not_received_text: {
        flex: 1,
        paddingLeft: 10,
    },
    todays_profit: {
        flex: 1,
        alignItems: "flex-start",
        flexDirection: "column",
    },
    todays_opex: {
        paddingLeft: 10,
        flex: 1,
        right: 0,
        flexDirection: "column",
    },
})
