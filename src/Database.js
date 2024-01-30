// Database.js
import SQLite from 'react-native-sqlite-storage';

const initDatabase = () => {
  const db = SQLite.openDatabase(
    {
      name: 'Database.db',
      location: 'default',
    },
    () => {
      console.log('Database opened successfully');
      db.transaction((tx) => {
        // Create table for apiData
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS apiData (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT);'
        );

      });
    },
    (error) => {
      console.error('Error opening database:', error);
    }
  );

  return db;
};

export default initDatabase;
