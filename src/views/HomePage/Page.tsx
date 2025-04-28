import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Page() {
  return (
    <section className="section home-page py-10">
      <div className="container mx-auto px-4">
        <Typography variant="h3" component="h1" className="title">
          Zubak Pavlo - Pixoram Test Task
        </Typography>
        <Divider className="!mt-4 !mb-8" />
        <Typography>
          ZubakPavlo-PixoTest is a test project developed for Pixoram as part of a Middle Frontend
          Developer assignment. It is an online product catalog application that allows users to
          browse{' '}
          <Link href={'/products'} className="underline">
            products
          </Link>
          , filter them by categories and price range, sort by various criteria (price, name,
          rating), view product details, add items to a shopping cart, and complete a checkout
          process. The product data is fetched from the public{' '}
          <Link
            href={'https://fakestoreapi.com/'}
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            Fake Store API
          </Link>
          .
        </Typography>
      </div>
    </section>
  );
}
