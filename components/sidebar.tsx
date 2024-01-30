"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Code2, CodeSquareIcon, ImageIcon, ImageMinus, ImageOffIcon, LayoutDashboardIcon, MessageCircle, MessageCircleCodeIcon, MessageCircleDashed, MessageCircleHeart, Music, Music2Icon, Settings2Icon, Video, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({weight:"600", subsets: ["latin"] });


const routes = [
    {
        label: "Dashboard",
        icon:LayoutDashboardIcon,
        href: "/dashboard",
        color: "text-white",
    },
    {
        label: "Ask Me Anything",
        icon: MessageCircle,
        href: "/conversation",
        color: "text-blue-500",
    },
    {
        label: "Generate Images",
        icon:ImageIcon,
        href: "/image",
        color: "text-red-500",
    },
    {
        label: "Generate Videos",
        icon:VideoIcon,
        href: "/video",
        color: "text-green-500",
    },
    {
        label: "Generate Music",
        icon:Music,
        href: "/music",
        color: "text-yellow-500",
    },
    {
        label: "Generate Code",
        icon:CodeSquareIcon,
        href: "/code",
        color: "text-purple-500",
    },
    {
        label: "Settings",
        icon:Settings2Icon,
        href: "/settings",
        color: "text-white",
    }
]

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div className="space-y-4 py-4 flex flex-col h-full
        bg-[#202123] text-white
        ">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-20 h-20 mr-4">
                        <Image src="/logow.png" alt="logo" fill />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                        Kognetix
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                        href={route.href}
                        key={route.href}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover: text-white hover:bg-white/10 rounded-lg transition", pathname===route.href ? "text-white bg-white/10" : "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("w-5 h-5 mr-4", route.color)} />
                                
                                {route.label}
                                
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;