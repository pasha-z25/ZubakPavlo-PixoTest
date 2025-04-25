'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { addItem, selectCartItems } from '@/store/slices/cartSlice';
import { getAllProducts, getProducts, getProductsStatus } from '@/store/slices/productsSlice';
import { getCurrencyValue, sortProductsByType } from '@/utils/helpers';
import { PageView, type ProductType, SortBy } from '@/utils/types';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { CiGrid2H, CiGrid41 } from 'react-icons/ci';
import { TbShoppingCartCopy, TbShoppingCartPlus } from 'react-icons/tb';

import { Error, Loader } from '@/components/UIElements';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(getProductsStatus);
  const products = useAppSelector(getAllProducts);
  const cartItems = useAppSelector(selectCartItems);
  const [view, setView] = useState<PageView>(PageView.GRID);
  const [sorting, setSorting] = useState<SortBy>(SortBy.UNSORTED);
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>(products || []);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSorting(event.target.value as SortBy);
    setSortedProducts(sortProductsByType(products || [], event.target.value as SortBy));
  };

  useEffect(() => {
    if (!loading && !products?.length) {
      dispatch(getProducts());
    }
  }, [products?.length, sortedProducts.length, dispatch, loading]);

  useEffect(() => {
    if (sortedProducts.length === 0 && products?.length) {
      setSortedProducts(sortProductsByType(products, sorting));
    }
  }, [products?.length, sortedProducts.length]);

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

  const renderSorting = () => (
    <FormControl variant="standard" className="-translate-y-2">
      <InputLabel id="sorting-select-label">Sort by</InputLabel>
      <Select
        labelId="sorting-select-label"
        id="sorting-select"
        value={sorting}
        label="Sort by"
        onChange={handleSelectChange}
      >
        <MenuItem value={SortBy.UNSORTED}>{SortBy.UNSORTED}</MenuItem>
        <MenuItem value={SortBy.NAMEaz}>name (a-z)</MenuItem>
        <MenuItem value={SortBy.NAMEza}>name (z-a)</MenuItem>
        <MenuItem value={SortBy.PRICE09}>price (0-9)</MenuItem>
        <MenuItem value={SortBy.PRICE90}>price (9-0)</MenuItem>
        <MenuItem value={SortBy.RATING09}>rating (0-9)</MenuItem>
        <MenuItem value={SortBy.RATING90}>rating (9-0)</MenuItem>
      </Select>
    </FormControl>
  );

  const renderPageHead = () => (
    <div className="flex items-center justify-between gap-6">
      <Typography variant="h6" component="h2" className="crop-text page-title flex-auto">
        All Products
      </Typography>
      {renderSorting()}
      <div className="hidden items-center justify-between gap-2 md:flex">
        <CiGrid2H
          className="cursor-pointer transition-all"
          size={30}
          color={view === PageView.LIST ? 'blue' : 'gray'}
          onClick={() => setView(PageView.LIST)}
        />
        <CiGrid41
          className="cursor-pointer transition-all"
          size={30}
          color={view === PageView.GRID ? 'blue' : 'gray'}
          onClick={() => setView(PageView.GRID)}
        />
      </div>
    </div>
  );

  const renderListItem = (product: ProductType) => {
    const isInCart = cartItems.some((item) => item.id === product.id);

    return (
      <div className="flex items-center gap-4">
        <Image src={product.image} alt={product.title} width={50} height={50} />
        <div className="flex-auto">
          <Typography variant="h6" component="h3">
            {product.title}
          </Typography>
          <div className="flex gap-4">
            <Typography className="min-w-10">Price: {getCurrencyValue(product.price)}</Typography>
            <Typography className="min-w-10">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </Typography>
          </div>
        </div>
        <div className="p-2">
          {isInCart ? (
            <TbShoppingCartCopy size={25} className="disabled" />
          ) : (
            <TbShoppingCartPlus
              size={25}
              className="relative z-[5] cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
            />
          )}
        </div>
      </div>
    );
  };

  const renderGridItem = (product: ProductType) => {
    const isInCart = cartItems.some((item) => item.id === product.id);

    return (
      <div className="grid h-full grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] gap-4">
        <div className="relative col-span-3 aspect-square">
          <Image
            className="object-contain object-center"
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <Typography variant="h6" component="h3" className="col-span-3 !my-2 !leading-none">
          {product.title}
        </Typography>
        <Typography className="min-w-10">Price: {getCurrencyValue(product.price)}</Typography>
        <Typography className="min-w-10">
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </Typography>
        <div className="p-2">
          {isInCart ? (
            <TbShoppingCartCopy size={25} className="disabled" />
          ) : (
            <TbShoppingCartPlus
              size={25}
              className="relative z-[5] cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
            />
          )}
        </div>
      </div>
    );
  };

  const renderProductsList = (products: ProductType[], view: PageView) => (
    <List
      className={classNames('grid grid-cols-1 gap-4', {
        'md:grid-cols-2 lg:grid-cols-3': view === PageView.GRID,
      })}
    >
      {products.map((product) => (
        <ListItem key={product.id} className="!items-stretch !p-0">
          <Link href={`/products/${product.id}`} className="link flex-auto">
            <Card className="h-full w-full">
              <CardContent className="h-full">
                {view === PageView.LIST ? renderListItem(product) : renderGridItem(product)}
              </CardContent>
            </Card>
          </Link>
        </ListItem>
      ))}
    </List>
  );

  return (
    <section className="section products-page py-10">
      <div className="container mx-auto px-4">
        {renderPageHead()}
        <Divider className="!mt-4 !mb-8" />
        {(sortedProducts || products || []).length ? (
          renderProductsList(sortedProducts, view)
        ) : (
          <Typography>No products found</Typography>
        )}
      </div>
    </section>
  );
}
