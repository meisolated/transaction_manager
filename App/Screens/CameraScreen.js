import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native"
import { Camera, CameraType } from "expo-camera"
import { BarCodeScanner } from "expo-barcode-scanner"
import { Colors } from "react-native-paper"

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(CameraType.back)
    const [scanned, setScanned] = useState(false)

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true)
    }

    useEffect(() => {
        ; (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === "granted")
        })()
    }, [])

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }
    return (
        <View style={styles.container}>
            <Camera onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
                type={type}
                style={styles.camera}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(type === CameraType.back ? CameraType.front : CameraType.back)
                        }}
                    >
                        <Text style={styles.text}> Flip </Text>

                    </TouchableOpacity>
                </View>
            </Camera>
            {scanned && <Button title="Tap to Scan" onPress={() => setScanned(false)} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        margin: 20,
    },
    button: {
        flex: 1,
        backgroundColor: Colors.purple400,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        justifyContent: "center",
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        color: "white",
    },
})
