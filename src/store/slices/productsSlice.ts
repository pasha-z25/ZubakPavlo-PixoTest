import { API_ENDPOINTS } from '@/utils/constants';
import type { ProductType } from '@/utils/types';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

export interface ProductsState {
  allProducts: ProductType[] | null;
  selectedProduct: ProductType | null;
  error: string | undefined | null;
  loading: boolean;
}

const initialState: ProductsState = {
  allProducts: null,
  selectedProduct: null,
  error: null,
  loading: false,
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (_, { extra: { client } }: { extra: any }) => {
    return await client.get(API_ENDPOINTS.PRODUCTS);
  }
);

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (
    payload: string | number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { extra: { client } }: { extra: any }
  ) => {
    return await client.get(`${API_ENDPOINTS.PRODUCTS}/${payload}`);
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addMatcher(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (action): action is any => isPending(action) && action.type.startsWith('products/'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (action): action is any => isRejected(action) && action.type.startsWith('products/'),
        (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        }
      );
  },
});

export default productsSlice.reducer;

const selectProducts = (state: { products: ProductsState }) => state.products;

export const getAllProducts = createSelector(
  [selectProducts],
  (products: ProductsState) => products.allProducts
);

export const getSelectedProduct = createSelector(
  [selectProducts],
  (products: ProductsState) => products.selectedProduct
);

export const getProductsStatus = createSelector([selectProducts], (products: ProductsState) => ({
  loading: products.loading,
  error: products.error,
}));
