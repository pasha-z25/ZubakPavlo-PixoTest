import staticText from '@/i18n/en/static';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  type CartItem,
  clearCart,
  disableCheckout,
  removeItem,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '@/store/slices/cartSlice';
import { getCurrencyValue } from '@/utils/helpers';
import { useState } from 'react';

import { FaMinus, FaPlus } from 'react-icons/fa6';
import { MdOutlineDeleteForever } from 'react-icons/md';

import PiiForm from '@/components/PiiForm';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export default function Checkout() {
  const dispatch = useAppDispatch();
  const cartItemsTotal = useAppSelector(selectCartTotal);
  const cartItems = useAppSelector(selectCartItems);
  const [nextStep, showNextStep] = useState<boolean>(false);
  const [successfulSending, setSuccessfulSending] = useState<boolean>(false);

  const formHandler = () => {
    dispatch(clearCart());
    setSuccessfulSending(true);
    showNextStep(false);
  };

  const renderCartItem = (item: CartItem) => {
    const renderQuantityField = () => {
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
      <div className="flex flex-auto items-center justify-between gap-4 rounded-md border border-gray-300 p-2">
        <Box
          component="span"
          className="cursor-pointer"
          role="button"
          onClick={() => dispatch(removeItem(item.id))}
        >
          <MdOutlineDeleteForever size={30} color="gray" />
        </Box>
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
        <div>
          <Typography>
            {staticText.short.price}: {getCurrencyValue(item.price)}
          </Typography>
          {renderQuantityField()}
          <Typography>
            {staticText.short.total}: {getCurrencyValue(item.price * item.quantity)}
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <div className="checkout-window fixed inset-0 z-10 flex items-center justify-center bg-gray-700/50 p-4">
      <div className="checkout-content relative max-h-[max(80dvh,500px)] w-full max-w-[min(90%,700px)] overflow-y-auto rounded-2xl bg-white px-4 py-8 text-black/80">
        <Box
          component="span"
          className="absolute top-2 right-4 cursor-pointer text-2xl leading-none"
          onClick={() => dispatch(disableCheckout())}
        >
          &times;
        </Box>
        <Typography variant="h5" component="h3" className="mt-2 mb-4">
          {staticText.short.yourOrders} ({cartItems.length}):
        </Typography>
        {successfulSending && (
          <div className="mt-4">
            <Typography className="mb-2 text-center">
              {staticText.long.successfulSending}
            </Typography>
            <Button
              onClick={() => dispatch(disableCheckout())}
              type="button"
              className="!mx-auto !mr-auto !ml-auto !block text-center"
            >
              {staticText.short.closeWindow}
            </Button>
          </div>
        )}
        {!!cartItems.length ? (
          <>
            <List className="grid gap-2">
              {cartItems.map((item) => (
                <ListItem key={item.id} className="!p-0">
                  {renderCartItem(item)}
                </ListItem>
              ))}
            </List>
            <div className="mt-4">
              <Typography className="flex items-center justify-between gap-4">
                <Box component="span">{staticText.short.total}:</Box>
                <Box component="span">{getCurrencyValue(cartItemsTotal || 0)}</Box>
              </Typography>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Button onClick={() => dispatch(clearCart())} type="button" variant="outlined">
                {staticText.short.clearAll}
              </Button>
              <Button onClick={() => showNextStep(true)} type="button" variant="outlined">
                {staticText.short.fillPii}
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-4">
            <Typography>{staticText.long.cartIsEmpty}</Typography>
          </div>
        )}
        {nextStep && <PiiForm formHandler={formHandler} />}
      </div>
    </div>
  );
}
