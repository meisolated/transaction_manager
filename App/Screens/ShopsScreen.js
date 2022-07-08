import React from "react"
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import color from "../constant/color.js"
import shopsModel from "../database/models/shops.model.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import TopNavbar from "../Navigation/topNavbar.js"
import { PrimaryButton } from "../components/button/index.js"
import { Feather as Icons } from "@expo/vector-icons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import commonStyle from "../common/style.js"
import D from "../handler/Dimensions.handler.js"
import Loading from "../components/widgets/loading"


let d = new D()
const Shops = (props) => {
    let db_shop = new shopsModel()
    let [shops, setShops] = React.useState([])
    let [loading, setLoading] = React.useState(true)
    const handleClick = (shop_id) => {
        props.navigation.push("ShopData", { shopId: shop_id })
    }

    React.useEffect(() => {
        db_shop
            .getAll()
            .then((result) => {
                setShops(result)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })

        return () => {
            setShops([])
        }
    }, [])

    const renderShops = ({ item }) => {
        return (
            <Pressable onPress={() => handleClick(item.shop_id)}>
                <View style={styles.shopItem}>
                    <Icons name="shopping-bag" size={30} color={color.primary} />
                    <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1 }]}>{item.name}</Text>
                    <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="chevron-right" color={color.primary} size={30} />
                </View>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title="Shops" />
            <View style={{ marginBottom: d.height * 0.23 }}>
                <FlatList initialNumToRender={10} data={shops} renderItem={renderShops} keyExtractor={(item) => item.id} />
            </View>
            {loading &&
                <View style={{ alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                    <Loading color="black" />
                </View>
            }
            <View style={{ position: "absolute", bottom: 80, alignSelf: "center" }}>
                <PrimaryButton name="Add Shop" width={d.width * 0.95} onPress={() => { props.navigation.navigate("ShopData") }} />
            </View>
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}

export default Shops

const styles = StyleSheet.create({
    list: {
        flex: 1,
        marginBottom: d.height * 0.15,
    },
    shopItem: {
        alignSelf: "center",
        width: d.width * 0.95,
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingVertical: 20,
        borderRadius: 5,
        backgroundColor: color.white,
    },
})
