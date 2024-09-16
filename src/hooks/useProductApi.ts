import { useState, useEffect } from "react";
import { Product } from "../types/Product";
import http from "../utils/setting";

/**
 * Custom hook to manage products using an API.
 * This hook handles fetching and creating products, and manages loading and error states.
 */
const useProductApi = () => {
  // State to store the list of products
  const [products, setProducts] = useState<Product[]>([]);
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(false);
  // State to manage error messages
  const [error, setError] = useState<string | null>(null);

  // Fetch products from the API when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Fetch products from the API.
   * Sets loading state to true while fetching.
   * If successful, updates the products state with the fetched data.
   * If an error occurs, sets the error state with an error message.
   */
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await http.get("/product");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new product and save it to the API.
   * Sets loading state to true while saving.
   * If successful, updates the products state with the new product.
   * If an error occurs, sets the error state with an error message.
   *
   * @param product - The product to be created
   */
  const createProduct = async (product: Product) => {
    setLoading(true);
    setError(null);
    try {
      const response = await http.post(`/products`, product);
      setProducts([...products, response.data]);
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

export default useProductApi;
