"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { ColourColumn, columns} from "./column";

interface IColourClient {
  data: ColourColumn[];
}

export const ColourClient: React.FC<IColourClient> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`colour (${data.length})`}
          desc="Manage colour stores"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colour/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" desc="API for colour" />
      <Separator />
      <ApiList entityName="colour" entityIdName="colourId" />
    </>
  );
};
