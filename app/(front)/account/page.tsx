'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { LogOut, Package, User, MapPin } from "lucide-react"
import Link from "next/link"

export default function AccountPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Account</h1>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">
                        <User className="h-4 w-4 mr-2" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="orders">
                        <Package className="h-4 w-4 mr-2" />
                        Orders
                    </TabsTrigger>
                    <TabsTrigger value="addresses">
                        <MapPin className="h-4 w-4 mr-2" />
                        Addresses
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>ACCOUNT DETAILS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Name: John Doe</p>
                                <p className="text-sm text-muted-foreground">Email: john.doe@example.com</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="orders" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>ORDER HISTORY</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">You have no orders yet.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="addresses" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>ADDRESS BOOK</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">You have no addresses added yet.</p>
                            <Button className="mt-4">Add New Address</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <Separator className="my-6" />
            <Link
                href="/auth/signout"
                className="flex items-center text-sm text-destructive hover:underline"
            >
                <LogOut className="h-4 w-4 mr-2" />
                LOG OUT
            </Link>
        </div>
    )
}