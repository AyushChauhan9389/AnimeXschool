
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
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full px-4 sm:px-6 lg:px-8"
        >
            <CarouselContent>
                <CarouselItem>
                    <Image
                        src="/1.webp"
                        alt="Logo"
                        width={1080}
                        height={1920}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-lg bg-background"
                    />
                </CarouselItem>
                <CarouselItem>
                    <Image
                        src="/2.webp"
                        alt="Logo"
                        width={1080}
                        height={1920}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-lg bg-background"
                    />
                </CarouselItem>
                <CarouselItem>
                    <Image
                        src="/3.webp"
                        alt="Logo"
                        width={1080}
                        height={1920}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-lg bg-background"
                    />
                </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center mt-4 space-x-4">
                <CarouselPrevious className="relative left-0 translate-y-0" />
                <CarouselNext className="relative right-0 translate-y-0" />
            </div>
        </Carousel>
    )
}

export function HorizontalCarousel({ data }: { data: CategoryData[] }) {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="my-4 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 mx-auto relative"
        >
            <CarouselContent className="-ml-1 md:-ml-2">
                {data.map((item, index) => (
                    <CarouselItem key={index} className="pl-1 md:pl-2 sm:basis-1/2 md:basis-1/3">
                        <CarouselClient data={item} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex justify-center mt-4 space-x-4">
                <CarouselPrevious className="relative left-0 translate-y-0" />
                <CarouselNext className="relative right-0 translate-y-0" />
            </div>
        </Carousel>
    )
}
export function ProductCarousel({ data }: { data: Product[] }) {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="my-4 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 mx-auto relative"
        >
            <CarouselContent className="-ml-1 md:-ml-2">
                {data.map((product, index) => (
                    <CarouselItem key={index} className="pl-1 md:pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <ProductCarouselClient product={product} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex justify-center mt-4 space-x-4">
                <CarouselPrevious className="relative left-0 translate-y-0" />
                <CarouselNext className="relative right-0 translate-y-0" />
            </div>
        </Carousel>
    )
}

export function ProductCarouselSkeleton() {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="my-4 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 mx-auto relative"
        >
            <CarouselContent className="-ml-1 md:-ml-2">
                {[1, 2, 3, 4, 5].map((index) => (
                    <CarouselItem key={index} className="pl-1 md:pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <ProductSkeleton />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex justify-center mt-4 space-x-4">
                <CarouselPrevious className="relative left-0 translate-y-0" />
                <CarouselNext className="relative right-0 translate-y-0" />
            </div>
        </Carousel>
    )
}