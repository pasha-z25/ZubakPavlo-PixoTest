import staticText from '@/i18n/en/static';
import type { Metadata } from 'next';

import HomePage from '@/views/HomePage';

export const metadata: Metadata = {
  title: staticText.seo.mainPageTitle,
  description: staticText.seo.mainPageDescription,
};

export default function Home() {
  return <HomePage />;
}
