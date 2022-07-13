import React from "react"
import { View, Text, Button, StyleSheet, ScrollView, ImageBackground, Pressable, StatusBar, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PrimaryButton } from "../components/button/index.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import TextInput from "../components/Form/TextInput.js"
import TopNavbar from "../Navigation/topNavbar.js"
import D from "../handler/Dimensions.handler.js"
import * as colors from "../constant/color.js"
import commonStyle from "../common/style.js"
import font from "../constant/font.js"
import axios from "axios"
import qs from "qs"
import { localStorage } from "../database/localStorage.js"
import ToastHandler from "../handler/Toast.handler.js"
import config from "../config/index.js"
const d = new D()

function LoginAndSignup(props) {
    let [state, setState] = React.useState({ loginOrSignup: "login" })
    let [loading, setLoading] = React.useState(false)
    let [data, setData] = React.useState({
        // password: "",
        // confirmPassword: "",
        name: "",
        phoneNumber: "",
    })

    const onPressChange = () => {
        if (state.loginOrSignup === "login") {
            setState({ loginOrSignup: "signup" })
        } else {
            setState({ loginOrSignup: "login" })
        }
    }

    const onClickLogin = () => {
        let apiUrl = config.apiUrl
        setLoading(true)
        if (state.loginOrSignup === "login") {
            if (!data.phoneNumber.length === 10) return alert("Please fill phone number field properly")
            const _data = qs.stringify({ phone: data.phoneNumber })
            const config = { method: "POST", url: apiUrl + "login", headers: { "Content-Type": "application/x-www-form-urlencoded" }, data: _data }
            axios(config)
                .then((res) => {
                    setLoading(false)
                    if (res.data.status == "success") {
                        localStorage.storeData("userToken", res.data.token)
                        ToastHandler("Login Success")
                        // return props.navigation.navigate("Home")
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch((err) => {
                    setLoading(false)
                    alert("Login failed" + err)
                })
        } else if (state.loginOrSignup === "signup") {
            if (data.name.length < 1) return alert("Please fill name field properly")
            if (!data.phoneNumber.length === 10) return alert("Please fill phone number field properly")

            const _data = qs.stringify({ name: data.name, phone: data.phoneNumber })
            const config = { method: "POST", url: apiUrl + "signup", headers: { "Content-Type": "application/x-www-form-urlencoded" }, data: _data }

            axios(config)
                .then((res) => {
                    setLoading(false)
                    if (res.data.status === "success") {
                        localStorage.storeData("userToken", res.data.token)
                        ToastHandler("Signup Success")
                        // return props.navigation.navigate("Home")
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch((err) => {
                    setLoading(false)
                    alert(err)
                })
        }
    }

    React.useEffect(() => { }, [])

    return (
        <ImageBackground source={require("../assets/img/wallpaper.jpeg")} resizeMode="stretch" style={styles.backgroundImage}>
            <StatusBar backgroundColor={colors.purple300} barStyle="light-content" />
            {!loading && (
                <SafeAreaView style={styles.container}>
                    <Text style={[commonStyle.basic_text, { fontSize: 50, alignSelf: "flex-start", top: 50, position: "absolute", color: "white" }]}>Transaction Manager</Text>
                    {state.loginOrSignup == "signup" && (
                        <TextInput type="default" onChange={(text) => setData({ ...data, name: text })} length={20} placeholder="Name" icon="user" style={{ height: 50, width: d.width * 0.9 }} value={data.name} />
                    )}
                    <TextInput
                        type="numeric"
                        onChange={(text) => setData({ ...data, phoneNumber: text })}
                        length={20}
                        placeholder="Phone"
                        icon="hash"
                        style={{ height: 50, width: d.width * 0.9 }}
                        value={data.phoneNumber}
                    />
                    <Pressable style={{ marginTop: 50 }} onLongPress={""} onPress={() => onClickLogin()}>
                        <View style={[styles.btn_container, { width: d.width * 0.9 }]}>
                            <Text style={styles.name}>{state.loginOrSignup == "login" ? "Login" : "Register"}</Text>
                        </View>
                    </Pressable>
                    <Pressable style={{ marginTop: 10 }} onLongPress={""} onPress={onPressChange}>
                        <Text style={[commonStyle.basic_text_semiBold_20, { color: "white", marginTop: 30 }]}>{state.loginOrSignup == "login" ? "Already have an account?" : "Don't have an account?"}</Text>
                    </Pressable>
                </SafeAreaView>
            )}
            {loading && <ActivityIndicator size="large" color={colors.white} />}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },

    btn_container: {
        selfAlign: "center",
        alignItems: "center",
        backgroundColor: colors.purple300,
        borderWidth: 1,
        borderColor: colors.purple100,
        // elevation: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
    },
    name: {
        color: colors.white,
        fontFamily: font.semiBold,
        fontSize: 20,
    },
})

export default LoginAndSignup
