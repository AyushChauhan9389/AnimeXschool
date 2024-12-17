import Stripe from "stripe";
import {NextRequest, NextResponse} from "next/server";
import {Product} from  "@/lib/types";
import { stripe} from "@/lib/stripe";
import {auth} from "@clerk/nextjs/server";
import getuserid from "@/lib/server-utils";
import { db } from "@/lib/db/db";
import {address, order} from "@/lib/db/schema";
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
    const ItemsData = items as ProductCartData[];
    const userId = await getuserid();

    // Verify if the address belongs to the current user
    const userAddress = await db
        .select()
        .from(address)
        .where(eq(address.addressId, addressData.id))
        .then(rows => rows[0]);

    if (userAddress && userAddress.userId === userId) {
        // Verify each item in the cart
        for (const item of ItemsData as ProductCartData[]) {
            const product = await GetProductById(item.product.id, item.product.type);

            // Check if product data matches the item data
            if (!compareProducts(product, item.product)) {
                return NextResponse.json({ error: 'Item data does not match product data.' }, { status: 400 });
            }
        }

        const line_Items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        ItemsData.forEach((item) => {
            line_Items.push({
                quantity: item.quantity,
                price_data:{
                    currency: 'INR',
                    product_data:{
                        name: item.product.name,
                        images: [item.product.images[0].src]
                    },
                    unit_amount: item.product.sale_price === "" ? Number(item.product.regular_price) * 100 : Number(item.product.sale_price) * 100
                }
            })
        });
        const OrderData = await db.insert(order).values({
            userId: userId,
            addressId: Number(addressData.id),
            productData: ItemsData,
            total: line_Items.reduce((acc, item) => acc + item.price_data!.unit_amount! * item.quantity!, 0)
        }).returning();
        const session =  await stripe.checkout.sessions.create({
            line_items: line_Items,
            mode: 'payment',
            billing_address_collection: 'required',
            phone_number_collection: {
                enabled: true
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/${OrderData[0].orderId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/${OrderData[0].orderId}`,
            metadata: {
                orderID: OrderData[0].orderId
            }

        })
        return NextResponse.json({
            url: session.url
        },{
            headers: corsHeaders
        });

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

