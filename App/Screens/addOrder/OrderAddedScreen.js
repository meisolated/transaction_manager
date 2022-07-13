import { Feather as Icon } from "@expo/vector-icons"
import React, { useMemo } from "react"
import { View, Text, StyleSheet, Linking } from "react-native"
import { PrimaryButton } from "../../components/button/index.js"
import LoadingCircle from "../../components/widgets/loading"
import ordersModel from "../../database/models/orders.model.js"
import shopsModel from "../../database/models/shops.model.js"
import commonStyle from "../../common/style.js"
import D from "../../handler/Dimensions.handler.js"
import TextInput from "../../components/Form/TextInput.js"
import ToastHandler from "../../handler/Toast.handler.js"
import { numberSeparator } from "../../util/functions.js"
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

    const onTextChange = (text) => {
        setShop({ ...shop, phone: text })
    }

    React.useEffect(() => {
        let message = ""
        params.cart.map((item, index) => {
            message = message + "*" + item.name.toUpperCase() + " 『" + item.quantity + " x " + item.price + "』 ⥤  ₹" + item.quantity * item.price + "." + "*\n"
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
                    params.cart.map((item, index) => {
                        db_order
                            .addNewItem([result.id, item.name, item.quantity, item.price, item.cost_price])
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
            .then((result) => {
                ToastHandler("Shop details updated")
            })
            .catch((err) => {
                ToastHandler("Error updating shop details")
            })
        let header = "```[            " + shop.name + "            ]```\n\n"
        let symbol = params.cartData.paymentStatus.toUpperCase() == "PAID" ? "✅" : "❌"
        const end = "\n```[      🌟Thank You🌟      ]```\n\n"
        Linking.openURL(
            `whatsapp://send?text=${header + shareMessage}\n*Total Price: ${numberSeparator(params.cartData.totalPrice)}*\n*Payment Status: ${params.cartData.paymentStatus.toUpperCase()} ${symbol}* \n${end}\n&phone="+91 ${shop.phone}"`
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
            <TextInput type="default" onChange={(t) => setShop({ ...shop, name: t })} length={10} placeholder="Name" icon="user" style={{ height: 50, width: d.width * 0.9 }} value={shop.name} />
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
