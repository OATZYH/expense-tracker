import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "@/lib/getUserId";
import convertDate from "@/lib/formatDate";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const userId = await getUserId(request);
    const results = await prisma.subscription.findMany({
      where: {
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
