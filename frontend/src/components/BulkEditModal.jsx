import React, { useState } from 'react';
import '../styles/BulkEditModal.css';

const BulkEditModal = ({ onClose, onSave, selectedCount }) => {
  const [formData, setFormData] = useState({
    price: 350,
    currency: 'KG',
    shape: '',
    length: '',
    thickness: '',
    surfaceFinish: '',
    outsideDiameter: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="bulk-edit-modal">
        <div className="modal-header">
          <h2>Bulk Edit Products</h2>
          <div className="selected-count">
            {selectedCount} Products Selected
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="form-row">
            <div className="form-group price-group">
              <label>Price</label>
              <div className="price-inputs">
                <input 
                  type="number" 
                  name="price"
                  value={formData.price} 
                  onChange={handleInputChange}
                />
                <select 
                  name="currency"
                  value={formData.currency} 
                  onChange={handleInputChange}
                >
                  <option value="KG">KG</option>
                  <option value="TON">TON</option>
                  <option value="PIECE">PIECE</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <div className="section-title">Product Details <span>(Minimum 1 fields required)</span></div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Shape</label>
                <input 
                  type="text" 
                  name="shape"
                  value={formData.shape} 
                  onChange={handleInputChange}
                  placeholder="Round"
                />
              </div>
              
              <div className="form-group">
                <label>Length</label>
                <input 
                  type="text" 
                  name="length"
                  value={formData.length} 
                  onChange={handleInputChange}
                  placeholder="6-12"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Thickness</label>
                <input 
                  type="text" 
                  name="thickness"
                  value={formData.thickness} 
                  onChange={handleInputChange}
                  placeholder="1mm to 3mm"
                />
              </div>
              
              <div className="form-group">
                <label>Surface Finish</label>
                <input 
                  type="text" 
                  name="surfaceFinish"
                  value={formData.surfaceFinish} 
                  onChange={handleInputChange}
                  placeholder="Single"
                />
              </div>
              
              <div className="form-group">
                <label>Outside Dia.</label>
                <input 
                  type="text" 
                  name="outsideDiameter"
                  value={formData.outsideDiameter} 
                  onChange={handleInputChange}
                  placeholder="1/8&quot; to 2&quot;"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="submit-button" onClick={handleSubmit}>Update All</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BulkEditModal;