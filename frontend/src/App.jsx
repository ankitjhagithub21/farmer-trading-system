import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import AddDeal from './components/admin/AddDeal'
import AddFarmer from './components/admin/AddFarmer'
import List from './components/admin/List'
import Dashboard from './components/admin/Dashboard'
import Login from './components/admin/Login'
import ProtectedRoute from './components/admin/ProtectedRoute'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
         <Route index element={<Dashboard />} />
          <Route path="list" element={<List />} />
          <Route path="add-deal" element={<AddDeal />} />
          <Route path="add-farmer" element={<AddFarmer />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App