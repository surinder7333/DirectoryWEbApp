import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSelectItem,
  selectAllItems,
  clearSelectedItems,
  bulkUpdateProductCombinations,
  fetchProductCombinations,
} from "../redux/slices/productCombinationSlice";
import {
  setSearchText,
  setSelectedProduct,
  setSelectedMaterial,
  setSortConfig,
} from "../redux/slices/filterSlice";
import ProductRow from "./ProductRow";
import AddProductModal from "./AddProductModal";
import BulkEditModal from "./BulkEditModal";
import "../styles/ProductList.css";
import { toast } from "react-toastify";
import AddProductModalIndivisualDetails from "./AddProductModalIndivisualDetails";

const ProductList = () => {
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddModalDeatail, setShowAddModalDeatails] = useState(false);
  const [showBulkEditModal, setShowBulkEditModal] = useState(false);
  const [productCombinaionId, setProductCombinationId] = useState();

  // Get data from Redux store
  const products = useSelector((state) => state.products.items);
  const materials = useSelector((state) => state.materials.items);
  const productCombinations = useSelector(
    (state) => state.productCombinations.items
  );
  const productCombinationsStatus = useSelector(
    (state) => state.productCombinations.status
  );
  const selectedItems = useSelector(
    (state) => state.productCombinations.selectedItems
  );
  const filters = useSelector((state) => state.filters);

  // Local state for form inputs before applying filters
  const [localProduct, setLocalProduct] = useState(filters.selectedProduct);
  const [localMaterial, setLocalMaterial] = useState(filters.selectedMaterial);
  const [localSearchText, setLocalSearchText] = useState(filters.searchText);

  const totalProducts = productCombinations.length;

  // Initial data fetch
  useEffect(() => {
    if (productCombinationsStatus === "idle") {
      fetchFilteredProducts();
    }
  }, []);

  const fetchFilteredProducts = () => {
    dispatch(
      fetchProductCombinations({
        productId: filters.selectedProduct,
        materialId: filters.selectedMaterial,
        searchText: filters.searchText,
        sortField: filters.sortField,
        sortDirection: filters.sortDirection,
      })
    );
  };

  const handleSort = (key) => {
    const newDirection =
      filters.sortField === key && filters.sortDirection === "asc"
        ? "desc"
        : "asc";

    dispatch(
      setSortConfig({
        key,
        direction: newDirection,
      })
    );

    dispatch(
      fetchProductCombinations({
        productId: filters.selectedProduct,
        materialId: filters.selectedMaterial,
        searchText: filters.searchText,
        sortField: key,
        sortDirection: newDirection,
      })
    );
  };

  const getSortArrow = (key) => {
    if (filters.sortField === key) {
      return filters.sortDirection === "asc" ? "▲" : "▼";
    }
    return "⇅";
  };

  const applyFilters = () => {
    dispatch(setSelectedProduct(localProduct));
    dispatch(setSelectedMaterial(localMaterial));
    dispatch(setSearchText(localSearchText));

    dispatch(
      fetchProductCombinations({
        productId: localProduct,
        materialId: localMaterial,
        searchText: localSearchText,
        sortField: filters.sortField,
        sortDirection: filters.sortDirection,
      })
    );
  };

  const handleSearchChange = (e) => {
    setLocalSearchText(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchText(localSearchText));

    dispatch(
      fetchProductCombinations({
        productId: filters.selectedProduct,
        materialId: filters.selectedMaterial,
        searchText: localSearchText,
        sortField: filters.sortField,
        sortDirection: filters.sortDirection,
      })
    );
  };

  const handleBulkEdit = () => {
    if (selectedItems.length > 0) {
      setShowBulkEditModal(true);
    } else {
      toast.warning("Please select at least one product to edit");
    }
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <button className="add-button" onClick={() => setShowAddModal(true)}>
          <span>+</span> Add Products
        </button>
        <div className="product-count">
          {productCombinations.length}/{totalProducts} Products
        </div>
      </div>

      <div className="product-list-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Products..."
            value={localSearchText}
            onChange={handleSearchChange}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="filter-dropdowns">
          <div className="filter-group">
            <select
              value={localProduct}
              onChange={(e) => setLocalProduct(e.target.value)}
            >
              <option value="">Products</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={localMaterial}
              onChange={(e) => setLocalMaterial(e.target.value)}
            >
              <option value="">Materials</option>
              {materials.map((material) => (
                <option key={material._id} value={material._id}>
                  {material.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <button onClick={applyFilters} className="filter-button">
              Filter
            </button>
          </div>

          <div className="filter-group">
            <select
              onChange={(e) => {
                if (e.target.value === "bulk-edit") {
                  handleBulkEdit();
                }
              }}
              value=""
            >
              <option value="">Bulk Actions</option>
              <option value="bulk-edit">Bulk Edit</option>
            </select>
          </div>

          <div className="filter-group">
            <button onClick={handleBulkEdit} className="apply-button">
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="product-table">
        <div className="product-table-header">
          <div className="checkbox-cell">
            <input
              type="checkbox"
              checked={
                selectedItems.length === productCombinations.length &&
                productCombinations.length > 0
              }
              onChange={() => dispatch(selectAllItems())}
            />
          </div>
          <div className="product-cell" onClick={() => handleSort("title")}>
            Products {getSortArrow("title")}
          </div>
          <div className="action-cell">Action</div>
          <div className="details-cell">Product Details</div>
          <div className="price-cell" onClick={() => handleSort("price")}>
            Price in Unit {getSortArrow("price")}
          </div>
        </div>

        <div className="product-table-body">
          {productCombinationsStatus === "loading" ? (
            <div className="loading-indicator">Loading...</div>
          ) : productCombinationsStatus === "failed" ? (
            <div className="error-message">
              Error loading products. Please try again.
            </div>
          ) : productCombinations.length === 0 ? (
            <div className="no-results">
              No products found matching your criteria.
            </div>
          ) : (
            productCombinations.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                setProductCombinationId={setProductCombinationId}
                setShowAddModalDeatails={setShowAddModalDeatails}
                isSelected={selectedItems.includes(product._id)}
                onSelect={() => dispatch(toggleSelectItem(product._id))}
              />
            ))
          )}
        </div>
      </div>

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            fetchFilteredProducts();
            toast.success("Product added successfully!");
          }}
        />
      )}

      {showAddModalDeatail && (
        <AddProductModalIndivisualDetails
          onClose={() => setShowAddModalDeatails(false)}
          productCombinaionId={productCombinaionId}
          onSuccess={() => {
            fetchFilteredProducts();
            toast.success("Product added successfully!");
          }}
        />
      )}

      {showBulkEditModal && (
        <BulkEditModal
          onClose={() => setShowBulkEditModal(false)}
          onSave={async (updates) => {
            try {
              await dispatch(
                bulkUpdateProductCombinations({ ids: selectedItems, updates })
              ).unwrap();

              fetchFilteredProducts();

              toast.success("Bulk update successful!");
            } catch (error) {
              console.error(error);
              toast.error("Bulk update failed. Please try again.");
            }
            setShowBulkEditModal(false);
            dispatch(clearSelectedItems());
          }}
          selectedCount={selectedItems.length}
        />
      )}
    </div>
  );
};

export default ProductList;
