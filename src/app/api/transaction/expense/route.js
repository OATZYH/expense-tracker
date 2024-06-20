import { NextResponse } from "next/server";
import { dbConnection, getUserId } from "@/lib/dbConnection";

export async function GET(request) {
  const db = await dbConnection();

  try {
    const userId = await getUserId(request);
    const [results] = await db.query(
      "SELECT * FROM `expense` WHERE user_id = ?",
      [userId]
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
  }
}