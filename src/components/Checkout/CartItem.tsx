import staticText from '@/i18n/en/static';
import { useAppDispatch } from '@/store';
import { type CartItem, removeItem, updateQuantity } from '@/store/slices/cartSlice';
import { MOBILE_BREAKPOINT } from '@/utils/constants';
import { getCurrencyValue } from '@/utils/helpers';
import { useWindowSize } from '@/utils/hooks';

import { FaMinus, FaPlus } from 'react-icons/fa6';
import { MdOutlineDeleteForever } from 'react-icons/md';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

interface ICartProps {
  item: CartItem;
}

export default function CartItem({ item }: ICartProps) {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  const isPhoneScreen = width < MOBILE_BREAKPOINT;

  const renderQuantityField = (item: CartItem) => {
    return (
      <div className="flex items-center gap-2">
        <Box
          component="span"
          role="button"
          className="cursor-pointer"
          onClick={() => {
            dispatch(
              updateQuantity({ id: item.id, quantity: item.quantity > 0 ? item.quantity - 1 : 0 })
            );
          }}
        >
          <FaMinus size={30} color="grey" />
        </Box>
        <label>
          <input
            type="text"
            className="inline-block max-w-8 text-center"
            value={item.quantity}
            onChange={(e) => {
              dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) || 0 }));
            }}
          />
        </label>
        <Box
          component="span"
          role="button"
          className="cursor-pointer"
          onClick={() => {
            dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
          }}
        >
          <FaPlus size={30} fill="grey" />
        </Box>
      </div>
    );
  };

  return (
    <div className="cart-item grid flex-auto grid-cols-[auto_1fr] items-center justify-between gap-4 rounded-md border border-gray-300 p-2 md:flex">
      <Image
        src={item.image}
        alt={item.title}
        width={30}
        height={30}
        style={{ width: 'auto', height: 'auto' }}
      />
      <div className="flex-auto">
        <Typography className="leading-none">{item.title}</Typography>
      </div>
      <Box
        component="span"
        className="cursor-pointer md:order-1"
        role="button"
        onClick={() => dispatch(removeItem(item.id))}
      >
        <MdOutlineDeleteForever size={isPhoneScreen ? 25 : 30} color="gray" />
      </Box>
      <div className="justify-self-end">
        <Typography>
          {staticText.short.price}: {getCurrencyValue(item.price)}
        </Typography>
        {renderQuantityField(item)}
        <Typography>
          {staticText.short.total}: {getCurrencyValue(item.price * item.quantity)}
        </Typography>
      </div>
    </div>
  );
}
