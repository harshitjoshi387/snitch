import React, { useState } from 'react'
import '../../../app/Register.scss'

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'USD',
  })
  const [images, setImages] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])
    const nextImages = files.slice(0, 7).map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
    }))
    setImages(nextImages)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Product draft ready', { ...formData, images })
  }

  return (
    <div className="register-container">
      <div className="register-banner">
        <div className="brand-overlay">
          <h1>SNITCH</h1>
          <p>Menswear</p>
        </div>
        <div className="quote-overlay">
          <p>“Style is a way to say who you are without having to speak.”</p>
          <div className="author">— Premium Collection</div>
        </div>
      </div>

      <div className="register-form-section">
        <div className="register-card">
          <div className="mobile-brand">
            <h1>SNITCH</h1>
          </div>

          <div className="header-text">
            <h2>Create product</h2>
            <p className="subtitle">Add items in the same premium fashion theme.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Tell buyers what makes this product special..."
                required
              />
            </div>

            <div className="name-row">
              <div className="form-group">
                <label htmlFor="priceAmount">Price amount</label>
                <input
                  id="priceAmount"
                  name="priceAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.priceAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="priceCurrency">Price currency</label>
                <select
                  id="priceCurrency"
                  name="priceCurrency"
                  value={formData.priceCurrency}
                  onChange={handleChange}
                  required
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="INR">INR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="images">Product images</label>
              <input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <p style={{ color: '#888', fontSize: '13px', marginTop: '8px' }}>
                Upload up to 7 fashion images.
              </p>
            </div>

            <button type="submit" className="register-btn">
              <span>Publish product</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
