import staticText from '@/i18n/en/static';
import type { Metadata } from 'next';

import AllProducts from '@/views/AllProducts';

export const metadata: Metadata = {
  title: staticText.seo.allProductsPageTitle,
  description: staticText.seo.allProductsPageDescription,
};

export default async function Products() {
  return <AllProducts />;
}
