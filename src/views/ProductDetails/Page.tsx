'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { getProduct, getProductStatus, getSelectedProduct } from '@/store/slices/productSlice';
import { getCurrencyValue } from '@/utils/helpers';
import type { ProductType } from '@/utils/types';
import { useEffect } from 'react';

import { BiSolidBadgeDollar } from 'react-icons/bi';
import { FcRating } from 'react-icons/fc';
import { TbShoppingCartCopy, TbShoppingCartPlus } from 'react-icons/tb';

import { Error, Loader } from '@/components/UIElements';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

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
    <div className="product-details grid gap-8 md:grid-cols-[1fr_2fr]">
      <div className="relative aspect-square">
        <Image
          className="object-contain object-center"
          src={product.image}
          alt={product.title}
          fill
        />
      </div>
      <div>
        <Typography variant="h4" component="h1" className="product-title">
          {product.title}
        </Typography>
        <div className="my-4 flex flex-wrap items-center justify-between gap-4 md:mb-8">
          <Typography className="category">Category: {product.category}</Typography>
          <div className="flex flex-wrap items-center gap-4">
            <TbShoppingCartPlus size={25} className="cursor-pointer" />
            <TbShoppingCartCopy size={25} className="disabled" />
          </div>
        </div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <Typography className="price flex items-center gap-2">
            <BiSolidBadgeDollar size={20} fill="green" />
            Price: {getCurrencyValue(product.price)}
          </Typography>
          <Typography className="rating flex items-center gap-2">
            <FcRating size={20} />
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Typography>
        </div>
        <p className="description">{product.description}</p>
      </div>
    </div>
  );

  return (
    <section className="section product-page py-10">
      <div className="container mx-auto px-4">
        <Typography variant="h6" component="h2" className="page-title">
          Product Details
        </Typography>
        <Divider className="!mt-4 !mb-8" />
        {product ? renderProductDetails(product) : <Typography>No product found</Typography>}
      </div>
    </section>
  );
}
