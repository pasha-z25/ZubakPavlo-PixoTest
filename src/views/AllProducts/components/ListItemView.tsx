import staticText from '@/i18n/en/static';
import { getCurrencyValue } from '@/utils/helpers';
import type { ProductType } from '@/utils/types';
import Rating from '@mui/material/Rating';

import { TbShoppingCartCopy, TbShoppingCartPlus } from 'react-icons/tb';

import Typography from '@mui/material/Typography';
import Image from 'next/image';

interface IListItemProps {
  product: ProductType;
  isInCart: boolean;
  addToCart: (product: ProductType) => void;
}

export default function ListItemView({ product, isInCart, addToCart }: IListItemProps) {
  return (
    <div className="flex items-center gap-4">
      <Image src={product.image} alt={product.title} width={50} height={50} />
      <div className="flex-auto">
        <Typography variant="h6" component="h3">
          {product.title}
        </Typography>
        <div className="flex gap-4">
          <Typography className="min-w-10">
            {staticText.short.price}: {getCurrencyValue(product.price)}
          </Typography>
          <Typography className="min-w-10">
            <Rating
              name="half-rating-read"
              defaultValue={product.rating.rate}
              precision={0.5}
              readOnly
            />
          </Typography>
        </div>
      </div>
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
