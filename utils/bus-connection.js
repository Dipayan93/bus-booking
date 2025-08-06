const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'busbooking',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log(" MySQL Connection Established");

    const creationQuery = `
    CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Buses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    busNumber VARCHAR(20),
    totalSeats INT,
    availableSeats INT
);

CREATE TABLE IF NOT EXISTS Bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    busId INT,
    seatNumber INT,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (busId) REFERENCES Buses(id)
);

CREATE TABLE IF NOT EXISTS Payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bookingId INT,
    amountPaid DECIMAL(10, 2),
    paymentStatus VARCHAR(20),
    FOREIGN KEY (bookingId) REFERENCES Bookings(id)
);`
    connection.query(creationQuery, (err) => {
        if (err) {
            console.error("Error Creating Tables:", err);
            connection.end();
            return;
        } else {
            console.log("Tables Created Successfully");
        }
        // Keep connection open for further queries, close manually when necessary
    });
});

module.exports = connection;