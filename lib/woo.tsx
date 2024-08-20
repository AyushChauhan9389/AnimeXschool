'use server'
// @ts-ignore
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

function woo() {
    console.log(process.env.BASE_URL, process.env.C_KEY, process.env.C_SECRET);
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
            console.log(error.response.data);
        });
}