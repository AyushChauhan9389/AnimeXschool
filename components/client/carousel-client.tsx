'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { CarouselItem } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton";
import {CategoryData, Product} from "@/lib/types";
import {MotionDiv, MotionH1, MotionP} from "@/components/common/motion";



export function CarouselClient({ data }: {data: CategoryData}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 mt-4">
            <MotionDiv
                className="p-1"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <Card className="overflow-hidden h-[530px] rounded-none">
                    <CardContent className="h-full relative p-0 rounded-none">
                        <Image
                            src="/placeholder.svg"
                            alt={data.name}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)] rounded-none"></div>
                        <div className="absolute inset-0 bottom-10 flex flex-col items-center justify-end px-4 text-center">
                            <MotionDiv
                                className="space-y-4"
                                initial={{ y: 0 }}
                                animate={{ y: isHovered ? -20 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <MotionH1 className="text-2xl text-white">
                                    {data.name}
                                </MotionH1>
                                <AnimatePresence>
                                    {isHovered && (
                                        <MotionP
                                            className="text-lg text-white"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                        >
                                            <Link href={`/category/${data.slug}`}>
                                                <Button variant="link" className="text-white underline" >Explore More</Button>
                                            </Link>
                                        </MotionP>
                                    )}
                                </AnimatePresence>
                            </MotionDiv>
                        </div>
                    </CardContent>
                </Card>
            </MotionDiv>
        </CarouselItem>
    )
}

type data = {
    title: string;
    realprice: number;
    discountprice: number;
}

export function ProductSkeleton(){
    return(
        <CarouselItem className="md:basis-1/3 lg:basis-1/4 mt-4 ">
            <MotionDiv className="p-1"
            >
                <Card className="overflow-hidden rounded-none border-none group shadow-none">
                    <CardContent className="relative p-0 h-[400px] rounded-none">

                            <Skeleton className="absolute inset-0 w-full h-full z-10" />

                        <div
                            className="absolute inset-0 bottom-10 flex flex-col items-center justify-end px-4 text-center">

                        </div>
                    </CardContent>
                    <div className="mt-4 flex flex-row justify-center text-[1rem]">
                        <Skeleton className="w-6 h-2" />
                    </div>
                        <div className="text-xs flex justify-center gap-3">
                            <p className="line-through">
                            </p>
                            <p className="text-red-600"></p>
                        </div>
                </Card>
            </MotionDiv>
        </CarouselItem>
    )
}
export function ProductCarouselClient({product}:{product: Product}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return(
        <CarouselItem className="md:basis-1/3 lg:basis-1/4 mt-4 ">
            <MotionDiv className="p-1"
                 onHoverStart={() => setIsHovered(true)}
                 onHoverEnd={() => setIsHovered(false)}
            >
            <Card className="overflow-hidden rounded-none border-none group shadow-none">
                <CardContent className="relative p-0 h-[400px] rounded-none">
                    {isLoading && (
                        <Skeleton className="absolute inset-0 w-full h-full z-10" />
                    )}
                    <Image
                        src={product.images[0]?.src || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
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
        </CarouselItem>
    )
}