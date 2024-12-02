import prismadb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(_req:Request,{ params }: { params: {sizeId: string } }) {
    try {
     
      if (!params.sizeId) {
        return new NextResponse("size ID is required", { status: 404 });
      }
  
      const size = await prismadb.size.findUnique({
        where: {
          id:params.sizeId,
        },
      });
  
      return NextResponse.json(size);
    } catch (error) {
      console.log("error size_ GET", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string ,sizeId:string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name,value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 404 });
    }

    if (!name) {
      return new NextResponse("name is Required!", { status: 404 });
    }
    if (!value) {
      return new NextResponse("value is Required!", { status: 404 });
    }

    if (!params.sizeId) {
      return new NextResponse("size ID is required", { status: 404 });
    }

    const UserbyStoreId= await prismadb.store.findFirst({
        where:{
            id: params.storeId,
            userId
        }
    })

    if(!UserbyStoreId){
        return new NextResponse("Unauthorized!")
    }


    const size = await prismadb.size.updateMany({
      where: {
        id:params.sizeId
      },
      data: {
        name,
        value
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("error size_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(_req:Request,{ params }: { params: {storeId:string, sizeId: string } }) {
  try {
    const {userId}= auth()

    if(!userId){
        return new NextResponse("Unauthenticated!", { status: 404 });
    }

    if (!params.sizeId) {
      return new NextResponse("size ID is required", { status: 404 });
    }

    const UserbyStoreId= await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })

    if (!UserbyStoreId) {
        return new NextResponse("Unauthorized", { status: 404 });
      }

    const size = await prismadb.size.deleteMany({
      where: {
        id:params.sizeId,
        
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("error size_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
