import prismadb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(_req:Request,{ params }: { params: {colourId: string } }) {
    try {
     
      if (!params.colourId) {
        return new NextResponse("colour ID is required", { status: 404 });
      }
  
      const colour = await prismadb.colour.findUnique({
        where: {
          id:params.colourId,
        },
      });
  
      return NextResponse.json(colour);
    } catch (error) {
      console.log("error colour_ GET", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string ,colourId:string } }
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

    if (!params.colourId) {
      return new NextResponse("colour ID is required", { status: 404 });
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


    const colour = await prismadb.colour.updateMany({
      where: {
        id:params.colourId
      },
      data: {
        name,
        value
      },
    });

    return NextResponse.json(colour);
  } catch (error) {
    console.log("error colour_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(_req:Request,{ params }: { params: {storeId:string, colourId: string } }) {
  try {
    const {userId}= auth()

    if(!userId){
        return new NextResponse("Unauthenticated!", { status: 404 });
    }

    if (!params.colourId) {
      return new NextResponse("colour ID is required", { status: 404 });
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

    const colour = await prismadb.colour.deleteMany({
      where: {
        id:params.colourId,
        
      },
    });

    return NextResponse.json(colour);
  } catch (error) {
    console.log("error colour_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
