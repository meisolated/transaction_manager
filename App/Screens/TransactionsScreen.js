import React from "react"
import { View, Text, Button, StyleSheet, ScrollView, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { getAllTransactions } from "../database/get.js"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
function TransactionsScreen(props) {
    const [transactions, setTransactions] = React.useState([])

    React.useEffect(() => {
        getAllTransactions().then((results) => {
            if (results.rows.length > 0) {
                setTransactions(results.rows._array)
            }
            else {
                setTransactions([{ total_amount: "No transactions found" }])
            }
        })
    }, [])

    return (
        <SafeAreaView>
            <View style={""}>
                <Text>Transactions Screen</Text>
                <Button title="Go to Home" onPress={() => props.navigation.navigate("Home")} />
                <ScrollView style={style.scrollView} >
                    {transactions.map((transaction) => {
                        return (
                            <View key={transaction.id} style={style.listItem}>
                                <View style={style.list_left}>
                                    <Text>₹{transaction.total_amount}</Text>
                                    <Text>{JSON.parse(transaction.items)[0]}</Text>
                                </View>

                                <View style={style.list_right}>
                                    <Pressable style={[style.button_style, style.button_unpaid]} >
                                        <Text style={style.button_text}>{transaction.payment_status}</Text>
                                    </Pressable>
                                    <MaterialCommunityIcons name="chevron-right" color={"black"} size={26} />
                                </View>
                            </View>
                        )
                    })}
                    {/* <View key={"transaction.id"} style={style.listItem}>
                        <View style={style.list_left}>
                            <Text>₹{"5000000"}</Text>
                            <Text>{"JSON."}</Text>
                        </View>

                        <View style={style.list_right}>
                            <Pressable style={[style.button_style, style.button_unpaid]} >
                                <Text style={style.button_text}>{"transaction.payment_status"}</Text>
                            </Pressable>
                            <MaterialCommunityIcons name="chevron-right" color={"black"} size={26} />
                        </View>
                    </View> */}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default TransactionsScreen

const style = StyleSheet.create({
    scrollView: {
        margin: 10
    },
    listItem: {
        width: "100%",
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 8,
        justifyContent: "space-between",
    },
    list_left: {
        flex: 1,
    },
    list_right: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button_text: {
        color: "#fff",
        fontSize: 10,
        textAlign: "center",
        textTransform: "uppercase",
    },
    button_paid: {
        backgroundColor: "#00ff00",
    },
    button_unpaid: {
        height: 25,
        alignItems: "center",
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: "#FF9500",
    }
})
