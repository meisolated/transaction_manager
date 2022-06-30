import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Button, Dimensions } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
const window = Dimensions.get("window")
import { Subtract } from "../assets/svg"

export default function QRCodeScanner(props) {
    let params = props.route.params

    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === "granted")
        })()

    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        const routes = props.navigation.getState()?.routes
        const prevRoute = routes[routes.length - 2]
        console.log("🚀 ~ file: QRCodeScannerScreen.js ~ line 24 ~ handleBarCodeScanned ~ prevRoute", prevRoute)
        if (prevRoute.name === "ProductData") {
            return props.navigation.navigate("ProductData", { someData: { ...params?.product, qr_code: data }, productID: params?.newProduct })
        }
        else if (prevRoute.name === "ShopData") {
            return props.navigation.navigate("ShopData", { someData: { ...params?.shop, qr_code: data }, shopID: params?.newShop })
        }
        // return props.navigation.navigate("ProductData", { someData: { ...params?.product, qr_code: data }, productID: params?.newProduct })
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <View style={styles.container}>
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
            </View>
            <View style={styles.scanner_wrapper}>
                <Subtract width={window.width + 11} height={window.height} />
            </View>
            {scanned && (
                <View style={{ zIndex: 2, bottom: 20, width: window.width * 0.8, alignSelf: "center" }}>
                    <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    absoluteFillObject: {},

    scanner_wrapper: {
        //    flex: 1,
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        zIndex: 1,
        position: "absolute",
        left: -10,
        top: 0,
        width: window.width,
        height: window.height,
    },
})
