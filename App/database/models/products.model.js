import db from "../db.js"

export default class productsModel {
    constructor() {
        this.db = db
        this.table_products = "products"
        this.table_products_attributes = "products_attributes"
    }

    static TSinSecs = () => Math.floor(Date.now() / 1000)

    /**
     * @description add new product to database
     * @author meisolated
     * @date 24/06/2022
     * @param {*} data [name, picture, description, picture]
     * @memberof productsModel
     * @returns {Promise<any>}
     */
    addNewProduct = (data) =>
        new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO ${this.table_products} (name, picture, description, picture, created_at, modified_at) VALUES (?, ?, ?, ?, ${productsModel.TSinSecs()}, ${productsModel.TSinSecs()})`,
                    [data],
                    (_, { rows }) => {
                        // resolve(rows._array)
                        //!return inserted id
                        resolve(rows.insertId)
                    },
                    (_, error) => reject(error)
                )
            })
        })


    /**
     * @description add new product attribute to database
     * @author meisolated
     * @date 24/06/2022
     * @param {*} data [product_id, metric, price]
     * @memberof productsModel
     * @returns {Promise<any>}
     * @memberof productsModel
     */
    addNewProductAttribute = (data) =>
        new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO ${this.table_products_attributes} (product_id, metric, price, create_at, modified_at) VALUES (?, ?, ?, ${productsModel.TSinSecs()}, ${productsModel.TSinSecs()})`,
                    [data],
                    (_, { rows }) => {
                        // resolve(rows._array)
                        resolve(rows.insertId)
                    },
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description to get all products from database
     * @author meisolated
     * @date 22/06/2022
     * @memberof productsModel
     */
    getAllProducts = () =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`SELECT * FROM ${this.table_products}`, [], (_, result) => resolve(result.rows), (_, (error) => reject(error)))
            })
        })

    /**
     * @description get a single product by id
     * @author meisolated
     * @date 22/06/2022
     * @param {*} id number
     * @memberof productsModel
     */
    getProductById = (id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`SELECT * FROM ${this.table_products} WHERE id = ${id}`, [], (_, result) => resolve(result.rows), (_, (error) => reject(error)))
            })
        })

    /**
     * @description update a product by id
     * @author meisolated
     * @date 22/06/2022
     * @param {*} id number
     * @param {*} data [name, price, description]
     * @memberof productsModel
     */
    updateProduct = (id, data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`UPDATE ${this.table_products} SET name = ?, price = ?, description = ?, modified_at = ${productsModel.TSinSecs()} WHERE id = ${id}`, [data], (_, result) => resolve(result.rows), (_, (error) => reject(error)))
            })
        })

    /**
     * @description use this to update picture of product //TODO might merge it later with @updateProduct
     * @author meisolated
     * @date 22/06/2022
     * @param {*} id number
     * @param {*} picture not sure :)
     * @memberof productsModel
     */
    updateProductPicture = (id, picture) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`UPDATE ${this.table_products} SET picture = ?, modified_at = ${productsModel.TSinSecs()} WHERE id = ${id}`, [picture], (_, result) => resolve(result.rows), (_, (error) => reject(error)))
            })
        })

    /**
     * @description to update products attribute
     * @author meisolated
     * @date 23/06/2022
     * @param {*} id NUMBER
     * @param {*} data [metric, price]
     * @memberof productsModel
     */
    updateProductAttribute = (id, data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`UPDATE ${this.table_products_attributes} SET metric =?, price = ?, modified_at = ${productsModel.TSinSecs()} WHERE id = ${id}`, [data], (_, result) => resolve(result.rows), (_, (error) => reject(error)))
            })
        })
}
