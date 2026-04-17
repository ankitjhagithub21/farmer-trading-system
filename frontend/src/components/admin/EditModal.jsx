import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const EditModal = ({ farmer, onSave, onClose }) => {
  const [form, setForm] = useState({})

  useEffect(() => {
    if (farmer) setForm({ ...farmer })
  }, [farmer])

  if (!farmer) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/farmers/${farmer._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
          body: JSON.stringify(form),
        }
      )
      const data = await response.json()
      if (data.success) {
        toast.success('Farmer updated successfully')
        onSave()
        onClose()
      } else {
        toast.error('Failed to update farmer')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    }
  }

  return (
    <dialog id="modal_edit" className="modal modal-open">
      <div className="modal-box max-w-lg">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">Edit Farmer</h3>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Father Name', name: 'fatherName', type: 'text' },
            { label: 'Mobile', name: 'mobile', type: 'text' },
            { label: 'Product', name: 'productName', type: 'text' },
            { label: 'Weight (kg)', name: 'weight', type: 'number' },
            { label: 'Rate (₹/kg)', name: 'rate', type: 'number' },
            { label: 'Bags', name: 'bagQuantity', type: 'number' },
            { label: 'Material', name: 'material', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name} className="form-control">
              <label className="label py-0.5">
                <span className="label-text text-xs">{label}</span>
              </label>
              <input
                type={type}
                name={name}
                value={form[name] || ''}
                onChange={handleChange}
                className="input outline-none input-sm w-full"
              />
            </div>
          ))}

          <div className="form-control col-span-2">
            <label className="label py-0.5">
              <span className="label-text text-xs">Address</span>
            </label>
            <input
              type="text"
              name="address"
              value={form.address || ''}
              onChange={handleChange}
              className="input outline-none input-sm w-full"
            />
          </div>

          <div className="form-control col-span-2">
            <label className="label py-0.5">
              <span className="label-text text-xs">Status</span>
            </label>
            <select
              name="status"
              value={form.status || 'unpaid'}
              onChange={handleChange}
              className="select outline-none select-sm w-full"
            >
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        <div className="modal-action mt-4">
          <button className="btn btn-sm btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  )
}

export default EditModal