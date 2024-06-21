import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "@/lib/getUserId";
import convertDate from "@/lib/formatDate";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const userId = await getUserId(request);

    const results = await prisma.expense.findMany({
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

    const formatDate = convertDate(date);
    // console.log(name, amount, category, formatDate, pay, note);

    const results = await prisma.expense.create({
      data: {
        name: name,
        amount: amount,
        date: formatDate,
        category: category,
        paidVia: pay,
        note: note || null,
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

export async function PUT(request) {
  try {
    const userId = await getUserId(request);
    const body = await request.json();
    const { id, name, amount, category, date, pay, note } = body;
    const formatDate = convertDateToPostgresFormat(date);
    const results = await prisma.expense.updateMany({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        name: name,
        amount: amount,
        date: formatDate,
        category: category,
        paidVia: pay,
        note: note || "",
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

export async function DELETE(request) {
  try {
    const userId = await getUserId(request);
    const body = await request.json();
    const { id } = body;
    const results = await prisma.expense.deleteMany({
      where: {
        id: id,
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
