export type AnyObj = {
  [key: string]: any;
};

export interface ApiOptionsType extends RequestInit {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
}

export interface ApiClient {
  (path: string, options?: ApiOptionsType): Promise<any>;
  get: (endpoint: string, config?: ApiOptionsType) => Promise<any>;
  post: (endpoint: string, body: BodyInit, config?: ApiOptionsType) => Promise<any>;
  delete: (endpoint: string, config?: ApiOptionsType) => Promise<any>;
  patch: (endpoint: string, body: BodyInit, config?: ApiOptionsType) => Promise<any>;
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
