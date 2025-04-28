import staticText from '@/i18n/en/static';
import { getCurrencyValue } from '@/utils/helpers';
import type { ProductType } from '@/utils/types';

import { TbShoppingCartCopy, TbShoppingCartPlus } from 'react-icons/tb';

import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

interface IGridtemProps {
  product: ProductType;
  isInCart: boolean;
  addToCart: (product: ProductType) => void;
}

export default function GridItemView({ product, isInCart, addToCart }: IGridtemProps) {
  return (
    <div className="grid h-full grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] gap-4">
      <div className="relative col-span-3 aspect-square">
        <Image
          className="object-contain object-center"
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <Typography variant="h6" component="h3" className="col-span-3 !my-2 !leading-none">
        {product.title}
      </Typography>
      <Typography className="min-w-10 self-center">
        {staticText.short.price}: {getCurrencyValue(product.price)}
      </Typography>
      <Typography className="min-w-10 self-center">
        <Rating
          name="half-rating-read"
          defaultValue={product.rating.rate}
          precision={0.5}
          readOnly
        />
      </Typography>
      <div className="p-2">
        {isInCart ? (
          <TbShoppingCartCopy size={25} className="disabled" />
        ) : (
          <TbShoppingCartPlus
            size={25}
            className="relative z-[5] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
          />
        )}
      </div>
    </div>
  );
}
