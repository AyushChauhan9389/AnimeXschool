'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon, Minus, Plus } from "lucide-react"
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import {Product} from "@/lib/types";
import {ProductCartData} from "@/hooks/use-cart";
import useCart from "@/hooks/use-cart";
import Link from "next/link";


export default function CartSheet() {
    const cart = useCart()
    const updateQuantity = (id: number, increment: boolean) => {
        if (increment) {
            cart.increaseQuantity(id)
        }else {
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
        <Sheet>
            <SheetTrigger asChild>
                <Button className="absolute top-5 right-5 flex gap-2">
                    <ShoppingCartIcon /> {cart.items.length}
                </Button>
            </SheetTrigger>
            <SheetTitle className="sr-only">Cart</SheetTitle>
            <SheetContent className="w-full sm:max-w-lg">
                <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold mb-6">MY CART</h2>

                   <div className="flex-1 overflow-auto">
                      {cart.items.map(item => {
                          const price = item.product.sale_price !== "" ? item.product.sale_price : item.product.regular_price;
                          return (
                              <div key={item.product.id} className="mb-6">
                                  <div className="flex gap-4">
                                      <Image
                                          src={item.product.images[0].src}
                                          alt={item.product.name}
                                          width={120}
                                          height={160}
                                          className="object-cover"
                                      />
                                      <div className="flex-1">
                                          <h3 className="font-medium">{item.product.name}</h3>
                                          <p className="text-sm text-muted-foreground">
                                              Size: {item.product.attributes[0].options}
                                          </p>
                                          <div className="mt-2">
                                              <span className="text-primary">Rs. {Number(price).toFixed(2)}</span>
                                              <span className="ml-2 text-sm text-muted-foreground line-through">
                                                  Rs. {Number(item.product.regular_price).toFixed(2)}
                                              </span>
                                          </div>
                                          <div className="flex items-center gap-2 mt-2">
                                              <Button
                                                  variant="outline"
                                                  size="icon"
                                                  onClick={() => updateQuantity(Number(item.product.id), false)}
                                              >
                                                  <Minus className="h-4 w-4" />
                                              </Button>
                                              <span className="w-8 text-center">{item.quantity}</span>
                                              <Button
                                                  variant="outline"
                                                  size="icon"
                                                  onClick={() => updateQuantity(Number(item.product.id), true)}
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
                   </div>

                    {cart.items.length > 0 && (
                        <div className="mt-auto">
                            <div className="bg-amber-100 text-amber-900 p-3 rounded-md mb-4 text-center">
                                Congrats! You are qualified for free shipping!
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <span className="font-medium">Subtotal:</span>
                                <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
                            </div>

                            <Button className="w-full bg-black text-white mb-2">
                                CHECKOUT
                            </Button>
                            <Link href={"/cart"}>
                                <Button variant="outline" className="w-full">
                                    VIEW CART
                                </Button>
                            </Link>

                            <p className="text-sm text-muted-foreground text-center mt-4">
                                Tax included. <span className="underline">Shipping</span> calculated at checkout.
                            </p>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}