import { RootState } from '@/store';
import { CartState } from '@/store/slices/cartSlice';
import { ProductsState } from '@/store/slices/productsSlice';
import { type ProductType, SortBy } from '@/utils/types';

export const mockProducts: ProductType[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 109.95,
    category: 'electronics',
    image: 'product1.jpg',
    rating: { rate: 4.5, count: 10 },
    description: 'lorem ipsum',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 22.3,
    category: 'clothing',
    image: 'product2.jpg',
    rating: { rate: 3.8, count: 5 },
    description: 'lorem ipsum',
  },
];

export const productsStoreMock: ProductsState = {
  allProducts: null,
  selectedProduct: null,
  error: null,
  loading: true,
  filters: { categories: [], priceRange: { min: 0, max: 5000 } },
  sortBy: SortBy.UNSORTED,
  categories: [],
};

export const cartStoreMock: CartState = {
  items: [],
  checkout: false,
};

export const rootStoreMock: RootState = {
  products: productsStoreMock,
  cart: cartStoreMock,
};
