import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"
import { prisma } from "../../../lib/prisma"
import Link from "next/link"

export default async function UserProfile({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { projects: true },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{user.name}'s Profile</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Joined:</strong> {user.createdAt.toDateString()}
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        {user.projects.length > 0 ? (
          <ul className="space-y-4">
            {user.projects.map((project: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
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
    </div>
  )
}

