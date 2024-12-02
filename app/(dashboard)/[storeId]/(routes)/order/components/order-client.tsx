"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {  columns, OrderColumn } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface IOrderClient {
  data: OrderColumn[];
}

export const OrderClient: React.FC<IOrderClient> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Order (${data.length})`}
          desc="Manage order stores"
        />
        
      </div>
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
      
    </>
  );
};
