'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Percent } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import {ImageOnly} from "@/lib/types";


interface ImageSliderProps {
    images: ImageOnly[]
    discount?: number
}

export default function Component({ images, discount }: ImageSliderProps) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={image.id}>
                            <div className="relative aspect-square">
                                <Image
                                    src={image.src}
                                    alt="Image"
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={index === 0}
                                />
                                {discount && index === 0 && (
                                    <div className="absolute top-4 left-4 bg-black text-white rounded-full p-2 flex items-center justify-center">
                                        <Percent className="w-4 h-4 mr-1" />
                                        <span className="text-sm font-bold">-{discount}%</span>
                                    </div>
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel>

            <div className="flex justify-start space-x-2 overflow-x-auto py-2">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        onClick={() => api?.scrollTo(index)}
                        className={cn(
                            "relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden",
                            index === current ? "ring-2 ring-black" : "opacity-50"
                        )}
                        aria-label={`View Image}`}
                    >
                        <Image
                            src={image.src}
                            alt="Image"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 25vw, 10vw"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}