'use server'
// @ts-ignore
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

function woo() {
    return new WooCommerceRestApi({
        url: process.env.BASE_URL,
        consumerKey: process.env.C_KEY,
        consumerSecret: process.env.C_SECRET,
        version: 'wc/v3'
    });
}

export async function GetAllProducts() {
    const wooApi = await woo();
    wooApi.get("products")
        .then((response: any) => {
            return response.data;
        })
        .catch((error: any) => {
            return error.response.data
        });
}