const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Resale phone market server is running');
})
app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`)
})