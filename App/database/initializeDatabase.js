import { localStorage } from "./localStorage.js"
import db from "./db"


export async function deleteAllTables(cb) {
    let queries = [
        `DROP TABLE IF EXISTS orders`,

        `DROP TABLE IF EXISTS ordered_items`,

        `DROP TABLE IF EXISTS shops`,

        `DROP TABLE IF EXISTS products`,

        `DROP TABLE IF EXISTS products_attributes`,

        `DROP TABLE IF EXISTS categories`,

        `DROP TABLE IF EXISTS suppliers`,

    ]

    let donebefore = await localStorage.retrieveData("tablesExists")
    if (donebefore == "true") return localStorage.storeData("tablesExists", "false")

    db.transaction((tx) => {
        for (let i = 0; i < queries.length; i++) {
            tx.executeSql(queries[i], [], (tx, results) => {
                cb({ done: i + 1, total: queries.length })
            }, (_, error) => console.log(error))
        }
    })
}

// create table if not exists
export async function createTables(cb) {
    // check if tables exists for not
    let donebefore = await localStorage.retrieveData("tablesExists")
    if (donebefore == "true") return cb({ done: 0, total: 0 })


    let queries = [
        `DROP TABLE IF EXISTS orders`,

        `DROP TABLE IF EXISTS shops`,

        `DROP TABLE IF EXISTS products`,

        `DROP TABLE IF EXISTS ordered_items`,

        `CREATE TABLE orders (
            id bigint AUTO_INCREMENT,
            shop_id text,
            items text NOT NULL,
            total_amount bigint NOT NULL,
            payment_status text NOT NULL,
            modified_at bigint NOT NULL,
            created_at bigint NOT NULL);`,

        `CREATE TABLE ordered_items (
            id bigint AUTO_INCREMENT,
            order_id bigint NOT NULL,
            product_name text NOT NULL,
            quantity bigint NOT NULL,
            product_price text NOT NULL,
            modified_at bigint NOT NULL,
            created_at bigint NOT NULL);`,

        `CREATE TABLE shops (
            id bigint AUTO_INCREMENT,
            name text,
            address text,
            phone text,
            picture text,
            qr_code text,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE products (
            id bigint AUTO_INCREMENT,
            name text NOT NULL,
            picture text,
            price bigint NOT NULL,
            description text,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE products_attributes (
            id bigint AUTO_INCREMENT,
            product_id bigint NOT NULL,
            metric text NOT NULL,
            price bigint NOT NULL,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE categories (
            id bigint AUTO_INCREMENT,
            name text NOT NULL,
            image text,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE suppliers (
            id bigint AUTO_INCREMENT,
            name text NOT NULL,
            image text,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,
    ]
    db.transaction((tx) => {
        for (let i = 0; i < queries.length; i++) {
            tx.executeSql(queries[i], [], (tx, results) => {
                if (i === queries.length - 1) localStorage.storeData("tablesExists", "true")
                cb({ done: i + 1, total: queries.length })
            }, (_, error) => console.log(error))
        }
    })
}

export function insertDummyData() {
    // delete all
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM transactions`, [], () => console.log("deleted all transactions"))
    })

    // insert 100 records
    for (let i = 0; i < 100; i++) {
        // generate random number
        let randomNumber = Math.floor(Math.random() * 100)
        db.transaction((tx) => {
            tx.executeSql(
                "insert into orders (created_at, modified_at, total_amount, items, payment_status, shop_id) values (?, ?, ?, ?, ?, ?)",
                ["0", "1", randomNumber, '["151x1","151x1", "151x1"]', "paid", "1"],
                (_, result) => console.log(result),
                (_, error) => console.log(error)
            )
        })
    }
}
