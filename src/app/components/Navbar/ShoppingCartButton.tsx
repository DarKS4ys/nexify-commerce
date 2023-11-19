"use client"

import { ShoppingCart } from "@/lib/db/cart"
import formatPrice from "@/lib/format"
import Image from "next/image"
import Link from "next/link"
import { HiOutlineShoppingCart } from "react-icons/hi"

interface ShoppingCartButtonProps {
    cart: ShoppingCart | null
}

export default function ShoppingCartButton({cart}: ShoppingCartButtonProps) {

    function closeDropdown() {
        const element = document.activeElement as HTMLElement
        if (element) {
            element.blur()
        }
    }

  return (
    <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
            <HiOutlineShoppingCart size={18} />
            <span className="badge badge-sm indicator-item">{cart?.size || 0}</span>
            </div>
        </label>
        
        <div className="border border-accent card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30" tabIndex={0}>
            <div className="card-body">
                <span className="text-lg fond-bold">{cart?.size || 0} Items</span>
                <span className="text-info">
                    Subtotal: {formatPrice(cart?.subtotal || 0)}
                </span>
                <div className="card-actions">
                    <Link href={'/cart'} className="btn btn-primary btn-block uppercase" onClick={closeDropdown}>View Cart</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
