import db from "../db.js"

export default class categoriesModel {
    constructor() {
        this.#db = db
    }

    getAllCategories() {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM categories",
                    [],
                    (_, { rows }) => {
                        resolve(rows._array)
                    }
                )
            })
        })

    }
    addCategory(name) {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    "INSERT INTO categories (name) VALUES (?)",
                    [name],
                    (_, { rows }) => {
                        resolve(rows._array)
                    }
                )
            })
        })
    }
    deleteCategory(id) {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    "DELETE FROM categories WHERE id = ?",
                    [id],
                    (_, { rows }) => {
                        resolve(rows._array)
                    }
                )
            })
        })
    }
    updateCategory(id, name) {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    "UPDATE categories SET name = ? WHERE id = ?",
                    [name, id],
                    (_, { rows }) => {
                        resolve(rows._array)
                    }
                )
            })
        })
    }
}