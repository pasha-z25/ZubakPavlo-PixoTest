import { API_ENDPOINTS } from '@/utils/constants';
import type { ProductType } from '@/utils/types';
import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { BasicApiState } from '../types';

export interface ProductsState extends BasicApiState {
  data: ProductType[] | null;
}

const initialState: ProductsState = {
  data: null,
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

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
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

export const getAllProducts = (state: { products: ProductsState }) => state.products.data;

export const getProductsStatus = (state: { products: ProductsState }) => ({
  loading: state.products.loading,
  error: state.products.error,
});
