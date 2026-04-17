import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Plus, List } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="menu bg-base-200 min-h-full w-80 p-4">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Menu</h2>
      </div>
      
      <ul>
        <li>
          <Link 
            to="/" 
            className={location.pathname === "/" ? "active" : ""}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/add-deal" 
            className={location.pathname === "/add-deal" ? "active" : ""}
          >
            <Plus className="h-5 w-5" />
            Add Deal
          </Link>
        </li>
         <li>
          <Link 
            to="/list" 
            className={location.pathname === "/list" ? "active" : ""}
          >
            <List className="h-5 w-5" />
            List
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
