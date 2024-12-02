import React from 'react'
import prismadb from '@/lib/prismaDb'
import {format} from 'date-fns'
import { formatted } from '@/lib/utils'
import { ProductColumn } from './components/column'
import { ProductClient } from './components/product-client'

const productMainPage = async ({params}:{params:{storeId:string}}) => {

  const product= await prismadb.product.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
        Category:true,
        Size:true,
        Colour:true
    },
    orderBy:{
      createAt:"asc"
    }
  })
  const productFormatted: ProductColumn[]=product.map((item)=>({
    id: item.id,
    name:item.name,
    isFeatured:item.isFeatured,
    isArchieve:item.isArchieve,
    price:formatted.format(item.price.toNumber()),
    category:item.Category.name,
    size:item.Size.name,
    colour:item.Colour.value,
    createAt: format(item.createAt, "MMMM do, yyyy") // todo: npm i date-fns 

  }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-5'>
            <ProductClient data={productFormatted}/>
        </div>
    </div>
  )
}

export default productMainPage