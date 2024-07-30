import mysql from 'mysql2'

// eslint-disable-next-line no-unused-vars
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'securitydb',
  user: 'root',
  password: '1234'
})

export default connection
