import db from "../db.js"

export default class categoriesModel {
    constructor() {
        this.db = db
        this.table = "categories"
    }



    /**
     * @description this element will return timestamp in seconds
     * @author meisolated
     * @date 22/06/2022
     * @static
     * @memberof ordersModel
     */
    static TSinSecs = () => Math.floor(Date.now() / 1000)


    get = (id) => new Promise((resolve, reject) => {
        this.db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM ${this.table} WHERE id = ?`, [id], (tx, results) => {
                if (results.rows.length > 0) {
                    resolve(results.rows._array[0])
                } else {
                    resolve(null)
                }
            })
        })
    })

    /**
     * @description get all Categories 
     * @author meisolated
     * @date 24/06/2022
     * @memberof categoriesModel
     */
    getAll = () => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${this.table}`,
                [],
                (_, { rows }) => {
                    resolve(rows._array)
                }, (_, error) => reject(error)
            )
        })
    })


    /**
     * @description add new Category
     * @author meisolated
     * @date 24/06/2022
     * @param {*} data [name, picture]
     * @memberof categoriesModel
     */
    add = (data) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${this.table} (name, picture, created_at, modified_at) VALUES (?, ?, ${categoriesModel.TSinSecs()}, ${categoriesModel.TSinSecs()})`,
                data,
                (_, { rows }) => {
                    resolve(rows._array)
                }, (_, error) => reject(error)
            )
        })
    })

    /**
     * @description delete a category
     * @author meisolated
     * @date 24/06/2022
     * @param {*} id NUMBER
     * @memberof categoriesModel
     */
    delete = (id) => new Promise((resolve, reject) => {
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
     * @description update a category 
     * @author meisolated
     * @date 24/06/2022
     * @param {*} id NUMBER
     * @param {*} data [name, picture]
     * @memberof categoriesModel
     */
    update = (id, data) => new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
                `UPDATE ${this.table} SET name = ?, picture = ?, created_at = ${categoriesModel.TSinSecs()}, modified_at = ${categoriesModel.TSinSecs()} WHERE id = ${id}`,
                data,
                (_, { rows }) => {
                    resolve(rows._array)
                }, (_, error) => reject(error)
            )
        })
    })
}