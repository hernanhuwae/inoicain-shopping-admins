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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ICategoryForm {
  initialData: Category | null;
  billboardItem: Billboard[];
}

const formShema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type setFormSchemaValue = z.infer<typeof formShema>;

export const CategoryForm: React.FC<ICategoryForm> = ({
  initialData,
  billboardItem,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const route = useRouter();

  const title = initialData ? "Edit category" : "Create category";
  const desc = initialData ? "Edit a new category" : "Create a new category";
  const toastMessage = initialData ? "category Updated!" : "category Created!";
  const action = initialData ? "Save" : "Create";

  const form = useForm<setFormSchemaValue>({
    resolver: zodResolver(formShema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (data: setFormSchemaValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/category/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/category`, data);
      }
      toast.success(toastMessage);
      route.push(`/${params.storeId}/category`);
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
      await axios.delete(
        `/api/${params.storeId}/category/${params.categoryId}`
      );
      route.push(`/${params.storeId}/category/`);
      route.refresh();
      toast.success("Your category deleted!");
    } catch (error) {
      toast.error("All Products using this category will be removed!");
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
                      placeholder="Category Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboardItem.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
