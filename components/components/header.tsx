"use client"

import Image from "next/image"
import { NavigationMenuDemo } from "../client/navigation"
import { Menu } from 'lucide-react'
import Link from "next/link"
import CartBullet from "@/components/cart/CartBullet"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="relative">
            <div className="container mx-auto px-4">
                <div className="h-20 flex justify-between items-center">
                    <Link href={"/"} className="shrink-0">
                        <Image src="/logo.webp" alt="logo" width={178} height={200} />
                    </Link>

                    <div className="hidden lg:flex items-center space-x-4">
                        <NavigationMenuDemo />
                    </div>

                    <div className="flex items-center space-x-4">
                        <SignedIn>
                            <div className="hidden md:flex items-center space-x-4">
                                <UserButton />
                                <Link href="/account">
                                    <Button>Account</Button>
                                </Link>
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <div className="hidden md:block">
                                <Link href="/sign-in">
                                    <Button>Sign In</Button>
                                </Link>
                            </div>
                        </SignedOut>

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col gap-4">
                                    <div className="lg:hidden">
                                        <NavigationMenuDemo />
                                    </div>
                                    <SignedIn>
                                        <div className="md:hidden">
                                            <Link href="/account">
                                                <Button className="w-full">Account</Button>
                                            </Link>
                                        </div>
                                    </SignedIn>
                                    <SignedOut>
                                        <div className="md:hidden">
                                            <Link href="/sign-in">
                                                <Button className="w-full">Sign In</Button>
                                            </Link>
                                        </div>
                                    </SignedOut>
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <CartBullet />
                    </div>
                </div>
            </div>
        </header>
    )
}

