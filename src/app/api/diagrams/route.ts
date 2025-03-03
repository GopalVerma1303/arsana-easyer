import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function POST(_req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await _req.json()
    const { name, content } = body

    const diagram = await prisma.diagram.create({
      data: {
        name,
        content,
        userId,
      },
    })

    return NextResponse.json(diagram)
  } catch (error) {
    console.error("[DIAGRAMS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET() {
  try {
    const { userId } = await auth()  // Added 'await' here
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const diagrams = await prisma.diagram.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(diagrams)
  } catch (error) {
    console.error("[DIAGRAMS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}