import { Product } from '@prisma/client';
import Link from 'next/link';
import PriceTag from './PriceTag';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={'/products/' + product.id}
      className="card hover:bg-base-200 w-full bg-base-100 hover:shadow-xl transition duration-200"
    >
      <figure className="relative h-52 object-cover">
        <Image
          src={product.imageUrl}
          alt={product.name + ' image'}
          fill
          className="h-52 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          {isNew && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
}
