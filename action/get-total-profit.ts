import prismadb from "@/lib/prismaDb"

export const getTotalProfit= async(storeId: string)=>{
    const paidOrders= await prismadb.order.findMany({
        where:{
            storeId,
            isPaid:true
        },
        include:{
            OrderItem:{
                include:{
                    Product:true
                }
            }
        }
    })

    const totalProfit = paidOrders.reduce((total, order)=>{
        const orderTotal = order.OrderItem.reduce((orderSum, item)=>{
            return orderSum + item.Product.price.toNumber()
        },0)

        return total + orderTotal
    },0)

    return totalProfit
}