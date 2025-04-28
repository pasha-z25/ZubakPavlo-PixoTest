'use client';

import staticText from '@/i18n/en/static';
import { useAppDispatch, useAppSelector } from '@/store';
import { addItem, selectCartItems } from '@/store/slices/cartSlice';
import {
  getAllProducts,
  getCategories,
  getFilteredAndSortedProducts,
  getFilters,
  getPriceRangeLimits,
  getProducts,
  getProductsStatus,
  getSortBy,
  setPriceRangeFilter,
} from '@/store/slices/productsSlice';
import { PageView, type ProductType } from '@/utils/types';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { Error, Loader } from '@/components/UIElements';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Filters from './components/Filters';
import GridItemView from './components/GridItemView';
import ListItemView from './components/ListItemView';
import PageHead from './components/PageHead';

export default function Page() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(getProductsStatus);
  const products = useAppSelector(getAllProducts);
  const displayedProducts = useAppSelector(getFilteredAndSortedProducts);
  const filters = useAppSelector(getFilters);
  const sortBy = useAppSelector(getSortBy);
  const priceRangeLimits = useAppSelector(getPriceRangeLimits);
  const categories = useAppSelector(getCategories);
  const cartItems = useAppSelector(selectCartItems);

  const [view, setView] = useState<PageView>(PageView.GRID);

  useEffect(() => {
    if (!loading && !products?.length) {
      dispatch(getProducts());
    }
  }, [products?.length, dispatch, loading]);

  useEffect(() => {
    if (products?.length && filters.priceRange.max === Infinity) {
      dispatch(
        setPriceRangeFilter({
          min: priceRangeLimits.min,
          max: priceRangeLimits.max,
        })
      );
    }
  }, [products?.length, priceRangeLimits, filters.priceRange.max, dispatch]);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  const addToCart = (product: ProductType) => {
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  const renderProductsList = (products: ProductType[], view: PageView) => (
    <List
      data-testid="products-list-view"
      className={classNames('grid grid-cols-1 gap-4', {
        'md:grid-cols-2 lg:grid-cols-3': view === PageView.GRID,
      })}
    >
      {products.map((product) => {
        const isInCart = cartItems.some((item) => item.id === product.id);

        return (
          <ListItem key={product.id} className="!items-stretch !p-0">
            <Link href={`/products/${product.id}`} className="link flex-auto">
              <Card className="h-full w-full">
                <CardContent className="h-full">
                  {view === PageView.LIST ? (
                    <ListItemView product={product} isInCart={isInCart} addToCart={addToCart} />
                  ) : (
                    <GridItemView product={product} isInCart={isInCart} addToCart={addToCart} />
                  )}
                </CardContent>
              </Card>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <section data-testid="products-page-section" className="section products-page py-10">
      <div className="container mx-auto px-4">
        <PageHead sortBy={sortBy} view={view} setView={setView} />
        <Filters
          categories={categories}
          products={products}
          filters={filters}
          priceRangeLimits={priceRangeLimits}
        />
        <Divider className="!mt-4 !mb-8" />
        {(displayedProducts || []).length ? (
          renderProductsList(displayedProducts, view)
        ) : (
          <Typography data-testid="no-products-found">
            {staticText.error.noProductsFound}
          </Typography>
        )}
      </div>
    </section>
  );
}
