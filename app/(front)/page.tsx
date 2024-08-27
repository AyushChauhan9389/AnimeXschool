import { HorizontalCarousel, MainCarousel, ProductCarousel } from "@/components/components/carousel";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {GetAllCategories} from "@/lib/woo";

export default async function Home() {
    const categories = await GetAllCategories();
    if (categories) {
        return (
            <div className="flex flex-col">
                <MainCarousel/>
                <div className="w-full flex justify-center text-4xl font-bold font-sans mt-4">
                    Shop By Category
                </div>
                <div className="flex justify-center">
                    <HorizontalCarousel data={categories} />
                </div>
                <div className="w-full flex justify-center text-4xl font-bold font-sans mt-4">
                    Shop By Theme
                </div>
                <div className="flex justify-center">
                    <HorizontalCarousel data={categories}/>
                </div>
                <div className="w-full flex justify-center text-4xl font-bold font-sans mt-4">
                    NEW ARRIVALS
                </div>
                <div className="flex justify-center">
                    <ProductCarousel/>
                </div>
                <div className="w-full flex justify-center text-4xl font-bold font-sans mt-4">
                    TOP SELLING
                </div>
                <div className="flex justify-center">
                    <ProductCarousel/>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="flex flex-row justify-center w-[1200px] h-[360px] gap-8">
                        <div className="w-1/2 flex justify-center items-center h-full relative">
                            <Image src="/placeholder.svg" alt="Logo" height={1920} width={1080}
                                   className="w-full h-full object-cover bg-background"/>
                            <div
                                className="absolute inset-0 bottom-10 flex flex-col items-center justify-end px-4 text-center">
                                <Button className="rounded-none bg-transparent text-black border border-black hover:bg-white hover:border-white transition-colors duration-500">Collection</Button>
                            </div>

                        </div>
                        <div className="w-1/2 flex justify-center items-center h-full relative">
                            <Image src="/placeholder.svg" alt="Logo" height={1920} width={1080}
                                   className="w-full h-full object-cover bg-background"/>
                            <div
                                className="absolute inset-0 bottom-10 flex flex-col items-center justify-end px-4 text-center">
                                <Button className="rounded-none bg-transparent text-black border border-black hover:bg-white hover:border-white transition-colors duration-500">Collection</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );

    }else {
        throw new Error('No data found');
    }

}
