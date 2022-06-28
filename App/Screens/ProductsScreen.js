import React from "react"
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native"
import productsModel from "../database/models/products.model.js"
import commonStyle from "../common/style.js"
import { SafeAreaView } from "react-native-safe-area-context"
import TopNavbar from "../Navigation/topNavbar.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import D from "../handler/Dimensions.handler.js"
import { Feather as Icons } from "@expo/vector-icons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { PrimaryButton } from "../components/button"
import color from "../constant/color.js"
let d = new D()
const ProductsScreen = (props) => {
    let db_product = new productsModel()
    let [products, setProducts] = React.useState([])

    const onPress = (id) => {
        props.navigation.navigate("ProductData", { productID: id })
    }

    React.useEffect(() => {
        db_product
            .getAll()
            .then((result) => setProducts(result))
            .catch((error) => console.log(error))

        return () => {
            setProducts([])
        }
    }, [])

    const renderProducts = ({ item }) => {
        return (
            <Pressable onPress={() => onPress(item.id)}>
                <View style={styles.productItem}>
                    <View style={styles.image_wrapper}>
                        {item.picture.includes("file") ? <Image source={{ uri: item.picture }} style={styles.productImage} /> : <Icons name="package" size={40} color={color.black} />}
                    </View>
                    <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1, }]}>{item.name}</Text>
                    <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="chevron-right" color={color.black} size={30} />
                </View>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <TopNavbar title="Products" />
            <View style={{ marginBottom: d.height * .22 }}>
                <FlatList initialNumToRender={10} data={products} renderItem={renderProducts} keyExtractor={(item) => item.id} />
            </View>
            <View style={{ flex: 1, position: "absolute", bottom: 70, width: "100%" }}>
                <PrimaryButton name="Add Product" width={d.width * 0.95} onPress={() => props.navigation.navigate("ProductData")} />
            </View>
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}
export default ProductsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    productItem: {
        width: d.width * .95,
        alignSelf: "center",
        marginTop: 10,
        backgroundColor: "white",
        padding: 10,
        paddingVertical: 20,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    productImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    image_wrapper: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: color.lightGrey,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    }

})
