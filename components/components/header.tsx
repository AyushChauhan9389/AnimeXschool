import Image from "next/image";
import { NavigationMenuDemo } from "../client/navigation";
import {Instagram} from "lucide-react";

export default function Header() {
  return (
    <header>
      <div className="w-full bg-black text-white py-1 flex justify-center font-sans font-medium">Welcome to AnimeXschool</div>
      <div className="h-20 flex justify-center items-center">
        <Image src="/logo.webp" alt="logo" width={178} height={200} />
      </div>
      <div className="py-2 flex justify-center mt-4">
      <NavigationMenuDemo />
      </div>

    </header>
  );
}