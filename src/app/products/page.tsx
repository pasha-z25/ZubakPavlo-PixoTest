import { Loader } from '@/components/UIElements';
import staticText from '@/i18n/en/static';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const DynamicAllProductsView = dynamic(() => import('../../views/AllProducts'), {
  loading: () => <Loader />,
});

export const metadata: Metadata = {
  title: staticText.seo.allProductsPageTitle,
  description: staticText.seo.allProductsPageDescription,
};

export default async function Products() {
  return <DynamicAllProductsView />;
}
