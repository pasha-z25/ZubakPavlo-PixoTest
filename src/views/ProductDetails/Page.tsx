import type { ProductType } from '@/utils/types';
import Image from 'next/image';

interface IPageProps {
  product: ProductType;
}

export default function Page({ product }: IPageProps) {
  return (
    <section className="section product-page py-10">
      <div className="container mx-auto px-4">
        <h1 className="title">Product Details</h1>
        <hr className="my-4" />
        <p className="title">{product.title}</p>
        <Image src={product.image} width={100} height={100} alt={product.title} />
      </div>
    </section>
  );
}
