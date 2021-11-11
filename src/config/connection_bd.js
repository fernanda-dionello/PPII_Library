const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// const connection = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD
// };

// const client = new Client(connection);
// client.connect();
// const dbHost = process.env.DB_HOST;
// const dbPort = process.env.DB_PORT;
// const dbDatabase = process.env.DB_NAME;
// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

client.connect();

// const client = new Client({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     host: process.env.DB_HOST,
//     ssl: true
// }); 
// client.connect();


// const dbURL = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;
// const client = new Client({
//     connectionString:`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}` 
// });
// client.connect();

module.exports = client;