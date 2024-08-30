
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import {CarouselClient, ProductCarouselClient, ProductSkeleton} from "../client/carousel-client"
import {CategoryData, Product} from "@/lib/types";
export function MainCarousel() {
    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }} className="w-full">
            <CarouselContent >
                <CarouselItem>
                    <Image src="/1.webp" alt="Logo" height={1920} width={1080} className="w-full h-[500px] object-cover rounded-2xl bg-background" />
                </CarouselItem>
                <CarouselItem>
                    <Image src="/2.webp" alt="Logo" height={1920} width={1080} className="w-full h-[500px] object-cover rounded-2xl bg-background" />
                </CarouselItem>
                <CarouselItem>
                    <Image src="/3.webp" alt="Logo" height={1920} width={1080} className="w-full h-[500px] object-cover rounded-2xl bg-background" />
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    )
}
export function HorizontalCarousel({data} : {data: CategoryData[]}) {
    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }}
            className="my-4 w-[1200px] relative">
            <CarouselContent className="-ml-1">
                {data.map((item, index) => (
                    <CarouselClient key={index} data={item} />
                ))}
            </CarouselContent>
            <div className="flex justify-center mt-4 space-x-4">
                <CarouselPrevious className="!static translate-y-0"></CarouselPrevious>
                <CarouselNext className="!static translate-y-0"></CarouselNext>
            </div>
        </Carousel>
    )
}
export function ProductCarousel({data}:{data: Product[]}) {
    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }} className="my-4 w-[1200px] relative">
            <CarouselContent className="-ml-1">
                {data.map((Product, index) => (
                    <ProductCarouselClient product={Product} key={index}/>
                ))}


            </CarouselContent>
            <div className="flex justify-center mt-4 space-x-4">
                <CarouselPrevious className="!static translate-y-0"></CarouselPrevious>
                <CarouselNext className="!static translate-y-0"></CarouselNext>
            </div>
        </Carousel>
    )
}

export function ProductCarouselSkeleton(){
    return(
        <Carousel opts={{
            align: "start",
            loop: true,
        }} className="my-4 w-[1200px] relative">
            <CarouselContent className="-ml-1">
                {[1,2,3,4,5].map((index) => (
                    <ProductSkeleton key={index} />
                ))}


            </CarouselContent>
            <div className="flex justify-center mt-4 space-x-4">
                <CarouselPrevious className="!static translate-y-0"></CarouselPrevious>
                <CarouselNext className="!static translate-y-0"></CarouselNext>
            </div>
        </Carousel>
    )
}