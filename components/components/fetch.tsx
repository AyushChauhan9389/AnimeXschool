import {GetAllProducts} from "@/lib/woo";
import {ProductCarousel} from "@/components/components/carousel";



export default async function FetchPage(){

    const products = await GetAllProducts();
    if (products.length === 0) {
        return (
            <div className="h-96 flex justify-center items-center font-medium text-2xl">
                No products found
            </div>
        )
    }
    return (
        <ProductCarousel data={products}/>
    )

}