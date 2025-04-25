import { useAppDispatch, useAppSelector } from '@/store';
import { enableCheckout, selectCartItemsCount } from '@/store/slices/cartSlice';

import { FiShoppingCart } from 'react-icons/fi';

import Box from '@mui/material/Box';

export default function Cart() {
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const dispatch = useAppDispatch();

  return (
    <div
      id="cart"
      className="relative cursor-pointer"
      role="button"
      onClick={() => dispatch(enableCheckout())}
    >
      <FiShoppingCart size={25} />
      {!!cartItemsCount && (
        <Box component="span" className="absolute -top-2 -right-3">
          {cartItemsCount}
        </Box>
      )}
    </div>
  );
}
