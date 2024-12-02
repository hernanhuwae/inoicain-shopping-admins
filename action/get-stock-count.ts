import prismadb from "@/lib/prismaDb"

export const getStockCount= async (storeId:string)=>{
    const stockCount= await prismadb.product.count({
        where:{
            storeId,
            isArchieve:false
        }
    })

    return stockCount
}