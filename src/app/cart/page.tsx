import { getCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry"
import { setProductQuantity } from "./actions"
import formatPrice from "@/lib/format"

export const metadata = {
    title: 'Your Cart - Nexify'
}

export default async function CartPage() {
    const cart = await getCart()
    return(
        <div>
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantityFunction={setProductQuantity}/>
            ))}
            {!cart?.items.length &&
            <p>Your Cart Is Empty</p>
            }
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 text-lg md:text-xl font-semibold">
                    Total: {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary uppercase sm:w-[200px]">Checkout</button>
            </div>
        </div>
    )
}