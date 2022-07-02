import { ToastAndroid } from "react-native"
export default (message) => {
    return ToastAndroid.show(message, ToastAndroid.SHORT)
}