import { Feather as Icon } from "@expo/vector-icons"
import React, { useMemo } from "react"
import { View, Text, StyleSheet, Share, Linking } from "react-native"
import { PrimaryButton } from "../../components/button/index.js"
import LoadingCircle from "../../components/widgets/loading"
import ordersModel from "../../database/models/orders.model.js"
import shopsModel from "../../database/models/shops.model.js"
import commonStyle from "../../common/style.js"

import D from "../../handler/Dimensions.handler.js"
import TextInput from "../../components/Form/TextInput.js"
let d = new D()

const OrderAdded = (props) => {
    let db_order = new ordersModel()
    let db_shop = new shopsModel()
    let params = useMemo(() => {
        return props.route.params || {}
    }, [props.route.params])

    const [loading, setLoading] = React.useState(false)
    let [shareMessage, setShareMessage] = React.useState("")
    let [shop, setShop] = React.useState({ name: null, address: null, phone: null, picture: null, qr_code: null })
    let [order, setOrder] = React.useState({})

    const onTextChange = (text) => {
        setShop({ ...shop, phone: text })
    }

    React.useEffect(() => {
        let message = ""
        params.cart.map((item, index) => {
            message = message + "*" + item.name.toUpperCase() + " [" + item.quantity + " x " + item.price + "] = ₹" + item.quantity * item.price + "." + "*\n"
            if (params.cart.length - 1 == index) {
                setShareMessage(message)
            }
        })
        // -------------------------------------------------
        // -------------------------------------------------
        if (params.cart && params.cartData) {
            let cartData = params.cartData
            let cart = params.cart
            //get shop data
            db_shop
                .get(cartData.shopId)
                .then((shop) => {
                    if (!shop.phone && typeof shop.number === "number") {
                        setShop({ phone: null, name: shop.name, address: shop.address, picture: shop.picture, qr_code: shop.qr_code })
                    } else {
                        setShop({ phone: shop.phone, name: shop.name, address: shop.address, picture: shop.picture, qr_code: shop.qr_code })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            placeOrder()

            // place order
        }
    }, [props.orderData, props.orderItems])

    const placeOrder = () => {
        let cartData = params.cartData
        let cart = params.cart
        if (cartData && cart) {
            let items = []
            cart.map((item) => items.push(item.name))
            db_order
                .addNew([cartData.shopId, JSON.stringify(items), cartData.totalPrice, cartData.costPrice, cartData.paymentStatus])
                .then((result) => {
                    console.log("Order PLaced Successfully")
                    params.cart.map((item, index) => {
                        console.log(item)
                        db_order
                            .addNewItem([result.insertId, item.name, item.quantity, item.price, item.cost_price])
                            .catch((err) => {
                                console.log(err)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            alert("Please select items")
        }
    }

    const onShare = async () => {
        db_shop
            .updateById(params.cartData.shopId, [shop.name, shop.address, shop.phone, shop.picture, shop.qr_code])
            .then((result) => { })
            .catch((err) => {
                console.log(err)
            })
        let symbol = params.cartData.paymentStatus.toUpperCase() == "PAID" ? "✅" : "❌"
        Linking.openURL(
            `whatsapp://send?text=${shareMessage}\n*Total Price: ${params.cartData.totalPrice}*\n*Payment Status: ${params.cartData.paymentStatus.toUpperCase()} ${symbol}*&phone="+91 ${shop.phone}"`
        )
    }

    return (
        <View style={styles.container}>
            {loading && <LoadingCircle color="black" />}
            <Icon name="check-circle" size={50} color="green" />
            <Text style={commonStyle.basic_text_semiBold_20}>Order Placed</Text>
            {/* <Text style={commonStyle.basic_text_semiBold_20} >Order ID: {params.orderData.orderId}</Text> */}
            <Text style={commonStyle.basic_text_semiBold_20}>Total Amount: ₹{params.cartData.totalPrice}</Text>
            <Text style={commonStyle.basic_text_semiBold_20}>Payment Status: {params.cartData.paymentStatus.toUpperCase()}</Text>
            <TextInput type="numeric" onChange={onTextChange} length={10} placeholder="Enter Shop Phone Number" icon="hash" style={{ height: 50, width: d.width * 0.9 }} value={shop.phone} />
            <View style={{ height: 50, width: d.width * 0.9 }}>
                <PrimaryButton width={d.width * 0.95} name="Send via WhatsApp" onPress={onShare} />
            </View>
            {/* <View style={{ height: 50, width: d.width * 0.9, marginTop: 10 }}>
                <PrimaryButton width={d.width * 0.95} name="Place Order" onPress={placeOrder} />
            </View> */}
        </View>
    )
}
export default OrderAdded

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
