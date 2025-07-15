import { NextResponse } from "next/server"
import { authenticateRequest } from "@/lib/auth"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

export async function GET(request: Request) {
  try {
    await connectDB()
    const userPayload = await authenticateRequest(request)

    if (!userPayload) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const user = await User.findById(userPayload.userId).select("-password").lean()

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, user })
  } catch (error: any) {
    console.error("Auth /me error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
