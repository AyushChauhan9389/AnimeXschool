'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Home, Truck, Check, Minus, Plus } from "lucide-react"
import Image from 'next/image'
import useCart from "@/hooks/use-cart"

export default function CheckoutPage() {
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
    const cart = useCart()

    const addresses = [
        { id: '1', name: 'John Doe', address: '123 Main St, City, Country' },
        { id: '2', name: 'Jane Smith', address: '456 Elm St, Town, Country' },
    ]

    const paymentMethods = [
        { id: 'card', name: 'Credit Card' },
        { id: 'paypal', name: 'PayPal' },
    ]

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

    const shipping = 0 // Free shipping
    const total = subtotal + shipping

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Accordion type="single" collapsible className="w-full">
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
                                            className={`cursor-pointer transition-all ${selectedAddress === address.id ? 'border-2 border-primary' : 'hover:shadow-md'}`}
                                            onClick={() => setSelectedAddress(address.id)}
                                        >
                                            <CardContent className="p-4 flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold">{address.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{address.address}</p>
                                                </div>
                                                {selectedAddress === address.id && (
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
                                <RadioGroup value={selectedPayment || ''} onValueChange={setSelectedPayment}>
                                    {paymentMethods.map((method) => (
                                        <div key={method.id} className="flex items-center space-x-2 mb-2">
                                            <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
                                            <Label htmlFor={`payment-${method.id}`}>{method.name}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                {selectedPayment === 'card' && (
                                    <div className="mt-4 space-y-4">
                                        <Input type="text" placeholder="Card Number" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input type="text" placeholder="MM/YY" />
                                            <Input type="text" placeholder="CVC" />
                                        </div>
                                    </div>
                                )}
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
                            <Button className="w-full mt-6" size="lg">
                                Place Order
                            </Button>
                            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                                <Truck className="h-4 w-4" />
                                <span>Congrats! You're qualified for free shipping!</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}