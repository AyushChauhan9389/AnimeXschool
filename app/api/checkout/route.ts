import Stripe from "stripe";
import {NextRequest, NextResponse} from "next/server";
import {Product} from  "@/lib/types";
import { stripe} from "@/lib/stripe";
import {auth} from "@clerk/nextjs/server";
import getuserid from "@/lib/server-utils";
import { db } from "@/lib/db/db";
import { address } from "@/lib/db/schema";
import { eq } from 'drizzle-orm';
import { GetProductById } from "@/lib/woo";
import { ProductCartData } from "@/hooks/use-cart";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async  function POST(req: NextRequest){
    await auth.protect()

    const { items, payment, address: addressData } = await req.json();

    const userId = await getuserid();

    // Verify if the address belongs to the current user
    const userAddress = await db
        .select()
        .from(address)
        .where(eq(address.addressId, addressData.id))
        .then(rows => rows[0]);

    if (userAddress && userAddress.userId === userId) {
        // Verify each item in the cart
        for (const item of items as ProductCartData[]) {
            const product = await GetProductById(item.product.id, item.product.type);

            // Check if product data matches the item data
            if (!compareProducts(product, item.product)) {
                return NextResponse.json({ error: 'Item data does not match product data.' }, { status: 400 });
            }
            // You can use item.quantity here if needed
        }
        return NextResponse.json({ success: true });

        // ...proceed with processing the order...
    } else {
        // Address does not belong to user
        return NextResponse.json({ error: 'Invalid address.' }, { status: 400 });
    }
}

// Helper function to compare products
function compareProducts(product: Product, item: Product): boolean {
    // Convert IDs to numbers for comparison
    const productId = Number(product.id);
    const itemId = Number(item.id);
    return productId === itemId;
}

