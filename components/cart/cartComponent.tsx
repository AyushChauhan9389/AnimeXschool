'use client'

import { Product } from '@/lib/types';
import React, {MouseEventHandler, useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import {toast} from "sonner";

type Props = {
    ProductData: Product;
}
const SimpleSizeSelector = ({ProductData}: Props) => {
    const [selectedSize, setSelectedSize] = useState('');

    const sizes = ProductData.attributes[0].options;
    const cart = useCart();
    const Addtocart: MouseEventHandler<HTMLButtonElement> = async () => {
        if (ProductData.variations) {
            if (selectedSize === '') {
                toast.error('Please select a size');
                return;
            }
            const variation = ProductData.variations.find(
                (variation) => variation.attributes[0].option === selectedSize
            );
            if (!variation) {
                toast.error('Selected size not found');
                return;
            }
            const sizeId = variation.id;
            const sizeProductData = await fetch(`/api/cartproductinfo?id=${sizeId}`);
            const sizeProduct: Product = await sizeProductData.json();
            cart.addToCart({
                product: sizeProduct,
                quantity: 1,
            });
            toast.success('Item added to cart');
        } else {
            cart.addToCart({
                product: ProductData,
                quantity: 1,
            });
            toast.success('Item added to cart');
        }
    }
    useEffect(() => {
        console.log(cart.items);
    }, [cart.items]);
    return (
        <div className="font-sans">
            <p className="text-xs mb-2">SIZE</p>
            <div className="flex gap-2">
                {sizes.map((size) => (
                    <div key={size} className="relative">
                        <input
                            type="radio"
                            id={size}
                            name="size"
                            value={size}
                            checked={selectedSize === size}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="peer absolute opacity-0 w-full h-full cursor-pointer"
                        />
                        <label
                            htmlFor={size}
                            className={`
                flex items-center justify-center w-10 h-10 border 
                cursor-pointer text-sm
                ${selectedSize === size ? 'border-2 border-black' : 'border-gray-300'}
              `}
                        >
                            {size}
                        </label>
                    </div>
                ))}
            </div>
            <Button className="mt-4 rounded-none w-full h-12" onClick={Addtocart}>
                Add to Cart
            </Button>
        </div>
    );
};

export default SimpleSizeSelector;