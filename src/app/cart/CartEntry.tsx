'use client';

import { CartItemWithProduct } from '@/lib/db/cart';
import formatPrice from '@/lib/format';
import Image from 'next/image';
import Link from 'next/link';
import { useTransition } from 'react';
import { setProductQuantity } from './actions';

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantityFunction: (
    productId: string,
    quantity: number
  ) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantityFunction,
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return (
    <>
    <div className='flex gap-4 flex-wrap items-center justify-center md:justify-normal'>
      <div className="flex items-center relative w-10/12 md:w-[250px] h-[280px]">
        <Image
          src={product.imageUrl}
          alt={product.name + ' image'}
            fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className='flex flex-col justify-center items-center md:items-start'>
        <Link href={'/products/' + product.id} className="font-bold text-lg md:text-2xl">
          {product.name}
        </Link>
        <h1 className='mt-2'>Price: {formatPrice(product.price)}</h1>
        <div className='flex flex-col mt-2 gap-2 items-center justify-center md:items-start'>
            <div className='flex items-center gap-2'>
                <h1>Quantity:</h1>
                <select
                    className="bg-base-100 rounded-lg outline-none w-full max-w-[80px] select"
                    defaultValue={quantity}
                    onChange={(e) => {
                    const newQuantity = parseInt(e.currentTarget.value);
                    startTransition(async () => {
                        await setProductQuantity(product.id, newQuantity);
                    });
                    }}
                >
                    <option value={0}>0 (Remove)</option>
                    {quantityOptions}
                </select>
            </div>
            <h1 className="flex items-center gap-3 md:text-lg">
                {quantity > 1 &&
                <>
                Total: {formatPrice(product.price * quantity)}
                </>
                }
                {isPending && <span className='loading loading-spinner loading-sm'/>}
            </h1>
                
        </div>
      </div>
    </div>
    <div className="divider" />
    </>
  );
}
