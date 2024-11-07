require('dotenv').config();
module.exports =
{
  "development": {
    "username": process.env.DB_Username,
    "password": process.env.DB_Password,
    "database": process.env.DB_Name,
    "host": process.env.DB_Host,
    "port": process.env.DB_Port,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_Username,
    "password": process.env.DB_Password,
    "database": process.env.DB_Name,
    "host": process.env.DB_Host,
    "port": process.env.DB_Port,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_Username,
    "password": process.env.DB_Password,
    "database": process.env.DB_Name,
    "host": process.env.DB_Host,
    "port": process.env.DB_Port,
    "dialect": "postgres"
  }
}
