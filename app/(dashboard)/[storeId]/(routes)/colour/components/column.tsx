"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColourColumn = {
  id: string
  name: string
  value:string
  createAt:string
}


export const columns: ColumnDef<ColourColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell:({row})=>(
        <div className="flex items-center gap-2">
            {row.original.value}
            <div className="h-6 w-6 rounded-full border" style={{backgroundColor:row.original.value}}></div>
        </div>
    )
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
