import { View, Text, StyleSheet } from "react-native"
import React from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import color, * as colors from "../../constant/color.js"
import font from "../../constant/font.js"
import ordersModel from "../../database/models/orders.model.js"
import { numberSeparator } from "../../util/functions.js"
import { startAndEndOfDat } from "../../util/functions.js"
import LoadingCircle from "./loading/index.js"
function HomeScreenPrimary() {
    let today = startAndEndOfDat()
    let db_order = new ordersModel()
    let [widgetData, setWidgetData] = React.useState({ dailyTurnOver: 0, unpaid: 0, profit: 0, expense: 0 })
    let [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        db_order
            .getFinancialData(today.start, today.end)
            .then((orders) => {
                if (orders.length > 0) {
                    let total_amount = 0
                    let total_cost_price = 0
                    let total_unpaid = 0
                    orders.map((order, index) => {
                        total_amount += order.total_amount
                        total_cost_price += order.total_cost_amount
                        if (order.payment_status == "unpaid") {
                            total_unpaid += order.total_amount
                        }
                        setWidgetData({
                            dailyTurnOver: total_amount,
                            unpaid: total_unpaid,
                            profit: total_amount - total_cost_price,
                            expense: 0,
                        })
                        if (index == orders.length - 1) return setLoading(false)
                    })
                }
                else {
                    setLoading(false)
                }


            })
            .catch((err) => {
                alert(err)
            })
    }, [])


    return (
        <View style={[styles.daily_turnover, loading && { height: 200 }]}>
            {!loading ? <View style={{ flex: 1 }}>
                <View style={styles.primary_info}>
                    <View style={styles.daily_turnover_wrapper}>
                        <View style={styles.daily_turnover_number}>
                            <Text style={styles.common_text_style}>{numberSeparator(widgetData.dailyTurnOver)}</Text>
                            <View style={styles.change_in_turnover_wrapper}>
                                <Text style={styles.change_in_turnover}>20%</Text>
                                <MaterialCommunityIcons name="arrow-up-bold-circle" size={20} color={color.green} />
                            </View>
                        </View>
                        <Text style={styles.primary_info_bottom_text_style}>Daily Turnover</Text>
                    </View>
                    {/* <MaterialCommunityIcons name="minus" size={25} color={color.black} /> */}
                    <View style={styles.bottom_not_received_text}>
                        <Text style={styles.common_text_style}>{numberSeparator(widgetData.unpaid)}</Text>
                        <Text style={styles.primary_info_bottom_text_style}>Receivable/Unpaid/StockLeft</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.secondary_info}>
                    <View style={styles.todays_profit}>
                        <Text style={styles.common_text_style}>{numberSeparator(widgetData.profit)}</Text>
                        <Text style={styles.primary_info_bottom_text_style}>Today's Profit</Text>
                    </View>
                    <View style={styles.todays_opex}>
                        <Text style={styles.common_text_style}>{numberSeparator(widgetData.expense)}</Text>
                        <Text style={styles.primary_info_bottom_text_style}>Today's Operating Expense (OPEX)</Text>
                    </View>
                </View>
            </View> : <LoadingCircle color={colors.purple900} />}
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
