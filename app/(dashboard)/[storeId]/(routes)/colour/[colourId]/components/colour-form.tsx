"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import ImageUploader from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Colour} from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface IColourForm {
  initialData: Colour| null;
}

const formShema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type setFormSchemaValue = z.infer<typeof formShema>;

export const ColourForm: React.FC<IColourForm> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const route = useRouter();

  const title = initialData ? "Edit Colour" : "Create Colour";
  const desc = initialData ? "Edit a new Colour" : "Create a new Colour";
  const toastMessage = initialData
    ? "Colour Updated!"
    : "Colour Created!";
  const action = initialData ? "Save" : "Create";

  const form = useForm<setFormSchemaValue>({
    resolver: zodResolver(formShema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: setFormSchemaValue) => {
    try {
      setLoading(true);
      if(initialData){
        await axios.patch(`/api/${params.storeId}/colour/${params.colourId}`, data);
      }else{
        await axios.post(`/api/${params.storeId}/colour`, data);
      }
      toast.success(toastMessage);
      route.push(`/${params.storeId}/colour`)
      route.refresh();   
    } catch (error) {
      toast.error("ERROR");
    } finally {
      setLoading(false);
    }
  };


  //TODO: AKTIFIN TOMBOL DELETE DENGAN => setOpen(true) line 113 with Trash Icon 
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colour/${params.colourId}`);
      route.push(`/${params.storeId}/colour/`);
      route.refresh();
      toast.success("Your colour deleted!");
    } catch (error) {
      toast.error("All catgories using colour will be remove");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} desc={desc} />

        {initialData && (
          <Button
            className="hover:bg-green-500"
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colour</FormLabel>
                <FormControl>
                <Input
                      disabled={loading}
                      placeholder="Colour Name"
                      {...field}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                    <Input
                      disabled={loading}
                      placeholder="Colour Value"
                      {...field}
                    />
                    <div className="border p-4 rounded-full" style={{backgroundColor: field.value}}/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button disabled={loading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />

      
    </>
  );
};
