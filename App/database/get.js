import db from "./db"
export function getAllTransactions() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "select * from orders",
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            )
        })
    })
}
