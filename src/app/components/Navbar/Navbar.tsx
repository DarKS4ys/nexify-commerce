import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Logo from '@/public/NexifyLogo.svg'
import { redirect } from 'next/navigation'
import { getCart } from '@/lib/db/cart'
import ShoppingCartButton from './ShoppingCartButton'
import ThemeChanger from '../ThemeChanger'
import UserMenuButton from './UserMenuButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function searchProducts(formData: FormData) {
    "use server"

    const searchQuery = formData.get('searchQuery')?.toString();

    if(searchQuery) {
        redirect("/search?query=" + searchQuery);
    }
}

export default async function Navbar() {
    const session = await getServerSession(authOptions)
    const cart = await getCart()
  return (
    <div className='bg-base-100'>
        <div className='px-4 navbar max-w-7xl m-auto flex-col sm:flex-row gap-2'>
            <div className='flex-1 gap-2'>
                <Link href="/" className="flex gap-2 items-center text-xl font-semibold hover:scale-105 active:scale-100 transition duration-200">
                    <Image src={Logo} alt='Nexify Logo' height={40} width={40}/>
                    <h1>Nexify</h1>
                </Link>
            </div>
            <div className='flex-none gap-2'>
                <ThemeChanger />
                <form action={searchProducts}>
                    <div className='form-control'>
                        <input name='searchQuery' placeholder='Search...' className='input input-bordered w-full min-w-[100px]' />
                    </div>
                </form>
                <ShoppingCartButton cart={cart}/>
                <UserMenuButton session={session}/>
            </div>
        </div>
    </div>
  )
}
