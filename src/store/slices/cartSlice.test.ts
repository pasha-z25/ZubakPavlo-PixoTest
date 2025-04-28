import type { CartItem, CartState } from './cartSlice';
import cartSliceReducer, {
  addItem,
  clearCart,
  decrementQuantity,
  disableCheckout,
  enableCheckout,
  getCheckoutStatus,
  incrementQuantity,
  removeItem,
  selectCartItemById,
  selectCartItemQuantity,
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
  updateQuantity,
} from './cartSlice';

// Початковий стан для тестів
const initialState: CartState = {
  items: [],
  checkout: false,
};

// Приклад елемента кошика
const sampleItem: CartItem = {
  id: 1,
  title: 'Product 1',
  price: 10,
  image: 'product1.jpg',
  quantity: 1,
};

const sampleItem2: CartItem = {
  id: 2,
  title: 'Product 2',
  price: 20,
  image: 'product2.jpg',
  quantity: 2,
};

describe('cartSlice', () => {
  describe('reducers', () => {
    it('addItem adds a new item to the cart', () => {
      const state = cartSliceReducer(initialState, addItem(sampleItem));
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(sampleItem);
    });

    it('addItem increases quantity of existing item', () => {
      const initialWithItem = {
        ...initialState,
        items: [{ ...sampleItem }],
      };
      const newItem = { ...sampleItem, quantity: 2 };
      const state = cartSliceReducer(initialWithItem, addItem(newItem));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(3); // 1 + 2
    });

    it('updateQuantity updates the quantity of an item', () => {
      const initialWithItem = {
        ...initialState,
        items: [{ ...sampleItem }],
      };
      const state = cartSliceReducer(initialWithItem, updateQuantity({ id: 1, quantity: 5 }));
      expect(state.items[0].quantity).toBe(5);
    });

    it('updateQuantity does not update if quantity is 0 or negative', () => {
      const initialWithItem = {
        ...initialState,
        items: [{ ...sampleItem }],
      };
      const state = cartSliceReducer(initialWithItem, updateQuantity({ id: 1, quantity: 0 }));
      expect(state.items[0].quantity).toBe(1); // Залишається без змін
    });

    it('incrementQuantity increases the quantity by 1', () => {
      const initialWithItem = {
        ...initialState,
        items: [{ ...sampleItem }],
      };
      const state = cartSliceReducer(initialWithItem, incrementQuantity(1));
      expect(state.items[0].quantity).toBe(2);
    });

    it('decrementQuantity decreases the quantity by 1 if greater than 1', () => {
      const initialWithItem = {
        ...initialState,
        items: [{ ...sampleItem, quantity: 2 }],
      };
      const state = cartSliceReducer(initialWithItem, decrementQuantity(1));
      expect(state.items[0].quantity).toBe(1);
    });

    it('decrementQuantity does not decrease below 1', () => {
      const initialWithItem = {
        ...initialState,
        items: [{ ...sampleItem, quantity: 1 }],
      };
      const state = cartSliceReducer(initialWithItem, decrementQuantity(1));
      expect(state.items[0].quantity).toBe(1); // Залишається 1
    });

    it('removeItem removes an item from the cart', () => {
      const initialWithItem = {
        ...initialState,
        items: [{ ...sampleItem }],
      };
      const state = cartSliceReducer(initialWithItem, removeItem(1));
      expect(state.items).toHaveLength(0);
    });

    it('clearCart removes all items from the cart', () => {
      const initialWithItems = {
        ...initialState,
        items: [sampleItem, sampleItem2],
      };
      const state = cartSliceReducer(initialWithItems, clearCart());
      expect(state.items).toHaveLength(0);
    });

    it('enableCheckout sets checkout to true', () => {
      const state = cartSliceReducer(initialState, enableCheckout());
      expect(state.checkout).toBe(true);
    });

    it('disableCheckout sets checkout to false', () => {
      const initialWithCheckout = {
        ...initialState,
        checkout: true,
      };
      const state = cartSliceReducer(initialWithCheckout, disableCheckout());
      expect(state.checkout).toBe(false);
    });
  });

  describe('selectors', () => {
    const state = {
      cart: {
        items: [sampleItem, sampleItem2],
        checkout: true,
      },
    };

    it('getCheckoutStatus returns the checkout status', () => {
      expect(getCheckoutStatus(state)).toBe(true);
    });

    it('selectCartItems returns the cart items', () => {
      expect(selectCartItems(state)).toEqual([sampleItem, sampleItem2]);
    });

    it('selectCartTotal calculates the total price', () => {
      // sampleItem: 10 * 1 = 10
      // sampleItem2: 20 * 2 = 40
      // Total: 10 + 40 = 50
      expect(selectCartTotal(state)).toBe(50);
    });

    it('selectCartItemsCount returns the number of items', () => {
      expect(selectCartItemsCount(state)).toBe(2);
    });

    it('selectCartItemById returns the item by id', () => {
      expect(selectCartItemById(1)(state)).toEqual(sampleItem);
      expect(selectCartItemById(3)(state)).toBeUndefined();
    });

    it('selectCartItemQuantity returns the quantity of an item', () => {
      expect(selectCartItemQuantity(1)(state)).toBe(1);
      expect(selectCartItemQuantity(2)(state)).toBe(2);
      expect(selectCartItemQuantity(3)(state)).toBe(0);
    });
  });
});
