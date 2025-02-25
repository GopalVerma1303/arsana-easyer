import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { prisma } from "../lib/prisma";
import React from "react";
import ClientHeader from "../components/ClientHeader";

interface User {
  name: string;
  id: string;
  email: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
}

async function getProjects(): Promise<Project[]> {
  return await prisma.project.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
}

export default async function Home() {
  const projects = await getProjects(); // Keeping Home as a server component

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Arsana Labs</h1>
          <ClientHeader /> {/* Using Client Component */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Arsana Labs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Building the future through open-source innovation and expert software consulting.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/projects" className="btn-primary">
              Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Latest Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white border rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <p className="text-sm text-gray-500 mb-4">By {project.user.name}</p>
                <Link href={`/projects/${project.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
