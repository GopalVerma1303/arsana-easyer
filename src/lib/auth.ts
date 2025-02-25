import { prisma } from "./prisma"; // Ensure Prisma client is imported
import { currentUser } from "@clerk/nextjs/server";

export async function saveUserToDB() {
  const user = await currentUser(); // Get user from Clerk

  if (!user) return null;

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!existingUser) {
    // Create new user entry
    return await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
        image: user.imageUrl,
      },
    });
  }

  return existingUser;
}
