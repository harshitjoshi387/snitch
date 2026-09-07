import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { createProduct } from "@/features/products/services/product.api";
import '@/features/auth/styles/Register.scss';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'INR',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 7);
    setSelectedFiles(files);

    const nextPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(nextPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (selectedFiles.length === 0) {
      setError('Please select at least one image to upload.');
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append(
        'price',
        JSON.stringify({
          amount: formData.priceAmount,
          currency: formData.priceCurrency,
        })
      );

      selectedFiles.forEach((file) => {
        payload.append('images', file);
      });

      const response = await createProduct(payload);
      if (response && response.success) {
        setSuccess('Product created successfully!');
        setFormData({ title: '', description: '', priceAmount: '', priceCurrency: 'INR' });
        setSelectedFiles([]);
        setPreviews([]);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(response.message || 'Failed to create product');
      }
    } catch (err) {
      console.error('Submit error:', err);
      const errMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || err.message || 'An error occurred while uploading product.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-banner">
        <div className="brand-overlay">
          <h1>SNITCH</h1>
          <p>Menswear</p>
        </div>
        <div className="quote-overlay">
          <p>"Style is a way to say who you are without having to speak."</p>
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

          {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '14px' }}>{error}</div>}
          {success && <div style={{ color: '#22c55e', marginBottom: '1rem', fontSize: '14px' }}>{success}</div>}

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
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
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
              {previews.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {previews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Preview ${idx + 1}`}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              <span>{loading ? 'Publishing...' : 'Publish product'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
