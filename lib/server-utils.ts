'use server'

import {currentUser} from "@clerk/nextjs/server";
import {db} from "@/lib/db/db";
import {users} from "@/lib/db/schema";
import {eq} from "drizzle-orm";

export default async function getuserid(){
    const user = await currentUser()
    const currentuserid = user?.id.toString();
    if (!currentuserid) return null;
    const userdata = await db.select().from(users).where(eq(users.userId, currentuserid))
    return userdata[0].id
}