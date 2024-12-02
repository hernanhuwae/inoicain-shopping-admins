import React from 'react'
import prismadb from '@/lib/prismaDb'
import {format} from 'date-fns'
import { formatted } from '@/lib/utils'
import { OrderColumn } from './components/column'
import { OrderClient } from './components/order-client'

const OrderMainPage = async ({params}:{params:{storeId:string}}) => {

  const order= await prismadb.order.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
        OrderItem:{
            include:{
                Product:true
            }
        }
    },
    orderBy:{
      createAt:"asc"
    }
  })
  const orderFormatted: OrderColumn[]=order.map((item)=>({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.OrderItem.map((orderItems)=>orderItems.Product.name).join(', '),
    totalPrice: formatted.format(item.OrderItem.reduce((total, item)=>{
      return total+ Number(item.Product.price)
    },0)),
    isPaid: item.isPaid,
    createAt: format(item.createAt, "MMMM do, yyyy") // todo: npm i date-fns 

  }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-5'>
          <OrderClient data={orderFormatted}/>
        </div>
    </div>
  )
}

export default OrderMainPage