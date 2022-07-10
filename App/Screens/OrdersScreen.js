import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PrimaryButton } from "../components/button/index.js"
import ordersModel from "../database/models/orders.model.js"
import shopsModel from "../database/models/shops.model.js"
import { convertTimestamp } from "../util/functions.js"
import BottomNav from "../Navigation/bottomNavbar.js"
import color, * as colors from "../constant/color.js"
import { Feather as Icon } from "@expo/vector-icons"
import Loading from "../components/widgets/loading"
import D from "../handler/Dimensions.handler.js"
import TopNav from "../Navigation/topNavbar.js"
import commonStyles from "../common/style.js"
import React, { useMemo } from "react"
let d = new D()

function OrderScreen(props) {
    const params = useMemo(() => {
        return props.route.params || {}
    }, [props.route.params])
    let db_orders = new ordersModel()
    let db_shop = new shopsModel()

    const [orders, setOrders] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        db_orders.getAll().then((results) => {
            setLoading(false)
            if (results.length > 0) {
                setOrders(results)
            } else {
                setOrders([])
            }
        })
        return () => {
            setLoading(false)
            setOrders([])
        }
    }, [])

    const onItemPress = (order_id) => {
        props.navigation.navigate("OrderData", { orderId: order_id })
    }

    const onButtonPress = () => {
        props.navigation.navigate("QRCodeScanner")
    }

    React.useEffect(() => {
        if (params.qr_code) {
            db_shop
                .getShopByQrCode(params.qr_code)
                .then((shop) => {
                    if (shop) {
                        db_orders.getByShopId(shop.id).then((orders) => {
                            setLoading(false)
                            if (orders.length > 0) {
                                setOrders(orders)
                            } else {
                                setOrders([])
                            }
                        })
                    } else {
                        setLoading(false)
                        alert("Shop not found")
                    }
                })
                .catch((err) => {
                    setLoading(false)
                    alert(err)
                })
        }
    }, [params.qr_code])

    const renderOrders = ({ index, item }) => {
        return (
            <Pressable onPress={() => onItemPress(item.order_id)} style={{ flex: 1 }}>
                <View key={index} style={style.listItem}>
                    <View style={[{ width: 50, height: 50, backgroundColor: color.lightGrey, borderRadius: 10 }, commonStyles.center]}>
                        {item.payment_status == "paid" ? <Image source={require("../assets/img/paid.png")} style={{ width: 40, height: 40 }} /> : <Icon name={"x-circle"} size={40} color={colors.red400} />}
                    </View>

                    <View style={style.list_left}>
                        <Text style={[commonStyles.basic_text_semiBold_20]}>₹{item.total_amount}</Text>
                        <Text>{JSON.parse(item.items)[0]}</Text>
                    </View>
                    <Text style={commonStyles.text_lite(15)}>{convertTimestamp(item.modified_at * 1000)}</Text>
                    <View style={style.list_right}>
                        <MaterialCommunityIcons name="chevron-right" color={"black"} size={26} />
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNav title="Orders List" />
            <View style={{ marginBottom: d.height * 0.2 }}>
                {orders.length > 0 ? (
                    <FlatList data={orders} renderItem={renderOrders} keyExtractor={(item) => item.id} />
                ) : (
                    <View>
                        <Text> No Order</Text>
                    </View>
                )}
                {loading && (
                    <View style={{ alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                        <Loading color="black" />
                    </View>
                )}
            </View>
            <View style={{ flex: 1, position: "absolute", bottom: 70, width: "100%" }}>
                <PrimaryButton name="Scan QR Code" width={d.width * 0.95} onPress={onButtonPress} />
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
