import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Package, Weight, IndianRupee, ShoppingBag, User } from 'lucide-react'

const INITIAL_STATE = {
  farmer: '',
  productName: '',
  weight: '',
  rate: '',
  bagQuantity: '',
  material: '',
  status: 'pending',
}

const MATERIALS = [
  { value: 'makka', label: 'Makka' },
  { value: 'gehu', label: 'Gehu' },
  { value: 'dhan', label: 'Dhan' },
  { value: 'haldi', label: 'Haldi' },
]

const AddDeal = () => {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const [farmers, setFarmers] = useState([])
  const [farmersLoading, setFarmersLoading] = useState(false)

  // Fetch farmers on component mount
  useEffect(() => {
    const fetchFarmers = async () => {
      setFarmersLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/farmers`, {
          credentials: 'include'
        })
        const data = await response.json()
        if (data.success) {
          setFarmers(data.data)
        }
      } catch (error) {
        console.error('Error fetching farmers:', error)
      } finally {
        setFarmersLoading(false)
      }
    }

    fetchFarmers()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Deal added successfully')
        setFormData(INITIAL_STATE)
      } else {
        toast.error(data.message || 'Failed to add deal')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Live total calculation
  const total =
    formData.weight && formData.rate
      ? (parseFloat(formData.weight) * parseFloat(formData.rate)).toFixed(2)
      : null

  return (
    <div className="w-full max-w-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Add Deal</h2>
        <p className="text-sm text-base-content/50 mt-1">Record a new transaction deal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Farmer Select */}
        <div className="form-control">
          <label className="label py-0 mb-1.5">
            <span className="label-text text-xs font-medium tracking-wide">
              Select Farmer <span className="text-error">*</span>
            </span>
          </label>
          <select
            name="farmer"
            value={formData.farmer}
            onChange={handleInputChange}
            className="select outline-none text-sm focus:border-success focus:ring-2 focus:ring-success/20 focus:outline-none w-full"
            required
            disabled={farmersLoading}
          >
            <option value="">Select a farmer</option>
            {farmers.map(farmer => (
              <option key={farmer._id} value={farmer._id}>
                {farmer.name} - {farmer.mobile}
              </option>
            ))}
          </select>
          {farmersLoading && (
            <label className="label py-0">
              <span className="label-text-alt text-xs text-base-content/50">
                Loading farmers...
              </span>
            </label>
          )}
        </div>

        {/* Product Name */}
        <div className="form-control">
          <label className="label py-0 mb-1.5">
            <span className="label-text text-xs font-medium tracking-wide">Product name</span>
          </label>
          <label className="input outline-none flex items-center gap-2 focus-within:border-success focus-within:ring-2 focus-within:ring-success/20">
            <Package size={14} className="text-base-content/40 shrink-0" />
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="grow text-sm bg-transparent outline-none"
            />
          </label>
        </div>

        {/* Weight + Rate side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="form-control">
            <label className="label py-0 mb-1.5">
              <span className="label-text text-xs font-medium tracking-wide">Weight (kg)</span>
            </label>
            <label className="input outline-none flex items-center gap-2 focus-within:border-success focus-within:ring-2 focus-within:ring-success/20">
              <Weight size={14} className="text-base-content/40 shrink-0" />
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="0.0"
                className="grow text-sm bg-transparent outline-none"
                step="0.1"
                min="0"
              />
            </label>
          </div>

          <div className="form-control">
            <label className="label py-0 mb-1.5">
              <span className="label-text text-xs font-medium tracking-wide">Rate (₹/kg)</span>
            </label>
            <label className="input outline-none flex items-center gap-2 focus-within:border-success focus-within:ring-2 focus-within:ring-success/20">
              <IndianRupee size={14} className="text-base-content/40 shrink-0" />
              <input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
                placeholder="0.00"
                className="grow text-sm bg-transparent outline-none"
                step="0.01"
                min="0"
              />
            </label>
          </div>
        </div>

        {/* Live total */}
        {total && (
          <div className="flex items-center justify-between bg-success/10 border border-success/25 rounded-lg px-4 py-2.5">
            <span className="text-xs text-success/80 font-medium">Estimated total</span>
            <span className="text-sm font-semibold text-success">₹{total}</span>
          </div>
        )}

        {/* Bag Quantity */}
        <div className="form-control">
          <label className="label py-0 mb-1.5">
            <span className="label-text text-xs font-medium tracking-wide">Bag quantity</span>
          </label>
          <label className="input outline-none flex items-center gap-2 focus-within:border-success focus-within:ring-2 focus-within:ring-success/20">
            <ShoppingBag size={14} className="text-base-content/40 shrink-0" />
            <input
              type="number"
              name="bagQuantity"
              value={formData.bagQuantity}
              onChange={handleInputChange}
              placeholder="Number of bags"
              className="grow text-sm bg-transparent outline-none"
              min="0"
            />
          </label>
        </div>

        {/* Material + Status side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="form-control">
            <label className="label py-0 mb-1.5">
              <span className="label-text text-xs font-medium tracking-wide">
                Material <span className="text-error">*</span>
              </span>
            </label>
            <select
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              className="select outline-none text-sm focus:border-success focus:ring-2 focus:ring-success/20 focus:outline-none w-full"
              required
            >
              <option value="">Select material</option>
              {MATERIALS.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label py-0 mb-1.5">
              <span className="label-text text-xs font-medium tracking-wide">Status</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="select outline-none text-sm focus:border-success focus:ring-2 focus:ring-success/20 focus:outline-none w-full"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
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
                Adding deal...
              </>
            ) : (
              'Add deal'
            )}
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddDeal