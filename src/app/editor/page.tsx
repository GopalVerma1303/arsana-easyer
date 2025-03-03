"use client"
export const dynamic = 'force-dynamic';


import { useState } from "react"
import { Menu, X, Save, Download, Upload, Settings, ZoomIn, ZoomOut } from "lucide-react"

export default function Editor() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-gray-800 transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <span className="font-semibold">ERDiagram</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-700 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4">
          {sidebarOpen ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Database Objects</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-700">Table</button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-700">Primary Key</button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-700">Foreign Key</button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Properties</h3>
                <div className="space-y-2">
                  <div className="px-3">
                    <label className="block text-sm text-gray-400">Name</label>
                    <input type="text" className="w-full bg-gray-700 rounded px-2 py-1 mt-1" />
                  </div>
                  <div className="px-3">
                    <label className="block text-sm text-gray-400">Data Type</label>
                    <select className="w-full bg-gray-700 rounded px-2 py-1 mt-1">
                      <option>VARCHAR</option>
                      <option>INT</option>
                      <option>BOOLEAN</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <button className="p-2 hover:bg-gray-700 rounded">
                <Save size={20} />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <Download size={20} />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <Upload size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <select className="bg-gray-700 rounded px-2 py-1 text-sm">
              <option>Crow&apos;s Foot</option>
              <option>Chen</option>
              <option>UML</option>
            </select>
            <button className="p-1 hover:bg-gray-700 rounded">
              <Save size={18} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-700 rounded">
              <ZoomOut size={18} />
            </button>
            <span>100%</span>
            <button className="p-1 hover:bg-gray-700 rounded">
              <ZoomIn size={18} />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gray-900">{/* Canvas content will go here */}</div>
        </div>
      </div>
    </div>
  )
}

