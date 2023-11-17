import formatPrice from "@/lib/format";

interface PriceTagProps {
    className?: string;
    price: number;
}

export default function PriceTag({price, className}: PriceTagProps) {
  return (
    <span className={`badge border-success ${className}`}>{formatPrice(price)}</span>
  )
}
