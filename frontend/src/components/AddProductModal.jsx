import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductCombination} from "../redux/slices/productCombinationSlice";
import "../styles/AddProductModal.css";
import { toast } from "react-toastify";

const AddProductModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const materials = useSelector((state) => state.materials.items);
  const grades = useSelector((state) => state.grades.items);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);

  // Filter grades based on selected material
  useEffect(() => {
    if (selectedMaterial) {
      const material = materials.find((m) => m._id === selectedMaterial);
      if (material) {
        const filtered = grades.filter((grade) => grade.name === material.name);
        setFilteredGrades(filtered);
      }
    } else {
      setFilteredGrades([]);
    }
  }, [selectedMaterial, materials, grades]);

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
  };

  const handleMaterialSelect = (materialId) => {
    setSelectedMaterial(materialId);
    setSelectedGrades([]);
  };

  const handleGradeToggle = (gradeId) => {
    if (selectedGrades.includes(gradeId)) {
      setSelectedGrades(selectedGrades.filter((id) => id !== gradeId));
    } else {
      setSelectedGrades([...selectedGrades, gradeId]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedProduct || !selectedMaterial || selectedGrades.length === 0) {
      toast.error("Please select product, material, and at least one grade");
      return;
    }

    console.log("selectedProduct:", selectedProduct);
    console.log("selectedMaterial:", selectedMaterial);
    console.log("selectedGrades:", selectedGrades);

    if (!products || !materials || !grades) {
      toast.error("Product, Material, or Grades data is missing.");
      return;
    }

    console.log("products:", products);
    console.log("materials:", materials);
    console.log("grades:", grades);

    const product = products.find((p) => p._id === selectedProduct);
    const material = materials.find((m) => m._id === selectedMaterial);
    const selectedGradesData = grades.filter((grade) =>
      selectedGrades.includes(grade._id)
    );

    console.log("product:", product);
    console.log("material:", material);
    console.log("selectedGradesData:", selectedGradesData);

    if (!product || !material || selectedGradesData.length === 0) {
      toast.error("Invalid product, material, or grades selection.");
      return;
    }

    const title = selectedGradesData.map(
      (grade) => `${material?.name} ${grade?.code} ${product?.name}`
    )[0];

    console.log("title:", title);

    if (!title) {
      toast.error("Error generating product title.");
      return;
    }

    const combinationData = {
      productId: selectedProduct,
      materialId: selectedMaterial,
      gradeIds: selectedGrades,
      title,
    };

    console.log("combinationData:", combinationData);

    try {
      const result = await dispatch(
        addProductCombination(combinationData)
      ).unwrap();
      console.log("API Result:", result);

      if (result) {
        toast.success("Product combination added successfully");
        onClose();
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to add product combination");
    }
  };

  const getProductCount = (productId) => {
    if (productId === selectedProduct) {
      return selectedGrades.length;
    }
    return 0;
  };

  const getMaterialCount = (materialId) => {
    if (materialId === selectedMaterial) {
      return selectedGrades.length;
    }
    return 0;
  };

  const getTotalSelectedCount = () => {
    return selectedGrades.length;
  };

  return (
    <div className="modal-overlay">
      <div className="add-product-modal">
        <div className="modal-header">
          <h2>Add Products</h2>
          <div className="selected-count">
            {getTotalSelectedCount()}/ Products Selected
          </div>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="selection-columns">
            <div className="selection-column">
              <h3>Products</h3>
              <div className="selection-list">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className={`selection-item ${
                      selectedProduct === product._id ? "selected" : ""
                    }`}
                    onClick={() => handleProductSelect(product._id)}
                  >
                    <span>{product.name}</span>
                    {getProductCount(product._id) > 0 && (
                      <span className="item-count">
                        ({getProductCount(product._id)})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="selection-column">
              <h3>Material</h3>
              <div className="selection-list">
                {materials.map((material) => (
                  <div
                    key={material._id}
                    className={`selection-item ${
                      selectedMaterial === material._id ? "selected" : ""
                    }`}
                    onClick={() => handleMaterialSelect(material._id)}
                  >
                    <span>{material.name}</span>
                    {getMaterialCount(material._id) > 0 && (
                      <span className="item-count">
                        ({getMaterialCount(material._id)})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="selection-column">
              <h3>Grades</h3>
              <div className="selection-list">
                {filteredGrades.map((grade) => {
                  const product = products.find(
                    (p) => p._id === selectedProduct
                  );
                  const material = materials.find(
                    (m) => m._id === selectedMaterial
                  );
                  const title =
                    product && material
                      ? `${material.name} ${grade.code} ${product.name}`
                      : "";

                  return (
                    <div key={grade._id} className="selection-item grade-item">
                      <div className="grade-title">{title}</div>
                      <input
                        type="checkbox"
                        checked={selectedGrades.includes(grade._id)}
                        onChange={() => handleGradeToggle(grade._id)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
