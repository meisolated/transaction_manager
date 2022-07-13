import { View, Text, StyleSheet, FlatList, Image, Pressable, ActivityIndicator } from "react-native"
import suppliersModel from "../database/models/suppliers.model.js"
import { SafeAreaView } from "react-native-safe-area-context"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import { PrimaryButton } from "../components/button/"
import color, * as colors from "../constant/color.js"
import Loading from "../components/widgets/loading"
import TopNavbar from "../Navigation/topNavbar.js"
import D from "../handler/Dimensions.handler.js"
import commonStyles from "../common/style.js"
import React, { useMemo } from "react"
import font from "../constant/font.js"
let d = new D()

const SyncScreen = (props) => {
    let [loading, setLoading] = React.useState(false)
    let [loadingMessage, setLoadingMessage] = React.useState("Nothing")
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title="Sync Database" />
            <View style={styles.container}>
                {!loading && <View>
                    <View style={{ alignSelf: "center", height: 50 }}>
                        <PrimaryButton name={"Take Backup"} onPress={() => onPressBottomButton()} width={d.width * 0.9} />
                    </View>
                    <View style={{ alignSelf: "center", height: 50, margin: 10 }}>
                        <PrimaryButton name={"Sync"} onPress={() => onPressBottomButton()} width={d.width * 0.9} />
                    </View>
                </View>}
                {loading && <ActivityIndicator size="large" color={colors.purple600} />}
                {loading && <Text style={[commonStyles.basic_text_semiBold_20, { alignSelf: "center", margin: 10 }]}>{loadingMessage}</Text>}
            </View>
            <BottomNavBar navigation={props.navigation} />
        </SafeAreaView>
    )
}
export default SyncScreen

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flex: 1,
    },

})
