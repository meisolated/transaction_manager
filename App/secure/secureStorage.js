import * as SecureStore from 'expo-secure-store'


export async function save(key, value) {
    await SecureStore.setItemAsync(key, value)
}

export async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key)
    if (result) {
        return result
    } else {
        return null
    }
}