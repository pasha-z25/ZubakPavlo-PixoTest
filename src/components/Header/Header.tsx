'use client';

import { useAppSelector } from '@/store';
import { getCheckoutStatus } from '@/store/slices/cartSlice';
import { APP_PAGES } from '@/utils/constants';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

import Cart from '@/components/Cart';
import Checkout from '@/components/Checkout';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  const checkout = useAppSelector(getCheckoutStatus);

  return (
    <header id="header" className="header border-b border-b-gray-300 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
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
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Cart />
          </div>
        </div>
      </div>
      {checkout && <Checkout />}
    </header>
  );
}
