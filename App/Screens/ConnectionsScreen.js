import { StyleSheet, View, Text, Pressable, StatusBar, Alert, ActivityIndicator, ScrollView } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import LoadingCircle from "../components/widgets/loading/index.js"
import { SafeAreaView } from "react-native-safe-area-context"
import { PrimaryButton } from "../components/button/index.js"
import { localStorage } from "../database/localStorage.js"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import TextInput from "../components/Form/TextInput.js"
import color, * as colors from "../constant/color.js"
import { Feather as Icons } from "@expo/vector-icons"
import TopNavbar from "../Navigation/topNavbar.js"
import D from "../handler/Dimensions.handler.js"
import commonStyle from "../common/style.js"
import config from "../config/index.js"
import font from "../constant/font.js"
import { BlurView } from "expo-blur"
import React from "react"
import axios from "axios"
import qs from "qs"
const d = new D()

// global -------------------------------------------------
const apiUrl = config.apiUrl
const apiConfig = (path, method, data) =>
    new Promise(async (resolve, reject) => {
        const userToken = await localStorage.retrieveData("userToken").catch((err) => reject(err))
        resolve({
            method: "post",
            timeout: 1000 * 5,
            url: apiUrl + "connection",
            headers: {
                authorization: userToken,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: qs.stringify({ method, ...data }),
        })
    })
// -------------------------------------------------

function ConnectionsScreen(props) {
    const serverDown = () => {
        Alert.alert("Server Down", "Please try again later")
        setLoading(false)
        props.navigation.goBack()
    }
    const [loading, setLoading] = React.useState(true)
    const [bottomButton, setBottomButton] = React.useState("Invite")
    const [ownerData, setOwnerData] = React.useState({ name: null, phoneNumber: null, approved: false })
    const [connections, setConnections] = React.useState([])
    const [invite, setInvite] = React.useState(false)

    // -------------------------------------------------
    const getOwner = async () => {
        const config = await apiConfig("connection", "get_owner", {})
        axios(config)
            .then((res) => {
                setLoading(false)
                if (res.data.code !== 200) return getMembers()
                if (res.data.owner) {
                    setOwnerData({ name: res.data.ownerData.name, phoneNumber: res.data.ownerData.phone, approved: res.data.owner.approved === "1" ? true : false })
                    setBottomButton("Leave Connection")
                }
            })
            .catch((err) => {
                serverDown()
            })
    }

    const getMembers = async () => {
        const config = await apiConfig("connection", "get_members", {})
        axios(config)
            .then((res) => {
                setLoading(false)
                if (res.data.code !== 200) return alert(res.data.message)
                if (res.data.members.length > 0) {
                    setConnections(res.data.membersData)
                } else {
                    alert("No connections yet")
                }
            })
            .catch((err) => serverDown())
    }

    const onRemoveConnection = async (phone) => {
        const config = await apiConfig("connection", "remove_member", { phone })
        Alert.alert("Are you sure", "You want to remove this connection", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Yes",
                onPress: () => {
                    axios(config)
                        .then((res) => {
                            if (res.data.code !== 200) return alert(res.data.message)
                            getOwner()
                        })
                        .catch((err) => {
                            alert(err)
                        })
                },
            },
        ])
    }

    const onPressBottomButton = () => {

        if (bottomButton === "Invite") {
            return setInvite(true)
        }
        else if (bottomButton === "Leave Connection") {
            Alert.alert("Are you sure", "You want to leave this connection", [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes",
                    onPress: async () => {
                        const config = await apiConfig("connection", "leave_connection", {})
                        axios(config)
                            .then((res) => {
                                if (res.data.code !== 200) return alert(res.data.message)
                                props.navigation.goBack()
                            })
                            .catch((err) => {
                                alert(err)
                            })
                    }
                }
            ])
        }
    }

    const onPressAcceptConnection = async () => {
        const config = await apiConfig("connection", "accept", {})
        axios(config)
            .then((res) => {
                if (res.data.code !== 200) return alert(res.data.message)
                getOwner()
            })
            .catch((err) => {
                alert(err)
            })
    }
    React.useEffect(() => {
        getOwner()
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <LoadingCircle color={colors.purple600} />
            </View>
        )
    }

    const MembersList = (member, key) => {
        const approved = member.approved == 1 ? true : false
        return (
            <View style={styles.container} key={key}>
                <View style={styles.connectionsItem}>
                    <Icons name="user" size={40} color={colors.black} style={{ marginRight: 10 }} />
                    <View style={styles.connectionsItemLeft}>
                        <Text style={commonStyle.basic_text}>{member.name}</Text>
                        <Text style={commonStyle.text_lite(20)}>{member.phone}</Text>
                        <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 15 }]}>{"Member"}</Text>
                        <View></View>
                    </View>
                    <Pressable onPress={() => onRemoveConnection(member.phone)}>
                        <Icons name="trash-2" size={30} color={colors.white} style={{ marginRight: 10, backgroundColor: colors.purple400, padding: 10, borderRadius: 10 }} />
                    </Pressable>
                </View>

                <Text style={[styles.member_approved, approved && { backgroundColor: colors.green600 }]}>{approved ? "Approved" : "Not Approved"}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title="Connections" />
            {bottomButton === "Leave Connection" && (
                <View style={styles.connectionsItem}>
                    <Icons name="user" size={40} color={colors.black} style={{ marginRight: 10 }} />
                    <View style={styles.connectionsItemLeft}>
                        <Text style={commonStyle.basic_text}>{ownerData.name}</Text>
                        <Text style={commonStyle.text_lite(20)}>{ownerData.phoneNumber}</Text>
                        <Text style={[commonStyle.basic_text_semiBold_20, { fontSize: 15 }]}>{"Owner"}</Text>
                    </View>
                    {!ownerData.approved && <Pressable onPress={() => onPressAcceptConnection()}>
                        <Icons name="user-check" size={30} color={colors.white} style={{ marginRight: 10, backgroundColor: colors.green600, padding: 10, borderRadius: 10, elevation: 5 }} />
                    </Pressable>}
                </View>
            )}
            <Text style={[commonStyle.basic_text_semiBold_20, { padding: 10 }]}>Members List</Text>
            <ScrollView style={{ flex: 1, marginBottom: 100 }}>{connections.map((member, key) => MembersList(member, key))}</ScrollView>
            {invite && <Invite hideMe={() => setInvite(false)} />}
            <View style={{ bottom: 80, position: "absolute", alignSelf: "center" }}>
                <PrimaryButton name={bottomButton} onPress={() => onPressBottomButton()} width={d.width * 0.9} />
            </View>
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}

