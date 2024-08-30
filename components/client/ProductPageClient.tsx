'use client'
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select'
import { useState } from 'react';

// Import the Product type
import { Product, Variation } from "@/lib/types"
import Image from "next/image";

interface ProductPageProps {
    product: Product;
}

export default function MainProductPage({ product }: ProductPageProps) {

    const initialSize = product.variations && product.variations[0].attributes[0]?.option;
    const [selectedSize, setSelectedSize] = useState<string | undefined>(initialSize);

    // Extract image for the display
    console.log(product);
    return (
        <div className="container mx-auto p-4 flex flex-col md:flex-row items-start">
            <div className="flex-1">
                <Image src={product.images[0].src} alt={product.name} className="w-full rounded-lg" width={1920} height={1080}/>
            </div>

            <div className="flex-1 md:pl-8">
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-500 mb-4" dangerouslySetInnerHTML={{__html: product.description}}></p>
                <div className="flex items-center mb-4">
                    {product.regular_price && (
                        <span className="line-through text-gray-500 mr-2">Rs. {product.regular_price}</span>
                    )}
                    {product.sale_price && (
                        <span className="text-red-500 font-bold">Rs. {product.sale_price}</span>
                    )}
                    {product.sale_price && (
                        <Badge color="red" className="ml-2">Sale</Badge>
                    )}
                </div>

                <Select
                    onValueChange={(value) => setSelectedSize(value)}
                    defaultValue={selectedSize}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select size"/>
                    </SelectTrigger>
                    <SelectContent>
                        {product.variations?.map((variation) => (
                            variation.attributes.map((attribute) => (
                                <SelectItem key={attribute.option} value={attribute.option}>
                                    {attribute.option}
                                </SelectItem>
                            ))
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex space-x-4 mt-4">
                    <Button>Add to Cart</Button>
                    <Button variant="outline">Buy it Now</Button>
                </div>
            </div>
        </div>
    );
};
