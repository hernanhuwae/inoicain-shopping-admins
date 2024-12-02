"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {  columns, ProductColumn } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface IProductClient {
  data: ProductColumn[];
}

export const ProductClient: React.FC<IProductClient> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Product (${data.length})`}
          desc="Manage Product stores"
        />
        <Button onClick={() => router.push(`/${params.storeId}/product/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" desc="API for Product" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
