import { useState, useEffect } from "react";
import { Product } from "../types/Product";

/**
 * Custom hook to manage products in LocalStorage.
 * This hook handles fetching and creating products, and manages loading and error states.
 */
const useLocalStorage = () => {
  // State to store the list of products
  const [products, setProducts] = useState<Product[]>([]);
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(false);
  // State to manage error messages
  const [error, setError] = useState<string | null>(null);

  // Fetch products from LocalStorage when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Fetch products from LocalStorage.
   * Sets loading state to true while fetching.
   * If successful, updates the products state with the fetched data.
   * If an error occurs, sets the error state with an error message.
   */
  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    try {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    } catch (err) {
      setError("Failed to fetch products");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new product and save it to LocalStorage.
   * Sets loading state to true while saving.
   * If successful, updates the products state with the new product.
   * If an error occurs, sets the error state with an error message.
   *
   * @param product - The product to be created
   */
  const createProduct = (product: Product) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProducts = [...products, product];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    } catch (err) {
      setError("Failed to create product");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Return the current state and the functions to fetch and create products
  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
  };
};

export default useLocalStorage;
