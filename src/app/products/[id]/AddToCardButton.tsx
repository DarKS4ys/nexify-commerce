'use client';

import { Toaster, toast } from 'sonner';
import { useState, useTransition } from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';

interface AddToCardButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCardButton({ productId, incrementProductQuantity }: AddToCardButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Toaster theme="light" richColors closeButton />
      <button
        className="btn btn-primary uppercase group overflow-hidden"
        disabled={isPending}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            try {
              await incrementProductQuantity(productId);
              setSuccess(true);
              toast.success('Added to Cart.');
            } catch (error) {
              toast.error("Couldn't add item to the cart.");
            }
          });
        }}
      >
        <h1 className='group-hover:translate-x-3 transition duration-200'>Add to Cart</h1>
        <HiOutlineShoppingCart size={18} className="group-hover:translate-x-9 transition duration-200" />
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to Cart.</span>
      )}
    </div>
  );
}