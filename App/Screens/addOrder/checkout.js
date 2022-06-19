import React from "react"
import { View, Text, Animated, StyleSheet, Easing } from "react-native"
import commonStyle from "../../common/style.js"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { _tempOrder, _tempProducts, _getProductName } from "../../temp/testingData.js"
import color from "../../constant/color.js"

export default function checkout(props) {
    // const [loading, setLoading] = React.useState(false)

    return (
        <View style={[commonStyle.container, style.container]}>
            <Text style={commonStyle.basic_text}>Products List</Text>
            {_tempOrder.map((item, index) => {
                return (
                    <View key={index} style={style.item_container}>
                        <Text style={style.item_title}>{_getProductName(item.product_id)}</Text>
                        <MaterialCommunityIcons name="close" size={20} color={color.black} />
                        <Text style={style.item_price}>{item.price}</Text>
                    </View>
                )
            })}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    item_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,

    }
})
