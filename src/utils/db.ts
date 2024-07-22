import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_POST as unknown as number,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default async function fetchSql(query: string) {
  const [rows, fields] = await pool.query(query)
  return { rows, fields }
}