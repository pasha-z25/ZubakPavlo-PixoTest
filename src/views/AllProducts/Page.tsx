import { ProductType } from '@/utils/types';
import Link from 'next/link';

interface IPageProps {
  products: ProductType[];
}

export default function Page({ products }: IPageProps) {
  return (
    <section className="section products-page py-10">
      <div className="container mx-auto px-4">
        <h1 className="title">All Products</h1>
        <hr className="my-4" />
        {!!products.length && (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <Link href={`/products/${product.id}`} className="link">
                  {product.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
