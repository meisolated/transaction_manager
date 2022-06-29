import React, { useMemo } from "react"
import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import TextInput from "../../components/Form/TextInput.js"
import * as colors from "../../constant/color.js"
import BottomNavBar from "../../Navigation/bottomNavbar.js"
import TopNavbar from "../../Navigation/topNavbar.js"
import * as ImagePicker from "expo-image-picker"
import commonStyle from "../../common/style.js"
import { PrimaryButton } from "../../components/button"
import D from "../../handler/Dimensions.handler.js"
import categoriesModel from "../../database/models/categories.model.js"
let d = new D()

const CategoryData = (props) => {
    let db_categories = new categoriesModel()
    let [screen, setScreen] = React.useState({ title: "New Categories", button: "Save" })
    let params = useMemo(() => props.route.params || {}, [props.route.params])
    let [categories, setCategories] = React.useState({ picture: null, name: null })

    React.useEffect(() => {
        if (params.id) {
            setScreen({ title: "Edit categories", button: "Update" })
            db_categories
                .get(params.id)
                .then((result) => setCategories(result))
                .catch((error) => alert(error))
        }
    }, [params.id])

    const onPressSave = () => {
        if (categories.name) {
            if (!params.id) {
                console.log(categories)
                db_categories
                    .add([categories.name, categories.picture])
                    .then(() => {
                        alert("Categories added")
                        props.navigation.navigate("Categories")
                    })
                    .catch((error) => alert(error))
            }
            else {
                db_categories.update(params.id, [categories.name, categories.picture])
                    .then(() => {
                        alert("categories updated")
                        props.navigation.navigate("Categories")
                    })
                    .catch((error) => alert(error))
            }

        } else {
            alert("Please enter a name")
        }
    }
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!")
            return
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync()
        if (pickerResult.cancelled === true) {
            return
        }
        setCategories({ ...categories, picture: pickerResult.uri })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title={screen.title} />
            <View style={styles.container}>
                <Pressable style={styles.image} onPress={openImagePickerAsync}>
                    {categories.picture !== null ? (
                        <View style={styles.image}>
                            <Image source={{ uri: categories.picture }} style={styles.thumbnail} />
                        </View>
                    ) : (
                        <View style={styles.empty_image_container}>
                            <Text style={[commonStyle.basic_text, { fontSize: 18 }]}> Pick an Image</Text>
                        </View>
                    )}
                </Pressable>
                <TextInput label="Name" value={categories.name} onChange={(text) => setCategories({ ...categories, name: text })} />
                <View style={{ height: 50 }}>
                    <PrimaryButton name={screen.button} width={d.width * 0.9} onPress={() => onPressSave()} />
                </View>
                <BottomNavBar navigation={props.navigation} />
            </View>
        </SafeAreaView>
    )
}
export default CategoryData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
    },
    thumbnail: {
        width: 150,
        height: 150,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: colors.deepPurple100,
    },
    image: {
        width: d.width - 40,
        justifyContent: "center",
        alignItems: "center",
    },

    empty_image_container: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: colors.deepPurpleA100,
        backgroundColor: colors.white,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
})
