import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "@/lib/getUserId";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const userId = await getUserId(request);

    const results = await prisma.income.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return new Response(
        JSON.stringify({
          error: error.message,
        }),
        {
          status: 401,
        }
      );
    }
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const userId = await getUserId(request);

    const body = await request.json();
    const { name, amount, date, category, note } = body;

    if (!name || !amount || !category || !date) {
      return new Response(
        JSON.stringify({
          error: "All fields are required",
        }),
        {
          status: 400,
        }
      );
    }

    const results = await prisma.income.create({
      data: {
        name: name,
        amount: amount,
        date: date,
        category: category,
        note: note || null,
        userId: userId,
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}