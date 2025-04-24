export type AnyObj = {
  [key: string]: unknown;
};

export interface ApiOptionsType extends RequestInit {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
}

export interface ApiClient {
  (path: string, options?: ApiOptionsType): Promise<unknown>;
  get: (endpoint: string, config?: ApiOptionsType) => Promise<unknown>;
  post: (endpoint: string, body: BodyInit, config?: ApiOptionsType) => Promise<unknown>;
  delete: (endpoint: string, config?: ApiOptionsType) => Promise<unknown>;
  patch: (endpoint: string, body: BodyInit, config?: ApiOptionsType) => Promise<unknown>;
}

export interface IPageProps {
  params: Promise<{
    id?: string;
  }>;
  searchParams: Promise<AnyObj>;
}

export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};
