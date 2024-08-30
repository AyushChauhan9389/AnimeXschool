// app/products/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types'
import {GetAllProducts, GetProductBySlug} from "@/lib/woo";
import ImageSlider from "@/components/components/ImageSlider";



export default async function ProductPage({ params }: { params: { slug: string } }) {
    const products = await GetProductBySlug(params.slug);
    const product = products[0];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-2/3 px-4 mb-8 md:mb-0">
                    <div className="flex flex-wrap -mx-2">
                        <ImageSlider images={product.images} />
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-4">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    {product.variations ? (
                        <div className="mb-4">
                            <span className="text-2xl font-semibold text-red-600">₹{product.variations[0].sale_price}</span>
                            <span className="text-lg text-gray-500 line-through ml-2">₹{product.variations[0].regular_price}</span>
                        </div>
                    ) : null}

                    <div className="mb-4 " dangerouslySetInnerHTML={{__html: product.short_description}}></div>
                    <div className="mb-4">
                        <label htmlFor="size" className="block mb-2">Size</label>
                        <select id="size" className="w-full border border-gray-300 rounded px-3 py-2">
                            {product.attributes.find((attr: { name: string; }) => attr.name === "Size")?.options.map((size: string) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                    <button className="bg-black text-white px-6 py-3 rounded w-full mb-4">ADD TO CART</button>
                    <button className="border border-black px-6 py-3 rounded w-full">BUY IT NOW</button>
                    <p className="mt-4 text-sm">Buy any 2 Apparels Get A free Accessorie</p>
                </div>
            </div>
        </div>
    );
}