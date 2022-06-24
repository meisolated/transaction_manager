import db from "../db.js"

export default class categoriesModel {
    constructor() {
        this.#db = db
        this.#table = "categories"
    }


    /**
     * @description get all Categories 
     * @author meisolated
     * @date 24/06/2022
     * @memberof categoriesModel
     */
    getAllCategories = () => new Promise((resolve, reject) => {
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
     * @param {*} name STRING
     * @memberof categoriesModel
     */
    addCategory = (name) => new Promise((resolve, reject) => {
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
     * @description delete a category
     * @author meisolated
     * @date 24/06/2022
     * @param {*} id NUMBER
     * @memberof categoriesModel
     */
    deleteCategory = (id) => new Promise((resolve, reject) => {
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
     * @param {*} name STRING 
     * @memberof categoriesModel
     */
    updateCategory = (id, name) => new Promise((resolve, reject) => {
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
}