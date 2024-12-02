import prismadb from "@/lib/prismaDb"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"


//TODO: Pertama sebelum buat API webhook command buat dapat secret key Stripe WEBHOOKnya => stripe listen --forward-to localhost:3000/api/webhook (Sesuai route folder api)
//TODO : Setelah dapat SK_STRIPE , Buat API Webhook Stripe halaman ini
//TODO : lanjut Stripe CLI Trigger events with the CLI di tab cmd berbeda => stripe trigger payment_intent.succeeded 

export async function POST(req: Request){
    const body = await req.text()
    const signature= headers().get("Stripe-Signature") as string

    let event : Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SK!
        )
    } catch (error: any) {
        return new NextResponse(`WEBHOOK ERROR: ${error.message}`,{status:400})
    }

    const session= event.data.object as Stripe.Checkout.Session
    const address= session?.customer_details?.address 

    const addressComponent = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ]

    const addressString= addressComponent.filter((value)=>value !== null).join(', ')

    //Todo: Kondisi Checkout berhasil table order admin updated

    if(event.type === 'checkout.session.completed'){
         const order = await prismadb.order.update({
            where:{
                id:session?.metadata?.orderId
            },
            data:{
              isPaid:true,
              address: addressString,
              phone: session?.customer_details?.phone || '',
            },
            include:{
                OrderItem:true
            }
         }) 

         const productIds = order.OrderItem.map((orderitems)=> orderitems.productId)

         await prismadb.product.updateMany({
            where:{
                id:{
                    in: [...productIds]
                }
            },
            data:{
                isArchieve:false
            }
         }
        )
    }

    return new NextResponse(null, {status:200})
}