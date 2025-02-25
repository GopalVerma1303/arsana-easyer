import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Error fetching projects" }, { status: 500 })
  }
}

