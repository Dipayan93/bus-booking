const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'student'
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log(" MySQL Connection Established");

    const creationQuery = `
    CREATE TABLE IF NOT EXISTS Students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(50)
    )`;

    connection.query(creationQuery, (err) => {
        if (err) {
            console.error(" Error Creating Tables:", err);
            connection.end();
            return;
        } else {
            console.log(" Tables Created Successfully");
        }
        // Keep connection open for further queries, close manually when necessary
    });
});

module.exports = connection;