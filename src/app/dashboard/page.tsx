import { auth } from "@clerk/nextjs/server"
import { prisma } from "../../lib/prisma"
import Link from "next/link"

// Define Project type
interface Project {
  id: string
  name: string
  description: string
}

export default async function Dashboard() {
  const { userId } = await auth()  // ✅ Await auth() before accessing userId

  if (!userId) {
    return <div>Not authenticated</div>
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { projects: true },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name || "User"}!</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
        {user.projects.length > 0 ? (
          <ul className="space-y-4">
            {user.projects.map((project: Project) => (  // ✅ Explicitly type project
              <li key={project.id} className="border p-4 rounded-lg">
                <h3 className="text-lg font-medium">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
                <Link href={`/projects/${project.id}`} className="text-blue-600 hover:underline">
                  View Project
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects yet.</p>
        )}
      </div>
      <Link
        href="/projects/new"
        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
      >
        Create New Project
      </Link>
    </div>
  )
}
