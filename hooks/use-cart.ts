import { create } from "zustand";
import { persist, createJSONStorage} from "zustand/middleware";

import {Product} from "@/lib/types";
import {toast} from "sonner";

export type ProductCartData = {
    product: Product;
    quantity: number;
}
interface CartStore{
    items: ProductCartData[];
    addToCart: (data: ProductCartData) => void;
    removeFromCart: (id: number) => void;
    removeAllFromCart: () => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

const useCart  = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addToCart: (data:ProductCartData) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.product.id === data.product.id);
            if (existingItem) {
                set({
                    items: currentItems.map(item =>
                        item.product.id === data.product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                });
                toast.info("Increased Quantity");
            } else {
                set({ items: [...get().items, data] });
                toast.success("Item added to cart");
            }
        },
        removeFromCart: (id: number) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.product.id === id);
            if (existingItem) {
                if (existingItem.quantity - 1 <= 0) {
                    set({ items: currentItems.filter((item) => item.product.id !== id) });
                    toast.success("Item removed from cart");
                } else {
                    set({
                        items: currentItems.map((item) =>
                            item.product.id === id
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                    });
                    toast.info("Decreased Quantity");
                }
            }
        },
        removeAllFromCart: () => {
            set({items: []});
            toast.success("All items removed from cart");
        },
        increaseQuantity: (id: number) => {
            const currentItems = get().items;
            set({
                items: currentItems.map(item =>
                    item.product.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            });
            toast.info("Increased Quantity");
        },
        decreaseQuantity: (id: number) => {
            const currentItems = get().items;
            const existingItem = currentItems.find(item => item.product.id === id);
            if (existingItem) {
                if (existingItem.quantity - 1 <= 0) {
                    set({ items: currentItems.filter(item => item.product.id !== id) });
                    toast.success("Item removed from cart");
                } else {
                    set({
                        items: currentItems.map(item =>
                            item.product.id === id
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                    });
                    toast.info("Decreased Quantity");
                }
            }
        }
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
    })
)

export default useCart;
