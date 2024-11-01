import CartPage from "@/components/cart/CartPage";
import {db} from "@/lib/db/db";
import {address} from "@/lib/db/schema";
import getuserid from "@/lib/server-utils";
import {eq} from "drizzle-orm";
import CheckoutPage from "@/components/cart/checkout";

export default async function MainCheckOutPage() {
    const userId = await getuserid()
    const addresses = await db.select().from(address).where(eq(address.userId, userId!))
    const ModaledAddress = addresses.map((address) => {
        return{
            id: address.addressId,
            name: address.country,
            address: address.addressId + ", " + address.addressLine2 + ", " + address.city + ", " + address.state + ", " + address.country + ", " + address.pinCode
        }
    })
    return (
        <div>
            <CheckoutPage addresses={ModaledAddress} userId={userId!} />
        </div>
    );
}