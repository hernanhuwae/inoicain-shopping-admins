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
import { Billboard} from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface IBillboardForm {
  initialData: Billboard | null;
}

const formShema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type setFormSchemaValue = z.infer<typeof formShema>;

export const BillboardForm: React.FC<IBillboardForm> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const route = useRouter();

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const desc = initialData ? "Edit a new Billboard" : "Create a new Billboard";
  const toastMessage = initialData
    ? "Billboard Updated!"
    : "Billboard Created!";
  const action = initialData ? "Save" : "Create";

  const form = useForm<setFormSchemaValue>({
    resolver: zodResolver(formShema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: setFormSchemaValue) => {
    try {
      setLoading(true);
      if(initialData){
        await axios.patch(`/api/${params.storeId}/billboard/${params.billboardId}`, data);
      }else{
        await axios.post(`/api/${params.storeId}/billboard`, data);
      }
      toast.success(toastMessage);
      route.push(`/${params.storeId}/billboard`)
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
      await axios.delete(`/api/${params.storeId}/billboard/${params.billboardId}`);
      route.push(`/${params.storeId}/billboard/`);
      route.refresh();
      toast.success("Your Billboard deleted!");
    } catch (error) {
      toast.error("All catgories using billboard will be remove");
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Banner</FormLabel>
                <FormControl>
                  <ImageUploader
                   value={field.value ? [field.value] : []}
                   disable={loading}
                   onChange={(url)=> field.onChange(url)}
                   onRemove={(url)=> field.onChange("")}
                   />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-7">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />

      
    </>
  );
};
