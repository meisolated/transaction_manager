import { Text, View, Button, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useEffect } from "react"
import productsModel from "../database/models/products.model.js"
import ImagePickerHandler from "../handler/ImagePicker.handler.js"
import RNFS from 'react-native-fs'
function AdminScreen(props) {

    // const db_product = new productsModel()
    // const [products, setProducts] = React.useState([])
    // const [finalArray, setFinalArray] = React.useState([])
    // useEffect(() => {
    //     if (products.length === 0) {
    //         db_product
    //             .getAll()
    //             .then((result) => setProducts(result))
    //             .catch((error) => console.log(error))
    //     }
    //     if (products.length > 0) {
    //         products.map((product) => {
    //             db_product
    //                 .getAllAttributes(product.id)
    //                 .then((result) => {
    //                     finalArray.push({ ...product, attributes: result })
    //                     console.log(finalArray)
    //                     setFinalArray(finalArray)
    //                 })
    //                 .catch((error) => console.log(error))
    //         })
    //     }
    // }, [products])

    const [image, setImage] = React.useState(null)
    let prefix = "data:image/png;base64,"
    async function openImagePickerAsync() {
        let image = await ImagePickerHandler()
        console.log(image)
        RNFS.readFile(image, 'base64')
            .then(res => {
                setImage(res)
            })
    }

    return (
        <SafeAreaView>
            <View>
                <Text>Admin Screen</Text>
                <Button title={"Open Image Picker"} onPress={openImagePickerAsync} />
                <Image source={{ uri: prefix + image }} style={{ width: 200, height: 200 }} />
            </View>
        </SafeAreaView>
    )
}

export default AdminScreen
