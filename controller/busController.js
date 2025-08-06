const db = require('../utils/bus-connection')

const addUsers = (req,res) => {
    const {name, email} = req.body;
    const insertQuery = `INSERT INTO Users (name, email) VALUES (?, ?)`;

    db.execute(insertQuery,[name, email], (err)=> {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            return;
        }

        console.log("User details inserted");
        res.status(200).send(`User with name ${name} successfully added`);
    })
}

const getallUsers = (req,res) => {
    const selectQuery = `SELECT * FROM Users`;
    db.execute(selectQuery, (err, results) => {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            return;
        }
        res.status(200).json(results);
    })
}
const addBus = (req,res) => {
    const {busNumber, totalSeats, availableSeats} = req.body;
    const insertQuery = `INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)`;

    db.execute(insertQuery,[busNumber, totalSeats, availableSeats], (err)=> {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            return;
        }

        console.log("Bus details inserted");
        res.status(200).send(`Bus with number ${busNumber} successfully added`);
    })
}

const busAvailableSeats = (req, res) => {
    const { seats } = req.params;
    const selectQuery = `SELECT * FROM Buses WHERE availableSeats > ?`;

    db.execute(selectQuery, [seats], (err, results) => {
        if (err) {
            console.log(err.message);
            res.status(500).send(err.message);
            return;
        }
        res.status(200).json(results);
    });
};



module.exports = {
    addUsers,
    getallUsers,
    addBus,
    addUsers,
    busAvailableSeats
}