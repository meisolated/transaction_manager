import { randomIdGenerator } from "../../util/functions.js"
import db from "../db.js"

export default class productsModel {
    constructor() {
        this.table_products = "products"
        this.table_products_attributes = "products_attributes"
    }

    static TSinSecs = () => Math.floor(Date.now() / 1000)

    /**
     * @description add new product to database
     * @author meisolated
     * @date 24/06/2022
     * @param {*} data [name, picture, description, qr_code, category, supplier]
     * @memberof productsModel
     * @returns {Promise<any>}
     */
    addNew = (data, _product_id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                let product_id = _product_id ? _product_id : randomIdGenerator()
                tx.executeSql(
                    `INSERT INTO ${this.table_products} (product_id, name, picture, description, qr_code, category, supplier, created_at, modified_at) VALUES ("${product_id}", ?, ?, ?, ?, ?, ?, ${productsModel.TSinSecs()}, ${productsModel.TSinSecs()})`,
                    data,
                    (_, { rows, insertId }) => {
                        // resolve(rows._array)
                        //!return inserted id
                        resolve({ productId: product_id, status: "done" })
                    },
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description add new product attribute to database
     * @author meisolated
     * @date 24/06/2022
     * @param {*} data [product_id,number, metric, price, cost_price]
     * @memberof productsModel
     * @returns {Promise<any>}
     * @memberof productsModel
     */
    addNewAttribute = (data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO ${this.table_products_attributes} (product_id, number, metric, price, cost_price, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ${productsModel.TSinSecs()}, ${productsModel.TSinSecs()})`,
                    data,
                    (_, { rows }) => {
                        // resolve(rows._array)
                        resolve({ insertId: rows.insertId, status: "done" })
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
    getAll = () =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_products}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })



    /**
     * @description get product by category and supplier
     * @author meisolated
     * @date 01/07/2022
     * @param {*} category
     * @param {*} supplier
     * @memberof productsModel
     */
    getByCategoryAndSupplier = (category, supplier) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_products} WHERE category = ? AND supplier = ?`,
                    [category, supplier],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        }
        )



    /**
     * @description get a single product by id
     * @author meisolated
     * @date 22/06/2022
     * @param {*} product_id string
     * @memberof productsModel
     */
    getById = (product_id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_products} WHERE product_id = "${product_id}"`,
                    [],
                    (_, result) => resolve(result.rows._array[0]),
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description get all products attributes by product id
     * @author meisolated
     * @date 27/06/2022
     * @param {*} product_id string
     * @memberof productsModel
     */
    getAttributes = (product_id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_products_attributes} WHERE product_id = "${product_id}"`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })

    /**
* @description get all products attributes by id
* @author meisolated
* @date 27/06/2022
* @param {*} id
* @memberof productsModel
*/
    getAttributesById = (id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_products_attributes} WHERE id = ${id}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })


    getAllAttributes = () =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_products_attributes}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description update a product by id
     * @author meisolated
     * @date 22/06/2022
     * @param {*} product_id string
     * @param {*} data [name, description, picture, qr_code, category, supplier]
     * @memberof productsModel
     */
    update = (product_id, data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE ${this.table_products} SET name = ?, description = ?, picture = ?, qr_code = ?, category = ?, supplier = ?, modified_at = ${productsModel.TSinSecs()} WHERE product_id = "${product_id}"`,
                    data,
                    (_, result) => resolve({ status: "done" }),
                    (_, error) => reject(error)
                )
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
    updatePicture = (id, picture) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE ${this.table_products} SET picture = ?, modified_at = ${productsModel.TSinSecs()} WHERE id = ${id}`,
                    [picture],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @deprecated 
     * @description to update products attribute
     * @author meisolated
     * @date 23/06/2022
     * @param {*} id NUMBER
     * @param {*} data [number, metric, price]
     * @memberof productsModel
     */
    updateAttribute = (id, data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE ${this.table_products_attributes} SET number = ?, metric = ?, price = ?, cost_price = ?, modified_at = ${productsModel.TSinSecs()} WHERE product_id = ${id}`,
                    data,
                    (_, result) => resolve({ status: "done" }),
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description to delete a product attribute by id
     * @author meisolated
     * @date 27/06/2022
     * @param {*} product_id
     * @memberof productsModel
     */
    deleteAttribute = (product_id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `DELETE FROM ${this.table_products_attributes} WHERE product_id = "${product_id}"`,
                    [],
                    (_, result) => resolve({ status: "done" }),
                    (_, error) => reject(error)
                )
            })
        }
        )
}

