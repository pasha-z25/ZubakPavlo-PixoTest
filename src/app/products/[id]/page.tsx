import { API_ENDPOINTS } from '@/utils/constants';
import { client } from '@/utils/helpers';
import type { IPageProps, ProductType } from '@/utils/types';
import ProductDetails from '@/views/ProductDetails';

export default async function Product({ params }: IPageProps) {
  const { id } = await params;

  if (!id) return null;

  const product: ProductType = await client.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);

  return <ProductDetails product={product} />;
}
