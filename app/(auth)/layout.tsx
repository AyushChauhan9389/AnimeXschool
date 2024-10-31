import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-screen flex justify-center items-center relative">
            <Link href={"/"} className="absolute left-1/2 transform -translate-x-1/2 top-10">
              <Image src="/logo.webp" alt="logo" width={278} height={400} />
            </Link>
            {children}
        </div>
    );
}
