'use client'

import {Button} from "@/components/ui/button";
import {ShoppingCartIcon} from "lucide-react";
import useCart from "@/hooks/use-cart";

export default function CartBullet() {
    const cart  = useCart()
    return(
        <Button className="absolute top-5 right-5 flex gap-2">
            <ShoppingCartIcon /> {cart.items.length}
        </Button>
    )
}