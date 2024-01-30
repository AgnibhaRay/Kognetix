"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Code2Icon, CodeSquareIcon, LucideIcon, MessageCircleCodeIcon, MessageCircleIcon } from "lucide-react";
import { Form, useForm , FormProvider} from "react-hook-form";

import ReactMarkdown from "react-markdown";
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

const CodePage = () => {
  const router = useRouter();
  const [messages,setMessages]= useState<ChatCompletionRequestMessage[]>([]);

    const form= useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt:""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit= async(values: z.infer<typeof formSchema>) => {
        try {
          const userMessage: ChatCompletionRequestMessage = {
            role: "user",
            content: values.prompt,
          };
          const newMessages = [...messages, userMessage];


          const response= await axios.post("/api/code", {
            messages: newMessages
          });

          setMessages((current)=> [...current, userMessage, response.data]);

          console.log(response.data)
          
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
            title="Generate Code"
            description="AI bot that codes for you"
            icon={CodeSquareIcon}
            iconColor="text-purple-500"
            bgColor="bg-purple-500/10"
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
                        placeholder="Simple button using react hooks" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 bg-purple-500 w-full" disabled={isLoading}
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
            {messages.length== 0 && !isLoading && (
              <Empty 
                label="Start by asking me a question"
              />
            )}
          <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message) => (
                <div 
                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                              message.role=="user"? "bg-purple-500/20 border-black10": "bg-purple-500/10 border-black10"
                )}
                key={message.content}
                
                >
                  {message.role === "user" ? <UserAvatar/>: <BotAvatar/>}
                  <ReactMarkdown components={{
                    pre:({node, ...props }) =>(
                        <div className="overflow-auto w-full my-2 bg-black/10 rounded-lg">
                          <pre {...props}/>
                        </div>
                    ),
                    code:({node, ...props }) =>(
                      <code className="bg-black/10 p-1 rounded-lg" {...props}/>
                    )
                  }}

                  className="text-sm overflow-hidden leading-7"
                >
                    {message.content || ""}
                  </ReactMarkdown>
                </div>
              ))}
          </div>
        </div>
        </div>
        
        </div>
    )
}

export default CodePage;