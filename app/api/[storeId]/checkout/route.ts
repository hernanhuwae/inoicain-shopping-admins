import prismadb from '@/lib/prismaDb'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const corsHeaders={
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
}

export async function OPTIONS(){
    return NextResponse.json({}, {headers: corsHeaders})
}

export async function POST(req: Request, {params}:{params:{storeId:string}}){
  const {productIds} = await req.json()

  if(!productIds || productIds.length === 0){
    return new NextResponse("Product ID are Required", {status:400})
  }

  const products= await prismadb.product.findMany({
    where:{
        id:{
            in: productIds
        }
    }
  })

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[]=[]

  products.forEach((product)=>{
    line_items.push({
        quantity:1,
        price_data:{
            currency:'IDR',
            product_data:{
                name:product.name
            },
            unit_amount: product.price.toNumber() * 100
        }
    })
  })



  const order = await prismadb.order.create({
    data:{
        storeId:params.storeId,
        isPaid:false,
        OrderItem:{
            create: productIds.map((productId:string)=>({
        
                //  todo: "Product" adalah model prisma harus sama dengan schema prisma
                Product:{    
                    connect:{
                        id: productId
                    }
                }
            }))
        }
    }
  })

  const sessions = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
        enabled: true
    },

    success_url: `${process.env.INOICAIN_SHOP_URL}/cart?success=1`,
    cancel_url: `${process.env.INOICAIN_SHOP_URL}/cart?cancel=1`,
    metadata:{
        orderId:order.id
    }
  })
  return NextResponse.json({url: sessions.url},{
    headers:corsHeaders
  })
}
