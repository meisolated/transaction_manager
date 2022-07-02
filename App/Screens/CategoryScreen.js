import React, { useMemo } from "react"
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native"
import { PrimaryButton } from "../components/button/"
import categoriesModel from "../database/models/categories.model.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import TopNavbar from "../Navigation/topNavbar.js"
import D from "../handler/Dimensions.handler.js"
import { SafeAreaView } from "react-native-safe-area-context"
import font from "../constant/font.js"
import color, * as colors from "../constant/color.js"
import commonStyles from "../common/style.js"
import Loading from "../components/widgets/loading"

let d = new D()

const CategoryScreen = (props) => {
    let db_categories = new categoriesModel()
    let [categories, setCategories] = React.useState([])
    let [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        db_categories
            .getAll()
            .then((result) => {
                if (result.length > 0) {
                    setCategories(result)
                } else {
                    setCategories([])
                }
                setLoading(false)
            })
            .catch((error) => console.log(error))

        return () => {
            setCategories([])
        }
    }, [])

    const onPressItem = (item) => {
        props.navigation.navigate("CategoryData", { id: item.id })
    }

    const renderCategories = ({ item, index }) => {
        return (
            <Pressable onPress={() => onPressItem(item)}>
                <View key={index} style={styles.item}>
                    <View style={[{ width: 60, height: 60, backgroundColor: color.lightGrey, borderRadius: 10, marginRight: 10 }, commonStyles.center]}>
                        {<Image source={{ uri: item.picture }} style={{ width: 50, height: 50, borderRadius: 10 }} />}
                    </View>
                    <Text style={[commonStyles.basic_text_semiBold_20]}>{item.name}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title="Categories" />
            <View style={[styles.container,]}>
                {categories.length > 0 ? (
                    <FlatList initialNumToRender={10} data={categories} renderItem={renderCategories} keyExtractor={(item) => item.id} />
                ) : (
                    <Text style={{ fontFamily: font.semiBold, fontSize: 20 }}>No categories</Text>
                )}
                {loading &&
                    <View style={{ alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                        <Loading color="black" />
                    </View>
                }
                <View style={{ flex: 1, position: "absolute", bottom: 70, width: "100%" }}>
                    <PrimaryButton name="Add Category" width={d.width * 0.95} onPress={() => props.navigation.navigate("CategoryData")} />
                </View>
            </View>
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}
export default CategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        backgroundColor: "white",
        padding: 10,
        marginVertical: 8,
        alignItems: "center",
        paddingVertical: 20,
        width: d.width * 0.95,
        borderRadius: 5,
        flexDirection: "row",
    },
})
