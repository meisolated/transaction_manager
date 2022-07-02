import * as SQLite from "expo-sqlite"
// import FileSystem from "expo-file-system"
// import Asset from "expo-asset"
// async function openDatabase() {
//     return new Promise(async (resolve, reject) => {
//         if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
//             await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite')
//         }
//         await FileSystem.downloadAsync(
//             Asset.fromModule(require(pathToDatabaseFile)).uri,
//             FileSystem.documentDirectory + 'SQLite/myDatabaseName.db'
//         )
//         return SQLite.openDatabase('myDatabaseName.db')

//     })
// }

// const db = SQLite.openDatabase('dbName', version)

const db = SQLite.openDatabase("dbName.db")

db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () => console.log("Foreign keys turned on"))
export default db
