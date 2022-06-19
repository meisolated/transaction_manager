import AsyncStorage from "@react-native-async-storage/async-storage"
export const localStorage = {
    storeData: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
            console.log(e)
        }
    },
    retrieveData: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                return value
            }
        } catch (e) {
            // error reading value
            console.log(e)
        }
    },
}

// c