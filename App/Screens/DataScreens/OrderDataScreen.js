import React, { useMemo } from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Loading from "../../components/widgets/loading/index.js"
import ordersModel from "../../database/models/orders.model.js"
import BottomNavBar from "../../Navigation/bottomNavbar.js"
import TopNavbar from "../../Navigation/topNavbar.js"
import commonStyle from "../../common/style.js"
import color, * as colors from "../../constant/color.js"
import D from "../../handler/Dimensions.handler.js"
import { PrimaryButton } from "../../components/button/index.js"
import Toast from "../../handler/Toast.handler.js"
import { Feather as Icon } from "@expo/vector-icons"

let d = new D()
const OrderDataScreen = (props) => {
    let db_order = new ordersModel()
    let params = useMemo(() => {
        return props.route.params || {}
    }, [props.route.params])

    const [order, setOrder] = React.useState({ total_amount: null, payment_status: null })
    const [orderedItems, setOrderedItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (params.orderId) {
            db_order
                .getById(params.orderId)
                .then((order) => {
                    if (order) {
                        setOrder(order)
                        db_order.getItemsByOrderId(params.orderId).then(
                            (items) => {
                                setLoading(false)
                                setOrderedItems(items)
                            },
                            (err) => {
                                alert(err)
                            }
                        )
                        setOrder(order)
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
            .update(params.orderId, [order.shopId, order.items, order.total_amount, order.total_cost_amount, payment_status])
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title="Order Data" />
            {!loading ? (
                <View style={styles.container}>
                    <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 30 }]}>Total Amount: ₹{order.total_amount}</Text>
                    <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 25 }]}>Payment Status: {order.payment_status.toUpperCase()}</Text>
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
                                    <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 15 }]}>{item.product_price}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{ height: 50, marginBottom: 10 }}>
                        <PrimaryButton
                            onLongPress={onPressChangePaymentStatus}
                            onPress={() => Toast("Long Press to Mark as Paid or Unpaid")}
                            name={order.payment_status == "paid" ? "Mark as Unpaid" : "Mark as Paid"}
                            width={d.width * 0.9}
                        />
                    </View>
                    <View style={{ height: 50 }}>
                        <PrimaryButton onLongPress={opPressDeleteOrder} onPress={() => Toast("Long Press to Delete")} name={"DELETE"} width={d.width * 0.9} />
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
