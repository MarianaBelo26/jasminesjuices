import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductClient from './productClient';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const product = products.find(p => p.id === id);

  if (!product) {
    return notFound();
  }

  return <ProductClient product={product} />;
}