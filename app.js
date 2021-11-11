const express = require('express');
const authorRoutes = require('./src/routes/author_routes');
const bookRoutes = require('./src/routes/book_routes');
const clientRoutes = require('./src/routes/client_routes');
const userRoutes = require('./src/routes/user_routes');
const rentalRoutes = require('./src/routes/rental_routes');
const userController = require('./src/controllers/user_controller');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRoutes);
app.use(userController.tokenValidation);
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);
app.use('/clients', clientRoutes);
app.use('/rental', rentalRoutes);


app.listen(port, () => {
    console.log(`Starting connection - port ${port}`);
});