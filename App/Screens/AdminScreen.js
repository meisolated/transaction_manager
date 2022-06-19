import { Text, View, SafeAreaView } from "react-native"
import React, { useEffect } from "react"
import { executeQuery } from "../database/admin.js"

function AdminScreen(props) {
    let [data, setData] = React.useState({})
    const q = "insert into orders (id,created_at, modified_at, total_amount, items, payment_status, shop_id) values (?, ?, ?, ?, ?, ?, ?)"
    const r = [1, "2020-01-01", "2020-01-01", 456540, '["151x1","151x1", "151x1"]', "paid", "1"]

    useEffect(() => {
        executeQuery(q, r).then((x) => {
            console.log()
            setData(x.insertId)
        })
    }
        , [])


    return (
        <SafeAreaView>
            <View>
                <Text>Admin Screen</Text>
                <Text>{JSON.stringify(data)}</Text>
            </View>
        </SafeAreaView>
    )
}

export default AdminScreen