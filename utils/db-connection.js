const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'student',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log(" MySQL Connection Established");

    const creationQuery = `CREATE DATABASE IF NOT EXISTS student;
    USE student;
    CREATE TABLE IF NOT EXISTS Students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        age INT
    );
    `;

    connection.query(creationQuery, (err) => {
        if (err) {
            console.error(" Error Creating Tables:", err.message);
            connection.end();
            return;
        } else {
            console.log(" Tables Created Successfully");
        }
        // Keep connection open for further queries, close manually when necessary
    });
});

module.exports = connection;