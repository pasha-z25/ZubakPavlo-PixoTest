import type { IPageProps } from '@/utils/types';
import ProductDetails from '@/views/ProductDetails';

export default async function Product({ params }: IPageProps) {
  const { id } = await params;

  if (!id) return null;

  return <ProductDetails id={Number(id)} />;
}
