export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Welcome to Arsana Labs!!</h1>
      <h2 className="text-2xl font-medium text-gray-700 max-w-2xl mb-6">
        We are Arsana Labs – we build open-source products and provide expert software consulting.
      </h2>
      
      <p className="text-lg text-gray-600 max-w-xl mb-4">
        Our mission is to drive innovation through technology. Join us in building cutting-edge solutions that empower businesses and individuals alike.
      </p>
      
      <div className="flex gap-4 mt-4">
        <a
          href="/projects"
          className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
        >
          View Projects
        </a>
        <a
          href="/contact"
          className="px-6 py-3 text-blue-600 border border-blue-600 rounded-lg shadow hover:bg-blue-100"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
