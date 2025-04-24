'use client';

import { APP_PAGES } from '@/utils/constants';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header id="header" className="header border-b border-b-gray-300 py-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-4">
          <Link
            href={APP_PAGES.HOME_PAGE}
            className={classNames({ disabled: APP_PAGES.HOME_PAGE === pathname })}
          >
            Home
          </Link>
          <Link
            href={APP_PAGES.PRODUCTS_PAGE}
            className={classNames({ disabled: APP_PAGES.PRODUCTS_PAGE === pathname })}
          >
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}
