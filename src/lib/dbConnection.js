import { getToken } from "next-auth/jwt";
import pool from "@/lib/db";

export async function dbConnection() {
  const db = await pool.getConnection();
  return db;
}

export async function getUserId(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  if (!token) {
    return null;
  }
  return token.sub;
}