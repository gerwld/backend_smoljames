const sqlite = require('node:sqlite');
const db = new sqlite.DatabaseSync(':memory:');

// Execute some SQL statements from strings
db.exec(`
    CREATE TABLE users (
        id INTEGER,
        username TEXT UNIQUE,
        password TEXT
    )
`);

db.exec(`
   CREATE TABLE todos (
        id INTEGER,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
   ) 
`);

module.exports = db;