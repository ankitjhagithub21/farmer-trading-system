import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { User, Phone, MapPin } from 'lucide-react'

const INITIAL_STATE = {
  name: '',
  fatherName: '',
  address: '',
  mobile: '',
}

const AddFarmer = () => {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/farmers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Farmer added successfully')
        setFormData(INITIAL_STATE)
      } else {
        toast.error(data.message || 'Failed to add farmer')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Add Farmer</h2>
        <p className="text-sm text-base-content/50 mt-1">Register a new farmer's personal details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div className="form-control">
          <label className="label py-0 mb-1.5">
            <span className="label-text text-xs font-medium tracking-wide">
              Name <span className="text-error">*</span>
            </span>
          </label>
          <label className="input outline-none flex items-center gap-2 focus-within:border-success focus-within:ring-2 focus-within:ring-success/20">
            <User size={14} className="text-base-content/40 shrink-0" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter farmer name"
              className="grow text-sm bg-transparent outline-none"
              required
            />
          </label>
        </div>

        {/* Father Name */}
        <div className="form-control">
          <label className="label py-0 mb-1.5">
            <span className="label-text text-xs font-medium tracking-wide">
              Father name <span className="text-error">*</span>
            </span>
          </label>
          <label className="input outline-none flex items-center gap-2 focus-within:border-success focus-within:ring-2 focus-within:ring-success/20">
            <User size={14} className="text-base-content/40 shrink-0" />
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              placeholder="Enter father's name"
              className="grow text-sm bg-transparent outline-none"
              required
            />
          </label>
        </div>

        {/* Mobile */}
        <div className="form-control">
          <label className="label py-0 mb-1.5">
            <span className="label-text text-xs font-medium tracking-wide">
              Mobile <span className="text-error">*</span>
            </span>
          </label>
          <label className="input outline-none flex items-center gap-2 focus-within:border-success focus-within:ring-2 focus-within:ring-success/20">
            <Phone size={14} className="text-base-content/40 shrink-0" />
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter mobile number"
              className="grow text-sm bg-transparent outline-none"
              required
            />
          </label>
        </div>

        {/* Address */}
        <div className="form-control">
          <label className="label py-0 mb-1.5">
            <span className="label-text text-xs font-medium tracking-wide">Address</span>
          </label>
          <div className="relative">
            <MapPin
              size={14}
              className="absolute left-3 top-3 text-base-content/40 pointer-events-none"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
              rows={3}
              className="textarea textarea-bordered w-full pl-8 text-sm focus:border-success focus:ring-2 focus:ring-success/20 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="btn btn-success w-full text-sm font-medium tracking-wide"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                Adding farmer...
              </>
            ) : (
              'Add farmer'
            )}
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddFarmer