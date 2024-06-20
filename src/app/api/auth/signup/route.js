import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client"

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;

const prisma = new PrismaClient()

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
    await prisma.user.create({
      data: {
        id: id,
        username: username,
        email: email,
        passwordHash: hashedPassword,
        firstName: null, 
        lastName: null,  
      }
    })

    return NextResponse.json({ message: 'Signup successful' })
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 })
  }
}