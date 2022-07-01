import { Feather as Icon } from "@expo/vector-icons"
import React, { useMemo } from "react"
import { View, Text, StyleSheet, Share } from "react-native"
import { PrimaryButton } from "../../components/button/index.js"
import LoadingCircle from "../../components/widgets/loading"
import ordersModel from "../../database/models/orders.model.js"

import D from "../../handler/Dimensions.handler.js"
let d = new D()

const OrderAdded = (props) => {
    let db_order = new ordersModel()
    let params = useMemo(() => {
        return props.route.params || {}
    }, [props.route.params])

    const [loading, setLoading] = React.useState(false)
    let [orderData, setOrderData] = React.useState({})
    let [orderItems, setOrderItems] = React.useState([])

    React.useEffect(() => {
        setOrderData(params.orderData)
        setOrderItems(params.orderItems)

        if (params.orderData && params.orderItems) {
            let orderData = params.orderData
            db_order.addNew([orderData.shopId, orderData.items, orderData.totalPrice, orderData.paymentStatus]).then(
                (result) => {
                    // db_order.
                }

            )
        }



    }, [props.orderData, props.orderItems])

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'React Native | A framework \n for building native apps using React',
            })
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <View style={styles.container}>
            {loading && <LoadingCircle color="black" />}
            <Icon name="check-circle" size={50} color="green" />
            <Text>Order Placed</Text>
            <View style={{ height: 50, width: d.width * 0.9 }}>
                <PrimaryButton width={d.width * .95} name="Share" onPress={onShare} />
            </View>
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
