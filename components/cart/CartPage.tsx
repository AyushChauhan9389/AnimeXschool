'use client'

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import useCart from "@/hooks/use-cart"
import Link from "next/link";

export default function CartPage() {
    const cart = useCart()

    const updateQuantity = (id: number, increment: boolean) => {
        if (increment) {
            cart.increaseQuantity(id)
        } else {
            cart.decreaseQuantity(id)
        }
    }

    const removeItem = (id: number) => {
        cart.removeFromCart(id)
    }

    const subtotal = cart.items.reduce((sum, item) => {
        const price = item.product.sale_price !== "" ? item.product.sale_price : item.product.regular_price;
        return sum + (Number(price) * item.quantity);
    }, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {cart.items.length === 0 ? (
                        <p className="text-center text-muted-foreground">Your cart is empty.</p>
                    ) : (
                        cart.items.map(item => {
                            const price = item.product.sale_price !== "" ? item.product.sale_price : item.product.regular_price;
                            return (
                                <div key={item.product.id} className="mb-6">
                                    <div className="flex gap-4">
                                        <Image
                                            src={item.product.images[0].src}
                                            alt={item.product.name}
                                            width={120}
                                            height={160}
                                            className="object-cover rounded-md"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium">{item.product.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Size: {item.product.attributes[0].options}
                                            </p>
                                            <div className="mt-2">
                                                <span className="text-primary font-semibold">Rs. {Number(price).toFixed(2)}</span>
                                                {item.product.sale_price && (
                                                    <span className="ml-2 text-sm text-muted-foreground line-through">
                                                        Rs. {Number(item.product.regular_price).toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(Number(item.product.id), false)}
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(Number(item.product.id), true)}
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="link"
                                                className="text-primary p-0 h-auto mt-2"
                                                onClick={() => removeItem(Number(item.product.id))}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                    <Separator className="mt-4" />
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-muted p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>Rs. {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-primary">Free</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>Rs. {subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                        {cart.items.length > 0 && (
                            <>
                                <div className="mt-6">
                                    <Link href={`/checkout`}>
                                        <Button className="w-full bg-primary text-primary-foreground">
                                            CHECKOUT
                                        </Button>
                                    </Link>
                                </div>
                                <div className="bg-amber-100 text-amber-900 p-3 rounded-md mt-4 text-center text-sm">
                                    Congrats! You are qualified for free shipping!
                                </div>
                            </>
                        )}
                        <p className="text-sm text-muted-foreground text-center mt-4">
                            Tax included. <span className="underline cursor-pointer">Shipping</span> calculated at checkout.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}