import { NextResponse } from "next/server";
import { saveUserToDB } from "../../../lib/auth"; // Ensure correct path

export async function POST() {
  try {
    await saveUserToDB();
    return NextResponse.json({ message: "User saved successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
