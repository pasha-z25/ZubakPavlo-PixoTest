import staticText from '@/i18n/en/static';
import { API_ENDPOINTS } from '@/utils/constants';
import { client } from '@/utils/helpers';
import type { IPageProps, ProductType } from '@/utils/types';
import type { Metadata } from 'next';

import ProductDetails from '@/views/ProductDetails';

export async function generateMetadata({ params }: IPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = (await client.get(`${API_ENDPOINTS.PRODUCTS}/${id}`)) as ProductType;

  if (!product) {
    return {
      title: staticText.seo.oneProductPageTitle,
      description: staticText.seo.oneProductPageDescription,
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function Product({ params }: IPageProps) {
  const { id } = await params;

  if (!id) return null;

  return <ProductDetails id={Number(id)} />;
}
