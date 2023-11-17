import PriceTag from "@/app/components/PriceTag"
import { prisma } from "@/lib/db/prisma"
import Image from "next/image"
import { notFound } from "next/navigation"

interface ProductPageProps {
    params: {
        id: string
    }
}

export default async function page({params: {id}}: ProductPageProps) {
    const product = await prisma.product.findUnique({where: {id}})
    if(!product) notFound()
  return (
    <div className="flex flex-col lg:flex-row gap-4">
        <Image src={product.imageUrl} alt={product.name} width={500} height={500} className="rounded-lg" priority/>

        <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold">{product.name}</h1>
            <PriceTag price={product.price} />
            <p>{product.description}</p>
        </div>
    </div>
  )
}
