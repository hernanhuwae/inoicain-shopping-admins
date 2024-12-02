import React from 'react'
import prismadb from '@/lib/prismaDb'
import {format} from 'date-fns'
import { SizeColumn } from './components/column'
import { SizeClient } from './components/size-client'

const SizeMainPage = async ({params}:{params:{storeId:string}}) => {

  const size= await prismadb.size.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createAt:"asc"
    }
  })
  const sizeFormatted: SizeColumn[]=size.map((item)=>({
    id: item.id,
    name:item.name,
    value:item.value,
    createAt: format(item.createAt, "MMMM do, yyyy") // todo: npm i date-fns 

  }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-5'>
            <SizeClient data={sizeFormatted}/>
        </div>
    </div>
  )
}

export default SizeMainPage