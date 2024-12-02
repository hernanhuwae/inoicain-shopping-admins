import prismadb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(_req:Request,{ params }: { params: {billboardId: string } }) {
    try {
     
      if (!params.billboardId) {
        return new NextResponse("Billboard ID is required", { status: 404 });
      }
  
      const billboard = await prismadb.billboard.findUnique({
        where: {
          id:params.billboardId,
        },
      });
  
      return NextResponse.json(billboard);
    } catch (error) {
      console.log("error BILLBOARD_ GET", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string ,billboardId:string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label,imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 404 });
    }

    if (!label) {
      return new NextResponse("Label is Required!", { status: 404 });
    }
    if (!imageUrl) {
      return new NextResponse("ImageUrl is Required!", { status: 404 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 404 });
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


    const billboard = await prismadb.billboard.updateMany({
      where: {
        id:params.billboardId
      },
      data: {
        label,
        imageUrl
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("error BILLBOARD_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(_req:Request,{ params }: { params: {storeId:string, billboardId: string } }) {
  try {
    const {userId}= auth()

    if(!userId){
        return new NextResponse("Unauthenticated!", { status: 404 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 404 });
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

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id:params.billboardId,
        
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("error BILLBOARD_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
