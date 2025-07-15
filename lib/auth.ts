import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import type { UserPayload } from "@/types"

const JWT_SECRET = process.env.JWT_SECRET!

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable inside .env.local")
}

export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload
    return decoded
  } catch (error) {
    return null
  }
}

export async function authenticateRequest(request: Request): Promise<UserPayload | null> {
  const authHeader = request.headers.get("Authorization")
  let token = null

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]
  } else {
    // Try to get token from HTTP-only cookie
    const cookieStore = cookies()
    token = cookieStore.get("auth-token")?.value
  }

  if (!token) {
    return null
  }

  const user = await verifyToken(token)
  return user
}
