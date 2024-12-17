import {db} from "@/lib/db/db";
import {address, order} from "@/lib/db/schema";
import {eq} from "drizzle-orm";
import getuserid from "@/lib/server-utils";
import Link from "next/link";

export default async function OrderPage({params}: { params: { orderID: string } }) {
    const userId = await getuserid()
    const {orderID} = await params
    const orderDetails = await db.select().from(order).where(eq(order.orderId, Number(orderID)))
    if (orderDetails.length === 0 || orderDetails[0].userId !== userId) {
        return (
            <div className="h-96 bg-white flex flex-col justify-center items-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">Order Not Found</h1>
                    <p className="text-gray-600 mb-4">The order you are looking for does not exist or you do not have access to view it.</p>
                    <Link href="/" className="text-blue-500 hover:text-blue-700 font-medium">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        )
    }

    const orderData = orderDetails[0]
    const OrderAddress = await db.select().from(address).where((eq(address.addressId, orderData.addressId)))
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h1>
                
                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold mb-2">Order Information</h2>
                        <p className="text-gray-600">Order ID: {orderData.orderId}</p>
                        <p className="text-gray-600">Order Date: {orderData.createdAt.toString()}</p>
                        <p className="text-gray-600">Status: {orderData.status}  <span className="font-medium text-green-600"></span></p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
                        <p className="text-gray-600">Total Amount: {orderData.total} </p>
                        <p className="text-gray-600">Payment Method: Stripe</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold mb-2">Delivery Details</h2>
                        <p className="text-gray-600">
                            {OrderAddress[0].addressLine1}, {OrderAddress[0].addressLine2}, {OrderAddress[0].city}, {OrderAddress[0].state}, {OrderAddress[0].country}, {OrderAddress[0].pinCode}
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-blue-500 hover:text-blue-700 font-medium">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}