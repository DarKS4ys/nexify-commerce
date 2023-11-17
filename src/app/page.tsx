import { prisma } from "@/lib/db/prisma"
import ProductCard from './components/ProductCard';
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const products = await prisma.product.findMany({
    orderBy: {id: "desc"}
  })

  return (
    <main className="">
      <div className="hero rounded-xl bg-base-100 p-4">
        <div className="hero-content w-full flex-col lg:flex-row gap-8">
          <Link href={'/products/' + products[0].id} className="relative w-full lg:w-2/3 h-96 lg:h-[30rem] rounded-lg">
            <Image
            src={products[0].imageUrl}
            alt={products[0].name + ' image'}
            fill
            priority
            className="object-cover rounded-lg shadow-2xl"
            />
          </Link>
          <div className="flex flex-col gap-6 w-full lg:w-1/3">
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p>{products[0].description}</p>
            <Link href={'/products/' + products[0].id} className="btn btn-primary uppercase">Check it out</Link>
          </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.slice(1).map(product => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </main>
  )
}
