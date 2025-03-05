import { ArrowRight, Code, GitBranch, Database, Workflow } from "lucide-react"
import Link from "next/link"
import { prisma } from "../lib/prisma"
import ClientHeader from "../components/ClientHeader"
export const runtime = 'edge';
interface User {
  name: string
  id: string
  email: string
  image: string | null
  createdAt: Date
  updatedAt: Date
}

interface Project {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  userId: string
  user: User
}

async function getProjects(): Promise<Project[]> {
  try {
    return await prisma.project.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    })
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    return []
  }
}

export default async function Home() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-blue-600 text-xl font-bold">
                Arsana Labs
              </Link>
              <div className="hidden md:flex md:ml-10 space-x-8">
                <Link href="/features" className="text-gray-600 hover:text-gray-900">
                  Features
                </Link>
                <Link href="/docs" className="text-gray-600 hover:text-gray-900">
                  Docs
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
                <Link href="/support" className="text-gray-600 hover:text-gray-900">
                  Support
                </Link>
              </div>
            </div>
            <ClientHeader />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Arsana Labs
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Building the future through open-source innovation and expert software consulting.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/projects"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Explore Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: "Open Source",
                description: "Contributing to the community with high-quality open source solutions.",
              },
              {
                icon: Workflow,
                title: "Innovation",
                description: "Pushing boundaries with cutting-edge technology solutions.",
              },
              {
                icon: GitBranch,
                title: "Collaboration",
                description: "Fostering a collaborative environment for developers worldwide.",
              },
              {
                icon: Database,
                title: "Expert Consulting",
                description: "Providing expert guidance to help businesses thrive in the digital age.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-blue-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Our Latest Projects</h2>
            <Link href="/projects" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View all projects
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-all p-6 flex flex-col h-full"
                >
                  <div className="h-2 w-20 bg-blue-600 rounded-full mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                  <div className="mt-auto">
                    <p className="text-sm text-gray-500 mb-4">By {project.user.name}</p>
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                    >
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">No projects found. Check back soon!</p>
              <Link href="/projects/new" className="text-blue-600 hover:text-blue-800 font-medium">
                Create a project
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Innovate?</h2>
          <p className="text-xl mb-8 text-blue-100">Join us in building the next generation of technology solutions.</p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            Start a Conversation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Arsana Labs</h3>
            <p className="text-sm">Building the future through open-source innovation.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/consulting" className="hover:text-white transition-colors">
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/development" className="hover:text-white transition-colors">
                  Development
                </Link>
              </li>
              <li>
                <Link href="/training" className="hover:text-white transition-colors">
                  Training
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://twitter.com" className="hover:text-white transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://github.com" className="hover:text-white transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="https://linkedin.com" className="hover:text-white transition-colors">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          © {new Date().getFullYear()} Arsana Labs. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

