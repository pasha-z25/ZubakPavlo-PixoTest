import { useAppDispatch, useAppSelector } from '@/store';
import {
  type CartItem,
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
import Image from 'next/image';

export default function Checkout() {
  const dispatch = useAppDispatch();
  const cartItemsTotal = useAppSelector(selectCartTotal);
  const cartItems = useAppSelector(selectCartItems);
  const [nextStep, showNextStep] = useState<boolean>(false);

  const renderCartItem = (item: CartItem) => {
    const renderQuantityField = () => {
      return (
        <div className="flex items-center gap-2">
          <span
            role="button"
            className="cursor-pointer"
            onClick={() => {
              dispatch(
                updateQuantity({ id: item.id, quantity: item.quantity > 0 ? item.quantity - 1 : 0 })
              );
            }}
          >
            <FaMinus size={30} color="grey" />
          </span>
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
          <span
            role="button"
            className="cursor-pointer"
            onClick={() => {
              dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
            }}
          >
            <FaPlus size={30} fill="grey" />
          </span>
        </div>
      );
    };

    return (
      <div className="flex items-center justify-between gap-4 rounded-md border border-gray-300 p-2">
        <span
          className="cursor-pointer"
          role="button"
          onClick={() => dispatch(removeItem(item.id))}
        >
          <MdOutlineDeleteForever size={30} color="gray" />
        </span>
        <Image
          src={item.image}
          alt={item.title}
          width={30}
          height={30}
          style={{ width: 'auto', height: 'auto' }}
        />
        <div className="flex-auto">
          <p className="leading-none">{item.title}</p>
        </div>
        <div>
          <p>Price: {getCurrencyValue(item.price)}</p>
          {renderQuantityField()}
          <p>Total: {getCurrencyValue(item.price * item.quantity)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="checkout-window fixed inset-0 z-10 flex items-center justify-center bg-gray-700/50 p-4">
      <div className="checkout-content relative max-h-[max(80dvh,500px)] w-full max-w-[min(90%,700px)] overflow-y-auto rounded-2xl bg-white px-4 py-8">
        <span
          className="absolute top-2 right-4 cursor-pointer text-2xl leading-none"
          onClick={() => dispatch(disableCheckout())}
        >
          &times;
        </span>
        <h1 className="mt-2 mb-4">Your orders ({cartItems.length}):</h1>
        {!!cartItems.length && (
          <>
            <ul className="grid gap-2">
              {cartItems.map((item) => (
                <li key={item.id}>{renderCartItem(item)}</li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="flex items-center justify-between gap-4">
                <span>Total:</span>
                <span>{getCurrencyValue(cartItemsTotal || 0)}</span>
              </p>
            </div>
            <div className="mt-4">
              <button onClick={() => showNextStep(true)}>Fill out PII</button>
            </div>
          </>
        )}
        {nextStep && <PiiForm />}
      </div>
    </div>
  );
}
