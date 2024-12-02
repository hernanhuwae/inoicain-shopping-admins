"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name: string
  price:string
  size:string
  category:string
  colour: string
  isFeatured:boolean
  isArchieve:boolean
  createAt:string
}


export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "colour",
    header: "Colour",
    cell:({row})=>(
      <div className="flex items-center gap-x-2">
        {row.original.colour}
        <div className="h-5 w-5 rounded-full border" 
        style={{backgroundColor: row.original.colour}}/>
      </div>
    )
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchieve",
    header: "Archieve",
  },
  {
    accessorKey: "createAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row})=> <CellAction data={row.original}/>
  }

]
