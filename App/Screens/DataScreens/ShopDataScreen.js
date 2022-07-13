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
        picture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAACJ6SURBVHgB7d1diKblmSfw+32rnQPJsM6is3EPXAMRZGFI22bJHrREGQjKHMRAS8A9SEICC0sSc5BdDJlNNBDiQQaihhlYDDoHKwSF6TkIBg82in2wH1ntsLAI7pIeTwzT7o5DMh7YXfVOXe/jY1e3XVVdVc/9fF2/H/RUO93peuv5uO///b0oA7j/+N/dcN11F24tWxuf3iqbH1uUxb9YrMrx+LPVotxaAGBmtuu5c6tS3imL8s6qrH61LBu/Xi22fvX8L296qQxgUXpy/79+69Zj7x37wvZ3vHv7225X9qsbCgAQXlqU5emy3Hz5uf/xh2dLD6oGgGjpH1tefKip9Ne/AIC9rMrZ5WLxo/c2N14+ffYPzpVKqgSA7Yr/1o2NC49sp5nPaukDwOGsyuKZzc2NR2sEgU4DwKWKf/GFAgB0okYQ6CQAXOrqX3xDix8AKlmVR55/9aZHSweOHABOffL83YtVeXpVzN4HgNq2K+5zZbn63FEnCy7LEZw68f++u51GfqHyB4B+RJ272lq8durE+e+WIzhUD8C6y3/j4l8VM/sBYEgvXdw89qXDzA04cACIiX7XbVzU6geAEYghgQubx+45aAg4UABQ+QPA+BwmBFxzAFD5A8B4HTQEXFMAUPkDwPgdJATsGwBU/gAwHe+HgDu2Q8A7e/29fZcBHtu4aI0/AExE1Nnvr9Tb054BYL3O31I/AJiau/fbJ2DXIYAHjv/d8dXGxdcKADBNi3LP87+86aWr/dHuPQDX0H0AAIxXbNUfm/dd7c+uGgCi69+4PwBM23o+wPK9b1ztzz40BBCz/o9tXPx1AQDm4J2LzaqAczv/nx/qAdjYuPBIAQDm4oaNjc0PTQi8rAdA6x8A5mm7F+BjO3sBLusB0PoHgHm6shfggx4ArX8AmLV33u8FWO8Q+EEPwHJ54e4CAMzVDTtXBFwKAGXxUAEA5mux/PQHv43/88Dxvz2+2ljY9Q8AZu7i5sXtYYCbz617AFZL+/0DQAbHlov742szBLBYfLYAAPO32FjX+eshgFN3nl8VACCD9WqA5alPnr+7AABZ3HBduXDrsmytjhcAII3VcuvupVP/ACCXVVneulwsFp8oAEAai8VqewhgVW4oAEAai7L8xHYPgAAAANmYAwAAyUTdvywAQDoCAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkdKzAyJy8d1FO3lc699QPVuXt3xQAigDACN340VJuP74o3VsVABqGAAAgIQEAABISAAAgIQEAABISAAAgIQEAABISAAAgIQEAABISAAAgIQEAABISAAAgIQEAABISAAAgIQEAABISAAAgIQEAABISAAAgIQEAABISAAAgIQEAABISAAAgIQEAABISAAAgIQEAABISAAAgIQEAABI6VpisGz9ayvUfaX7F76/m7d9c+tr+nqNp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quNrHDV80Oc1nsv4N+OZjGcznktdy/vbeR8ilMX1j1B2lDKjfW4jYIyhjKAbi1N3nrcwc8IiEEThGi93fI1egubr5X+vLTjjRY7KIv67/QV9iec0foUrn9P2WYyv8YxOrXUfP9cPf9r9yuouD8xZB7HLyozLy4v2urflRFT27f1gfvQATNyHzzGX5xgvoXNYUZFf3npXXmRmIyAASEgAAICEBAAASEgAAICEBAAASEgAAICEBAAASEgAAICEBAAASEgAAICEBAAASEgAAICEBAAASEgAAICEBAAASEgAAICEBAAASEgAAICEBAAASEgAAICEBAAASEgAAICEBAAASEgAAICEBAAASEgAAICEjhUAOvH6a6vStbd/0/2/CWFx6s7zni4ASMYQAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQEICAAAkJAAAQELLRSnnCgCQRtT9egAAIJnVqryzXJXF2QIA5LGIALDa+psCAKSxWq1+ZQ4AACSzKFvnlout8lIBAPJYbpxdXijXndv+7TsFAEjh+V/e9NLy9Nk/iMrfREAAyOGl+D/NMsDV6q8LADB/q811nb8OABe3Nk8XAGD2Lm6t1nX+OgCcPnvzuVJMBgSAWVuVs+/X+TvOAliVlwsAMFvLxeJHH/y+/c3FrWPx/7QaAABm6r3NCx809j8IALEaYFVMBgSAOVqVxTNt93+47DCgzc3NRwoAMDubmxce3fnflwWASAbbvQB/WQCA2biy9R8+dBzw+70A5gIAwExc2foPHwoA64SwKo8XAGD6FluPXtn6D8ur/d1YEbBYrc4VAGCyoi5//pf/7JGr/dlVA8B6RcBy8aUCAEzXVvncbn+03O0P4qSgsiiPFgBgera7/p87+4e7Hva3KPs4def5X2x/ubsAAFPx0vP/86Z79voLy7KPi5vHPmc+AABMQ9TZFzcv7juMv28AiPkAF7Y27xECAGDcoq6OOvtqs/4/9HfLNbr/+Fu3Xrfc+MVqsbi1AACjcpDKf/33ywEIAQAwPget/Nf/m3JAQgAAjMdhKv+w7xyAK8U3iG+0/duXCgAwpJcubP3DHQet/MOBewB2OvXJ84+UVfluAQD6tdh6dLdd/q7pf16O6IF/9bfHy2b5K0MCAFBfdPnHbr3rDfuO8u+UjugNAICKVuWd7YH7xy9e/N2PTp/92JFP7e0sAISYILixsfHIoiy+UACATqzK4pk40vcwY/276TQAtAQBADii7Rb/9vD66a4r/laVANCKILBcbty9LIuHtr/T8QIA7CcO43u5q67+3VQNADut9w/Y+L3PrsrW/cXhQgDQiLH9RTm7KMvTF657769P/9fuW/tX01sAuNKpT56/e7FafmKrbH5se6jgE9sX4IbtD3PDalFuLQAwM4tVORdft+u5s6uy+ptl2fh1WW6+fOHCP5yr2dLfzT8CAlOxQT3p1JgAAAAASUVORK5CYII=",
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
            setShop({ ...shop, picture: image.base64 })
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
