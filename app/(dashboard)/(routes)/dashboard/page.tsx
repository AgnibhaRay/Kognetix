"use client"

import Navbar from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowRightCircleIcon, CodeSquare, CodeSquareIcon, ImageIcon, MessageCircle, Music, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
    {
        lable: "Ask Me Anything",
        icon: MessageCircle,
        color:"text-blue-500",
        bgColor:"bg-blue-500/10",
        href: "/conversation",
        desc: "AI bot that answers your questions"
    },
    {
        lable: "Generate Images",
        icon: ImageIcon,
        color:"text-red-500",
        bgColor:"bg-red-500/10",
        href: "/image",
        desc:"Generate images using AI"
    },
    {
        lable: "Generate Videos",
        icon: VideoIcon,
        color:"text-green-500",
        bgColor:"bg-green-500/10",
        href: "/videos",
        desc:"Generate videos using AI"
    },
    {
        lable: "Generate Music",
        icon: Music,
        color:"text-yellow-500",
        bgColor:"bg-yellow-500/10",
        href: "/music",
        desc:"Generate music using AI"
    },
    {
        lable: "Generate Code",
        icon: CodeSquareIcon,
        color:"text-purple-500",
        bgColor:"bg-purple-500/10",
        href: "/code",
        desc:"AI bot that codes for you"
    }
]
const DashboardPage = () => {
    const router = useRouter();
    return (
        <div>
            
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Chat with the smartest AI - Experience the power of AI, all at one place.
                </p>
            </div>
            <div className="px-4 md:px-3. lg-px-32 space-y-4">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                <h3 className="text-lg">{tool.lable}</h3>
                                <p className="text-sm text-muted-foreground">{tool.desc}</p>
                            </div>
                        </div>
                        <ArrowRightCircleIcon/>
                    </Card>
                ))}
            </div>
        </div>
        
        
    );
}
export default DashboardPage;