import { localStorage } from "./localStorage.js"
import db from "./db"



// create table if not exists
export async function createTables(cb) {
    // check if tables exists for not
    let donebefore = await localStorage.retrieveData("tablesExists")
    if (donebefore == "true") return cb({ done: 0, total: 0 })

    db.transaction((tx) => {
        tx.executeSql("SELECT * FROM orders", [], (_, { rows }) => { })
    })

    let queries = [
        `DROP TABLE IF EXISTS orders`,

        `DROP TABLE IF EXISTS shops`,

        `DROP TABLE IF EXISTS products`,

        `DROP TABLE IF EXISTS ordered_items`,

        `CREATE TABLE orders (
            id bigint AUTO_INCREMENT,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL,
            total_amount bigint NOT NULL,
            items text NOT NULL,
            payment_status text NOT NULL,
            shop_id text NOT NULL);`,

        `CREATE TABLE ordered_items (
            id bigint AUTO_INCREMENT,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL,
            order_id bigint NOT NULL,
            product_name text NOT NULL,
            product_price text NOT NULL,
            payment_status text NOT NULL);`,

        `CREATE TABLE shops (
            id bigint AUTO_INCREMENT,
            name text NOT NULL,
            address text NOT NULL,
            phone text NOT NULL,
            email text NOT NULL,
            picture text NOT NULL,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE products (
            id bigint AUTO_INCREMENT,
            name text NOT NULL,
            picture text NOT NULL,
            price bigint NOT NULL,
            description text NOT NULL,
            qr_code text NOT NULL,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE products_attributes (
            id bigint AUTO_INCREMENT,
            product_id bigint NOT NULL,
            quantity bigint NOT NULL,
            metric text NOT NULL,
            price bigint NOT NULL,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE categories (
            id bigint AUTO_INCREMENT,
            name text NOT NULL,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,

        `CREATE TABLE suppliers (
            id bigint AUTO_INCREMENT,
            name text NOT NULL,
            created_at bigint NOT NULL,
            modified_at bigint NOT NULL);`,


    ]
    db.transaction((tx) => {
        for (let i = 0; i < queries.length; i++) {
            tx.executeSql(queries[i], [], (tx, results) => {
                if (i === queries.length - 1) localStorage.storeData("tablesExists", "true")
                cb({ done: i + 1, total: queries.length })
            })
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
                ["2020-01-01", "2020-01-01", randomNumber, '["151x1","151x1", "151x1"]', "paid", "1"],
                (_, result) => console.log(result),
                (_, error) => console.log(error)
            )
        })
    }
}



