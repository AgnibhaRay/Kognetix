"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font=Montserrat({
    weight:"600",
    subsets: ["latin"],
})

export const LandingNavbar = () => {
    const{isSignedIn}=useAuth();

    return (
        <nav className="p-4 bg-transparent items-center flex justify-between">
            <Link href="/" className="flex items-center">
                <div className="relative w-10 h-10 mr-4">
                    <Image
                        src="/logow.png"
                        alt="logo"
                        fill
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    Kognetix
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard":"/sign-up"}>
                    <Button variant="outline" className="rounded-full">
                        {isSignedIn ? "Dashboard" : "Get Started"}
                    </Button>
                </Link>

            </div>
        </nav>  
    )
}