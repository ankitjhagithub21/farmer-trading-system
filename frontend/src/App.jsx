
  import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import AddDeal from './components/admin/AddDeal'
import List from './components/admin/List'
import Dashboard from './components/admin/Dashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
         <Route index element={<Dashboard />} />
          <Route path="list" element={<List />} />
          <Route path="add-deal" element={<AddDeal />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App