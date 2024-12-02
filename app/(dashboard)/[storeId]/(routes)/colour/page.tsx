import React from 'react'
import prismadb from '@/lib/prismaDb'
import {format} from 'date-fns'
import { ColourColumn } from './components/column'
import { ColourClient } from './components/colour-client'

const ColourMainPage = async ({params}:{params:{storeId:string}}) => {

  const colour= await prismadb.colour.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createAt:"asc"
    }
  })
  const colourFormatted: ColourColumn[]=colour.map((item)=>({
    id: item.id,
    name:item.name,
    value:item.value,
    createAt: format(item.createAt, "MMMM do, yyyy") // todo: npm i date-fns 

  }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-5'>
            <ColourClient data={colourFormatted}/>
        </div>
    </div>
  )
}

export default ColourMainPage