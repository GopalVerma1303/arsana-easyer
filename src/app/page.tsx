import { ArrowRight, Database, Share2, Code2, Box, Boxes } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Button } from "../components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <header className="p-6 bg-white border-b flex justify-between items-center fixed w-full top-0 z-50">
        <div className="flex items-center gap-2">
          <Boxes className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
            Easyer
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="hover:bg-indigo-50">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section for Signed Out Users */}
        <SignedOut>
          <section className="flex flex-col items-center justify-center py-32 px-6 bg-gradient-to-br from-slate-50 via-indigo-50 to-white">
            <div className="mb-8">
              <Box className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight max-w-3xl text-center leading-tight">
              Design Databases with{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
                Visual Precision
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl text-center">
              Create, visualize, and generate database schemas effortlessly with our intuitive ER diagram tool.
            </p>
            <SignInButton mode="modal">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 transition-colors">
                Start Designing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignInButton>
          </section>

          {/* Features Section */}
          <section className="py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-16">Everything you need to design your database</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Database,
                    title: "Visual Design",
                    description:
                      "Intuitive drag-and-drop interface for creating ER diagrams with support for multiple notation styles.",
                  },
                  {
                    icon: Share2,
                    title: "Smart Relationships",
                    description:
                      "Automatic relationship line routing with intelligent positioning to keep your diagrams clean.",
                  },
                  {
                    icon: Code2,
                    title: "Code Generation",
                    description: "Generate SQL scripts directly from your diagrams for all major database platforms.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="group hover:bg-slate-50 rounded-xl p-6 transition-all">
                    <div className="rounded-full w-12 h-12 bg-indigo-50 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SignedOut>

        {/* Dashboard for Authenticated Users */}
        <SignedIn>
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Your Diagrams</h2>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => (window.location.href = "/new-diagram")}
                >
                  New Diagram
                  <Box className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Placeholder for recent diagrams */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                    <div className="aspect-video bg-slate-100 rounded-md mb-4 flex items-center justify-center">
                      <Boxes className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="font-medium mb-1">Sample Diagram {index + 1}</h3>
                    <p className="text-sm text-gray-500">Last edited 2 days ago</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SignedIn>
      </main>
    </div>
  )
}

