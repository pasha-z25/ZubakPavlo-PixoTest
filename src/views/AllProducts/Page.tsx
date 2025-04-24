'use client';

import { Error, Loader } from '@/components/UIElements';
import { useAppDispatch, useAppSelector } from '@/store';
import { getAllProducts, getProducts, getProductsStatus } from '@/store/slices/productsSlice';
import { ProductType } from '@/utils/types';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Page() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(getProductsStatus);
  const products = useAppSelector(getAllProducts);

  useEffect(() => {
    if (!loading && !products?.length) {
      dispatch(getProducts());
    }
  }, [products?.length, dispatch, loading]);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  const renderProductsList = (products: ProductType[]) => (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`} className="link">
            {product.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="section products-page py-10">
      <div className="container mx-auto px-4">
        <h1 className="title">All Products</h1>
        <hr className="my-4" />
        {!!products && !!products.length ? renderProductsList(products) : <p>No products found</p>}
      </div>
    </section>
  );
}
