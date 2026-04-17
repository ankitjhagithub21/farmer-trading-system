import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import ViewModal from './ViewModal'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

const List = () => {
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [activeModal, setActiveModal] = useState(null) // 'view' | 'delete' | 'edit'

  const fetchFarmers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/farmers`,{
        credentials: "include"
      })
      const data = await response.json()
      if (data.success) {
        setFarmers(data.data)
      } else {
        console.error('Failed to fetch farmers')
      }
    } catch (error) {
      console.error('Error fetching farmers:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFarmers()
  }, [])

  const openModal = (type, farmer) => {
    setSelectedFarmer(farmer)
    setActiveModal(type)
  }

  const closeModal = () => {
    setSelectedFarmer(null)
    setActiveModal(null)
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/farmers/${id}`,
        { method: 'DELETE', credentials: "include" }
      )
      const data = await response.json()
      if (data.success) {
        setFarmers((prev) => prev.filter((f) => f._id !== id))
        toast.success('Farmer deleted successfully')
      } else {
        toast.error('Failed to delete farmer')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    }
  }

  const handleSave = () => {
    fetchFarmers();
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Farmers List</h2>

      {farmers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No farmers found</p>
        </div>
      ) : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Father Name</th>
              <th>Mobile</th>
              <th>Product</th>
              <th>Weight (kg)</th>
              <th>Rate (₹/kg)</th>
              <th>Bags</th>
              <th>Material</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer, index) => (
              <tr key={farmer._id || index}>
                <td className="font-medium">{farmer.name}</td>
                <td>{farmer.fatherName}</td>
                <td>{farmer.mobile}</td>
                <td>{farmer.productName || '-'}</td>
                <td>{farmer.weight || '-'}</td>
                <td>{farmer.rate || '-'}</td>
                <td>{farmer.bagQuantity || '-'}</td>
                <td>
                  <span className="badge badge-ghost badge-sm">{farmer.material}</span>
                </td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      farmer.status === 'paid' ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {farmer.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <button
                      className="btn btn-ghost btn-xs text-info"
                      onClick={() => openModal('view', farmer)}
                      title="View"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      className="btn btn-ghost btn-xs text-success"
                      onClick={() => openModal('edit', farmer)}
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      className="btn btn-ghost btn-xs text-error"
                      onClick={() => openModal('delete', farmer)}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ViewModal
        farmer={activeModal === 'view' ? selectedFarmer : null}
        onClose={closeModal}
      />
      <DeleteModal
        farmer={activeModal === 'delete' ? selectedFarmer : null}
        onConfirm={handleDelete}
        onClose={closeModal}
      />
      <EditModal
        farmer={activeModal === 'edit' ? selectedFarmer : null}
        onSave={handleSave}
        onClose={closeModal}
      />
    </div>
  )
}

export default List