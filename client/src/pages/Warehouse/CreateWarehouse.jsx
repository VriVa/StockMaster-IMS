import React, { useState } from 'react'
import {
  Package,
  Warehouse,
  MapPin,
  Hash,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

export default function WarehouseAddPage() {
  const [formData, setFormData] = useState({
    name: '',
    short_code: '',
    address: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('http://localhost:8000/warehouses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          short_code: formData.short_code,
          address: formData.address,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Failed to create warehouse')
      }

      const data = await response.json()
      console.log('Warehouse created:', data)

      setSuccess(true)
      setFormData({ name: '', short_code: '', address: '' })

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div
      className="min-h-screen pt-24 pb-6 px-6"
      style={{ backgroundColor: '#EFEBE9' }}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#6D4C41' }}
          >
            <Warehouse className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#4E342E' }}>
              Add New Warehouse
            </h1>
            <p className="text-gray-600">
              Create a new warehouse location for your inventory
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Success Message */}
          {success && (
            <div
              className="mb-6 p-4 rounded-lg flex items-center gap-3"
              style={{ backgroundColor: '#E8F5E9' }}
            >
              <CheckCircle className="text-green-600" size={24} />
              <span className="text-green-800 font-medium">
                Warehouse created successfully!
              </span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              className="mb-6 p-4 rounded-lg flex items-center gap-3"
              style={{ backgroundColor: '#FFEBEE' }}
            >
              <AlertCircle className="text-red-600" size={24} />
              <span className="text-red-800 font-medium">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Warehouse Name */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: '#4E342E' }}
                >
                  <div className="flex items-center gap-2">
                    <Warehouse size={18} />
                    Warehouse Name *
                  </div>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter warehouse name"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                  style={{
                    borderColor: '#D7CCC8',
                    backgroundColor: '#FAFAFA',
                  }}
                />
              </div>

              {/* Short Code */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: '#4E342E' }}
                >
                  <div className="flex items-center gap-2">
                    <Hash size={18} />
                    Short Code *
                  </div>
                </label>
                <input
                  type="text"
                  name="short_code"
                  value={formData.short_code}
                  onChange={handleChange}
                  required
                  placeholder="e.g., WH001"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                  style={{
                    borderColor: '#D7CCC8',
                    backgroundColor: '#FAFAFA',
                  }}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Use a unique identifier for quick reference
                </p>
              </div>

              {/* Address */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: '#4E342E' }}
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    Address (Optional)
                  </div>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter warehouse address"
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors resize-none"
                  style={{
                    borderColor: '#D7CCC8',
                    backgroundColor: '#FAFAFA',
                  }}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50"
                  style={{ backgroundColor: '#6D4C41' }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Create Warehouse
                    </>
                  )}
                </button>

                {/* Clear Button */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ name: '', short_code: '', address: '' })
                  }
                  className="px-6 py-3 rounded-lg font-semibold transition-colors"
                  style={{
                    color: '#6D4C41',
                    backgroundColor: 'transparent',
                    border: '2px solid #D7CCC8',
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <div
          className="mt-6 p-6 rounded-xl"
          style={{ backgroundColor: 'rgba(141, 110, 99, 0.1)' }}
        >
          <h3
            className="font-semibold mb-2 flex items-center gap-2"
            style={{ color: '#4E342E' }}
          >
            <Package size={18} />
            Tips for Adding Warehouses
          </h3>

          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-lg" style={{ color: '#8D6E63' }}>
                •
              </span>
              <span>Use descriptive warehouse names</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg" style={{ color: '#8D6E63' }}>
                •
              </span>
              <span>Ensure short codes are unique</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg" style={{ color: '#8D6E63' }}>
                •
              </span>
              <span>Include full address if useful for logistics</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
