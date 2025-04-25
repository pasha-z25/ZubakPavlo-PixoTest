import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  checkout: boolean;
}

const initialState: CartState = {
  items: [],
  checkout: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },

    enableCheckout: (state) => {
      state.checkout = true;
    },

    disableCheckout: (state) => {
      state.checkout = false;
    },
  },
});

export const {
  addItem,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  enableCheckout,
  disableCheckout,
} = cartSlice.actions;

export default cartSlice.reducer;

const selectCart = (state: { cart: CartState }) => state.cart;

export const getCheckoutStatus = createSelector([selectCart], (cart: CartState) => cart.checkout);

export const selectCartItems = createSelector([selectCart], (cart: CartState) => cart.items);

export const selectCartTotal = createSelector([selectCart], (cart: CartState) =>
  cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartItemsCount = createSelector(
  [selectCart],
  (cart: CartState) => cart.items.length || 0
);

export const selectCartItemById = (id: number) =>
  createSelector([selectCart], (cart) => cart.items.find((item) => item.id === id));

export const selectCartItemQuantity = (id: number) =>
  createSelector([selectCart], (cart) => {
    const item = cart.items.find((item) => item.id === id);
    return item ? item.quantity : 0;
  });
