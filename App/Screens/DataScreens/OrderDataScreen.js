import { PrimaryButton } from "../../components/button/index.js"
import Loading from "../../components/widgets/loading/index.js"
import ordersModel from "../../database/models/orders.model.js"
import { SafeAreaView } from "react-native-safe-area-context"
import BottomNavBar from "../../Navigation/bottomNavbar.js"
import color, * as colors from "../../constant/color.js"
import { View, Text, StyleSheet } from "react-native"
import TopNavbar from "../../Navigation/topNavbar.js"
import { Feather as Icon } from "@expo/vector-icons"
import D from "../../handler/Dimensions.handler.js"
import Toast from "../../handler/Toast.handler.js"
import commonStyle from "../../common/style.js"
import React, { useMemo } from "react"
import shopsModel from "../../database/models/shops.model.js"
let d = new D()

const OrderDataScreen = (props) => {
    const db_order = new ordersModel()
    const db_shop = new shopsModel()

    let params = useMemo(() => {
        return props.route.params || {}
    }, [props.route.params])

    const [order, setOrder] = React.useState({ total_amount: null, payment_status: null })
    const [shop, setShop] = React.useState({ name: null, address: null, phone: null, picture: null, qr_code: null })
    const [orderedItems, setOrderedItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (params.orderId) {
            db_order
                .getById(params.orderId)
                .then((order) => {
                    if (order) {
                        setOrder(order)
                        db_shop
                            .getByShopId(order.shop_id)
                            .then((shop) => {
                                setShop(shop[0])
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                        db_order.getItemsByOrderId(params.orderId).then(
                            (items) => {
                                setLoading(false)
                                setOrderedItems(items)
                            },
                            (err) => {
                                alert(err)
                            }
                        )
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        }
    }, [params.orderId])

    const onPressChangePaymentStatus = () => {
        let payment_status = order.payment_status == "paid" ? "unpaid" : "paid"
        db_order
            .update(params.orderId, [order.shop_id, order.items, order.total_amount, order.total_cost_amount, payment_status])
            .then((order) => {
                Toast("Order " + payment_status)
                props.navigation.navigate("OrdersScreen")
            })
            .catch((e) => alert(e))
    }
    const opPressDeleteOrder = () => {
        db_order
            .deleteOrder(params.orderId)
            .then((order) => {
                Toast("Order Deleted")
                props.navigation.navigate("OrdersScreen")
            })
            .catch((e) => alert(e))
    }
    const onPressOpenShop = () => {
        props.navigation.navigate("ShopData", { shopId: shop.shop_id })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title="Order Data" />
            {!loading ? (
                <View style={styles.container}>
                    <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 40, textDecorationLine: "underline" }]}>{shop.name}</Text>
                    <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 30 }]}>Total Amount: ₹{order.total_amount}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignContent: "center" }}>
                        <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 25 }]}>Payment Status: </Text>
                        <Text
                            style={[commonStyle.basic_text_semiBold_20, { fontSize: 20, backgroundColor: order.payment_status == "paid" ? colors.green500 : colors.red500, color: "white", padding: 5, borderRadius: 5 }]}
                        >
                            {order.payment_status.toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.items_border}>
                        <Text style={[commonStyle.basic_text_semiBold_20, { marginBottom: 5 }]}>Ordered Items</Text>
                        {orderedItems.map((item, index) => {
                            return (
                                <View style={styles.item_wrapper} key={index}>
                                    <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 15 }]}>{item.product_name}</Text>
                                    <Icon name="minus" size={15} color={"black"} />
                                    <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 15 }]}>[ {item.quantity}</Text>
                                    <Icon name="x" size={15} color={"black"} />
                                    <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 15 }]}>{item.product_price} ]</Text>
                                    <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 15 }]}>{item.product_price * item.quantity}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{ height: 50, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", width: d.width * 0.9 }}>
                        <PrimaryButton
                            // color={order.payment_status == "paid" ? colors.red600 : colors.green700}
                            onLongPress={onPressChangePaymentStatus}
                            onPress={() => Toast("Long Press to Mark as Paid or Unpaid")}
                            name={order.payment_status == "paid" ? "Mark as Unpaid" : "Mark as Paid"}
                            width={d.width * 0.4}
                        />
                        <PrimaryButton onLongPress={onPressOpenShop} onPress={() => Toast("Long Press to Mark as Paid or Unpaid")} name={"Open Shop"} width={d.width * 0.4} />
                    </View>
                    <View style={{ height: 50 }}>
                        <PrimaryButton color={colors.red500} onLongPress={opPressDeleteOrder} onPress={() => Toast("Long Press to Delete")} name={"DELETE"} width={d.width * 0.9} />
                    </View>
                </View>
            ) : (
                <Loading color="black" />
            )}
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}
export default OrderDataScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    items_border: {
        // elevation: 1,
        borderWidth: 1,
        borderColor: color.darkGrey,
        backgroundColor: color.backgroundColor,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    item_wrapper: {
        width: d.width * 0.8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: color.white,
    },
})
