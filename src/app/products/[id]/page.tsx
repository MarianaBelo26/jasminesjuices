import { notFound } from 'next/navigation'
import { products } from '@/data/products'
import ProductClient from './productClient'

export function generateStaticParams() {
  return products.map(product => ({
    id: product.id,
  }))
}

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  const product = products.find(p => p.id === id)

  if (!product) {
    return notFound()
  }

  return <ProductClient product={product} />
}