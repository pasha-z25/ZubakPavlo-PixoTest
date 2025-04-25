import staticText from '@/i18n/en/static';
import { API_URL } from './constants';
import { SortBy, type ApiClient, type ApiOptionsType, type ProductType } from './types';

export const getCurrencyValue = (
  number: number,
  currency: string = 'USD',
  locale: string = 'en'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(number);
};

export const client: ApiClient = async (path, options) => {
  const REQUEST_URL = `${API_URL}${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: ApiOptionsType = {
    method: options?.body ? 'POST' : 'GET',
    ...options,
    headers: {
      ...headers,
      ...(options?.headers || {}),
    },
  };

  try {
    const response = await fetch(REQUEST_URL, config);
    const result = await response.json();

    if (result.status === 'error') {
      throw new Error(
        result.error?.message ? result.error.message : staticText.error.somethingWrong
      );
    }
    if (!response.ok) throw new Error(staticText.error.somethingWrong);

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Promise.reject(error.message);
  }
};

client.get = function (endpoint: string, config = {}) {
  return client(endpoint, config);
};

client.post = function (endpoint: string, body: BodyInit, config = {}) {
  return client(endpoint, { ...config, body });
};

client.delete = function (endpoint: string, config = {}) {
  return client(endpoint, { ...config, method: 'DELETE' });
};

client.patch = function (endpoint: string, body: BodyInit, config = {}) {
  return client(endpoint, { ...config, body, method: 'PATCH' });
};

export const sortProductsByType = (products: ProductType[], sortBy: SortBy) => {
  if (!products?.length) return products;

  if (sortBy === SortBy.UNSORTED) return products;

  const productsCopy = [...products];

  switch (sortBy) {
    case SortBy.NAMEaz:
      return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
    case SortBy.NAMEza:
      return productsCopy.sort((a, b) => b.title.localeCompare(a.title));
    case SortBy.PRICE09:
      return productsCopy.sort((a, b) => a.price - b.price);
    case SortBy.PRICE90:
      return productsCopy.sort((a, b) => b.price - a.price);
    case SortBy.RATING09:
      return productsCopy.sort((a, b) => a.rating.rate - b.rating.rate);
    case SortBy.RATING90:
      return productsCopy.sort((a, b) => b.rating.rate - a.rating.rate);
    default:
      return products;
  }
};
