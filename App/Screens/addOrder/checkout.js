import React, { useMemo } from "react"
import { ScrollView, View, Text, Animated, StyleSheet, Dimensions, Easing, Pressable, Button, Image } from "react-native"
import commonStyle from "../../common/style.js"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { _tempOrder, _tempProducts, _getProductName, _getProductAttribute } from "../../temp/testingData.js"
import color, * as colors from "../../constant/color.js"
import font from "../../constant/font.js"
import { connect } from "react-redux"
import { numberSeparator } from "../../util/functions.js"
import { PrimaryButton } from "../../components/button/index.js"
import SelectButton from "../../components/button/selectButton.js"
import productsModel from "../../database/models/products.model.js"
import LoadingCircle from "../../components/widgets/loading/index.js"
import { Feather as Icon } from "@expo/vector-icons"
import shopsModel from "../../database/models/shops.model.js"
import Toast from "../../handler/Toast.handler.js"

const window = Dimensions.get("window")


function Checkout({ orderStateUpdate, cart, updateCart, clearCart, removeFromCart, addItemToCard, getBack, navigation, qrCodeCallback }) {

    const db_shop = new shopsModel()
    const [total, setTotal] = React.useState({ cost: 0, total: 0 })
    const [loading, setLoading] = React.useState(true)
    const [cartData, setCartData] = React.useState({ paymentStatus: "unpaid", qrCode: null, shopId: null })
    const db_product = new productsModel()

    const setShopId = (qr) => {
        db_shop.getShopByQrCode(qr).then(shop => {
            if (shop !== undefined) {
                setCartData({ ...cartData, shopId: shop.shop_id, qrCode: qr })
            }
            else {
                db_shop.add(["Automatic", "nill", "", "nill", qr]).then(shop => {
                    setCartData({ ...cartData, shopId: shop.shopId, qrCode: qr })
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log("err", err)
        })
    }

    React.useEffect(() => {
        if (qrCodeCallback) {
            setShopId(qrCodeCallback)
        }
        if (addItemToCard) {
            setLoading(true)
            handlePress(addItemToCard)
        }
    }, [qrCodeCallback, addItemToCard])

    function handlePress(addItemToCard) {
        db_product.getById(addItemToCard.productId).then(product => {
            let _p = product
            db_product.getAttributesById(addItemToCard.productAttributeId).then(attributes => {
                let _a = attributes[0]
                let _product = {
                    id: _p.id,
                    name: _p.name,
                    product_id: _p.product_id,
                    quantity: 1,
                    price: _a.price,
                    cost_price: _a.cost_price,
                    metric: _a.number + " " + _a.metric,
                }
                orderStateUpdate(_product)
                setLoading(false)
            })
        })
        // let cartItem = _tempOrder[0]
        // cartItem.name = _getProductName(cartItem.id)
        // const productAttribute = _getProductAttribute(cartItem.product_id)[0]
        // cartItem.metric = productAttribute.weight + productAttribute.unit
        // orderStateUpdate(cartItem)
    }

    function handleQRCodeScan() {
        navigation.navigate("QRCodeScanner", { order: addItemToCard })
    }

    function handlerCheckout() {
        if (!cartData.shopId) return alert("Please scan QR code")
        clearCart()
        navigation.navigate("OrderAdded", { cart, cartData: { ...cartData, totalPrice: total.total, costPrice: total.cost } })
    }

    function _updateCart(cartItem, quantity) {
        if (cartItem.quantity + quantity < 1) return removeFromCart(cartItem)
        updateCart(cartItem.id, quantity)
    }
    function _cartTotal() {
        let total = 0
        let costTotal = 0
        cart.map((item) => {
            total += item.price * item.quantity
            costTotal += item.cost_price * item.quantity
        })
        setTotal({ ...total, total: total, cost: costTotal })
    }
    React.useEffect(() => {
        _cartTotal()
    }, [cart])

    if (loading)
        return (
            <View style={{ alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                <LoadingCircle color="black" />
            </View>
        )
    return (
        <View style={checkoutStyle.main_container}>
            <View style={[checkoutStyle.container]}>
                <ScrollView style={{}}>
                    <Button title="Add Item" onPress={() => getBack()} />
                    <Text style={commonStyle.basic_text}>Review Items</Text>
                    {cart.map((item, index) => {
                        return (
                            <View key={index} style={[checkoutStyle.item_container, commonStyle.center]}>
                                <View style={checkoutStyle.basic_wrapper}>
                                    <View style={checkoutStyle.cart_item_image_wrapper}>
                                        <Image source={require("../../assets/img/milk.png")} style={checkoutStyle.cart_item_image} /></View>
                                    <View style={checkoutStyle.product_details}>
                                        <Text style={checkoutStyle.item_title}>{item.name}</Text>
                                        <Text style={checkoutStyle.item_subtitle}>{item.metric}</Text>
                                    </View>
                                    <View style={checkoutStyle.quantity_selector}>
                                        <Pressable onPress={() => _updateCart(item, -1)}>
                                            <MaterialCommunityIcons style={commonStyle.pd_right} name="minus" size={20} color={color.black} />
                                        </Pressable>
                                        <Text style={[commonStyle.number_text, checkoutStyle.quantity_number]}>{item.quantity}</Text>
                                        <Pressable onPress={() => _updateCart(item, +1)}>
                                            <MaterialCommunityIcons style={commonStyle.pd_left} name="plus" size={20} color={color.black} />
                                        </Pressable>
                                    </View>
                                </View>

                                <View style={checkoutStyle.total_cart_item_price}>
                                    <Text style={commonStyle.number_text}>{numberSeparator(item.price * item.quantity)}</Text>
                                </View>
                            </View>
                        )
                    })}
                    <View style={{ height: 250 }}></View>
                </ScrollView>
            </View>
            <View style={checkoutStyle.order_details}>
                <View style={checkoutStyle.order_settings_wrapper}>
                    <Text style={checkoutStyle.order_settings_title}>Order Settings</Text>
                    <View style={[checkoutStyle.order_settings]}>
                        <SelectButton option1="paid" option2="unpaid" selected={cartData.paymentStatus == "paid" ? 1 : 0} onPress={(x) => setCartData({ ...cartData, paymentStatus: x })}></SelectButton>
                        <Pressable onPress={() => handleQRCodeScan()} style={{ flex: 1 }}>
                            <View style={[checkoutStyle.shop_selected, cartData.qrCode ? { backgroundColor: colors.green600 } : null]}>
                                <Text>{cartData.qrCode ? <Icon name={"check"} size={30} color={colors.white} /> : "Not Selected"}</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
                <View style={checkoutStyle.total_price_wrapper}>
                    <Text style={[commonStyle.basic_text, checkoutStyle.total_text]}>Total:</Text>
                    <Text style={[commonStyle.number_text, checkoutStyle.total_price]}>{numberSeparator(total.total)}</Text>
                    {/* <Button title="Checkout" onPress={() => handlePress()} /> */}
                    <PrimaryButton width={window.width * .5} name="Checkout" onLongPress={() => handlerCheckout()} onPress={() => Toast("Long Press to Checkout")} />
                </View>
            </View>
        </View >
    )
}

const checkoutStyle = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    container: {
        marginTop: 10,
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20,
        padding: 10,
        backgroundColor: color.white,
    },
    item_container: {
        flexDirection: "row",
        marginTop: 10,
    },
    item_title: {
        fontSize: font.md,
        fontFamily: font.semiBold,
    },
    item_subtitle: {
        fontFamily: font.semiBold,
        color: color.darkGrey,
    },
    cart_item_image_wrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: 45,
        height: 45,
        backgroundColor: color.backgroundColor,
        borderRadius: 5,
        marginRight: 10,

    },
    cart_item_image: {
        width: 40,
        height: 40,
        padding: 5,
    },
    basic_wrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    product_details: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },

    quantity_number: {
        justifyContent: "center",
        textAlign: "center",
    },
    quantity_selector: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: color.littleDarkGrey,
        padding: 5,
        borderRadius: 5,
    },
    total_cart_item_price: {
        width: "20%",
        alignItems: "flex-end",
    },
    total_price: {
        fontSize: font.md,
        marginLeft: 10,
        flex: 1,
    },
    total_price_wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    order_details: {
        width: "100%",
        backgroundColor: color.white,
        position: "absolute",
        bottom: 60,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: color.littleDarkGrey,
    },
    order_settings_wrapper: {
        flex: 1,
        width: "100%",
        borderBottomWidth: 1,
        borderColor: color.littleDarkGrey,
        flexDirection: "column",
        textAlign: "left",
    },
    order_settings: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    shop_selected: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: color.littleDarkGrey,
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    order_settings_title: {
        marginTop: 8,
        fontSize: font.md,
        fontFamily: font.semiBold,
        marginLeft: 10,
    },
})

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        orderStateUpdate: (order) => dispatch({ type: "ADD_CART", payload: order }),
        updateCart: (cartItemID, quantity) => dispatch({ type: "UPDATE_CART", payload: { cartItemID, quantity } }),
        removeFromCart: (cartItem) => dispatch({ type: "REMOVE_CART", payload: cartItem }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
// -------------------------------------------------END---------------------------------------------------------------------

