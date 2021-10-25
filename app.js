const express = require('express');
const authorRoutes = require('./src/routes/author_routes');
const bookRoutes = require('./src/routes/book_routes');
const clientRoutes = require('./src/routes/client_routes');
const userRoutes = require('./src/routes/user_routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);
app.use('/clients', clientRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Starting connection - port ${port}`);
});