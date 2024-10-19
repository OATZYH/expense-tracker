"use server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "@/lib/getUserId";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const userId = await getUserId(request);
    const { id } = params;
    const incomeId = parseInt(id, 10);
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

    const results = await prisma.income.updateMany({
      where: {
        id: incomeId,
        userId: userId,
      },
      data: {
        name: name,
        amount: amount,
        date: date,
        category: category,
        note: note || null,
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

export async function DELETE(request, { params }) {
  try {
    const userId = await getUserId(request);
    const { id } = params;
    const incomeId = parseInt(id, 10);

    if (!incomeId) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const results = await prisma.income.deleteMany({
      where: {
        id: incomeId,
        userId: userId,
      },
    });

    if (results.count === 0) {
      return NextResponse.json(
        { error: "Expense not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
