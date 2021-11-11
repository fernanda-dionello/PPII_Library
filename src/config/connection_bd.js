const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbDatabase = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const client = new Client({
    connectionString: `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`,
    ssl: {
      rejectUnauthorized: false
    }
});

client.connect();

module.exports = client;