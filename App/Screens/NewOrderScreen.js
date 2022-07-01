import React, { useMemo } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { StyleSheet, Text, View, Pressable, Button, TextInput, TouchableOpacity, Alert, Image, ScrollView, FlatList, AsyncStorage } from "react-native"
import NavBar from "../Navigation/bottomNavbar.js"
import TopNavbar from "../Navigation/topNavbar.js"
import color from "../constant/color.js"
import font from "../constant/font.js"
import { _tempCategories, _tempCompany, _tempOrder, _tempProducts, _getProductName, _getProductAttribute } from "../temp/testingData.js"
import _, { lowerFirst } from "lodash"
import LoadingCircle from "../components/widgets/loading"
import commonStyle from "../common/style.js"
import { numberSeparator } from "../util/functions.js"
import Checkout from "./addOrder/Checkout.js"
import suppliersModel from "../database/models/suppliers.model.js"
import categoriesModel from "../database/models/categories.model.js"
import productsModel from "../database/models/products.model.js"
// ------------------------------------------------------AddOrder----------------------------------------------------------------
export default function AddOrderScreen(props) {
    const params = useMemo(() => {
        return props.route.params || {}
    }, [props.route.params])
    let components = {
        ChooseCategory: <ChooseCategory onSelect={(data) => onGetBack(data)} />,
        ChooseSupplier: <ChooseSupplier onSelect={(data) => onGetBack(data)} />,
        ChooseProduct: (product) => <ChooseProduct product={product} onSelect={(data) => onGetBack(data)} />,
        ChooseProductAttribute: (productId) => <ChooseProductAttribute productId={productId} onSelect={(data) => onGetBack(data)} />,
        Checkout: (addItemToCard, qrCode) => <Checkout navigation={props.navigation} qrCodeCallback={qrCode ? qrCode : null} addItemToCard={addItemToCard} onSelect={(data) => onGetBack(data)} getBack={() => setProduct({ supplier: null, category: null, productId: null, productAttributeId: null })} />,
    }

    function onGetBack(data) {
        setProduct({ ...product, [data.key]: data.value })
    }



    const [product, setProduct] = React.useState({ supplier: null, category: null, productId: null, productAttributeId: null })
    const [state, setState] = React.useState({ title: null, string: null, component: () => null })

    React.useEffect(() => {
        console.log(params.someData)
        if (params.someData !== undefined) {
            setState({ title: "Checkout", string: "checkout", component: () => components.Checkout(product, params.qr_code) })
        }
        else {
            if (product.supplier == null) {
                setState({ title: "Choose Supplier", string: "supplier", component: () => components.ChooseSupplier })
            } else if (product.category == null) {
                setState({ title: "Choose Category", string: "category", component: () => components.ChooseCategory })
            } else if (product.productId == null) {
                setState({ title: "Choose Product", string: "product", component: () => components.ChooseProduct(product) })
            } else if (product.productAttributeId == null) {
                setState({ title: "Choose Product Attribute", string: "productAttributeId", component: () => components.ChooseProductAttribute(product.productId) })
            } else {
                setState({ title: "Checkout", string: "checkout", component: () => components.Checkout(product) })
            }
        }

    }, [product, params])

    return (
        <SafeAreaView style={styles.container}>
            <TopNavbar title={state.title} />
            {state.component()}
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
// --------------------------------------------------END--------------------------------------------------------------------
// -------------------------------------------------------ChooseCategory---------------------------------------------------------------
const ChooseCategoryStyle = StyleSheet.create({
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

const ChooseCategory = (props) => {
    let db_category = new categoriesModel()
    const [categories, setCategories] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    db_category
        .getAll()
        .then((data) => {
            setCategories(data)
            setLoading(false)
        })
        .catch((err) => {
            alert(err)
        })

    React.useEffect(() => {
        return () => {
            setCategories([])
        }
    }, [])

    if (loading)
        return (
            <View style={{ alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                <LoadingCircle color="black" />
            </View>
        )

    return (
        <View style={commonStyle.container}>
            {categories.map((item, index) => {
                return (
                    <View style={commonStyle.center} key={"category" + index}>
                        <TouchableOpacity style={ChooseCategoryStyle.item} onPress={() => props.onSelect({ key: "category", value: item.name })}>
                            <Image style={{ width: 70, height: 70 }} source={require("../assets/img/milk.png")} />
                            <View style={ChooseCategoryStyle.itemDetailsWrapper}>
                                <Text style={ChooseCategoryStyle.title_text}>{item.name}</Text>
                                <Text style={ChooseCategoryStyle.subtitle_text}>{item.name}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" color={color.primary} size={30} />
                        </TouchableOpacity>
                        {categories.length - 1 !== index ? <View style={commonStyle.divider} /> : null}
                    </View>
                )
            })}
        </View>
    )
}

// ------------------------------------------------------END----------------------------------------------------------------
// --------------------------------------------------ChooseSupplier--------------------------------------------------------------------
function ChooseSupplier(props) {
    //get suppliers
    const [suppliers, setSuppliers] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const db_suppliers = new suppliersModel()

    db_suppliers
        .getAll()
        .then((suppliers) => {
            setSuppliers(suppliers)
            setLoading(false)
        })
        .catch((err) => {
            alert(err)
        })

    React.useEffect(() => {
        return () => {
            setSuppliers([])
        }
    }, [])

    if (loading)
        return (
            <View style={{ alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                <LoadingCircle color="black" />
            </View>
        )
    return (
        <View style={commonStyle.container}>
            {suppliers.map((item, index) => {
                let company = _.toLower(item.name)
                // let img = company == "madhusudan" ? require(`../assets/img/amul_logo.png`) : require(`../assets/img/madhusudan_logo.png`)
                let img =
                    company == "madhusudan"
                        ? "https://isosad.com/transaction_manager/img/madhusudan_logo.png"
                        : company == "amul"
                            ? "https://isosad.com/transaction_manager/img/amul_logo.png"
                            : item.picture
                                ? item.picture
                                : "https://isosad.com/transaction_manager/img/madhusudan_logo.png"
                return (
                    <View style={commonStyle.center} key={"company" + index}>
                        <TouchableOpacity style={ChooseCategoryStyle.item} onPress={() => props.onSelect({ key: "supplier", value: item.name })}>
                            <Image style={{ resizeMode: "contain", width: 70, height: 70 }} source={{ uri: img }} />
                            <View style={ChooseCategoryStyle.itemDetailsWrapper}>
                                <Text style={ChooseCategoryStyle.title_text}>{item.name}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" color={color.primary} size={30} />
                        </TouchableOpacity>
                        {suppliers.length - 1 !== index ? <View style={commonStyle.divider} /> : null}
                    </View>
                )
            })}
        </View>
    )
}
const ChooseSupplierStyle = StyleSheet.create({})
// --------------------------------------------------END----------------------------------------------------------------

// --------------------------------------------------ChooseProduct--------------------------------------------------------------------
function ChooseProduct(props) {
    //get suppliers
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const db_products = new productsModel()
    db_products
        .getByCategoryAndSupplier(props.product.category, props.product.supplier)
        .then((data) => {
            setLoading(false)
            setProducts(data)
        })

        .catch((error) => alert(error))
    React.useEffect(() => {
        return () => {
            setProducts([])
        }
    }, [])

    if (loading)
        return (
            <View style={{ alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                <LoadingCircle color="black" />
            </View>
        )
    return (
        <View style={commonStyle.container}>
            {products.map((item, index) => {
                return (
                    <View style={commonStyle.center} key={"product" + index}>
                        <TouchableOpacity style={ChooseCategoryStyle.item} onPress={() => props.onSelect({ key: "productId", value: item.id })}>
                            <Image style={{ width: 70, height: 70 }} source={require("../assets/img/milk.png")} />
                            <View style={ChooseCategoryStyle.itemDetailsWrapper}>
                                <Text style={ChooseCategoryStyle.title_text}>{item.name}</Text>
                                <Text style={ChooseCategoryStyle.subtitle_text}>{item.name}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" color={color.primary} size={30} />
                        </TouchableOpacity>
                        {products.length - 1 !== index ? <View style={commonStyle.divider} /> : null}
                    </View>
                )
            })}
        </View>
    )
}
// --------------------------------------------------END----------------------------------------------------------------
// --------------------------------------------------ChooseProductAttribute--------------------------------------------------------------------
function ChooseProductAttribute(props) {
    //get suppliers
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const db_products = new productsModel()
    db_products
        .getAttributes(props.productId)
        .then((data) => {
            setLoading(false)
            setProducts(data)
        })

        .catch((error) => alert(error))
    React.useEffect(() => {
        return () => {
            setProducts([])
        }
    }, [])

    if (loading)
        return (
            <View style={{ alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                <LoadingCircle color="black" />
            </View>
        )
    return (
        <View style={commonStyle.container}>
            {products.map((item, index) => {
                return (
                    <View style={commonStyle.center} key={"product" + index}>
                        <TouchableOpacity style={ChooseCategoryStyle.item} onPress={() => props.onSelect({ key: "productAttributeId", value: item.id })}>
                            <Image style={{ width: 70, height: 70 }} source={require("../assets/img/milk.png")} />
                            <View style={ChooseCategoryStyle.itemDetailsWrapper}>
                                <Text style={ChooseCategoryStyle.title_text}>{item.metric}</Text>
                                <Text style={ChooseCategoryStyle.subtitle_text}>{item.price}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" color={color.primary} size={30} />
                        </TouchableOpacity>
                        {products.length - 1 !== index ? <View style={commonStyle.divider} /> : null}
                    </View>
                )
            })}
        </View>
    )
}
