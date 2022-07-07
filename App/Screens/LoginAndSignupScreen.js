import React from "react"
import { View, Text, Button, StyleSheet, ScrollView, ImageBackground, Pressable, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PrimaryButton } from "../components/button/index.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import TextInput from "../components/Form/TextInput.js"
import TopNavbar from "../Navigation/topNavbar.js"
import D from "../handler/Dimensions.handler.js"
import * as colors from "../constant/color.js"
import commonStyle from "../common/style.js"
import font from "../constant/font.js"
const d = new D()

function LoginAndSignup(props) {
    let [state, setState] = React.useState({ loginOrSignup: "login" })
    let [data, setData] = React.useState({
        password: "",
        confirmPassword: "",
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

    const onTextChange = (text) => { }
    React.useEffect(() => { }, [])

    return (
        <ImageBackground source={require("../assets/img/wallpaper.jpeg")} resizeMode="stretch" style={styles.backgroundImage}>
            <StatusBar backgroundColor={colors.purple300} barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                {/* <TopNavbar title={"Home"} /> */}
                <Text style={[commonStyle.basic_text, { fontSize: 50, alignSelf: "flex-start", top: 50, position: "absolute", color: "white" }]}>Transaction Manager</Text>
                {state.loginOrSignup == "signup" && <TextInput type="default" onChange={(text) => setData({ ...data, name: text })} length={20} placeholder="Name" icon="user" style={{ height: 50, width: d.width * 0.9 }} value={data.name} />}
                <TextInput type="numeric" onChange={(text) => setData({ ...data, phoneNumber: text })} length={20} placeholder="Phone" icon="hash" style={{ height: 50, width: d.width * 0.9 }} value={data.phoneNumber} />
                <TextInput type="default" onChange={(text) => setData({ ...data, password: text })} length={20} placeholder="Password" icon="key" style={{ height: 50, width: d.width * 0.9 }} value={data.password} />
                {state.loginOrSignup == "signup" && <TextInput type="default" onChange={(text) => setData({ ...data, confirmPassword: text })} length={20} placeholder="Confirm Password" icon="key" style={{ height: 50, width: d.width * 0.9 }} value={data.confirmPassword} />}
                <Pressable style={{ marginTop: 50 }} onLongPress={""} onPress={props.onPress}>
                    <View style={[styles.btn_container, { width: d.width * 0.9 }]}>
                        <Text style={styles.name}>{state.loginOrSignup == "login" ? "Login" : "Register"}</Text>
                    </View>
                </Pressable>
                <Pressable style={{ marginTop: 10 }} onLongPress={""} onPress={onPressChange}>
                    <Text style={[commonStyle.basic_text_semiBold_20, { color: "white", marginTop: 30 }]}>{state.loginOrSignup == "login" ? "Already have an account?" : "Don't have an account?"}</Text>
                </Pressable>
                {/* <BottomNavBar navigation={props.navigation} /> */}
            </SafeAreaView>
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
