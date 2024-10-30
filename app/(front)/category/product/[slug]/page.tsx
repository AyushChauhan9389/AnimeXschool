import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { GetAllProducts, GetProductBySlug } from '@/lib/woo';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import {PencilRuler, Star, X} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {PopoverClose} from "@radix-ui/react-popover";
import SimpleSizeSelector from "@/components/cart/cartComponent";

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const products = await GetProductBySlug(params.slug);
    const product = products[0];

    return (
        <div className="w-full h-screen flex flex-row">
            <div className="w-2/3 h-full border-2 border-dashed">
                <Carousel className="w-full h-full">
                    <CarouselContent className="h-full">
                        {product.images.map((image, index) => (
                            <CarouselItem key={index} className="basis-1/2 h-full">
                                <Image src={image.src} alt={image.src} width={1920} height={1080} className="w-full h-[660px] object-contain" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="w-1/3 h-full p-10 flex flex-col gap-5">
                <span className="text-[35.52px] font-sans leading-10 uppercase ">
                    {product.name}
                </span>
                <div className="flex flex-row">
                    {product.variations && product.variations.length > 0 ? (
                        <div className=" text-[16px]">
                            <span className="font-semibold text-red-600">₹{product.variations[0].sale_price}</span>
                            <span className="text-gray-500 line-through ml-2">₹{product.variations[0].regular_price}</span>
                        </div>
                    ) : (
                        <div className="">
                            {
                                product.sale_price ? (
                                    <span className="font-semibold text-red-600">₹{product.sale_price}</span>
                                ) : (
                                    <span className=" font-semibold text-red-600">₹{product.regular_price}</span>
                                )
                            }
                            {
                                product.sale_price ? (
                                    <span className="text-gray-500 line-through ml-2">₹{product.regular_price}</span>
                                ) : null
                            }
                        </div>
                    )}
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex-row flex justify-start gap-2 items-center hover:underline">
                                <PencilRuler className="size-4"/>
                                <span>
                                    Size Chart
                                </span>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-96">
                        <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div>
                                        <h2 className="text-lg font-semibold">Itachi / Oversized Hoodie</h2>
                                        <p className="text-sm text-gray-500">Size Charts</p>
                                    </div>
                                </div>
                                <PopoverClose className="rounded-sm opacity-70 hover:opacity-100">
                                    <X className="h-4 w-4" />
                                </PopoverClose>
                            </div>

                            <div className="flex justify-center gap-4 mb-4">
                                <Button variant="ghost" className="text-blue-600">CM</Button>
                                <span className="text-gray-300">|</span>
                                <Button variant="ghost">INCHES</Button>
                            </div>

                            <table className="w-full border-collapse">
                                <thead>
                                <tr>
                                    <th className="border p-2 bg-gray-50 font-semibold">SIZE</th>
                                    <th className="border p-2 bg-gray-50 font-semibold">LENGTH</th>
                                    <th className="border p-2 bg-gray-50 font-semibold">CHEST</th>
                                    <th className="border p-2 bg-gray-50 font-semibold">SLEEVE LENGTH</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="border p-2 text-center">S</td>
                                    <td className="border p-2 text-center">27</td>
                                    <td className="border p-2 text-center">44</td>
                                    <td className="border p-2 text-center">26</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 text-center">M</td>
                                    <td className="border p-2 text-center">28</td>
                                    <td className="border p-2 text-center">46</td>
                                    <td className="border p-2 text-center">27</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 text-center">L</td>
                                    <td className="border p-2 text-center">29</td>
                                    <td className="border p-2 text-center">48</td>
                                    <td className="border p-2 text-center">27</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 text-center">XL</td>
                                    <td className="border p-2 text-center">30</td>
                                    <td className="border p-2 text-center">50</td>
                                    <td className="border p-2 text-center">28</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 text-center">XXL</td>
                                    <td className="border p-2 text-center">31</td>
                                    <td className="border p-2 text-center">52</td>
                                    <td className="border p-2 text-center">28</td>
                                </tr>
                                </tbody>
                            </table>

                            <p className="text-xs text-gray-500 mt-4 text-center">
                                Sizes can vary from 2-3 centimeters because they are measured by hand. 1inch=2.54cm The size matched on a label can differ from the one you have ordered
                            </p>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <Star className="size-4" />
                    <Star className="size-4" />
                    <Star className="size-4" />
                    <Star className="size-4" />
                    <Star className="size-4" />
                    <span className="text-gray-400 text-[16px]">
                        23 reviews
                    </span>
                </div>
                <SimpleSizeSelector ProductData={product} />
            </div>
        </div>
    );
}