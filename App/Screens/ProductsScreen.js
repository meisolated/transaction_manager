import React from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import productsModel from "../database/models/products.model.js"
import commonStyle from "../common/style.js"
import { SafeAreaView } from "react-native-safe-area-context"
import TopNavbar from "../Navigation/topNavbar.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import D from "../handler/Dimensions.handler.js"
import { PrimaryButton } from "../components/button"
let d = new D()
const ProductsScreen = (props) => {
    let db_product = new productsModel()
    let [products, setProducts] = React.useState([])
    // db_product
    //     .getAllProducts()
    //     .then((result) => setProducts(result))
    //     .catch((error) => console.log(error))


    const renderProducts = ({ item }) => {
        return (
            <View style={styles.productItem}>
                <Text style={[commonStyle.basic_text_semiBold_20, { marginLeft: 5, flex: 1, }]}>{item.name}</Text>
            </View>
        )
    }
    React.useEffect(() => {
        db_product
            .getAllProducts()
            .then((result) => setProducts(result))
            .catch((error) => console.log(error))

        return () => {
            setProducts([])
        }
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <TopNavbar title="Products" />
            <View style={{ marginBottom: d.height * .22 }}>
                <FlatList initialNumToRender={10} data={products} renderItem={renderProducts} keyExtractor={(item) => item.id} />
            </View>
            <View style={{ flex: 1, position: "absolute", bottom: 70, width: "100%" }}>
                <PrimaryButton name="Add Product" width={d.width * 0.95} onPress={() => { }} />
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
        marginBottom: 10,
        backgroundColor: "white",
    },


})
