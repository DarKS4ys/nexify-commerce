"use client"

import { useState, useTransition } from 'react';
import {HiOutlineShoppingCart} from 'react-icons/hi'
import { incrementProductQuantity } from '../actions';

interface AddToCardButtonProps {
    productId: string;
}

export default function AddToCardButton({productId}: AddToCardButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)

  return (
    <div className="flex items-center gap-2">
        <button className="btn btn-primary uppercase" onClick={() => {
          setSuccess(false)
          startTransition(async () => {
            await incrementProductQuantity(productId)
            setSuccess(true)
          })
        }}>
            <h1>Add to Cart</h1>
            <HiOutlineShoppingCart size={18}/>
        </button>
    </div>
  )
}
