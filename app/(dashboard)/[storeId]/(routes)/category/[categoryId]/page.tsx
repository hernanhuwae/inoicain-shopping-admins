import prismadb from '@/lib/prismaDb'
import React from 'react'
import { CategoryForm } from './components/category-form'

const CategoryNewPage = async({params}:{params:{categoryId:string, storeId:string}}) => {

    const category= await prismadb.category.findUnique({
        where:{
            id: params.categoryId
        }
    })

    const billboard= await prismadb.billboard.findMany({
      where:{
        storeId: params.storeId
      }
    })

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8'>
          <CategoryForm billboardItem={billboard} initialData={category}/>
        </div>
    </div>
  )
}

export default CategoryNewPage