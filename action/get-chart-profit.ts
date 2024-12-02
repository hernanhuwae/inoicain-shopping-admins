

import prismadb from "@/lib/prismaDb"

interface GraphData{
    name: string
    total:number
}


export const getChartProfit= async(storeId:string)=>{
    const paidOrders = await prismadb.order.findMany({
        where:{
            storeId,
            isPaid:true
        },
        include:{
            OrderItem:{
                include:{
                    Product: true
                }
            }
        }
    })

    const monthProfit: {[key: number]: number} = {}

    for (const order of paidOrders){
        const month = order.createAt.getMonth()
        let profitForOrder= 0

        for(const item of order.OrderItem){
            profitForOrder += item.Product.price.toNumber()
        }

        monthProfit[month]= (monthProfit[month] || 0) + profitForOrder
    }

    const graphData:GraphData[] = [
        {name:"Jan", total:0},
        {name:"Feb", total:0},
        {name:"Mar", total:0},
        {name:"Apr", total:0},
        {name:"May", total:0},
        {name:"Jun", total:0},
        {name:"Jul", total:0},
        {name:"Aug", total:0},
        {name:"Sep", total:0},
        {name:"Oct", total:0},
        {name:"Nov", total:0},
        {name:"Dec", total:0},
    ];

    for(const month in monthProfit){
        graphData[parseInt(month)].total= monthProfit[parseInt(month)]
    }

    return graphData
}


