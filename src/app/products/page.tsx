import { API_ENDPOINTS } from '@/utils/constants';
import { client } from '@/utils/helpers';
import type { ProductType } from '@/utils/types';
import AllProducts from '@/views/AllProducts';

export default async function Products() {
  const products = (await client.get(API_ENDPOINTS.PRODUCTS)) as ProductType[];

  return <AllProducts products={products} />;
}
