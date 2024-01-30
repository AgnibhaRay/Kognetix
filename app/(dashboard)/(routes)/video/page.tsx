"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { LucideIcon, MessageCircleCodeIcon, MessageCircleIcon, Music2, Music3Icon, Music4, MusicIcon, VideoIcon } from "lucide-react";
import { Form, useForm , FormProvider} from "react-hook-form";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const VideoPage = () => {
  const router = useRouter();
  const [video,setVideo]= useState<string>();

    const form= useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt:""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit= async(values: z.infer<typeof formSchema>) => {
        try {
          setVideo(undefined);

          const response= await axios.post("/api/video", values);
          
          setVideo(response.data[0]);
          form.reset();
        } catch (error: any) {
          //Todo: Pro Modal
          console.log(error) 
        }
        finally {
          router.refresh();
        }
    }

    return (
        <div>
            <Heading 
            title="Generate Videos"
            description="Generate videos with AI"
            icon={VideoIcon}
            iconColor="text-green-500"
            bgColor="bg-green-500/10"
            />
            <div className="px-4 lg:px-8">
            <FormProvider {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="Clown Fish Swimming around a coral reef" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 bg-green-500 w-full" disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </FormProvider>

          <div
          className="space-y-4 mt-4">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <Loader />
              </div>
            )}
            {!video && !isLoading && (
              <Empty 
                label="Start by making a prompt"
              />
            )}
            {video && (
              <video controls className="w-full aspect-video rounded-lg border bg-black">
                <source src={video}/>
              </video>
            )}
          
          </div>
        </div>
        </div>

    )
}

export default VideoPage;