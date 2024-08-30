import {GetAllProducts} from "@/lib/woo";
import {ProductCarousel} from "@/components/components/carousel";



export default async function FetchPage(){

    const products = await GetAllProducts();
    return (
        <ProductCarousel data={products}/>
    )

}