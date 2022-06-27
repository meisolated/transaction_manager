import React from "react"
import { View, Text, Button, StyleSheet, ScrollView, Pressable, FlatList, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { getAllTransactions } from "../database/get.js"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Feather as Icon } from "@expo/vector-icons"
import color, * as colors from "../constant/color.js"
import D from "../handler/Dimensions.handler.js"
import commonStyles from "../common/style.js"
import TopNav from "../Navigation/topNavbar.js"
import BottomNav from "../Navigation/bottomNavbar.js"
import { convertTimestamp } from "../util/functions.js"
let d = new D()
function OrderScreen(props) {
    const [transactions, setTransactions] = React.useState([])

    React.useEffect(() => {
        getAllTransactions().then((results) => {
            if (results.rows.length > 0) {
                setTransactions(results.rows._array)
            } else {
                setTransactions([{ total_amount: "No transactions found" }])
            }
        })
        return () => {
            setTransactions([])
        }
    }, [])

    const renderOrders = ({ index, item }) => {
        // console.log(item, index)
        return (
            <View key={index} style={style.listItem}>
                <View style={[{ width: 50, height: 50, backgroundColor: color.lightGrey, borderRadius: 10 }, commonStyles.center]}>
                    {item.payment_status == "paid" ? <Image source={require("../assets/img/paid.png")} style={{ width: 40, height: 40 }} /> : <Icon name={"x-circle"} size={40} color={colors.red400} />}
                </View>

                <View style={style.list_left}>
                    <Text style={[commonStyles.basic_text_semiBold_20]}>₹{item.total_amount}</Text>
                    <Text>{JSON.parse(item.items)[0]}</Text>
                </View>
                <Text style={commonStyles.text_lite(15)} >{convertTimestamp(item.modified_at)}</Text>
                <View style={style.list_right}>
                    {/* <Pressable style={[style.button_style, style.button_unpaid]}>
                        <Text style={style.button_text}>{item.payment_status}</Text>
                    </Pressable> */}
                    <MaterialCommunityIcons name="chevron-right" color={"black"} size={26} />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNav title="Orders List" />
            <View style={{ marginBottom: d.height * .15 }}>
                <FlatList data={transactions} renderItem={renderOrders} keyExtractor={(item) => item.id} />
            </View>
            <BottomNav navigation={props.navigation} />
        </SafeAreaView>
    )
}

export default OrderScreen

const style = StyleSheet.create({
    listItem: {
        width: d.width * 0.95,
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 8,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    list_left: {
        marginLeft: 10,
        flex: 1,
    },
    list_right: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button_text: {
        color: "#fff",
        fontSize: 10,
        textAlign: "center",
        textTransform: "uppercase",
    },
    button_paid: {
        backgroundColor: "#00ff00",
    },
    button_unpaid: {
        height: 25,
        alignItems: "center",
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: "#FF9500",
    },
})
