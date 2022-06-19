import db from "./db"
export function executeQuery(q, r) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                q,
                r,
                (tx, result) => {
                    resolve(result)
                },
                (tx, error) => {
                    reject(error)
                }
            )
        })
    })
}