import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateProductType } from "../../types/Product";

interface Product extends CreateProductType {
  id: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createProductStart(state, action: PayloadAction<CreateProductType>) {
      state.loading = true;
      state.error = null;
    },
    createProductSuccess(state, action: PayloadAction<Product>) {
      state.loading = false;
      state.products.push(action.payload);
    },
    createProductFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
