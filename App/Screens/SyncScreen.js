import { View, Text, StyleSheet, FlatList, Image, Pressable, ActivityIndicator, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import BottomNavBar from "../Navigation/bottomNavbar.js"
import { PrimaryButton } from "../components/button/"
import TopNavbar from "../Navigation/topNavbar.js"
import D from "../handler/Dimensions.handler.js"
import commonStyles from "../common/style.js"
import React, { useMemo } from "react"
import config from "../config/index.js"
import qs from "qs"
import { localStorage } from "../database/localStorage.js"
import categoriesModel from "../database/models/categories.model.js"
import suppliersModel from "../database/models/suppliers.model.js"
import productsModel from "../database/models/products.model.js"
import ordersModel from "../database/models/orders.model.js"
import shopsModel from "../database/models/shops.model.js"
import axios from "axios"
import { sleep } from "../util/functions.js"
import * as colors from "../constant/color.js"
import ToastHandler from "../handler/Toast.handler.js"
import { createTables, deleteAllTables } from "../database/db_helpers.js"
let d = new D()

const apiUrl = config.apiUrl
const apiConfig = (path, method, data) =>
    new Promise(async (resolve, reject) => {
        const userToken = await localStorage.retrieveData("userToken").catch((err) => reject(err))
        resolve({
            method: "post",
            // timeout: 1000 * 5,
            url: apiUrl + "backup",
            headers: {
                authorization: userToken,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: qs.stringify({ method, ...data }),
        })
    })

const SyncScreen = (props) => {
    let db_categories = new categoriesModel()
    let db_suppliers = new suppliersModel()
    let db_products = new productsModel()
    let db_shops = new shopsModel()
    let [loading, setLoading] = React.useState(false)
    let [loadingMessage, setLoadingMessage] = React.useState("Nothing")

    const onPressTakeBackup = async () => {
        function backupAll(table, data) {
            return new Promise((resolve, reject) => {
                let index = -1
                let timer = setInterval(function () {
                    if (index < table.length) {
                        let i = index + 1
                        if (!table[i]) {
                            clearInterval(timer)
                            return resolve()
                        }
                        backupThis(table[i], data[table[i]])
                            .then(() => {
                                index++
                            })
                            .catch((err) => {
                                clearInterval(timer)
                                reject(err)
                            })
                    } else {
                        clearInterval(timer)
                        resolve()
                    }
                }, 5000)
            })
        }
        const backupThis = async (table, _data) =>
            new Promise(async (resolve, reject) => {
                setLoadingMessage(`Backing up ${table}`)
                let config = await apiConfig(table, "take", { data: _data, table })
                axios(config)
                    .then((res) => {
                        if (res.data.status === "error") return reject(res.data.message)
                        setLoadingMessage(`Backup complete for ${table}`)
                        resolve(`Backed up ${table}`)
                    })
                    .catch((err) => {
                        setLoadingMessage(`Error while backingUp ${table}`)
                        reject(`Error backing up ${table} ${err}`)
                    })
            })
        let tables = ["suppliers", "products", "categories", "shops", "products_attributes"]
        setLoading(true)
        setLoadingMessage("Getting data from tables")
        await sleep(2)
        let suppliers = await db_suppliers.getAll()
        let products = await db_products.getAll()
        let shops = await db_shops.getAll()
        let products_attributes = await db_products.getAllAttributes()
        let categories = await db_categories.getAll()
        let data = {
            suppliers,
            products,
            products_attributes,
            categories,
            shops,
        }
        setLoadingMessage("Sending data to server")
        await sleep(2).then(() => {
            backupAll(tables, data)
                .then(() => {
                    setLoadingMessage("Backup complete")
                    sleep(2).then(() => {
                        setLoading(false)
                    })
                })
                .catch((err) => {
                    setLoading(false)
                    ToastHandler(err)
                })
        })
    }
    const onPressRestoreBackup = async () => {
        setLoading(true)
        setLoadingMessage("Getting data from server")
        await sleep(2)
        // delete all tables
        setLoadingMessage("Deleting all tables")
        let done = 0
        deleteAllTables()
            .then(() => {
                sleep(2).then(() => {
                    createTables()
                        .then(async () => {
                            setLoadingMessage("Creating All tables")
                            let config = await apiConfig("backup", "get")
                            axios(config)
                                .then(async (res) => {
                                    let data = res.data
                                    if (data.categories.length == 0 && data.suppliers.length == 0 && data.products.length == 0 && data.shops.length == 0 && data.products_attributes.length == 0) {
                                        setLoadingMessage("No data to restore")
                                        return setLoading(false)
                                    }
                                    data.categories.map(async (category, index) => {
                                        await db_categories
                                            .add([category.name, category.picture])
                                            .then(() => {
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                        if (index === data.categories.length - 1) {
                                            done++
                                            setLoadingMessage(done + " tables restored out of 5")
                                        }
                                    })
                                    data.suppliers.map(async (supplier, index) => {
                                        await db_suppliers
                                            .add([supplier.name, supplier.picture])
                                            .then(() => {
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                        if (index === data.categories.length - 1) {
                                            done++
                                            setLoadingMessage(done + " tables restored out of 5")
                                        }
                                    })
                                    data.shops.map(async (shop, index) => {
                                        await db_shops
                                            .add([shop.name, shop.address, shop.phone, shop.picture, shop.qr_code])
                                            .then(() => {
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                        if (index === data.categories.length - 1) {
                                            done++
                                            setLoadingMessage(done + " tables restored out of 5")
                                        }
                                    })
                                    data.products.map(async (product, index) => {
                                        await db_products
                                            .addNew([product.name, product.picture, product.description, product.qr_code, product.category, product.supplier], product.product_id)
                                            .then(() => {
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                        if (index === data.categories.length - 1) {
                                            done++
                                            setLoadingMessage(done + " tables restored out of 5")
                                        }
                                    })
                                    data.productsAttributes.map(async (product_attribute, index) => {
                                        await db_products
                                            .addNewAttribute([product_attribute.product_id, product_attribute.number, product_attribute.metric, product_attribute.price, product_attribute.cost_price])
                                            .then(() => {
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                        if (index === data.categories.length - 1) {
                                            done++
                                            setLoadingMessage(done + " tables restored out of 5")
                                        }
                                    })
                                    sleep(30).then(() => {
                                        setLoadingMessage("Restored " + done + " tables out of 5")
                                        sleep(2).then(() => {
                                            setLoading(false)
                                        })
                                    })
                                })
                                .catch((err) => {
                                    setLoading(false)
                                })
                        })
                        .catch((err) => {
                            alert(err)
                        })
                })
            })
            .catch((err) => {
                alert(err)
            })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", }}>
            <TopNavbar title="Backup & Restore" />
            <View style={styles.container}>
                {!loading && (
                    <View>
                        <View style={{ height: 50 }}>
                            <PrimaryButton name={"Take Backup"} onPress={() => onPressTakeBackup()} width={d.width * 0.9} />
                        </View>
                        <View style={{ height: 50, margin: 10 }}>
                            <PrimaryButton name={"Restore Backup"} onPress={() => onPressRestoreBackup()} width={d.width * 0.9} />
                        </View>
                    </View>
                )}
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
        justifyContent: "center",
        alignItems: "center",

    },
})
