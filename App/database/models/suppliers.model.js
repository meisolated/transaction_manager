import db from "../db.js"

export default class suppliersModel {
    constructor() {
        this.table = "suppliers"
    }

    static TSinSecs = () => Math.floor(Date.now() / 1000)

    get = (id) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`SELECT * FROM ${this.table} WHERE id = ?`, [id], (tx, results) => {
                    if (results.rows.length > 0) {
                        resolve(results.rows.item(0))
                    } else {
                        resolve(null)
                    }
                })
            })
        })
    }

    /**
     * @description get all suppliers
     * @author meisolated
     * @date 24/06/2022
     * @memberof suppliersModel
     */
    getAll = () =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table}`,
                    [],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description add new suppliers
     * @author meisolated
     * @date 24/06/2022
     * @param {*} data [name, picture]
     * @memberof suppliersModel
     */
    add = (data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO ${this.table} (name, picture, created_at, modified_at) VALUES (?, ?, ${suppliersModel.TSinSecs()}, ${suppliersModel.TSinSecs()})`,
                    data,
                    (_, { rows }) => {
                        resolve({ status: "done" })
                    },
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description delete a suppliers
     * @author meisolated
     * @date 24/06/2022
     * @param {*} id NUMBER
     * @memberof suppliersModel
     */
    delete = (id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `DELETE FROM ${this.table} WHERE id = ?`,
                    id,
                    (_, { rows }) => {
                        resolve(rows._array)
                    },
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description update a suppliers
     * @author meisolated
     * @date 24/06/2022
     * @param {*} id NUMBER
     * @param {*} data [name, picture]
     * @memberof suppliersModel
     */
    update = (id, data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE ${this.table} SET name = ?, picture = ? WHERE id = ${id}`,
                    data,
                    (_, { rows }) => {
                        resolve(rows._array)
                    },
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description update Suppliers picture
     * @author meisolated
     * @date 23/06/2022
     * @param {*} id number
     * @param {*} picture TODO:not sure
     * @memberof productsModel
     */
    updatePicture = (id, picture) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE ${this.table} picture = ${picture} WHERE id = ${id}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
}
