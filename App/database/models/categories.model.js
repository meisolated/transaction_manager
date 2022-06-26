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
                `INSERT INTO ${this.table} (name, created_at, modified_at) VALUES (?, ?, ?)`,
                [name, categoriesModel.TSinSecs(), categoriesModel.TSinSecs()],
                (_, { rows }) => {
                    console.log("🚀 ~ file: categories.model.js ~ line 53 ~ categoriesModel ~ getAllCategories= ~ error", error)
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
                `UPDATE ${this.table} SET name = ?, created_at, modified_at = ? WHERE id = ?`,
                [name, id, categoriesModel.TSinSecs(), categoriesModel.TSinSecs()],
                (_, { rows }) => {
                    resolve(rows._array)
                }, (_, error) => reject(error)
            )
        })
    })
}