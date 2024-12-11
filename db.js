const sqlite= require('sqlite3')
const db= new sqlite.Database('rent.db')
const createUserTable= `CREATE TABLE IF NOT EXISTS USER (ID INTEGER PRIMARY KEY AUTOINCREMENT,
NAME TEXT NOT NULL,
EMAIL TEXT UNIQUE NOT NULL,
PASSWORD TEXT NOT NULL,
ISADMIN INT)`

const createRentTable=`CREATE TABLE IF NOT EXISTS RENT (ID INTEGER PRIMARY KEY AUTOINCREMENT,
TYPE TEXT NOT NULL,
MODEL TEXT NOT NULL,
AVAILABILITY INT NOT NULL,
QUANTITY INT NOT NULL)`

const createBookingTable =`CREATE TABLE IF NOT EXISTS BOOKING (ID INTEGER PRIMARY KEY AUTOINCREMENT,
USER_ID INT,
RENT_ID INT,
FOREIGN KEY (USER_ID) REFERENCES USER(ID),
FOREIGN KEY (RENT_ID) REFERENCES RENT(ID))`

module.exports={db,createUserTable,createRentTable,createBookingTable}