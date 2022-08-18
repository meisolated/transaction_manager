import { localStorage } from "./localStorage.js"
import db from "./db"
import ToastHandler from "../handler/Toast.handler.js"
import md5 from "md5"
import { randomIdGenerator } from "../util/functions.js"

export const deleteAllTables = (cb) => new Promise(async (resolve, reject) => {
    let queries = [
        `DROP TABLE IF EXISTS orders`,

        `DROP TABLE IF EXISTS ordered_items`,

        `DROP TABLE IF EXISTS shops`,

        `DROP TABLE IF EXISTS products`,

        `DROP TABLE IF EXISTS products_attributes`,

        `DROP TABLE IF EXISTS categories`,

        `DROP TABLE IF EXISTS suppliers`,
    ]

    let donebefore = await localStorage.retrieveData("tables")
    if (donebefore == "true") return localStorage.storeData("tables", "false")

    db.transaction((tx) => {
        for (let i = 0; i < queries.length; i++) {
            tx.executeSql(
                queries[i],
                [],
                (tx, results) => {
                    cb({ done: i + 1, total: queries.length })
                    if (i == queries.length - 1) {
                        resolve()
                    }
                },
                (_, error) => reject(error)
            )
        }
    })
})

// create table if not exists
export const createTables = async (cb) => new Promise(async (resolve, reject) => {
    // check if tables exists for not
    let donebefore = await localStorage.retrieveData("tables")
    if (donebefore == "true") return

    let queries = [
        `DROP TABLE IF EXISTS orders`,

        `DROP TABLE IF EXISTS shops`,

        `DROP TABLE IF EXISTS products`,

        `DROP TABLE IF EXISTS ordered_items`,

        `CREATE TABLE orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id text NOT NULL,
            shop_id text NOT NULL,
            items text NOT NULL,
            total_amount text NOT NULL,
            total_cost_amount text NOT NULL,
            payment_status text NOT NULL,
            modified_at bigint NOT NULL,
            created_at bigint NOT NULL);`,

        `CREATE TABLE ordered_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id text NOT NULL,
            product_name text NOT NULL,
            quantity bigint NOT NULL,
            product_price text NOT NULL,
            product_cost_price text NOT NULL,
            modified_at bigint NOT NULL,
            created_at bigint NOT NULL);`,

        `CREATE TABLE shops (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            shop_id text NOT NULL,
            name text,
            address text,
            phone text,
            picture text,
            qr_code text,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id text NOT NULL,
            name text NOT NULL,
            picture text,
            description text,
            qr_code text,
            category text,
            supplier text,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE products_attributes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id text NOT NULL,
            number bigint NOT NULL,
            metric text NOT NULL,
            cost_price text NOT NULL,
            price text NOT NULL,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            picture text,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            picture text,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,
    ]
    db.transaction((tx) => {
        for (let i = 0; i < queries.length; i++) {
            tx.executeSql(
                queries[i],
                [],
                (tx, results) => {
                    if (i === queries.length - 1) localStorage.storeData("tables", "true")
                    if (i === queries.length - 1) ToastHandler("Tables created successfully")
                    if (i === queries.length - 1) resolve("Tables created successfully")

                },
                (_, error) => reject(error)
            )
        }
    })
})

export function insertDummyData() {
    // delete all
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM orders`, [], () => console.log("deleted all order"))
        tx.executeSql(`DELETE FROM ordered_items`, [], () => console.log("deleted all order"))
    })

    // insert 100 records in order
    for (let i = 0; i < 100; i++) {
        // generate random number
        let randomNumber = Math.floor(Math.random() * 1000)
        let randomCostNumber = Math.floor(Math.random() * 500)
        let randomId = randomIdGenerator()
        db.transaction((tx) => {
            tx.executeSql(
                "insert into orders (order_id, created_at, modified_at, total_amount, total_cost_amount, items, payment_status, shop_id) values (?, ?, ?, ?, ?, ?, ?, ?)",
                [randomId, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000), randomNumber, randomCostNumber, '["151x1","151x1", "151x1"]', ["paid", "unpaid"][Math.floor(Math.random() * 2)], "1"],
                (_, result) => {
                    // add attributes to order
                    for (let j = 0; j < 3; j++) {
                        tx.executeSql(
                            "insert into ordered_items (order_id, created_at, modified_at, order_id, product_name, quantity, product_price, product_cost_price) values (?, ?, ?, ?, ?, ?, ?, ?)",
                            [randomId, Math.floor(Date.now()), Math.floor(Date.now()), result.insertId, "product " + j, j, j * 1, 10],
                            (_, result) => console.log("inserted ordered_items"),
                            (_, error) => console.log(error)
                        )
                    }
                },
                (_, error) => console.log(error)
            )
        })
    }

    // insert 100 records in shops
    for (let i = 0; i < 10; i++) {
        // generate random number
        db.transaction((tx) => {
            let randomNumber = md5(Math.floor(Math.random() * 100))
            tx.executeSql(
                "insert into shops (shop_id, created_at, modified_at, name, address, phone, picture, qr_code) values (?, ?, ?, ?, ?, ?, ?, ?)",
                [randomNumber, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000), "shop " + i, "address " + i, "phone " + i, "picture " + i, "qr_code " + i],
                (_, result) => {
                },
                (_, error) => console.log(error)
            )
        })
    }
}
