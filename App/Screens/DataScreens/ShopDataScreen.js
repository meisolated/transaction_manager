import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import ImagePickerHandler from "../../handler/ImagePicker.handler.js"
import { SafeAreaView } from "react-native-safe-area-context"
import shopModel from "../../database/models/shops.model.js"
import TextInput from "../../components/Form/TextInput.js"
import color, * as colors from "../../constant/color.js"
import { PrimaryButton } from "../../components/button/"
import TopNavbar from "../../Navigation/topNavbar.js"
import { Feather as Icon } from "@expo/vector-icons"
import D from "../../handler/Dimensions.handler.js"
import React, { useMemo, useState } from "react"
import commonStyle from "../../common/style.js"

let d = new D()
const ShopData = (props) => {
    let db_shop = new shopModel()
    // handle params
    let params = useMemo(() => {
        return props.route.params || {}
    }, [props.route.params])

    let [screen, setScreen] = useState({ title: "", button: "" })

    let [shop, setShop] = React.useState({
        name: null,
        address: null,
        phone: null,
        picture: null,
        qr_code: null,
    })

    React.useEffect(() => {
        if (params.someData !== undefined) {
            setShop({ ...params.someData })
        }
        // return () => {
        //     setState({ productID: "", ScreenState: "add" })
        //     setProduct({})
        // }
    }, [params])


    const onSavePress = () => {
        if (params.shopId) {
            db_shop
                .updateById(params.shopId, [shop.name, shop.address, shop.phone, shop.picture, shop.qr_code])
                .then((result) => {
                    props.navigation.goBack()
                })
                .catch((error) => {
                    alert(error)
                })
        } else {
            db_shop.add([shop.name, shop.address, shop.phone, shop.picture, shop.qr_code]).then((result) => {
                props.navigation.goBack()
            }).catch(e => alert(e))
        }
    }

    // handle image
    const openImagePicker = async () => {
        let image = await ImagePickerHandler()
        if (image) {
            setShop({ ...shop, picture: image })
        }
    }


    const onQRCodeButtonPress = () => {
        props.navigation.navigate("QRCodeScanner", { shop, newShop: params.shopId })
    }

    React.useEffect(() => {
        setScreen({ title: "New Shop", button: "Save" })
        if (params.shopId) {
            setScreen({ title: "Edit Shop", button: "Update" })
            db_shop.getByShopId(params.shopId).then((result) => {
                setShop(result[0])
            })
        }
    }, [params.shopId])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title={screen.title} />
            <View style={style.container}>
                <Pressable style={style.image} onPress={openImagePicker}>
                    {shop.picture !== null ? (
                        <View style={style.image}>
                            <Image source={{ uri: shop.picture }} style={style.thumbnail} />
                        </View>
                    ) : (
                        <View style={style.empty_image_container}>
                            <Text style={[commonStyle.basic_text, { fontSize: 18 }]}> Pick an Image</Text>
                        </View>
                    )}
                </Pressable>
                <TextInput icon="user" placeholder="Shop Name" value={shop.name} onChange={(text) => setShop({ ...shop, name: text })} />
                <TextInput icon="map-pin" placeholder="Address" value={shop.address} onChange={(text) => setShop({ ...shop, address: text })} />
                <TextInput type="numeric" icon="hash" placeholder="Phone" value={shop.phone} onChange={(text) => setShop({ ...shop, phone: text })} />
                <Pressable onPress={onQRCodeButtonPress}>
                    <View style={[style.qr_code_wrapper, shop.qr_code && { backgroundColor: colors.green700 }]}>
                        {!shop.qr_code ? <Text style={[commonStyle.basic_text, { fontSize: 18, color: "white" }, shop.qr_code && { color: "white" }]}>Scan QR Code </Text> : <Icon name="check" size={30} color={colors.white} />}
                    </View>
                </Pressable>
                <Text style={[commonStyle.basic_text, { fontSize: 18 }]}>{shop.qr_code}</Text>
                <View style={{ height: 50 }}>
                    <PrimaryButton onPress={() => onSavePress()} name={screen.button} width={d.width * 0.9} />
                </View>
            </View>
        </SafeAreaView>
    )
}
export default ShopData

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    qr_code_wrapper: {
        height: 50,
        width: d.width * 0.9,
        backgroundColor: color.darkGrey,
        borderRadius: 5,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
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
        borderColor: color.deepPurpleA100,
        backgroundColor: colors.white,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
})
