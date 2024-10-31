'use server'

import {CategoryData, Product} from "@/lib/types";

async function woo(endpoint: string, queryParams: string = '') {
    const url = `${process.env.BASE_URL}${endpoint}${queryParams}`;
    return await fetch(url, {
        headers: {
            Authorization: 'Basic ' + Buffer.from(process.env.C_KEY + ':' + process.env.C_SECRET).toString('base64')
        }
    });
}

export async function GetAllProducts(): Promise<Product[]> {
    const data = await woo('/wp-json/wc/v3/products', '?per_page=5');
    const response = await data.json();
    const finalData = await Promise.all(
        response.map(async (product: Product) => {
            // Fetch variations if the product is variable
            let variations = [];
            if (product.type === "variable") {
                const variationData = await woo(`/wp-json/wc/v3/products/${product.id}/variations`);
                const variationResponse = await variationData.json();
                variations = variationResponse.map((variation: any) => ({
                    id: variation.id,
                    regular_price: variation.regular_price,
                    sale_price: variation.sale_price,
                    attributes: variation.attributes.map((attribute: any) => ({
                        name: attribute.name,
                        option: attribute.option,
                    })),
                }));
            }

            return {
                id: product.id,
                name: product.name,
                description: product.description,
                short_description: product.short_description,
                slug: product.slug,
                permalink: product.permalink,
                regular_price: product.regular_price,
                sale_price: product.sale_price,
                images: product.images.map((image: any) => ({
                    id: image.id,
                    src: image.src
                })),
                attributes: product.attributes.map((attribute: any) => ({
                    name: attribute.name,
                    options: attribute.options,
                })),
                variations, // Includes the variations with prices and attributes
            };
        })
    );

    return finalData;
}
export async function GetAllCategories(): Promise<CategoryData[]> {
    const response = await woo('/wp-json/wc/v3/products/categories', '?per_page=5');
    const data = await response.json();
    return data.map((category: CategoryData) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        count: category.count
    }));
}

export async function GetCatData(slug: string): Promise<CategoryData[]> {
    const response = await woo(`/wp-json/wc/v3/products/categories`, `?slug=${slug}`);
    const data = await response.json();
    return data.map((category: CategoryData) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        count: category.count
    }));
}

export async function GetProductsFromCategory(slug: string){
    const maindata = await GetCatData(slug);
    const data = await woo(`/wp-json/wc/v3/products`, `?category=${maindata[0].id}`);
    const response = await data.json();
    const finalData = await Promise.all(
        response.map(async (product: Product) => {
            // Fetch variations if the product is variable
            let variations = [];
            if (product.type === "variable") {
                const variationData = await woo(`/wp-json/wc/v3/products/${product.id}/variations`);
                const variationResponse = await variationData.json();
                variations = variationResponse.map((variation: any) => ({
                    id: variation.id,
                    regular_price: variation.regular_price,
                    sale_price: variation.sale_price,
                    attributes: variation.attributes.map((attribute: any) => ({
                        name: attribute.name,
                        option: attribute.option,
                    })),
                }));
            }

            return {
                id: product.id,
                name: product.name,
                description: product.description,
                short_description: product.short_description,
                slug: product.slug,
                permalink: product.permalink,
                regular_price: product.regular_price,
                sale_price: product.sale_price,
                images: product.images.map((image: any) => ({
                    id: image.id,
                    src: image.src
                })),
                attributes: product.attributes.map((attribute: any) => ({
                    name: attribute.name,
                    options: attribute.options,
                })),
                variations, // Includes the variations with prices and attributes
            };
        })
    );
    return finalData;

}

export async function GetProductBySlug(slug: string): Promise<Product[]>{
    const data = await woo(`/wp-json/wc/v3/products`, `?slug=${slug}`);
    const response = await data.json();
    const finalData = await Promise.all(
        response.map(async (product: Product) => {
            // Fetch variations if the product is variable
            let variations = [];
            if (product.type === "variable") {
                const variationData = await woo(`/wp-json/wc/v3/products/${product.id}/variations`);
                const variationResponse = await variationData.json();
                variations = variationResponse.map((variation: any) => ({
                    id: variation.id,
                    regular_price: variation.regular_price,
                    sale_price: variation.sale_price,
                    attributes: variation.attributes.map((attribute: any) => ({
                        name: attribute.name,
                        option: attribute.option,
                    })),
                }));
            }

            return {
                id: product.id,
                name: product.name,
                description: product.description,
                short_description: product.short_description,
                slug: product.slug,
                permalink: product.permalink,
                regular_price: product.regular_price,
                sale_price: product.sale_price,
                images: product.images.map((image: any) => ({
                    id: image.id,
                    src: image.src
                })),
                attributes: product.attributes.map((attribute: any) => ({
                    name: attribute.name,
                    options: attribute.options,
                })),
                variations, // Includes the variations with prices and attributes
            };
        })
    );
    return finalData;

}

export async function GetProductById(id: number, type: string): Promise<Product> {
    const data = await woo(`/wp-json/wc/v3/products/${id}`);
    const product = await data.json();

    let variations = [];
    if (product.type === type) {
        const variationData = await woo(`/wp-json/wc/v3/products/${product.id}/variations`);
        const variationResponse = await variationData.json();
        variations = variationResponse.map((variation: any) => ({
            id: variation.id,
            regular_price: variation.regular_price,
            sale_price: variation.sale_price,
            attributes: variation.attributes.map((attribute: any) => ({
                name: attribute.name,
                option: attribute.option,
            })),
        }));
    }

    return {
        id: product.id,
        name: product.name,
        description: product.description,
        short_description: product.short_description,
        slug: product.slug,
        permalink: product.permalink,
        type: product.type, // Add this line
        regular_price: product.regular_price,
        sale_price: product.sale_price,
        images: product.images.map((image: any) => ({
            id: image.id,
            src: image.src
        })),
        attributes: product.attributes.map((attribute: any) => ({
            name: attribute.name,
            options: attribute.option,
        })),
        variations, // Includes the variations with prices and attributes
    };
}