'use server';

import { createCart, getCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find(item => item.productId === productId);

  if (articleInCart) {
    await prisma.cartItem.update({
        where: { id: articleInCart.id },
        data: { quantity: { increment: 1} }
    })
  } else {
    await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1
        }
    })
  }

  revalidatePath("/products/[id]")
}

export async function sendComment(productId: string, text: string, user: any) {
  
  // Check if the user object has a valid 'id' property
  if (!user || !user.id) {
    console.error('Invalid user object. Missing user.id');
    return; // or throw an error, handle accordingly
  }

  await prisma.comment.create({
    data: {
      text: text,
      user: { connect: { id: user.id } },
      product: { connect: { id: productId } },
    },
  });
}