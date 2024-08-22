'use server'
// @ts-ignore
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

async function woo(endpoint: string, queryParams: string = '') {
    const url = `${process.env.BASE_URL}${endpoint}${queryParams}`;
    return await fetch(url, {
        headers: {
            Authorization: 'Basic ' + Buffer.from(process.env.C_KEY + ':' + process.env.C_SECRET).toString('base64')
        }
    });
}

export async function GetAllProducts() {
    const data = await woo('/wp-json/wc/v3/products');
    return await data.json();
}
export async function GetAllCategories() {
    const response = await woo('/wp-json/wc/v3/products/categories', '?per_page=5');
    const data = await response.json();
    return data.map((category: any) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        count: category.count
    }));
}