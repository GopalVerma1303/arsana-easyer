import { neon, neonConfig } from "@neondatabase/serverless"
import { Pool } from "pg"

neonConfig.fetchConnectionCache = true

let pool: Pool | undefined

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const getPool = () => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  }
  return pool
}

export const sql = neon(process.env.DATABASE_URL!)

export const query = async (text: string, params?: any[]) => {
  const pool = getPool()
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log("executed query", { text, duration, rows: res.rowCount })
  return res
}

