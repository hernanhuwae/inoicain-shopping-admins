"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface IBillboardClient {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<IBillboardClient> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Billboard (${data.length})`}
          desc="Manage billboard stores"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboard/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" desc="API for Billboard" />
      <Separator />
      <ApiList entityName="billboard" entityIdName="billboardId" />
    </>
  );
};
