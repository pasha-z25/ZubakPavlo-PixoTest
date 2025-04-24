import { API_ENDPOINTS } from '@/utils/constants';
import type { ProductType } from '@/utils/types';
import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { BasicApiState } from '../types';

export interface ProductState extends BasicApiState {
  data: ProductType | null;
}

const initialState: ProductState = {
  data: null,
  error: null,
  loading: false,
};

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (
    payload: string | number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { extra: { client } }: { extra: any }
  ) => {
    return await client.get(`${API_ENDPOINTS.PRODUCTS}/${payload}`);
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addMatcher(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (action): action is any => isPending(action) && action.type.startsWith('product/'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (action): action is any => isRejected(action) && action.type.startsWith('product/'),
        (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        }
      );
  },
});

export default productSlice.reducer;

export const getSelectedProduct = (state: { product: ProductState }) => state.product.data;

export const getProductStatus = (state: { product: ProductState }) => ({
  loading: state.product.loading,
  error: state.product.error,
});
