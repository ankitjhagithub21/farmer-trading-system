import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setAdmin } = useAdmin()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Login successful!')
        setAdmin(data.admin)
        navigate('/')
      } else {
        toast.error(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-sm bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-sm">

        {/* Header banner */}
        <div className="bg-success/10 px-8 py-7 text-center border-b border-base-300">
          <div className="w-13 h-13 rounded-full bg-success/20 border border-success/30 flex items-center justify-center mx-auto mb-3">
            <Home size={22} className="text-success" />
          </div>
          <h1 className="text-lg font-semibold ">
            Farmer Trading System
          </h1>
          <p className="text-xs text-base-content/50 mt-1">
            Admin portal — sign in to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">

          {/* Email */}
          <div className="form-control">
            <label className="label py-0 mb-1.5">
              <span className="label-text text-xs font-medium tracking-wide">
                Email address
              </span>
            </label>
            <label className="input outline-none flex items-center gap-2 focus-within:border-success focus-within:ring-2 focus-within:ring-success/20">
              <Mail size={14} className="text-base-content/40 shrink-0" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@mail.com"
                className="grow text-sm bg-transparent outline-none"
                required
              />
            </label>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label py-0 mb-1.5">
              <span className="label-text text-xs font-medium tracking-wide">
                Password
              </span>
            </label>
            <label className="input outline-none flex items-center gap-2 focus-within:border-success focus-within:ring-2 focus-within:ring-success/20">
              <Lock size={14} className="text-base-content/40 shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="grow text-sm bg-transparent outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-base-content/40 hover:text-base-content/70 transition-colors"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </label>
          </div>

          {/* Remember me */}
          {/* <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="checkbox checkbox-success checkbox-xs"
            />
            <label htmlFor="remember" className="text-xs text-base-content/60 cursor-pointer">
              Keep me signed in
            </label>
          </div> */}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-success w-full mt-2 text-sm font-medium tracking-wide"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>

         
        </form>
      </div>
    </div>
  )
}

export default Login