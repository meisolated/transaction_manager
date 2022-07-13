import db from "./db"

export const deleteAllTables = () =>
    new Promise(async (resolve, reject) => {
        let queries = [`DROP TABLE IF EXISTS shops`, `DROP TABLE IF EXISTS products`, `DROP TABLE IF EXISTS products_attributes`, `DROP TABLE IF EXISTS categories`, `DROP TABLE IF EXISTS suppliers`]
        db.transaction((tx) => {
            for (let i = 0; i < queries.length; i++) {
                tx.executeSql(
                    queries[i],
                    [],
                    (tx, results) => {
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
    let queries = [

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
            cost_price bigint NOT NULL,
            price bigint NOT NULL,
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
                    if (i === queries.length - 1) resolve("Tables created successfully")

                },
                (_, error) => reject(error)
            )
        }
    })
})