import staticText from '@/i18n/en/static';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  clearCart,
  disableCheckout,
  selectCartItems,
  selectCartTotal,
} from '@/store/slices/cartSlice';
import { getCurrencyValue } from '@/utils/helpers';
import { useState } from 'react';

import PiiForm from '@/components/PiiForm';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CartItemView from './CartItem';

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

  return (
    <div className="checkout-window fixed inset-0 z-10 flex items-center justify-center bg-gray-700/50 p-4">
      <div className="checkout-content relative max-h-[min(90dvh,700px)] w-full max-w-[700px] overflow-y-auto rounded-2xl bg-white px-4 py-8 text-black/80">
        <Box
          component="span"
          className="absolute top-2 right-4 cursor-pointer text-2xl leading-none"
          onClick={() => dispatch(disableCheckout())}
        >
          &times;
        </Box>
        {successfulSending ? (
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
        ) : (
          <Typography variant="h5" component="h3" className="mt-2 mb-4">
            {staticText.short.yourOrders} ({cartItems.length}):
          </Typography>
        )}
        {!!cartItems.length ? (
          <>
            <List className="grid gap-2">
              {cartItems.map((item) => (
                <ListItem key={item.id} className="!p-0">
                  {/* {renderCartItem(item)} */}
                  <CartItemView item={item} />
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
          !successfulSending && (
            <div className="mt-4">
              <Typography>{staticText.long.cartIsEmpty}</Typography>
            </div>
          )
        )}
        {nextStep && <PiiForm formHandler={formHandler} />}
      </div>
    </div>
  );
}
