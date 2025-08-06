const express = require('express');
const db = require('./utils/bus-connection')
const app = express();

const busRoutes = require('./routes/busRoutes.js')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/bus', busRoutes)

app.listen(3000, () => console.log(' Server is running on port 3000'))