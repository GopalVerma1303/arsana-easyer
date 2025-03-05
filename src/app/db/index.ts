import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
export const runtime = 'edge';
// Create the database connection
const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql)

