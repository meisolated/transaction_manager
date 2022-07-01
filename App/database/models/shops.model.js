import db from "../db.js"

export default class shopsModel {
    constructor() {
        this.table = "shops"
    }

    static TSinSecs = () => Math.floor(Date.now() / 1000)

    /**
     * @description add new shop to database
     * @author meisolated
     * @date 30/06/2022 
     * @param {*} data [name, address, phone, picture, qr_code]
     * @memberof shopsModel 
     */
    add = (data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO ${this.table} (name, address, phone, picture, qr_code, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ${shopsModel.TSinSecs()}, ${shopsModel.TSinSecs()})`,
                    data,
                    (_, { rows, insertId }) => {
                        resolve({ insertId: insertId, status: "done" })
                    }
                    , (_, error) => reject(error)
                )
            })
        })

    /**
     * @description get a shop by id
     * @author meisolated
     * @date 30/06/2022
     * @param {*} id NUMBER
     * @memberof shopsModel
     */
    get = (id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table} WHERE id = ?`,
                    id,
                    (_, { rows }) => {
                        resolve(rows._array[0])
                    },
                    (_, error) => reject(error)
                )
            })
        })


    /**
     * @description get shop by qr_code
     * @author meisolated
     * @date 01/07/2022
     * @param {*} qr_code STRING
     * @memberof shopsModel
     */
    getShopByQrCode = (qr_code) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table} WHERE qr_code = ?`,
                    qr_code,
                    (_, { rows }) => {
                        console.log(rows)
                        resolve(rows._array[0])
                    },
                    (_, error) => reject(error)
                )
            })
        }
        )


    /**
     * @description get all shops from database
     * @author meisolated
     * @date 23/06/2022
     * @memberof shopsModel
     */
    getAll = () =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description get a shop by id
     * @author meisolated
     * @date 23/06/2022
     * @param {*} id number
     * @memberof shopsModel
     */
    getByID = (id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table} WHERE id = ${id}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description update a shop by id
     * @author meisolated
     * @date 23/06/2022
     * @param {*} id NUMBER
     * @param {*} data [name, address, phone, picture, qr_code]
     * @memberof shopsModel
     */
    updateById = (id, data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE ${this.table} SET name = ?, address = ?, phone = ?, picture = ?, qr_code = ? WHERE id = ${id}`,
                    data,
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description update shop picture
     * @deprecated
     * @author meisolated
     * @date 23/06/2022
     * @param {*} id number
     * @param {*} picture TODO:not sure
     * @memberof shopsModel
     */
    updatePicture = (id, picture) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE ${this.table} SET picture = ${picture} WHERE id = ${id}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
}
