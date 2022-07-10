import { View, Text, StyleSheet, Button, Image, Pressable, ScrollView, TextInput as InputText, KeyboardAvoidingView, Keyboard, DeviceEventEmitter } from "react-native"
import categoriesModel from "../../database/models/categories.model.js"
import suppliersModel from "../../database/models/suppliers.model.js"
import OuterLineBtn from "../../components/button/outerlineButton.js"
import ImagePickerHandler from "../../handler/ImagePicker.handler.js"
import productsModel from "../../database/models/products.model.js"
import { default as D } from "../../handler/Dimensions.handler.js"
import { SafeAreaView } from "react-native-safe-area-context"
import BottomNavBar from "../../Navigation/bottomNavbar.js"
import TextInput from "../../components/Form/TextInput.js"
import { PrimaryButton } from "../../components/button"
import TopNavbar from "../../Navigation/topNavbar.js"
import { Feather as Icons } from "@expo/vector-icons"
import Popup from "../../components/popup/index.js"
import * as colors from "../../constant/color.js"
import commonStyle from "../../common/style.js"
import font from "../../constant/font.js"
import React, { useMemo } from "react"
import LoadingCircle from "../../components/widgets/loading/index.js"

let d = new D()

export default function ProductEditScreen(props) {
    // handle params
    const params = useMemo(() => {
        return props.route.params || {}
    }, [props.route.params])

    React.useEffect(() => {
        if (params.someData !== undefined) {
            setLoading(false)
            setState({ productID: params.productID, ScreenState: params.productID || "add" })
            setProduct({ ...params.someData })
        }
        // return () => {
        //     setState({ productID: "", ScreenState: "add" })
        //     setProduct({})
        // }
    }, [params])

    const db_product = new productsModel()
    const db_category = new categoriesModel()
    const db_suppliers = new suppliersModel()

    const [screen, setScreen] = React.useState({ title: "New Product", button: "Save" })
    const emptyAttribute = [{ id: 1, number: "", metric: "liter(l)", price: "", cost_price: "" }]
    const suggestedNumbers = [
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
    const metrics = ["milliliter(ml)", "gram(g)", "liter(l)", "kilogram(kg)"]
    const [popup, setPopup] = React.useState({ state: "inactive", name: null, options: [], id: null })
    const [state, setState] = React.useState({ productID: null, ScreenState: null })
    const [product, setProduct] = React.useState({ name: null, desc: null, picture: null, qr_code: null, category: null, suppliers: null, attribute: emptyAttribute })
    const [category, setCategory] = React.useState([])
    const [suppliers, setSuppliers] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [keyboardStatus, setKeyboardStatus] = React.useState(false)

    // get product data if update
    React.useEffect(() => {
        //get category and suppliers
        db_category
            .getAll()
            .then((res) => {
                setCategory(res)
                db_suppliers
                    .getAll()
                    .then((res) => {
                        setSuppliers(res)
                        setState({ productID: params.productID, ScreenState: params.productID || "add" })
                    })
                    .catch((err) => alert(err))
            })
            .catch((err) => alert(err))
        if (params.productID !== null && params.productID !== undefined) {
            setScreen({ title: "Edit Product", button: "Update" })
            db_product
                .getById(state.productID)
                .then((productDetails) => {
                    db_product.getAttributes(state.productID).then((result) => {
                        setProduct({
                            ...product,
                            name: productDetails.name,
                            desc: productDetails.description,
                            picture: productDetails.picture,
                            qr_code: productDetails.qr_code,
                            category: productDetails.category,
                            suppliers: productDetails.supplier,
                            attribute: result,
                        })
                        setLoading(false)
                    })
                })
                .catch((error) => alert("error" + error))
        } else {
            setLoading(false)
        }
    }, [state.ScreenState, state.productID, params.productID])

    // ---------------------------------------------------------------------------------------------------------------------

    function pickingSupplier(option) {
        if (!option) return setPopup({ state: "active", name: "supplier", options: suppliers })
        setProduct({ ...product, suppliers: option })
    }
    function pickingCategory(option) {
        if (!option) return setPopup({ state: "active", name: "category", options: category })
        setProduct({ ...product, category: option })
    }
    function selectedOption(option) {
        if (popup.name === "supplier") {
            setProduct({ ...product, suppliers: option })
        } else if (popup.name === "metric") {
            pickingMetric(option, popup.id)
        } else if (popup.name === "category") {
            setProduct({ ...product, category: option })
        }
        return setPopup({ state: "inactive", name: null, options: [] })
    }
    function pickingMetric(option, id) {
        let finalArray = product.attribute.map((item, index) => {
            if (id === item.id) {
                return { ...item, metric: option }
            }
            return item
        })
        setProduct({ ...product, attribute: finalArray })
        setPopup({ state: "active", options: metrics, name: "metric" })
    }
    function addNewAttribute() {
        let finalArray = product.attribute
        finalArray.push({ id: finalArray.length + 1, number: "", metric: "milliliter(ml)", price: "", cost_price: "" })
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
    function updateAttribute(id, number, price, cost_price) {
        let finalArray = product.attribute
        price = parseInt(price)
        cost_price = parseInt(cost_price)
        finalArray.map((item, i) => {
            if (item.id === id) {
                finalArray[i] = { ...item, number: number ? number : finalArray[i].number, price: price ? price : finalArray[i].price, cost_price: cost_price ? cost_price : finalArray[i].cost_price }
                return
            }
            return item
        })

        setProduct({ ...product, attribute: finalArray })
    }
    function onQRCodeButtonPress() {
        props.navigation.navigate("QRCodeScanner", { product, newProduct: state.productID })
    }

    const validate = async () =>
        new Promise((resolve, reject) => {
            product.attribute.map((item, index) => {
                if (item.price < item.cost_price) return reject("Price can't be greater than cost price")
                if (product.attribute.length - 1 === index) return resolve()
            })
        })

    async function onSavePress() {
        setLoading(true)
        validate()
            .then(() => {
                if (product.name && product.attribute.length > 0) {
                    if (state.ScreenState == "add") {
                        db_product
                            .addNew([product.name, product.picture, product.desc, product.qr_code, product.category, product.suppliers])
                            .then(({ productId, status }) => {
                                if (status) {
                                    product.attribute.map((item) => {
                                        setLoading(false)
                                        db_product
                                            .addNewAttribute([productId, item.number, item.metric, item.price, item.cost_price])
                                            .then(({ insertId, status }) => {
                                                if (status) {
                                                    alert("Product Added")
                                                    props.navigation.navigate("Products")
                                                } else {
                                                    alert("Error")
                                                }
                                            })
                                            .catch((error) => alert("error" + error))
                                    })
                                } else {
                                    setLoading(false)
                                    alert("Error")
                                }
                            })
                            .catch((e) => {
                                setLoading(false)
                                alert("Error: " + e)
                            })
                    } else {
                        db_product
                            .update(state.productID, [product.name, product.desc, product.picture, product.qr_code, product.category, product.suppliers])
                            .then(({ status }) => {
                                if (status) {
                                    db_product
                                        .deleteAttribute(state.productID)
                                        .then((result) => {
                                            if (result.status) {
                                                product.attribute.map((item) => {
                                                    db_product
                                                        .addNewAttribute([state.productID, item.number, item.metric, item.price, item.cost_price])
                                                        .then(({ insertId, status }) => {
                                                            setLoading(false)
                                                            if (!status) {
                                                                alert("Error")
                                                            }
                                                        })
                                                        .catch((error) => alert("error" + error))
                                                })
                                                alert("Product Updated")
                                                props.navigation.navigate("Products")
                                            }
                                        })
                                        .catch((error) => alert("error" + error))
                                } else {
                                    alert("Error")
                                }
                            })
                            .catch((e) => alert("Error" + e))
                    }
                } else {
                    setLoading(false)
                    alert("Please fill all the fields")
                }
            })
            .catch((err) => {
                setLoading(false)
                alert(err)
            })
    }
    async function openImagePickerAsync() {
        let image = await ImagePickerHandler()
        setProduct({ ...product, picture: image })
    }
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
            <TopNavbar title={screen.title} />
            {!loading ? (
                <ScrollView style={style.scrollView}>
                    <KeyboardAvoidingView>
                        <View style={style.main}>
                            <Pressable style={style.image} onPress={openImagePickerAsync}>
                                {product.picture !== null ? (
                                    <View style={style.image}>
                                        <Image source={{ uri: product.picture }} style={style.thumbnail} />
                                    </View>
                                ) : (
                                    <View style={style.empty_image_container}>
                                        <Text style={[commonStyle.basic_text, { fontSize: 18 }]}> Pick an Image</Text>
                                    </View>
                                )}
                            </Pressable>
                            <TextInput type="default" placeholder="Name" icon="user" value={product.name} onChange={(data) => setProduct({ ...product, name: data })} />
                            <TextInput type="default" placeholder="Description (optional)" icon="align-center" value={product.desc} onChange={(data) => setProduct({ ...product, desc: data })} />
                            <View style={style.suppliers_and_category_wrapper}>
                                <Pressable onPress={() => pickingCategory()}>
                                    <View style={style.suppliers_and_category_wrapper_item}>
                                        <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 15 }]}>{product.category ? product.category : "Select Category"}</Text>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => pickingSupplier()}>
                                    <View style={style.suppliers_and_category_wrapper_item}>
                                        <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 15 }]}>{product.suppliers ? product.suppliers : "Select Suppliers"}</Text>
                                    </View>
                                </Pressable>
                            </View>
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
                                        <Pressable onPress={() => setPopup({ name: "metric", options: metrics, state: "active", id: item.id })}>
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
                                        <InputText
                                            keyboardType="numeric"
                                            style={[style.attribute_text_input, { width: d.width * 0.2 }]}
                                            placeholder="₹ Cost Price"
                                            defaultValue={item.cost_price.toString()}
                                            onChangeText={(data) => updateAttribute(item.id, null, null, data)}
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
                            <Text style={commonStyle.basic_text}>QR Code</Text>
                            <View style={style.qrcode_wrapper}>
                                <View style={style.qrcode_left}>
                                    <Text style={[commonStyle.basic_text_semiBold_20]}>{product.qr_code ? "Scanned" : "Not Selected"}</Text>
                                </View>
                                <View style={style.qrcode_left}>
                                    <Button title="Select QR Code" onPress={onQRCodeButtonPress} />
                                </View>
                            </View>
                            <OuterLineBtn text="Add New Attribute" onPress={addNewAttribute} />
                            <View style={{ height: 50 }}>
                                <PrimaryButton onPress={() => onSavePress()} width={d.width * 0.9} name="Save" />
                            </View>
                            <Text style={[commonStyle.basic_text_semiBold_20]}>{product.qr_code}</Text>
                        </View>
                        {popup.state === "active" && <Popup return={(x) => selectedOption(x)} options={popup.options} />}
                    </KeyboardAvoidingView>
                </ScrollView>
            ) : (
                <LoadingCircle color="black" />
            )}
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
    qrcode_wrapper: {
        width: d.width - 40,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
    },
    qrcode_left: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    suppliers_and_category_wrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 10,
        borderRadius: 10,
    },
    suppliers_and_category_wrapper_item: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
        width: d.width * 0.4,
        height: 50,
        marginRight: 10,
        borderWidth: 1,
        borderColor: colors.deepPurpleA100,
    },
})
