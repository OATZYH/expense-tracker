"use server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "@/lib/getUserId";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const userId = await getUserId(request);
    const { id } = params;
    const expenseId = parseInt(id, 10);
    const body = await request.json();
    const { name, amount, category, date, pay, note } = body;

    if (!name || !amount || !category || !date || !pay) {
      return new Response(
        JSON.stringify({
          error: "All fields are required",
        }),
        {
          status: 400,
        }
      );
    }

    const results = await prisma.expense.updateMany({
      where: {
        id: expenseId,
        userId: userId,
      },
      data: {
        name: name,
        amount: amount,
        date: date,
        category: category,
        paidVia: pay,
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
    const expenseId = parseInt(id, 10);

    if (!expenseId) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const results = await prisma.expense.deleteMany({
      where: {
        id: expenseId,
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
