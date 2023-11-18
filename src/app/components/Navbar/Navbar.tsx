import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Logo from '@/public/NexifyLogo.svg'

export default function Navbar() {
  return (
    <div className='bg-base-100'>
        <div className='navbar max-w-7xl m-auto flex-col sm:flex-row gap-2'>
            <div className='flex-1'>
                <Link href="/" className="flex gap-2 items-center text-xl font-semibold hover:scale-105 active:scale-100 transition duration-200">
                    <Image src={Logo} alt='Nexify Logo' height={40} width={40}/>
                    <h1>Nexify</h1>
                </Link>
            </div>
            <div className='flex-none gap-2'>
                <form>
                    <div className='form-control'>
                        <input name='searchQuery' placeholder='Search...' className='input input-bordered w-full min-w-[100px]' />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
