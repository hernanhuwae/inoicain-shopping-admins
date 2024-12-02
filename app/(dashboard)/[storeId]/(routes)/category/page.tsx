import prismadb from '@/lib/prismaDb'
import React from 'react'
import { CategoryColumn } from './components/column'
import { format } from 'date-fns'
import { CategoryClient } from './components/category-client'

const CategoryMainPage = async({params}:{params:{storeId:string}}) => {


  const category= await prismadb.category.findMany({
    where:{
      storeId:params.storeId 
    },
    include:{
      billboard:true
    },
    orderBy:{
      createAt:"desc"
    }
  })
  const CategoryFormatted: CategoryColumn[]=category.map((item)=>({
    id:item.id,
    name:item.name,
    billboardLabel:item.billboard.label,
    createAt: format(item.createAt, "MMMM do, yyyy")
  }))
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-5'>
        <CategoryClient data={CategoryFormatted}/>
      </div>
    </div>
  )
}

export default CategoryMainPage