import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProductCombination } from "../redux/slices/productCombinationSlice";
import "../styles/ProductRow.css";
import { toast } from "react-toastify";

const ProductRow = ({ product, isSelected, onSelect, setShowAddModalDeatails, setProductCombinationId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    price: product.price || 350,
    currency: product.currency || "KG",
    shape: product.shape || "",
    length: product.length || "",
    thickness: product.thickness || "",
    surfaceFinish: product.surfaceFinish || "",
    outsideDiameter: product.outsideDiameter || "",
  });


    useEffect(() => {
      setFormData({
        price: product.price || 350,
        currency: product.currency || "KG",
        shape: product.shape || "",
        length: product.length || "",
        thickness: product.thickness || "",
        surfaceFinish: product.surfaceFinish || "",
        outsideDiameter: product.outsideDiameter || "",
      });
    }, [product]); 

  const handleQuickEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const result = await dispatch(
        updateProductCombination({
          id: product._id,
          data: formData,
        })
      ).unwrap();

      if (result) {
        toast.success("Product combination updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product combination");
    }
  };

  const handleCancel = () => {
    setFormData({
      price: product.price || 350,
      currency: product.currency || "KG",
      shape: product.shape || "",
      length: product.length || "",
      thickness: product.thickness || "",
      surfaceFinish: product.surfaceFinish || "",
      outsideDiameter: product.outsideDiameter || "",
    });
    setIsEditing(false);
  };

  const formatProductDetails = () => {
    if (!product.hasDetails) return "";

    const details = [];
    if (product.material && product.material.name)
      details.push(`Material: ${product.material.name}`);
    if (product.length) details.push(`Unit Length: ${product.length} meter`);
    if (product.shape) details.push(`Shape: ${product.shape}`);

    return details.join("\n");
  };



  const handleAddDetailsOfProduct = (productCombId) => {
    setProductCombinationId(productCombId)
    setShowAddModalDeatails(true);
  };

  return (
    <div className={`product-row ${isEditing ? "editing" : ""}`}>
      <div className="product-row-main">
        <div className="checkbox-cell">
          <input type="checkbox" checked={isSelected} onChange={onSelect} />
        </div>
        <div className="product-cell">{product.title}</div>
        <div className="action-cell">
          <button className="quick-edit-button" onClick={handleQuickEdit}>
            Quick Edit
          </button>
          <span> | </span>
          <button className="add-details-button" onClick={()=>handleAddDetailsOfProduct(product?._id)}>Add Product Details</button>
        </div>
        <div className="details-cell">
          {product.hasDetails ? (
            <div className="product-details">
              <div>Material: {product.material?.name}</div>
              <div>Unit Length: {product.length} meter</div>
              <div>Shape: {product.shape}</div>
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className="price-cell">
          {product.price} / {product.currency}
        </div>
      </div>

      {isEditing && (
        <div className="quick-edit-form">
          <div className="form-header">
            <div className="form-title">Quick Edit</div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input type="text" value={product.title} disabled />
            </div>

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
            <div className="section-title">
              Product Details <span>(Minimum 4 fields required)</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Material</label>
                <input
                  type="text"
                  value={product.material.name || ""}
                  disabled
                />
              </div>

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
                  placeholder='1/8" to 2"'
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="update-button" onClick={handleUpdate}>
              Update
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRow;
