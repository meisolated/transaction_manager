import React from "react"
import {
    View,
    Text,
    StyleSheet
} from "react-native"

const SuppliersData = (props) => {
    let params = props.route.params
    return <View style={styles.container}>
        <Text>Suppliers</Text>
        <Text>{JSON.stringify(params)}</Text>
    </View>
}
export default SuppliersData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})