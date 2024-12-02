import prismadb from '@/lib/prismaDb'
import React from 'react'
import { ColourForm } from './components/colour-form'

const ColourNewPage = async({
    params
}:{
    params:{colourId:string}
}) => {

    const colour= await prismadb.colour.findUnique({
        where:{
            id:params.colourId
        }
    })

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8'>
            <ColourForm initialData={colour}/>
        </div>
    </div>
  )
}

export default ColourNewPage