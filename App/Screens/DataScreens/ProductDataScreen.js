import React from "react"
import { View, Text, StyleSheet, Button, Image, Pressable, Dimensions, ScrollView, TextInput as InputText, KeyboardAvoidingView, Keyboard } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import TextInput from "../../components/Form/TextInput.js"
import BottomNavBar from "../../Navigation/bottomNavbar.js"
import TopNavbar from "../../Navigation/topNavbar.js"
import * as ImagePicker from "expo-image-picker"
import * as colors from "../../constant/color.js"
import commonStyle from "../../common/style.js"
import { numberSeparator } from "../../util/functions.js"
import Popup from "../../components/popup/index.js"
import font from "../../constant/font.js"
import { Feather as Icons } from "@expo/vector-icons"
import OuterLineBtn from "../../components/button/outerlineButton.js"
import { PrimaryButton } from "../../components/button"
import { default as D } from "../../handler/Dimensions.handler.js"
import productsModel from "../../database/models/products.model.js"
let d = new D()

export default function ProductEditScreen(props) {
    let db_product = new productsModel()
    let productID = props.route.params?.productID ? props.route.params.productID : null
    let ScreenState = productID || "add" // Edit or Add
    let emptyAttribute = [{ id: 1, number: "1", metric: "liter(l)", price: numberSeparator("50") }]
    let suggestedNumbers = [
        { number: "1/2", metrics: "liter(l)" },
        { number: 180, metrics: "milliliter(ml)" },
        { number: 400, metrics: "milliliter(ml)" },
        { number: 170, metrics: "milliliter(ml)" },
        { number: 5, metrics: "kilogram(kg)" },
        { number: 15, metrics: "kilogram(kg)" },
        { number: 500, metrics: "kilometer(km)" },
        { number: 180, metrics: "gram(g)" },
        { number: 300, metrics: "gram(g)" },
        { number: 350, metrics: "gram(g)" },
    ]
    let metrics = ["milliliter(ml)", "gram(g)", "liter(l)", "kilogram(kg)"]

    let [product, setProduct] = React.useState({ name: null, desc: null, picture: null, attribute: emptyAttribute })
    let [picking, setPicking] = React.useState({ show: false, data: null })

    // get product data if update
    React.useEffect(() => {
        if (ScreenState !== "add") {
            // get product data
            db_product
                .getById(productID)
                .then((result) => {
                    let _result = result[0]
                    console.log("🚀 ~ file: ProductDataScreen.js ~ line 49 ~ db_product.getById ~ _result", _result)
                    setProduct({ ...product, name: _result.name, desc: _result.description, picture: _result.picture })
                })
                .catch((error) => alert("error" + error.split("\n")[0]))
        }

    }, [])

    // ---------------------------------------------------------------------------------------------------------------------

    function pickingOption(option) {
        let finalArray = product.attribute.map((item, index) => {
            if (picking.data === index) {
                return { ...item, metric: option }
            }
            return item
        })
        setProduct({ ...product, attribute: finalArray })
        setPicking({ ...picking, show: false })
    }

    function addNewAttribute() {
        let finalArray = product.attribute
        finalArray.push({ id: finalArray.length + 1, number: "1", metric: "milliliter(ml)", price: 50 })
        setProduct({ ...product, attribute: finalArray })
    }

    function deleteAttribute(id) {
        let finalArray = product.attribute
        finalArray.map((item, i) => {
            if (item.id === id) {
                finalArray.splice(i, 1)
                return
            }
            return item
        })

        setProduct({ ...product, attribute: finalArray })
    }
    function updateAttribute(id, number, price) {
        let finalArray = product.attribute
        finalArray.map((item, i) => {
            if (item.id === id) {
                finalArray[i] = { ...item, number: number ? number : finalArray[i].number, price: price ? price : finalArray[i].price }
                return
            }
            return item
        })

        setProduct({ ...product, attribute: finalArray })
    }

    //onSavePress
    async function onSavePress() {
        if (product.name && product.desc && product.attribute.length > 0) {
            if (ScreenState == "add") {
                db_product
                    .addNew([product.name, product.picture, product.desc])
                    .then(({ insertId, status }) => {
                        if (status) {
                            product.attribute.map((item) => {
                                db_product
                                    .addNewAttribute([insertId, item.number, item.metric, item.price])
                                    .then(({ insertId, status }) => {
                                        console.log("🚀 ~ file: ProductDataScreen.js ~ line 121 ~ db_product.addNewAttribute ~ insertId", insertId)
                                    })
                                    .catch((error) => alert("error" + error))
                            })
                            console.log(product.picture)
                            alert("Product Added")
                            // props.navigation.navigate("Products")
                        } else {
                            alert("Error")
                        }
                    })
                    .catch((e) => alert("Error" + e))
            } else {
                alert("Please fill all the fields")
            }
        } else {
            alert("Please fill all the fields")
        }
    }

    // ---------------------------------------------------------------------------------------------------------------------
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

        setProduct({ ...product, picture: pickerResult.uri })
    }
    // KEYBOARD HANDLER
    const [keyboardStatus, setKeyboardStatus] = React.useState(false)

    React.useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus(true)
        })
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus(false)
        })

        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [])
    return (
        <SafeAreaView style={style.container}>
            <TopNavbar title={ScreenState == "add" ? "New Product" : "Update Product"} />
            <ScrollView style={style.scrollView}>
                <KeyboardAvoidingView>
                    <View style={style.main}>
                        {product.picture !== null ? (
                            <View style={style.image}>
                                <Image source={{ uri: product.picture }} style={style.thumbnail} />
                            </View>
                        ) : (
                            <Pressable style={style.image} onPress={openImagePickerAsync}>
                                <View style={style.empty_image_container}>
                                    <Text style={[commonStyle.basic_text, { fontSize: 18 }]}> Pick an Image</Text>
                                </View>
                            </Pressable>
                        )}
                        <TextInput type="text" placeholder="Name" icon="user" value={product.name} onChange={(data) => setProduct({ ...product, name: data })} />
                        <TextInput type="text" placeholder="Description (optional)" icon="align-center" value={product.desc} onChange={(data) => setProduct({ ...product, desc: data })} />
                        <Text style={commonStyle.basic_text}>Attributes</Text>
                        {/* –––––––––––––––––– Attributes –––––––––––––––––– */}
                        {product.attribute.map((item, index) => {
                            return (
                                <View style={style.attribute_wrapper} key={index}>
                                    <InputText
                                        keyboardType="numeric"
                                        style={[style.attribute_text_input, { flex: 1 }]}
                                        defaultValue={item.number.toString()}
                                        placeholder="Metric"
                                        onChangeText={(data) => updateAttribute(item.id, data, null)}
                                    />
                                    <Pressable onPress={() => setPicking({ data: index, show: true })}>
                                        <View style={style.select_attribute}>
                                            <Text style={{ fontFamily: font.bold, fontSize: 18 }}>{item.metric.split("(")[1].split(")")[0]}</Text>
                                        </View>
                                    </Pressable>
                                    <InputText
                                        keyboardType="numeric"
                                        style={[style.attribute_text_input, { width: d.width * 0.2 }]}
                                        placeholder="₹ Price"
                                        defaultValue={item.price.toString()}
                                        onChangeText={(data) => updateAttribute(item.id, null, data)}
                                    />
                                    <Pressable onPress={() => deleteAttribute(item.id)}>
                                        <Icons name={"x-circle"} style={{ color: colors.red400 }} size={30} />
                                    </Pressable>
                                </View>
                            )
                        })}
                        {/* –––––––––––––––––– Attributes –––––––––––––––––– */}
                        <ScrollView horizontal={true}>
                            {suggestedNumbers.map((item, index) => (
                                <View key={index} style={style.suggested_numbers}>
                                    <Text style={style.suggested_numbers_number}>{item.number + " "}</Text>
                                    <Text style={style.suggested_numbers_text}>{item.metrics}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <Pressable style={{ alignSelf: "center" }} onPress={addNewAttribute}>
                            <OuterLineBtn text="Add New Attribute" onPress={addNewAttribute} />
                        </Pressable>
                        <View style={{ height: 50 }}>
                            <PrimaryButton onPress={() => onSavePress()} width={d.width * 0.9} name="Save" />
                        </View>
                    </View>
                    {picking.show && <Popup return={(x) => pickingOption(x)} options={metrics} />}
                </KeyboardAvoidingView>
            </ScrollView>
            {!keyboardStatus && <BottomNavBar navigation={props.navigation} />}
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        alignItems: "flex-start",
        textAlign: "center",
        marginBottom: d.height * 0.1,
    },
    thumbnail: {
        width: 150,
        height: 150,
        // resizeMode: "contain",
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
    suggested_numbers: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    suggested_numbers_number: {
        fontSize: 10,
        fontWeight: "bold",
        color: colors.deepPurpleA100,
    },

    suggested_numbers_text: {
        fontSize: 10,
    },
    attribute_wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        // borderRadius: 10,
        // backgroundColor: colors.white,
    },
    select_attribute: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
        width: 50,
        height: 50,
        marginRight: 10,
        borderWidth: 1,
        borderColor: colors.deepPurpleA100,
    },
    attribute_text_input: {
        // flex: 1,
        height: 50,
        marginRight: 10,
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
    },
})
