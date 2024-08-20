
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Car } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import CarouselClient from "../client/carousel-client"

export function MainCarousel() {
    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }} className="w-full">
            <CarouselContent>
                <CarouselItem>
                    <Image src="/1.webp" alt="Logo" height={1920} width={1080} className="w-full h-full object-cover rounded-2xl bg-background" />
                </CarouselItem>
                <CarouselItem>
                    <Image src="/2.webp" alt="Logo" height={1920} width={1080} className="w-full h-full object-cover rounded-2xl bg-background" />
                </CarouselItem>
                <CarouselItem>
                    <Image src="/3.webp" alt="Logo" height={1920} width={1080} className="w-full h-full object-cover rounded-2xl bg-background" />
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    )
}
export function HorizontalCarousel() {
    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }}
            className="my-4 w-[1200px] relative">
            <CarouselContent className="-ml-1">
                {['Regular Fit Hoodies', 'Regular Fit T-Shirts', 'Jackets', 'Bots'].map((item, index) => (
                    <CarouselClient key={index} item={item} />
                ))}
            </CarouselContent>
            <div className="flex justify-center mt-4 space-x-4">
                <CarouselPrevious className="!static translate-y-0"></CarouselPrevious>
                <CarouselNext className="!static translate-y-0"></CarouselNext>
            </div>
        </Carousel>
    )
}
export function ProductCarousel() {
    return (
        <div> ProductCarousel</div>
    )
}