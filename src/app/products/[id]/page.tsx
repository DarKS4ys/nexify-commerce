import PriceTag from '@/app/components/PriceTag';
import { prisma } from '@/lib/db/prisma';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AddToCardButton from './AddToCardButton';
import { incrementProductQuantity, sendComment } from '../actions';
import Comments from './Comments';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { User } from '@prisma/client';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ 
    where: { id },
    include: {
      comments: {
        include: {
          user: true, // Include the user field from the comments relation
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

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

  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  console.log(user)

  return (
    <div className='flex flex-col gap-4'>
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
          <AddToCardButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
        </div>
        
        </div>

        <div className='flex flex-col gap-2'>
          <Comments user={user} productId={product.id} sendComment={sendComment} comments={product.comments}/>
        </div>
    </div>
  );
}
