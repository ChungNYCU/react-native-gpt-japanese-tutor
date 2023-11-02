import * as SQLite from 'expo-sqlite'
import AppConfig from '../../config'

const dbName = AppConfig.DB_NAME
const tableName = AppConfig.TABLE_NAME
const db = SQLite.openDatabase(dbName)

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        question TEXT,
        response TEXT,
        dateTime DATETIME,
        UUID TEXT
      )`,
      [],
      () => {
        console.log('Table created successfully', tableName)
      },
      (error) => {
        console.error('Error creating table:', error)
      },
    )
  })
}

// Initialize the table
createTable()

const insertData = (data) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${tableName} (type, question, response, dateTime, UUID) VALUES (?, ?, ?, ?, ?)`,
        [data.type, data.question, data.response, data.dateTime, data.UUID],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
        },
      )
    })
  })
}

const getDataById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE id = ?`,
        [id],
        (_, { rows }) => {
          const data = rows._array
          if (data.length > 0) {
            resolve(data[0])
          } else {
            reject(new Error('Data with the specified ID not found'))
          }
        },
        (_, error) => {
          reject(error)
        },
      )
    })
  })
}

const getAllData = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${tableName}`,
        [],
        (_, { rows }) => {
          const data = rows._array
          resolve(data)
        },
        (_, error) => {
          reject(error)
        },
      )
    })
  })
}

const updateData = (id, newData) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${tableName} SET type=?, question=?, response=?, dateTime=?, UUID=? WHERE id=?`,
        [
          newData.type,
          newData.question,
          newData.response,
          newData.dateTime,
          newData.UUID,
          id,
        ],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
        },
      )
    })
  })
}

const deleteData = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${tableName} WHERE id=?`,
        [id],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
        },
      )
    })
  })
}

export const ChatDAO = {
  insertData,
  getDataById,
  getAllData,
  updateData,
  deleteData,
}
