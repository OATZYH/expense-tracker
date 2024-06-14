import pool from '@/lib/db'
import { NextResponse } from 'next/server'

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;

export async function POST(request) {
  const body = await request.json()
  const { username, email, password } = body
  if (!username || !email || !password) {
    return new Response(
      JSON.stringify({
        error: 'All fields are required',
      }),
      {
        status: 400,
      }
    )
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const id = uuidv4()

  try {
    const db = await pool.getConnection()
    const query = `INSERT INTO user (id, username, email, password_hash) VALUES (?,?, ?, ?)`
    const [rows] = await db.execute(query, [id, username, email, hashedPassword])
    db.release()

    return NextResponse.json({
      message: 'User created successfully',
    })
  } catch (error) {
    return NextResponse.json({
      error: error,
    }, { status: 500 })
  }
}