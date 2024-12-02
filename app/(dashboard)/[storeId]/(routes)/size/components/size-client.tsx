"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { columns, SizeColumn } from "./column";

interface ISizeClient {
  data: SizeColumn[];
}

export const SizeClient: React.FC<ISizeClient> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Size (${data.length})`}
          desc="Manage Size stores"
        />
        <Button onClick={() => router.push(`/${params.storeId}/size/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" desc="API for Size" />
      <Separator />
      <ApiList entityName="size" entityIdName="sizeId" />
    </>
  );
};
