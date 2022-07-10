import { randomIdGenerator } from "../../util/functions.js"
import db from "../db.js"

export default class ordersModel {
    constructor() {
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
     * @param {*} data [shop_id, items, total_price,total_cost_amount, payment_status]
     * @memberof ordersModel
     */
    addNew = (data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                let id = randomIdGenerator()
                tx.executeSql(
                    `INSERT INTO ${this.table_orders
                    } (order_id, shop_id, items, total_amount, total_cost_amount, payment_status, created_at, modified_at) VALUES ("${id}", ?, ?, ?, ?, ?, ${ordersModel.TSinSecs()}, ${ordersModel.TSinSecs()})`,
                    data,
                    (_, { rows, insertId }) => {
                        resolve({ id, status: "done" })
                    },
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description add order items
     * @author meisolated
     * @date 01/07/2022
     * @param {*} data [order_id, product_name, quantity, product_price, product_cost_price ]
     * @memberof ordersModel
     */
    addNewItem = (data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO ${this.table_ordered_items
                    } (order_id, product_name, quantity, product_price, product_cost_price , created_at, modified_at) VALUES (?, ?, ?, ?, ?, ${ordersModel.TSinSecs()}, ${ordersModel.TSinSecs()})`,
                    data,
                    (_, { rows, insertId }) => {
                        resolve({ insertId, status: "done" })
                    },
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description get all orders
     * @author meisolated
     * @date 27/06/2022
     * @memberof ordersModel
     */
    getAll = () =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_orders} ORDER BY created_at DESC`,
                    [],
                    (_, { rows }) => {
                        resolve(rows._array)
                    },
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description get order by id
     * @author meisolated
     * @date 02/07/2022
     * @param {*} id
     * @memberof ordersModel
     */
    getById = (id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_orders} WHERE order_id = "${id}"`,
                    [],
                    (_, { rows }) => {
                        resolve(rows._array[0])
                    },
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description get order by shop_id
     * @author meisolated
     * @date 02/07/2022
     * @param {*} shop_id
     * @memberof ordersModel
     */
    getByShopId = (shop_id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_orders} WHERE shop_id = "${shop_id}"`,
                    [],
                    (_, { rows }) => {
                        resolve(rows._array)
                    },
                    (_, error) => reject(error)
                )
            })
        }
        )


    /**
     * @description get ordered Items by order id
     * @author meisolated
     * @date 02/07/2022
     * @param {*} id
     * @memberof ordersModel
     */
    getItemsByOrderId = (id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_ordered_items} WHERE order_id = "${id}"`,
                    [],
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
    getByTime = (after, before) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_orders} WHERE created_at BETWEEN ${after} AND ${before} ORDER BY created_at DESC`,
                    [],
                    (_, result) => {
                        resolve(result.rows._array)
                    },
                    (_, error) => reject(error)
                )
            })
        })

    getFinancialData = (after, before) => new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT total_amount, total_cost_amount, payment_status FROM ${this.table_orders} WHERE created_at BETWEEN ${after} AND ${before}`,
                [],
                (_, result) => {
                    resolve(result.rows._array)
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
    getItems = (id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.table_ordered_items} WHERE id = ${id}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
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
    updateItems = (id, data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE ${this.table_ordered_items} SET
                    product_name = ?,
                    quantity = ?,
                    product_price = ?,
                    modified_at = ${ordersModel.TSinSecs()},
                    WHERE id = ${id}`,
                    data,
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description to update order data by id
     * @author meisolated
     * @date 22/06/2022
     * @param {*} id NUMBER
     * @param {*} data ARRAY [shop_id, items, total_amount,total_cost_amount, payment_status]
     * @memberof ordersModel
     */
    update = (id, data) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE ${this.table_orders} SET shop_id = ?, items = ?, total_amount = ?, total_cost_amount = ?, payment_status = ?, modified_at = ${ordersModel.TSinSecs()} WHERE id = ${id}`,
                    data,
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })

    /**
     * @description delete order by id
     * @author meisolated
     * @date 02/07/2022
     * @param {*} id
     * @memberof ordersModel
     */
    deleteOrder = (id) =>
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `DELETE FROM ${this.table_orders} WHERE id = ${id}`,
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
}
