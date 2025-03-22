import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/slices/productSlice";
import { fetchMaterials } from "./redux/slices/materialSlice";
import { fetchGrades } from "./redux/slices/gradesSlices";
import { fetchProductCombinations } from "./redux/slices/productCombinationSlice";
import ProductList from "./components/ProductList";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const productsStatus = useSelector((state) => state.products.status);
  const materialsStatus = useSelector((state) => state.materials.status);
  const gradesStatus = useSelector((state) => state.grades.status);
  const productCombinationsStatus = useSelector(
    (state) => state.productCombinations.status
  );

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
    if (materialsStatus === "idle") {
      dispatch(fetchMaterials());
    }
    if (gradesStatus === "idle") {
      dispatch(fetchGrades());
    }
    if (productCombinationsStatus === "idle") {
      dispatch(fetchProductCombinations());
    }
  }, [
    dispatch,
    productsStatus,
    materialsStatus,
    gradesStatus,
    productCombinationsStatus,
  ]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Directory Listing</h1>
      </header>
      <main className="app-main">
        <ProductList />
        <ToastContainer autoClose={3000}  />
      </main>
    </div>
  );
}

export default App;
