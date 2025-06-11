import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductClient from './productClient';


export async function generateStaticParams() {
  return products.map(product => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params:{ id: string }}) {
  const {id} = params

  const product = products.find(p => p.id === id);

  if (!product) {
    return notFound();
  }

  return <ProductClient product={product} />;
}