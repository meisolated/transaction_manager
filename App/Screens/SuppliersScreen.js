import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { FlatList } from "react-native-web"
import { PrimaryButton } from "../components/button/"
import suppliersModel from "../database/models/suppliers.model.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import TopNavbar from "../Navigation/topNavbar.js"
import D from "../handler/Dimensions.handler.js"
import { SafeAreaView } from "react-native-safe-area-context"
import font from "../constant/font.js"
let d = new D()

const SuppliersScreen = (props) => {
    let db_suppliers = new suppliersModel()
    let [suppliers, setSuppliers] = React.useState([])

    React.useEffect(() => {
        db_suppliers
            .getAll()
            .then((result) => setSuppliers(result))
            .catch((error) => console.log(error))

        return () => {
            setSuppliers([])
        }
    }, [])

    const renderItems = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title="Suppliers" />
            <View style={styles.container}>
                {!suppliers.length < 1 ? (
                    <FlatList data={suppliers} renderItem={renderItems} keyExtractor={(item) => item.id} />
                ) : (
                    <View>
                        <Text style={{ fontFamily: font.semiBold, fontSize: 20 }} >No Suppliers</Text>
                    </View>
                )}
                <View style={{ flex: 1, position: "absolute", bottom: 70, width: "100%" }}>
                    <PrimaryButton name="Add Supplier" width={d.width * 0.95} onPress={() => props.navigation.navigate("SupplierData")} />
                </View>
            </View>
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}
export default SuppliersScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
