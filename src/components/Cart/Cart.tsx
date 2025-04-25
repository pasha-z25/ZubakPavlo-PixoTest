import { useAppDispatch, useAppSelector } from '@/store';
import { enableCheckout, selectCartItemsCount } from '@/store/slices/cartSlice';
import { FiShoppingCart } from 'react-icons/fi';

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
      {!!cartItemsCount && <span className="absolute -top-2 -right-3">{cartItemsCount}</span>}
    </div>
  );
}
