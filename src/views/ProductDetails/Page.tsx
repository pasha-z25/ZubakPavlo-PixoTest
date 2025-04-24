'use client';

import { Error, Loader } from '@/components/UIElements';
import { useAppDispatch, useAppSelector } from '@/store';
import { getProduct, getProductStatus, getSelectedProduct } from '@/store/slices/productSlice';
import { getCurrencyValue } from '@/utils/helpers';
import type { ProductType } from '@/utils/types';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Page({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  const product = useAppSelector(getSelectedProduct);
  const { loading, error } = useAppSelector(getProductStatus);

  useEffect(() => {
    if (!product || product?.id !== id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  const renderProductDetails = (product: ProductType) => (
    <div className="product-details">
      <h2 className="title">{product.title}</h2>
      <p className="description">{product.description}</p>
      <p className="price">{getCurrencyValue(product.price)}</p>
      <Image src={product.image} width={100} height={100} alt={product.title} />
    </div>
  );

  return (
    <section className="section product-page py-10">
      <div className="container mx-auto px-4">
        <h1 className="title">Product Details</h1>
        <hr className="my-4" />
        {product ? renderProductDetails(product) : <p>No product found</p>}
      </div>
    </section>
  );
}
