import prismadb from '@/lib/prismaDb'
import React from 'react'
import { SizeForm } from './components/size-form'

const SizeNewPage = async({
    params
}:{
    params:{sizeId:string}
}) => {

    const size= await prismadb.size.findUnique({
        where:{
            id:params.sizeId
        }
    })

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8'>
            <SizeForm initialData={size}/>
        </div>
    </div>
  )
}

export default SizeNewPage