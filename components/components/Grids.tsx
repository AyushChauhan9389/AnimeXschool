'use client'

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {Product} from "@/lib/types";
import Link from "next/link";
import {MotionDiv} from "@/components/common/motion"; // Import Skeleton component

const item = {
    title: "Product",
    realprice: 1000,
    discountprice: 800
}

export default function ProductGrid({ product }: { product: Product }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <Link href={`/product/${product.slug}`}>
            <div className="md:basis-1/2 lg:basis-1/3 mt-4">
                <MotionDiv className="p-1"
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                >
                    <Card className="overflow-hidden rounded-none border-none group shadow-none">
                        <CardContent className="relative p-0 h-[400px] rounded-none">
                            {isLoading && (
                                <Skeleton className="absolute inset-0 w-full h-full z-10"/>
                            )}
                            <Image
                                src={product.images[0].src}
                                alt={product.name}
                                fill
                                style={{objectFit: 'cover'}}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onLoad={handleImageLoad}
                            />

                            {product.variations && product.variations.length > 0 ? (
                                <div
                                    className="absolute inset-0 bottom-10 flex flex-col items-center justify-end px-4 text-center">
                                    <AnimatePresence>
                                        {isHovered && (
                                            <MotionDiv
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: 20}}
                                                transition={{duration: 0.5, ease: "easeInOut"}}
                                                className="flex flex-row w-full h-10 gap-4 justify-evenly items-center text-xs bg-white">
                                                {product.variations?.slice().reverse().map((item, index) => (
                                                    <div key={index}>
                                                        <p className="uppercase">{item.attributes[0].option}</p>
                                                    </div>
                                                ))}
                                            </MotionDiv>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ): null}
                        </CardContent>
                        <div className="mt-4 flex flex-row justify-center text-[1rem]">
                            {product.name}
                        </div>
                        {product.variations && product.variations.length > 0 ? (
                                <div className="text-xs flex justify-center gap-3">
                                    <p className={product.variations[0].sale_price ? "line-through" : undefined}>Rs. {product.variations[0].regular_price}</p>
                                    {product.variations[0].sale_price ? (
                                        <p className="text-red-600">Rs. {product.variations[0].sale_price}</p>):null}
                                </div>
                            ) :
                            (
                                <div className="text-xs flex justify-center gap-3">
                                    <p className="line-through">Rs. {product.regular_price}</p>
                                    {product.sale_price ? (
                                        <p className="text-red-600">Rs. {product.sale_price}</p>):null}
                                </div>
                            )}
                    </Card>
                </MotionDiv>
            </div>
        </Link>
    );
}
