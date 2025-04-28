import { ProductType, SortBy } from '@/utils/types';
import { RootState } from '..';
import productsSliceReducer, {
  ProductsState,
  getAllProducts,
  getCategories,
  getFilteredAndSortedProducts,
  getFilters,
  getPriceRangeLimits,
  getProduct,
  getProducts,
  getProductsStatus,
  getSelectedProduct,
  getSortBy,
  resetFilters,
  setCategoriesFilter,
  setPriceRangeFilter,
  setSortBy,
} from './productsSlice';

// Початковий стан
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

// Приклади продуктів
const sampleProduct1: ProductType = {
  id: 1,
  title: 'Product 1',
  price: 10,
  category: 'electronics',
  image: 'product1.jpg',
  rating: { rate: 4.5, count: 10 },
  description: 'lorem ipsum',
};

const sampleProduct2: ProductType = {
  id: 2,
  title: 'Product 2',
  price: 20,
  category: 'clothing',
  image: 'product2.jpg',
  rating: { rate: 3.8, count: 5 },
  description: 'lorem ipsum',
};

// Мок для client.get
const mockClient = {
  get: jest.fn(),
};

describe('productsSlice', () => {
  describe('reducers', () => {
    it('setCategoriesFilter updates the categories filter', () => {
      const state = productsSliceReducer(initialState, setCategoriesFilter(['electronics']));
      expect(state.filters.categories).toEqual(['electronics']);
    });

    it('setPriceRangeFilter updates the price range filter', () => {
      const state = productsSliceReducer(initialState, setPriceRangeFilter({ min: 5, max: 50 }));
      expect(state.filters.priceRange).toEqual({ min: 5, max: 50 });
    });

    it('setSortBy updates the sortBy value', () => {
      const state = productsSliceReducer(initialState, setSortBy(SortBy.PRICE09));
      expect(state.sortBy).toBe(SortBy.PRICE09);
    });

    it('resetFilters resets filters and sortBy to initial values', () => {
      const stateWithFilters = {
        ...initialState,
        filters: {
          categories: ['electronics'],
          priceRange: { min: 5, max: 50 },
        },
        sortBy: SortBy.PRICE09,
      };
      const state = productsSliceReducer(stateWithFilters, resetFilters());
      expect(state.filters).toEqual(initialState.filters);
      expect(state.sortBy).toEqual(initialState.sortBy);
    });
  });

  describe('extraReducers', () => {
    it('getProducts.fulfilled sets products and categories', async () => {
      mockClient.get.mockResolvedValueOnce([sampleProduct1, sampleProduct2]);
      const action = await getProducts.fulfilled([sampleProduct1, sampleProduct2], '', undefined, {
        client: mockClient,
      });
      const state = productsSliceReducer(initialState, action);
      expect(state.allProducts).toEqual([sampleProduct1, sampleProduct2]);
      expect(state.categories).toEqual(['electronics', 'clothing']);
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });

    it('getProduct.fulfilled sets selected product', async () => {
      mockClient.get.mockResolvedValueOnce(sampleProduct1);
      const action = await getProduct.fulfilled(sampleProduct1, '', 1, { client: mockClient });
      const state = productsSliceReducer(initialState, action);
      expect(state.selectedProduct).toEqual(sampleProduct1);
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });

    it('handles pending state for products actions', () => {
      const action = { type: getProducts.pending.type };
      const state = productsSliceReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('handles rejected state for products actions', () => {
      const errorMessage = 'Failed to fetch';
      const action = {
        type: getProducts.rejected.type,
        error: { message: errorMessage },
      };
      const state = productsSliceReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('selectors', () => {
    const state: RootState = {
      products: {
        ...initialState,
        allProducts: [sampleProduct1, sampleProduct2],
        selectedProduct: sampleProduct1,
        categories: ['electronics', 'clothing'],
        filters: {
          categories: ['electronics'],
          priceRange: { min: 5, max: 15 },
        },
        sortBy: SortBy.PRICE09,
        loading: false,
        error: null,
      },
      cart: {
        items: [],
        checkout: false,
      },
    };

    it('getAllProducts returns all products', () => {
      expect(getAllProducts(state)).toEqual([sampleProduct1, sampleProduct2]);
    });

    it('getCategories returns categories', () => {
      expect(getCategories(state)).toEqual(['electronics', 'clothing']);
    });

    it('getSelectedProduct returns selected product', () => {
      expect(getSelectedProduct(state)).toEqual(sampleProduct1);
    });

    it('getProductsStatus returns loading and error status', () => {
      expect(getProductsStatus(state)).toEqual({ loading: false, error: null });
    });

    it('getFilters returns filters', () => {
      expect(getFilters(state)).toEqual({
        categories: ['electronics'],
        priceRange: { min: 5, max: 15 },
      });
    });

    it('getSortBy returns sortBy value', () => {
      expect(getSortBy(state)).toBe(SortBy.PRICE09);
    });

    it('getPriceRangeLimits returns price range limits', () => {
      expect(getPriceRangeLimits(state)).toEqual({ min: 10, max: 20 });
    });

    it('getFilteredAndSortedProducts filters and sorts products', () => {
      const filteredProducts = getFilteredAndSortedProducts(state);
      expect(filteredProducts).toHaveLength(1); // Тільки Product 1 (electronics, price 10)
      expect(filteredProducts[0]).toEqual(sampleProduct1);
    });
  });
});
