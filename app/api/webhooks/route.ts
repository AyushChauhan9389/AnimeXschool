import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import {db} from "@/lib/db/db";
import {users} from "@/lib/db/schema";
import {eq} from "drizzle-orm";


export async function POST(req: Request) {

    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data;
    const eventType = evt.type;
    if (evt.type === 'user.created') {
        if(typeof evt.data.username !== 'string') return new Response('username not there', { status: 555 }) ;
        await db.insert(users).values({userId: evt.data.id, email: evt.data.email_addresses[0].email_address, roleId: 3, username: evt.data.username})
        console.log("Created")
    }else if (evt.type == 'user.deleted') {
        if (typeof evt.data.id !== 'string') return ;  // Ensure evt.data.id is a string
        await db.delete(users).where(eq(users.userId, evt.data.id));
        console.log("Deleted");
    }else return new Response('db req fail', { status: 556 });

    return new Response('', { status: 200 })
}