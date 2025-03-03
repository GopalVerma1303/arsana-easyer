import { NextResponse } from "next/server";
import { saveUserToDB } from "../../../lib/auth"; // Ensure correct path

export async function POST() {
  try {
    await saveUserToDB();
    return NextResponse.json({ message: "User saved successfully" });
  } catch (error) {
    console.error("Error saving user:", error); // Logs the error
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
