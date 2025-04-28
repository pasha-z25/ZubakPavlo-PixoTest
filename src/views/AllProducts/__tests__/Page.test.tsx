import {
  resetFilters,
  setCategoriesFilter,
  setPriceRangeFilter,
  setSortBy,
} from '@/store/slices/productsSlice';
import { PageView, SortBy } from '@/utils/types';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Page from '../Page';
import { rootStoreMock } from './mock';

// Мок для Next.js Link
jest.mock('next/link', () => ({ href, children }: any) => <a href={href}>{children}</a>);

// Мок для Redux-стору
// const mockStore = configureStore([thunk]);

// Створюємо мокований стор із middleware
// const mockStore = configureStore<RootState, UnknownAction>([thunk]);

// const mockStore = configureStore<RootState, UnknownAction>([
//   thunk as ThunkMiddleware<RootState, UnknownAction>,
// ]);

// const mockStore = configureStore<RootState, AnyAction>([
//   thunk as ThunkMiddleware<RootState, AnyAction>,
// ]);

// Мок для вкладених компонентів (якщо потрібно)
// Ми припускаємо, що ці компоненти мають відповідні data-testid
jest.mock('../components/Filters', () => (props: any) => (
  <div data-testid="products-filters">
    Filters Component
    {/* Припускаємо, що у Filters є чекбокси, слайдер і кнопка скидання */}
    {props.categories.map((category: string) => (
      <input
        key={category}
        type="checkbox"
        data-testid={`category-checkbox-${category}`}
        onChange={(e) => {
          const updatedCategories = e.target.checked
            ? [...props.filters.categories, category]
            : props.filters.categories.filter((cat: string) => cat !== category);
          props.dispatch(setCategoriesFilter(updatedCategories));
        }}
      />
    ))}
    <input
      type="range"
      data-testid="price-range-slider"
      onChange={(e) => {
        props.dispatch(setPriceRangeFilter({ min: 50, max: 500 }));
      }}
    />
    <button data-testid="reset-filters-button" onClick={() => props.dispatch(resetFilters())} />
  </div>
));

jest.mock('../components/PageHead', () => ({ sortBy, view, setView, dispatch }: any) => (
  <div data-testid="products-page-head">
    PageHead Component
    <select
      data-testid="products-sorting"
      value={sortBy}
      onChange={(e) => dispatch(setSortBy(e.target.value as SortBy))}
    >
      <option value={SortBy.UNSORTED}>UNSORTED</option>
      <option value={SortBy.PRICE09}>price (0-9)</option>
    </select>
    <button data-testid="grid-view-button" onClick={() => setView(PageView.GRID)} />
    <button data-testid="list-view-button" onClick={() => setView(PageView.LIST)} />
  </div>
));

jest.mock('../components/ListItemView', () => ({ product, isInCart, addToCart }: any) => (
  <div data-testid={`list-item-${product.id}`}>
    {product.title}
    <button data-testid={`add-to-cart-button-${product.id}`} onClick={() => addToCart(product)} />
  </div>
));

jest.mock('../components/GridItemView', () => ({ product, isInCart, addToCart }: any) => (
  <div data-testid={`grid-item-${product.id}`}>
    {product.title}
    <button data-testid={`add-to-cart-button-${product.id}`} onClick={() => addToCart(product)} />
  </div>
));

describe('Page Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(rootStoreMock);
    store.dispatch = jest.fn();
  });

  it('renders loading state', () => {
    store = mockStore(rootStoreMock);

    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    store = mockStore(rootStoreMock);

    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );

    expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
  });

  it('renders products when loaded', () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );

    expect(screen.getByTestId('products-page-section')).toBeInTheDocument();
    expect(screen.getByTestId('products-page-head')).toBeInTheDocument();
    expect(screen.getByTestId('products-filters')).toBeInTheDocument();
    expect(screen.getByTestId('products-list-view')).toBeInTheDocument();
    expect(screen.getByTestId('grid-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('grid-item-2')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('shows no products message when there are no displayed products', () => {
    store = mockStore(rootStoreMock);

    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );

    expect(screen.getByTestId('no-products-found')).toBeInTheDocument();
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });
});
