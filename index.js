const express = require('express');
const db = require('./utils/db-connection'); 
const app = express();


const studentsRoutes = require('./routes/studentsRoutes.js');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/', studentsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
