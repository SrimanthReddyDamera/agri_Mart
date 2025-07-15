import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: "Logged out successfully" })
    cookies().delete("auth-token") // Clear the HTTP-only cookie
    return response
  } catch (error: any) {
    console.error("Logout error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
