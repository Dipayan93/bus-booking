const db = require('../utils/db-connection');

const insertStudent = (req, res) => {
    const { name, email, age } = req.body;
    const query = `INSERT INTO Students (name, email, age) VALUES (?, ?, ?)`;
    db.execute(query, [name, email, age], (err, result) => {
        if (err) {
            console.error("Insert Error:", err.message);
            return res.status(500).send(err.message);
        }
        console.log("Student inserted:", result.insertId);
        res.status(201).send(`Student added with ID: ${result.insertId}`);
    });
};

const getAllStudents = (req, res) => {
    db.execute(`SELECT * FROM Students`, (err, results) => {
        if (err) {
            console.error("Fetch Error:", err.message);
            return res.status(500).send(err.message);
        }
        res.json(results);
    });
};

const getStudentById = (req, res) => {
    const { id } = req.params;
    db.execute(`SELECT * FROM Students WHERE id = ?`, [id], (err, results) => {
        if (err) {
            console.error("Fetch Error:", err.message);
            return res.status(500).send(err.message);
        }
        if (results.length === 0) {
            return res.status(404).send("Student not found");
        }
        res.json(results[0]);
    });
};

const updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const query = `UPDATE Students SET name = ?, email = ? WHERE id = ?`;
    db.execute(query, [name, email, id], (err, result) => {
        if (err) {
            console.error("Update Error:", err.message);
            return res.status(500).send(err.message);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Student not found");
        }
        console.log("Student updated:", id);
        res.send("Student updated successfully");
    });
};

const deleteStudent = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Students WHERE id = ?`;
    db.execute(query, [id], (err, result) => {
        if (err) {
            console.error("Delete Error:", err.message);
            return res.status(500).send(err.message);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Student not found");
        }
        console.log("Student deleted:", id);
        res.send("Student deleted successfully");
    });
};

module.exports = {
    insertStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};
