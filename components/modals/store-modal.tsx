"use client"

import { UseStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from 'axios'
import {toast} from "react-hot-toast"

const formSchema=z.object({
    name: z.string().min(1)
})

export const ModalStore=()=>{
    const functionStoreModal= UseStoreModal()
    const [loading,setLoading]=useState(false)
    const form= useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:""
        }

    })
    const onSubmit= async (values: z.infer<typeof formSchema>)=>{
        try {
            setLoading(true)

            const response= await axios.post('/api/store', values)
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error("Something wrong Modal Store")  
        }finally{
            setLoading(false)
        }
    }

    return(
        <Modal title="Create your Store" desc="Inoicain" isOpen={functionStoreModal.isOpen} 
        onClose={functionStoreModal.onClose}>
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name Shop</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Entername your store" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <div className="pt-7 flex space-x-4 justify-end items-center w-full ">
                                <Button disabled={loading} variant={"outline"} onClick={functionStoreModal.onClose}>Cancel</Button>
                                <Button disabled={loading} type="submit">Continue</Button>
                            </div>

                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}