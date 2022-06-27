import db from "../db.js"


export default class suppliersModel {
    constructor() {
        this.db = db
        this.table = "suppliers"
    }

    /**
     * @description get all suppliers
     * @author meisolated
     * @date 24/06/2022
     * @memberof suppliersModel
     */
    getAllSuppliers = () => new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM ${this.table}`, [], (_, result) => resolve(result.rows._array), ((_, error) => reject(error)))
        })
    })



    /**
     * @description add new suppliers
     * @author meisolated
     * @date 24/06/2022
     * @param {*} name STRING
     * @memberof suppliersModel
     */
    addSuppliers = (name) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${this.table} (name) VALUES (?)`,
                [name],
                (_, { rows }) => {
                    resolve(rows._array)
                }, (_, error) => reject(error)
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
    deleteSuppliers = (id) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM ${this.table} WHERE id = ?`,
                [id],
                (_, { rows }) => {
                    resolve(rows._array)
                }, (_, error) => reject(error)
            )
        })
    })

    /**
     * @description update a suppliers 
     * @author meisolated
     * @date 24/06/2022
     * @param {*} id NUMBER
     * @param {*} name STRING 
     * @memberof suppliersModel
     */
    updateSuppliers = (id, name) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                `UPDATE ${this.table} SET name = ? WHERE id = ?`,
                [name, id],
                (_, { rows }) => {
                    resolve(rows._array)
                }, (_, error) => reject(error)
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
    updateSuppliersPicture = (id, picture) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`UPDATE ${this.table} picture = ${picture} WHERE id = ${id}`, [], (_, result) => resolve(result.rows._array), ((_, error) => reject(error)))
            })
        })


}