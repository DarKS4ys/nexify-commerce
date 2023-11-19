"use client"

import type { Session } from "next-auth"
import Image from "next/image"
import profilePicPlaceholder from '@/public/profile-pic-placeholder.png'
import { signIn, signOut } from "next-auth/react"
import { AiOutlineMenu } from 'react-icons/ai';
import Link from "next/link"

interface UserMenuButtonProps {
    session: Session | null
}

export default function UserMenuButton({session}: UserMenuButtonProps) {
    const user = session?.user
  return (
    <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
            {user ? 
            <Image src={user?.image || profilePicPlaceholder} alt="Profile Picture" width={40} height={40} className="w-10 rounded-full aspect-square" />
            : <AiOutlineMenu size={20}/>
            }
        </label>
        <ul className="border border-accent dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow" tabIndex={0}>
            <li>
                {user ?
                    <button onClick={() => signOut({callbackUrl: "/"})}>Sign Out</button>    
                : 
                    <button onClick={() => signIn()}>Sign In</button>    
                }
            </li>
        </ul>
    </div>
  )
}
