const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'busbooking',
    multipleStatements: true  //  Enable multiple queries execution
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log(" MySQL Connection Established");

    const creationQuery = `
    CREATE TABLE Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(50)
    );
    CREATE TABLE Buses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        busNumber VARCHAR(20),
        totalSeats INT,
        availableSeats INT
    );
    CREATE TABLE Bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT ,
        busId INT ,
        seatNumber INT ,
        FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
        FOREIGN KEY (busId) REFERENCES Buses(id) ON DELETE CASCADE
    );
    CREATE TABLE Payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bookingId INT ,
        amountPaid INT ,
        paymentStatus VARCHAR(20)  CHECK (paymentStatus IN ('Pending', 'Completed', 'Failed')),
        FOREIGN KEY (bookingId) REFERENCES Bookings(id) ON DELETE CASCADE
    );`;

    connection.query(creationQuery, (err) => {
        if (err) {
            console.error(" Error Creating Tables:", err);
        } else {
            console.log(" Tables Created Successfully");
        }
        // Keep connection open for further queries, close manually when necessary
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => console.log(' Server is running on port 3000'))