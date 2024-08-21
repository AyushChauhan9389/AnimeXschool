'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { CarouselItem } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';

type Items = {
    item: string;
}

export function CarouselClient({ item }: Items) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 mt-4">
            <motion.div
                className="p-1"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <Card className="overflow-hidden h-[530px] rounded-none">
                    <CardContent className="h-full relative p-0 rounded-none">
                        <Image
                            src="/placeholder.svg"
                            alt={item}
                            layout="fill"
                            objectFit="cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)] rounded-none"></div>
                        <div className="absolute inset-0 bottom-10 flex flex-col items-center justify-end px-4 text-center">
                            <motion.div
                                className="space-y-4"
                                initial={{ y: 0 }}
                                animate={{ y: isHovered ? -20 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <motion.h1 className="text-2xl text-white">
                                    {item}
                                </motion.h1>
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.p
                                            className="text-lg text-white"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                        >
                                            <Button variant="link" className="text-white underline" >Explore More</Button>
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </CarouselItem>
    )
}

type data = {
    title: string;
    realprice: number;
    discountprice: number;
}
export function ProductCarouselClient({ item, indexdata }: { item: data, indexdata: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return(
        <CarouselItem className="md:basis-1/3 lg:basis-1/4 mt-4 ">
            <motion.div className="p-1"
                 onHoverStart={() => setIsHovered(true)}
                 onHoverEnd={() => setIsHovered(false)}
            >
            <Card className="overflow-hidden rounded-none border-none group shadow-none">
                <CardContent className="relative p-0 h-[400px] rounded-none">
                    <Image
                        src="/placeholder.svg"
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div
                        className="absolute inset-0 bottom-10 flex flex-col items-center justify-end px-4 text-center">
                        <AnimatePresence>
                            {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="flex flex-row w-full h-10 gap-4 justify-evenly items-center text-xs bg-white">
                                {['s', 'm', 'l', 'xl', 'xxl'].map((item, index) => (
                                    <div key={index}>
                                            <p className="uppercase">{item} </p>
                                    </div>
                                ))}
                            </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </CardContent>
                <div className="mt-4 flex flex-row justify-center text-[1rem]">
                    {item.title}
                </div>
                <div className="text-xs flex justify-center gap-3">
                    <p className="line-through">Rs. {item.realprice}</p>
                    <p className="text-red-600">Rs. {item.discountprice}</p>
                </div>
            </Card>
            </motion.div>
        </CarouselItem>
    )
}