import React from 'react'
import { BillboardClient } from './components/bill-client'
import prismadb from '@/lib/prismaDb'
import { BillboardColumn } from './components/column'
import {format} from 'date-fns'

const BillboardMainPage = async ({params}:{params:{storeId:string}}) => {

  const billboard= await prismadb.billboard.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createAt:"asc"
    }
  })
  const BillboardFormatted: BillboardColumn[]=billboard.map((item)=>({
    id: item.id,
    label:item.label,
    createAt: format(item.createAt, "MMMM do, yyyy") // todo: npm i date-fns 

  }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-5'>
            <BillboardClient data={BillboardFormatted}/>
        </div>
    </div>
  )
}

export default BillboardMainPage