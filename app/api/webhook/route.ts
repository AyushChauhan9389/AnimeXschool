import Stripe from "stripe";
import { headers } from "next/headers"

import {NextRequest, NextResponse} from "next/server";
import { stripe} from "@/lib/stripe";
import {db} from "@/lib/db/db";
import {order} from "@/lib/db/schema";
import {eq} from "drizzle-orm";


export async function POST(req: NextRequest){
    const body = await req.text();
    const signature = req.headers.get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    }catch (err: any){
        return new NextResponse(`Webhook Error: ${err}`, {status: 400});
    }
    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    if(event.type === 'checkout.session.completed'){
        const orderData = await db.update(order).set({
            status: 'completed',
        }).where(eq(order.orderId, Number(session?.metadata?.orderID)))
    }
    return new NextResponse(null, {status: 200});
}