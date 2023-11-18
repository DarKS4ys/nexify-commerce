import PriceTag from '@/app/components/PriceTag';
import { prisma } from '@/lib/db/prisma';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AddToCardButton from './AddToCardButton';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + ' - Nexify',
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function page({ params: { id } }: ProductPageProps) {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center">
      <div className="rounded-xl p-2 relative w-full md:w-[800px] h-[500px] object-cover">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover"
          priority
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} />
        <p>{product.description}</p>
        <AddToCardButton productId={product.id}/>
      </div>
    </div>
  );
}
