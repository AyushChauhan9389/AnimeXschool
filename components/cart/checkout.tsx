'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Home, Truck, Check, Minus, Plus } from "lucide-react"
import Image from 'next/image'
import useCart from "@/hooks/use-cart"
import {toast} from "sonner";
import {useRouter} from "next/navigation";

type Props = {
    addresses: {
        id: number;
        name: string;
        address: string;
    }[]
    userId: number;
}
type Address = {
    id: number;
    name: string;
    address: string;
}

export default function CheckoutPage({ addresses, userId }: Props) {
    const [selectedAddress, setSelectedAddress] = useState<Address>(addresses[0])
    const [selectedPayment, setSelectedPayment] = useState<string | null>("stripe")
    const [executing, setExecuting] = useState(false)
    const cart = useCart()
    const router = useRouter()

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

    const handleCheckout = async () => {
        if (!selectedAddress) {
            toast.error("Please select an address.")
            return
        }
        if (!selectedPayment) {
            toast.error("Please select a payment method.")
            return
        }

        const payload = {
            address: selectedAddress,
            payment: selectedPayment,
            items: cart.items
        }
        setExecuting(true)
        const data = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        if (!data.ok) {
            const error = await data.json()
            toast.error(error.error)
            return
        }else {
            toast.success("Order placed successfully!")
            cart.removeAllFromCart()
            router.push("/cart")
        }
        setExecuting(false)

        // Proceed with checkout logic
    }

    const shipping = 0 // Free shipping
    const total = subtotal + shipping

    if(executing){
        return (
            <div className="container mx-auto px-4 py-8 h-screen ">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                <div className="flex justify-center items-center w-full h-full">
                    <CreditCard className="h-20 w-20 animate-spin text-primary" />
                </div>
            </div>
        )
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Accordion type={"multiple"} defaultValue={["address"]} className="w-full" >
                        <AccordionItem value="address">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2">
                                    <Home className="h-5 w-5" />
                                    <span>Select Address</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.map((address) => (
                                        <Card
                                            key={address.id}
                                            className={`cursor-pointer transition-all ${selectedAddress.id === address.id ? 'border-2 border-primary' : 'hover:shadow-md'}`}
                                            onClick={() => setSelectedAddress(addresses.find(a => a.id === address.id)!)}
                                        >
                                            <CardContent className="p-4 flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold">{address.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{address.address}</p>
                                                </div>
                                                {selectedAddress.id === address.id && (
                                                    <Check className="text-primary h-5 w-5" />
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                <Button className="mt-4">Add New Address</Button>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="payment">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    <span>Select Payment Method</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card
                                    className={`cursor-pointer transition-all ${selectedPayment === 'stripe' ? 'border-2 border-[#6772e5]' : 'hover:shadow-md'}`}
                                    onClick={() => setSelectedPayment('stripe')}
                                >
                                    <CardContent className="p-4 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Image src="/stripe.svg" alt="Stripe logo" width={24} height={24} />
                                            <span className="font-semibold">Pay with Stripe</span>
                                        </div>
                                        {selectedPayment === 'stripe' && (
                                            <Check className="text-[#6772e5] h-5 w-5" />
                                        )}
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {cart.items.map(item => {
                                const price = item.product.sale_price !== "" ? item.product.sale_price : item.product.regular_price;
                                return (
                                    <div key={item.product.id} className="mb-6">
                                        <div className="flex gap-4">
                                            <Image
                                                src={item.product.images[0].src}
                                                alt={item.product.name}
                                                width={80}
                                                height={80}
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
                                                        aria-label={`Decrease quantity of ${item.product.name}`}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQuantity(Number(item.product.id), true)}
                                                        aria-label={`Increase quantity of ${item.product.name}`}
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
                            })}
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>Rs. {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-primary">Free</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>Rs. {total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Button
                                className="mt-4"
                                disabled={executing}
                                onClick={handleCheckout}
                            >
                                {executing ? "Processing" : "Place Order"}
                            </Button>
                            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                                <Truck className="h-4 w-4" />
                                <span>Congrats! You are qualified for free shipping!</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}