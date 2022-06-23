import { Text, View, SafeAreaView } from "react-native"
import React, { useEffect } from "react"
import ordersModel from "../database/models/orders.model.js"

function AdminScreen(props) {
    let dbOrders = new ordersModel()

    useEffect(() => {
        async function getOrderData() {
            let orders = await dbOrders.getOrderByTime(0, 1)
            console.log(orders)
        }
        getOrderData()
    }, [])

    return (
        <SafeAreaView>
            <View>
                <Text>Admin Screen</Text>
                <Text>{"something"}</Text>
            </View>
        </SafeAreaView>
    )
}

export default AdminScreen
