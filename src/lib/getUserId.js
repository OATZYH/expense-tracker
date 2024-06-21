import { getToken } from "next-auth/jwt";

export async function getUserId(request) {
  const token = await getToken({ req: request, secret: process.env.JWT_SECRET });

  if (!token) {
    throw new Error("Unauthorized");
  }

  return token.sub; 
}