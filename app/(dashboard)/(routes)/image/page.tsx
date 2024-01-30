"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Download, ImageIcon} from "lucide-react";
import { Form, useForm , FormProvider} from "react-hook-form";

import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Select, SelectTrigger } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ImagePage = () => {
  const router = useRouter();
  const [images,setImages]=useState<string[]>([]);

    const form= useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt:"",
            amount:"1",
            resolution:"512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit= async(values: z.infer<typeof formSchema>) => {
        try {
          setImages([]);
          
            const response= await axios.post("/api/image", values);
            const urls= response.data.map((image:{url:string})=> image.url);
            setImages(urls);
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
            title="Generate Images"
            description="Generate images using AI"
            icon={ImageIcon}
            iconColor="text-red-500"
            bgColor="bg-red-500/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="A picture of a horse in Swiss Alps" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
                />
                <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
              <Button
                className="col-span-12 lg:col-span-2 bg-red-500 w-full" disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </FormProvider>

          <div
          className="space-y-4 mt-4">
            {isLoading && (
              <div className="p-20">
                <Loader />
              </div>
            )}
            {images.length== 0 && !isLoading && (
              <Empty 
                label="Start by making a prompt."
              />
            )}
            <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 xl:grid-col-4 gap-4 mt-8">
              {images.map((src)=>(
                <Card
                key={src}
                className="rounded-lg overflow-hidden"
                >
                    <div className="relative aspect-square">
                      <Image
                        alt="image"
                        fill
                        src={src}                      
                      />
                    </div>
                    <CardFooter className="p-2">
                        <Button onClick={()=> window.open(src)} variant="secondary" className="w-full">
                          <Download className="w-4 h-4 mr-2"/>
                          Download
                        </Button>
                      </CardFooter>
                </Card>
              ))}              
            </div>
        </div>
        </div>
        
        </div>
    )
}

export default ImagePage;