import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice",
      projects: {
        create: [
          {
            name: "Open Source CMS",
            description: "A modern, lightweight CMS built with Next.js and GraphQL",
          },
          {
            name: "AI-powered Analytics",
            description: "Advanced analytics platform leveraging machine learning for deeper insights",
          },
        ],
      },
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob",
      projects: {
        create: [
          {
            name: "Blockchain Voting System",
            description: "Secure and transparent voting system built on blockchain technology",
          },
        ],
      },
    },
  })

  console.log({ user1, user2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

