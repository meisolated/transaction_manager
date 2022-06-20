import React from "react"
import { ScrollView, View, Text, Animated, StyleSheet, Easing, Pressable, Button } from "react-native"
import commonStyle from "../../common/style.js"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { _tempOrder, _tempProducts, _getProductName, _getProductAttribute } from "../../temp/testingData.js"
import color from "../../constant/color.js"
import font from "../../constant/font.js"
import { connect } from "react-redux"
import { numberSeparator } from "../../util/functions.js"

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
                <ScrollView>
                    {cart.map((item, index) => {
                        return (
                            <View key={index} style={checkoutStyle.item_container}>
                                <View style={checkoutStyle.basic_wrapper}>
                                    <View style={checkoutStyle.product_details}>
                                        <Text style={checkoutStyle.item_title}>{item.name}</Text>
                                        <Text style={checkoutStyle.item_subtitle}>{item.metric}</Text>
                                    </View>
                                    <View style={checkoutStyle.quantity_selector}>
                                        <Pressable onPress={() => _updateCart(item, -1)}>
                                            <MaterialCommunityIcons style={commonStyle.pd_right} name="minus" size={20} color={color.black} />
                                        </Pressable>
                                        <Text style={commonStyle.number_text}>{item.quantity}</Text>
                                        <Pressable onPress={() => _updateCart(item, +1)}>
                                            <MaterialCommunityIcons style={commonStyle.pd_left} name="plus" size={20} color={color.black} />
                                        </Pressable>
                                    </View>
                                </View>

                                <View style={checkoutStyle.total_price}>
                                    <Text style={commonStyle.number_text}>{numberSeparator(item.price * item.quantity)}</Text>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View style={checkoutStyle.total_price_wrapper}>
                <Text style={commonStyle.basic_text}>Total</Text>
                <Text style={commonStyle.number_text}>{numberSeparator(total)}</Text>
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

    quantity_selector: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: color.littleDarkGrey,
        padding: 5,
        borderRadius: 5,
    },
    total_price: {
        width: "20%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 5,
        borderRadius: 5,
        backgroundColor: color.primary,
        color: color.white,
        marginRight: 10,
        marginLeft: 10,
    },
    total_price_wrapper: {
        width: "100%",
        bottom: 60,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: color.littleDarkGrey,
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: color.white

    }
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