export default ConnectionsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
    connectionsItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingVertical: 20,
        borderRadius: 5,
        backgroundColor: color.white,
    },

    connectionsItemLeft: {
        flexDirection: "column",
        flex: 1,
    },
    member_approved: {
        elevation: 4,
        backgroundColor: colors.orange600,
        color: colors.white,
        padding: 5,
        fontFamily: font.medium,
        borderRadius: 5,
        marginTop: -10,
        textAlign: "center"
    },
})

const Invite = (props) => {
    let [number, setNumber] = React.useState("")
    let [loading, setLoading] = React.useState(false)

    const onPress = async () => {
        if (!number) return alert("Please enter a number")
        if (number.length < 10) alert("Please enter a valid phone number")
        const config = await apiConfig("connection", "invite", { phone: number })
        setLoading(true)
        axios(config)
            .then((res) => {
                setLoading(false)
                props.hideMe()
                if (res.data.code !== 200) return alert(res.data.message)
                alert("Invitation sent")
            })
            .catch((err) => {
                setLoading(false)
                Alert.alert("Error", "Please try again later")
                props.hideMe()
            })
    }
    return (
        <BlurView tint="dark" intensity={120} style={inviteStyles.container}>
            {!loading ? (
                <View style={inviteStyles.header}>
                    <TextInput length={10} type="numeric" onChange={(number) => setNumber(number)} placeholder="Number" icon="hash" style={{ height: 50, width: d.width * 0.9 }} value={number} />
                    <View style={{ height: 50 }}>
                        <PrimaryButton name={"Send Invite"} onPress={() => onPress()} width={d.width * 0.9} />
                    </View>
                </View>
            ) : (
                <ActivityIndicator size="large" color={colors.purple600} />
            )}
        </BlurView>
    )
}

const inviteStyles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 2,
        width: d.width + 10,
        height: d.height + 100,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        padding: 20,
    },
})
