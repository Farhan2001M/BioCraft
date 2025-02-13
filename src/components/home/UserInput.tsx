"use client";

import React, { useContext } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { generateBio } from "@/app/actions"
import { BioContext } from "@/context/bioContext"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import MetaIcon from "../icons/Meta";
import MistralIcon from "../icons/Mistral";
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info, Loader2 } from "lucide-react";
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';

const formSchema = z.object({
  model: z.string().min(0, "Model is required"),
  temperature: z.number().min(0, "Temperature must be at least 0").max(2, "Temperature must be at most 2"),
  content: z.string().min(0, "Content must be at least 40 characters long").max(1000, "Content must not be longer than 1000 characters"),
  type: z.enum(["personal", "brand"], { errorMap: () => ({ message: "Type is required" }) }),
  tone: z.enum(["professional", "casual", "sarcastic", "funny", "passionate", "thoughtful"], { errorMap: () => ({ message: "Tone is required" }) }),
  emojisAndHashtags: z.boolean(),
  platform: z.enum(["LinkedIn", "Facebook", "Twitter", "Instagram", "WhatsApp", "Reddit", "Snapchat", "TikTok"], {
    errorMap: () => ({ message: "Platform is required" })
  }),
});

const UserInput = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "llama3-8b-8192",
      temperature: 1,
      content: "",
      type: "personal",
      tone: "professional",
      emojisAndHashtags: false,
      platform: "LinkedIn", 
    },
  })

  const {setOutput , setLoading , loading} = useContext(BioContext);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitting form with values:", values);
  
    const userInputValues = `
      Platform: ${values.platform},
      User Input: ${values.content},
      Bio Tone: ${values.tone},
      Bio Type: ${values.type},
      EmojisAndHashtags: ${values.emojisAndHashtags},
    `;
  
    try {
      setLoading(true);
      const { data } = await generateBio(userInputValues, values.temperature, values.model, values.platform);
      setOutput(data);
    } catch (error) {
      console.error("Error generating bio:", error);
    } finally {
      setLoading(false);
    }
  }
  
  
  return (
    <div className='relative flex flex-col items-start gap-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-start gap-6">
          <fieldset className='grid gap-6 rounded-[8px] border border-slate-800 p-4 bg-background/50 backdrop-blur-sm'>
            <legend >Settings</legend>
            <div className='grid gap-4'>
              {/* form code goes here */}
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Your Model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="llama3-8b-8192">
                              <div className="flex items-start gap-3 text-muted-foreground">
                                <MetaIcon className="size-5" />
                                <div>
                                  <p>
                                    <span className="text-foreground font-medium mr-2">
                                      Llama 3
                                    </span>
                                    8B
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="mixtral-8x7b-32768">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MistralIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium mr-2">
                                    Mixtral
                                  </span>
                                  8x7b
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="llama3-70b-8192">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MetaIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium mr-2">
                                    Llama 3
                                  </span>
                                  70B
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      <span className="flex items-center justify-center">
                        Creativity
                        <Tooltip>
                          <TooltipTrigger >
                            <Info className="w-4 h-4 ml-1 cursor-pointer"  />
                          </TooltipTrigger>
                          <TooltipContent sideOffset={25} collisionPadding={20} className="max-w-sm" >
                            <p> A higher setting produces more creative and surprising bios, while a lower setting sticks to more predictable and conventional styles. </p>
                          </TooltipContent>
                        </Tooltip>
                      </span>
                      <span>{value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                      className=''
                        defaultValue={[1]}
                        min={0}
                        max={2}
                        step={0.1}
                        onValueChange={(val) => {
                          onChange(val[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <fieldset className="grid gap-6 rounded-[8px] border border-slate-800 p-4 bg-background/10 backdrop-blur-sm">
            <legend className="-ml-1 px-1 text-sm font-medium">
              User Input
            </legend>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      About Yourself
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add your old bio here or write a few sentances about Yourself to get started"
                        className="min-h-[10rem] resize-none "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="brand">Brand</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Tone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="sarcastic">Sarcastic</SelectItem>
                        <SelectItem value="funny">Funny</SelectItem>
                        <SelectItem value="passionate">Passionate</SelectItem>
                        <SelectItem value="thoughtful">Thoughtful</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="emojisAndHashtags"
                render={({ field }) => (
                  <FormItem className="flex items-end pb-2">
                    <FormLabel className="text-sm mr-4 pb-1 pl-5">Add Emojis & Hashtags</FormLabel>
                    <Switch checked={field.value} onCheckedChange={field.onChange} className="!my-0" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                        <SelectItem value="Reddit">Reddit</SelectItem>
                        <SelectItem value="Snapchat">Snapchat</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <Button 
            className="rounded" 
            type="submit" 
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Generate Bio
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UserInput