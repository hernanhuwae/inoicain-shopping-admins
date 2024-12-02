import prismadb from '@/lib/prismaDb'
import React from 'react'
import { BillboardForm } from './components/billboard-form'

const BillboardNewPage = async({
    params
}:{
    params:{billboardId:string}
}) => {

    const billboard= await prismadb.billboard.findUnique({
        where:{
            id:params.billboardId
        }
    })

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8'>
            <BillboardForm initialData={billboard}/>
        </div>
    </div>
  )
}

export default BillboardNewPage