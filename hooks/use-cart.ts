import { create } from "zustand";
import { persist, createJSONStorage} from "zustand/middleware";

import {Product} from "@/lib/types";
import {toast} from "sonner";

interface CartStore{
    items: Product[];
    addToCart: (data: Product) => void;
    removeFromCart: (id: number) => void;
    removeAllFromCart: () => void;
}

const useCart  = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addToCart: (data:Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);
            if (existingItem) {
                toast.info("Item already in cart");
            } else {
                set({ items: [...get().items, data] });
                toast.success("Item added to cart");
            }
        },
        removeFromCart: (id: number) => {
            set({items: get().items.filter((item) => item.id !== id)});
            toast.success("Item removed from cart");
        },
        removeAllFromCart: () => {
            set({items: []});
            toast.success("All items removed from cart");
        }
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
    })
)

export default useCart;
