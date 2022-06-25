import db from "../db.js"

export default class ordersModel {
    constructor() {
        this.db = db
        this.table_orders = "orders"
        this.table_ordered_items = "ordered_items"
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
     * @description
     * @author meisolated
     * @date 24/06/2022
     * @param {*} data [shop_id, items, total_price, payment_status]
     * @memberof ordersModel
     */
    addNewOrder = (data) =>
        new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO ${this.table_orders} (shop_id, items, total_amount, payment_status, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ?)`,
                    [data.shop_id, data.items, data.total_amount, data.payment_status, ordersModel.TSinSecs(), ordersModel.TSinSecs()],
                    (_, { rows }) => {
                        resolve(rows._array)
                    },
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description this function to get orders after and before a particular time
     * @author meisolated
     * @date 22/06/2022
     * @param {*} after time in seconds
     * @param {*} before time in seconds
     * @memberof ordersModel
     */
    getOrderByTime = (after, before) =>
        new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_orders} WHERE created_at BETWEEN ${after} AND ${before}`,
                    [],
                    (_, result) => {
                        resolve(result)
                    },
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description use this function to get an order items `we are using a separate table to store ordered items`
     * @author meisolated
     * @date 22/06/2022
     * @param {*} id
     * @memberof ordersModel
     */
    getOrderItems = (id) =>
        new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(`SELECT * FROM ${this.table_ordered_items} WHERE id = ${id}`, [], (_, result) => resolve(result.rows), (_, (error) => reject(error)))
            })
        })

    /**
     * @description to update ordered item by id [only single item can be update with this]
     * @author meisolated
     * @date 22/06/2022
     * @param {*} id NUMBER
     * @param {*} data ARRAY [product_name, quantity, product_price]
     * @memberof ordersModel
     */
    updateOrderedItems = (id, data) =>
        new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE ${this.table_ordered_items} SET
                    product_name = ?,
                    quantity = ?,
                    product_price = ?,
                    modified_at = ${ordersModel.TSinSecs()},
                    WHERE id = ${id}`,
                    [data],
                    (_, result) => resolve(result.rows),
                    (_, (error) => reject(error))
                )
            })
        })

    /**
     * @description to update order data by id
     * @author meisolated
     * @date 22/06/2022
     * @param {*} id NUMBER
     * @param {*} data ARRAY [shop_id, items, total_amount, payment_status]
     * @memberof ordersModel
     */
    updateOrder = (id, data) =>
        new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE ${this.table_orders} SET shop_id = ?, items = ?, total_amount = ?, payment_status = ?, modified_at = ${ordersModel.TSinSecs()} WHERE id = ${id}`,
                    [data],
                    (_, result) => resolve(result.rows),
                    (_, (error) => reject(error))
                )
            })
        })
}
