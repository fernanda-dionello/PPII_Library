const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`<h1>Conectado!</h1>`);
});

app.listen(port, () => {
    console.log(`Starting connection - port ${port}`);
});