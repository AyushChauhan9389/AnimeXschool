import Image from "next/image";
import { NavigationMenuDemo } from "../client/navigation";
import {Instagram} from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="h-20 flex justify-center items-center">
        <Link href={"/"}>
            <Image src="/logo.webp" alt="logo" width={178} height={200} />
        </Link>
      </div>
      <div className="py-2 flex justify-center mt-4">
      <NavigationMenuDemo />
      </div>

    </header>
  );
}