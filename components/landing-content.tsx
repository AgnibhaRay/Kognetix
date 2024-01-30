"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
const testimonials = [
  {
    name: "Agnibha Ray",
    avatar: "AR",
    title: "Digital Da Vinci of Kognetix ",
    description: "18yo, High School Student.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Man Behind</h2>
      <div className="items-center flex justify-center">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <div className="relative aspect-square rounded-lg">
                      <Image
                        alt="image"
                        src="/agni.jpg"  
                        className="object-cover"
                        fill
                      />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}