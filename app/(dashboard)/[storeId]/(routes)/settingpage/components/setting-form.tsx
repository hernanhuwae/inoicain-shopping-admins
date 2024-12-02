"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ISettingForm {
  initialData: store;
}

const formShema = z.object({
  name: z.string().min(1),
});

type setFormSchemaValue = z.infer<typeof formShema>;

export const SettingForm: React.FC<ISettingForm> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const route = useRouter();
  const origin= useOrigin()

  const form = useForm<setFormSchemaValue>({
    resolver: zodResolver(formShema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: setFormSchemaValue) => {
    try {
      setLoading(true);
      await axios.patch(`/api/store/${params.storeId}`, data);
      route.refresh();
      toast.success("Store Updated!");
    } catch (error) {
      toast.error("ERROR");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/store/${params.storeId}`);
      route.refresh();
      route.push("/");
      toast.success("Your Store deleted!");
    } catch (error) {
      toast.error("All Store and catgories will be remove");
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
        <Heading title="Setting" desc="Manage store preferences" />
        <Button
          className="hover:bg-green-500"
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-full"
        >
          <div className="grid grid-cols-3 gap-7">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            Save
          </Button>
        </form>
      </Form>
      <Separator/>

      <ApiAlert 
        title="NEXT_PUBLIC_API_URL" 
        desc={`${origin}/api/${params.storeId}`} 
        variant="public"/>
    </>
  );
};
