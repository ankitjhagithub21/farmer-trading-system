import React, { useState } from 'react'
import toast from 'react-hot-toast'

const AddDeal = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    address: '',
    mobile: '',
    productName: '',
    weight: '',
    rate: '',
    bagQuantity: '',
    material: '',
    status: 'pending'
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/farmers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
               
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if(data.success){
            toast.success('Deal added successfully')
            setFormData({
                name: '',
                fatherName: '',
                address: '',
                mobile: '',
                productName: '',
                weight: '',
                rate: '',
                bagQuantity: '',
                material: '',
                status: 'pending'
            })
        }
    }catch(error){
        console.error(error)
        toast.error('Failed to add deal')
    }finally{
        setLoading(false)
    }
  }

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add Farmer Deal</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name *</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter farmer name"
            className="input outline-none w-full"
            required
          />
        </div>

        {/* Father Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Father Name *</span>
          </label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            placeholder="Enter father name"
            className="input outline-none w-full"
            required
          />
        </div>

        {/* Address Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            className="textarea  outline-none w-full"
            rows="5"
          />
        </div>

        {/* Mobile Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Mobile *</span>
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Enter mobile number"
            className="input outline-none w-full"
            required
          />
        </div>

        {/* Product Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="input outline-none w-full"
          />
        </div>

        {/* Weight and Rate Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Weig ht (kg)</span>
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Enter weight"
              className="input outline-none w-full"
              step="0.1"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Rate (per kg)</span>
            </label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              placeholder="Enter rate"
              className="input outline-none w-full"
              step="0.01"
            />
          </div>
        </div>

        {/* Bag Quantity Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bag Quantity</span>
          </label>
          <input
            type="number"
            name="bagQuantity"
            value={formData.bagQuantity}
            onChange={handleInputChange}
            placeholder="Enter bag quantity"
            className="input outline-none w-full"
          />
        </div>

        {/* Material Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Material *</span>
          </label>
          <select
            name="material"
            value={formData.material}
            onChange={handleInputChange}
            className="select outline-none w-full"
            required
          >
            <option value="">Select material</option>
            <option value="makka">Makka</option>
            <option value="gehu">Gehu</option>
            <option value="dhan">Dhan</option>
            <option value="haldi">Haldi</option>
          </select>
        </div>

        {/* Status Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="select outline-none w-full"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Add Deal
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddDeal
