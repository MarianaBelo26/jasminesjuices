import { notFound } from 'next/navigation'
import { products } from '@/data/products'
import ProductClient from './productClient'

export function generateStaticParams() {
  return products.map(product => ({
    id: product.id,
  }))
}

type ProductPageProps = {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return <ProductClient product={product} />
}
