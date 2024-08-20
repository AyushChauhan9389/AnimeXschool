import { HorizontalCarousel, MainCarousel, ProductCarousel } from "@/components/components/carousel";
import { GetAllProducts } from "@/lib/woo";
import Image from "next/image";

export default async function Home() {
  console.log(GetAllProducts())
  return (
    <div className="flex flex-col">
      <MainCarousel />
      <div className="flex justify-center">
        <HorizontalCarousel />
      </div>

      <HorizontalCarousel />
      <ProductCarousel />
      <ProductCarousel />
    </div>
  );
}
