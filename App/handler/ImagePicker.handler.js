import * as ImagePicker from "expo-image-picker"
import RNFS from "react-native-fs"

export default async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!")
        return
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (pickerResult.cancelled === true) {
        return
    }
    let prefix = "data:image/png;base64,"
    let base64 = await RNFS.readFile(pickerResult.uri, "base64")
    return { url: pickerResult.uri, base64: prefix + base64 }
}
