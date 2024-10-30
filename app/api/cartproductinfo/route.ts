import { NextRequest, NextResponse } from "next/server";
import {GetProductById} from "@/lib/woo";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
        const data = await GetProductById(Number(id), "variation");
        console.log(data)
        return new NextResponse(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } else {
        return new NextResponse("ID not provided", {status: 400});
    }
}