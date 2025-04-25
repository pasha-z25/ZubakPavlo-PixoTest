import { API_ENDPOINTS } from '@/utils/constants';
import { type ProductType, SortBy } from '@/utils/types';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface FilterOptions {
  categories: string[];
  priceRange: { min: number; max: number };
}

export interface ProductsState {
  allProducts: ProductType[] | null;
  selectedProduct: ProductType | null;
  filters: FilterOptions;
  sortBy: SortBy;
  categories: string[];
  error: string | undefined | null;
  loading: boolean;
}

const initialState: ProductsState = {
  allProducts: null,
  selectedProduct: null,
  filters: {
    categories: [],
    priceRange: { min: 0, max: Infinity },
  },
  sortBy: SortBy.UNSORTED,
  categories: [],
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
  reducers: {
    setCategoriesFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.categories = action.payload;
    },
    setPriceRangeFilter: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filters.priceRange = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.sortBy = initialState.sortBy;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
        state.allProducts = action.payload;
        state.categories = Array.from(
          new Set(action.payload.map((product: ProductType) => product.category))
        );
        state.error = null;
        state.loading = false;
      })
      .addCase(getProduct.fulfilled, (state, action: PayloadAction<ProductType>) => {
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

export const { setCategoriesFilter, setPriceRangeFilter, setSortBy, resetFilters } =
  productsSlice.actions;

export default productsSlice.reducer;

const selectProducts = (state: { products: ProductsState }) => state.products;

export const getAllProducts = createSelector(
  [selectProducts],
  (products: ProductsState) => products.allProducts
);

export const getCategories = createSelector(
  [selectProducts],
  (products: ProductsState) => products.categories
);

export const getSelectedProduct = createSelector(
  [selectProducts],
  (products: ProductsState) => products.selectedProduct
);

export const getProductsStatus = createSelector([selectProducts], (products: ProductsState) => ({
  loading: products.loading,
  error: products.error,
}));

export const getFilters = createSelector(
  [selectProducts],
  (products: ProductsState) => products.filters
);

export const getSortBy = createSelector(
  [selectProducts],
  (products: ProductsState) => products.sortBy
);

export const getPriceRangeLimits = createSelector([getAllProducts], (products) => {
  const defaultRange = { min: 0, max: 5000 };

  if (!products?.length) return defaultRange;

  const prices = products
    .map((product) => product.price)
    .filter((price) => typeof price === 'number' && !isNaN(price));

  if (!prices.length) return defaultRange;

  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
});

export const getFilteredAndSortedProducts = createSelector(
  [getAllProducts, getFilters, getSortBy],
  (products, filters, sortBy) => {
    if (!products?.length) return [];

    let filteredProducts = [...products];
    if (filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.categories.includes(product.category)
      );
    }
    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
      );
    }

    if (sortBy === SortBy.UNSORTED) return filteredProducts;

    const productsCopy = [...filteredProducts];
    switch (sortBy) {
      case SortBy.NAMEaz:
        return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
      case SortBy.NAMEza:
        return productsCopy.sort((a, b) => b.title.localeCompare(a.title));
      case SortBy.PRICE09:
        return productsCopy.sort((a, b) => a.price - b.price);
      case SortBy.PRICE90:
        return productsCopy.sort((a, b) => b.price - a.price);
      case SortBy.RATING09:
        return productsCopy.sort((a, b) => a.rating.rate - b.rating.rate);
      case SortBy.RATING90:
        return productsCopy.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return filteredProducts;
    }
  }
);
