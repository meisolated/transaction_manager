import db from "../db.js"

export default class shopsModel {
    constructor() {
        this.db = db
        this.table = "shops"
    }

    /**
     * @description get all shops from database
     * @author meisolated
     * @date 23/06/2022
     * @memberof shopsModel
     */
    getAllShops = () =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`SELECT * FROM ${this.table}`, [], (_, result) => resolve(result.rows._array), ((_, error) => reject(error)))
            })
        })

    /**
     * @description get a shop by id
     * @author meisolated
     * @date 23/06/2022
     * @param {*} id number
     * @memberof shopsModel
     */
    getShopByID = (id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`SELECT * FROM ${this.table} WHERE id = ${id}`, [], (_, result) => resolve(result.rows._array), ((_, error) => reject(error)))
            })
        })

    /**
     * @description update a shop by id
     * @author meisolated
     * @date 23/06/2022
     * @param {*} id NUMBER
     * @param {*} data [name, address, phone, qr_code]
     * @memberof shopsModel
     */
    updateShopById = (id, data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`UPDATE ${this.table} SET name = ?, address = ?, phone = ?, qr_code = ? WHERE id = ${id}`, data, (_, result) => resolve(result.rows._array), ((_, error) => reject(error)))
            })
        })

    /**
     * @description update shop picture
     * @author meisolated
     * @date 23/06/2022
     * @param {*} id number
     * @param {*} picture TODO:not sure
     * @memberof shopsModel
     */
    updateShopPicture = (id, picture) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`UPDATE ${this.table} SET picture = ${picture} WHERE id = ${id}`, [], (_, result) => resolve(result.rows._array), ((_, error) => reject(error)))
            })
        })
}
