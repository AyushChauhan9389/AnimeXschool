import {GetAllProducts, GetCatData, GetProductsFromCategory,} from "@/lib/woo";
import ProductGrid from "@/components/components/Grids";

type CategorySlugProps = {
    slug: string
}


export default async function CategorySlug(props: { params: Promise<CategorySlugProps> }) {
    const params = await props.params;
    const data = await GetProductsFromCategory(params.slug);
    return (
        <div >
            <div className="w-full border border-black/10 py-4 px-4 flex justify-center">
                Filter Bar
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 max-w-6xl mx-auto">
                {data.map((data, index) => (
                    <ProductGrid key={index} product={data}/>
                ))}
            </div>
        </div>
    )
}