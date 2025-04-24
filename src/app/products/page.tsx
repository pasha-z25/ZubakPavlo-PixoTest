import { API_ENDPOINTS } from '@/utils/constants';
import { client } from '@/utils/helpers';
import type { ProductType } from '@/utils/types';
import AllProducts from '@/views/AllProducts';

export default async function Products() {
  const products: ProductType[] = await client.get(API_ENDPOINTS.PRODUCTS);

  return <AllProducts products={products} />;
}
