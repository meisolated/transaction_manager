import React from "react"
import { ScrollView, View, Text, Animated, StyleSheet, Easing, Pressable, Button } from "react-native"
import commonStyle from "../../common/style.js"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { _tempOrder, _tempProducts, _getProductName, _getProductAttribute } from "../../temp/testingData.js"
import color from "../../constant/color.js"
import font from "../../constant/font.js"
import { connect } from "react-redux"
import { numberSeparator } from "../../util/functions.js"
import { PrimaryButton } from "../../components/button/index.js"
import SelectButton from "../../components/button/selectButton.js"

function Checkout({ orderStateUpdate, cart, updateCart, removeFromCart }) {
    const [total, setTotal] = React.useState(0)

    function handlePress() {
        let cartItem = _tempOrder[0]
        cartItem.name = _getProductName(cartItem.id)
        const productAttribute = _getProductAttribute(cartItem.product_id)[0]
        cartItem.metric = productAttribute.weight + productAttribute.unit
        orderStateUpdate(cartItem)
    }
    function _updateCart(cartItem, quantity) {
        if (cartItem.quantity + quantity < 1) return removeFromCart(cartItem)
        updateCart(cartItem.id, quantity)
    }
    function _cartTotal() {
        let total = 0
        cart.map((item) => {
            total += item.price * item.quantity
        })
        setTotal(total)
    }
    React.useEffect(() => {
        _cartTotal()
    }, [cart])

    return (
        <View style={checkoutStyle.main_container}>
            <View style={[checkoutStyle.container]}>
                <Button title="Add Dummy Product" onPress={() => handlePress()} />
                <Text style={commonStyle.basic_text}>Review Items</Text>
                <ScrollView >
                    {cart.map((item, index) => {
                        return (
                            <View key={index} style={[checkoutStyle.item_container, commonStyle.center]}>
                                <View style={checkoutStyle.basic_wrapper}>
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
                </ScrollView>
            </View>
            <View style={checkoutStyle.order_details}>
                <View style={checkoutStyle.order_settings_wrapper}>
                    <Text style={checkoutStyle.order_settings_title}>Order Settings</Text>
                    <View style={[checkoutStyle.order_settings]}>
                        <SelectButton></SelectButton>
                        <View style={checkoutStyle.shop_selected}>
                            <Text>Not Selected</Text>
                        </View>
                    </View>
                </View>
                <View style={checkoutStyle.total_price_wrapper}>
                    <Text style={[commonStyle.basic_text, checkoutStyle.total_text]}>Total:</Text>
                    <Text style={[commonStyle.number_text, checkoutStyle.total_price]}>{numberSeparator(total)}</Text>
                    {/* <Button title="Checkout" onPress={() => handlePress()} /> */}
                    <PrimaryButton name="Checkout" onPress={() => handlePress()} />
                </View>
            </View>
        </View>
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
        justifyContent: "space-between",
        marginTop: 10,
    },
    item_title: {
        fontSize: font.md,
        fontFamily: font.semiBold,
    },
    basic_wrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    product_details: {
        flexDirection: "column",
        justifyContent: "center",
    },
    item_subtitle: {
        color: color.darkGrey,
    },

    quantity_number: {
        width: 20,
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
        alignItems: "flex-end",
        width: "20%",
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
        padding: 15,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
// -------------------------------------------------END---------------------------------------------------------------------
