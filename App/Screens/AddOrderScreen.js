import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Alert, Image, ScrollView, FlatList, AsyncStorage } from "react-native"
import NavBar from "../Navigation/bottomNavbar.js"
import TopNavbar from "../Navigation/topNavbar.js"
import color from "../constant/color.js"
import font from "../constant/font.js"
import { _tempCategories, _tempCompany, _tempOrder } from "../temp/testingData.js"
import _ from "lodash"
import LoadingCircle from "../components/widgets/loding/index.js"
import checkout from "./addOrder/checkout.js"
import commonStyle from "../common/style.js"
// ----------------------------------------------------------------------------------------------------------------------

export default function AddOrder(props) {
    const [order, setOrder] = React.useState({
        company: "",
        category: "",
        products: _tempOrder,
        total: 0,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: "pending",
        id: "",
    })
    const [state, setState] = React.useState({ title: "Checkout", string: "checkout", component: () => checkout(orderStateUpdate) })

    function orderStateUpdate(state) {
        let setThis = Object.keys(state)[0]
        order[setThis] = state[setThis]
        console.log(order)
        setOrder(order)
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopNavbar title={state.title} />
            {/* <Text style={styles.title}>{state.title}</Text> */}
            {state.string === "chooseItem" ? chooseItem(orderStateUpdate) : state.string === "checkout" ? checkout(orderStateUpdate) : chooseCompany(orderStateUpdate)}
            {/* {state.component()} */}
            <NavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.backgroundColor,
        flex: 1,
    },
    title: {
        fontFamily: font.bold,
        textAlign: "center",
        fontSize: 30,
        marginTop: 10,
    },
})

// -------------------------------------------------------chooseItem---------------------------------------------------------------

const chooseItemStyle = StyleSheet.create({
    title_text: {
        fontFamily: font.bold,
        color: color.black,
        fontSize: 20,
    },
    subtitle_text: {
        color: color.darkgrey,
        fontSize: 20,
        fontFamily: font.primary,
    },

    item: {
        marginTop: 20,
        margin: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    itemDetailsWrapper: {
        marginLeft: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
})

function chooseItem(orderStateUpdate) {
    const onPress = (category) => orderStateUpdate({ category: category })
    return (
        <View style={commonStyle.container}>
            {_tempCategories.map((item, index) => {
                let category = Object.keys(item)[0]
                return (
                    <View style={commonStyle.center} key={"category" + index}>
                        <TouchableOpacity style={chooseItemStyle.item} onPress={() => onPress(category)}>
                            <Image style={{ width: 70, height: 70 }} source={require("../assets/img/milk.png")} />
                            <View style={chooseItemStyle.itemDetailsWrapper}>
                                <Text style={chooseItemStyle.title_text}>{category}</Text>
                                <Text style={chooseItemStyle.subtitle_text}>{item[category]}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" color={color.primary} size={30} />
                        </TouchableOpacity>
                        {_tempCategories.length - 1 !== index ? <View style={commonStyle.divider} /> : null}
                    </View>
                )
            })}
        </View>
    )
}
// ----------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------chooseCompany--------------------------------------------------------------------
function chooseCompany(orderStateUpdate) {
    const onPress = (company) => orderStateUpdate({ company: company })
    return (
        <View style={commonStyle.container}>
            {_tempCompany.map((item, index) => {
                let company = _.toLower(item)
                // let img = company == "madhusudan" ? require(`../assets/img/amul_logo.png`) : require(`../assets/img/madhusudan_logo.png`)
                let img = company == "madhusudan" ? "https://isosad.com/transaction_manager/img/madhusudan_logo.png" : "https://isosad.com/transaction_manager/img/amul_logo.png"
                return (
                    <View style={commonStyle.center} key={"company" + index}>
                        <TouchableOpacity style={chooseItemStyle.item} onPress={() => onPress(item)}>
                            <Image style={{ resizeMode: "contain", width: 70, height: 70 }} source={{ uri: img }} />
                            <View style={chooseItemStyle.itemDetailsWrapper}>
                                <Text style={chooseItemStyle.title_text}>{item}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" color={color.primary} size={30} />
                        </TouchableOpacity>
                        {_tempCompany.length - 1 !== index ? <View style={commonStyle.divider} /> : null}
                    </View>
                )
            })}
        </View>
    )
}
const chooseCompanyStyle = StyleSheet.create({})
