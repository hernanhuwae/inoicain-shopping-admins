import prismadb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(
  _req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 404 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include:{
        billboard:true
      }
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("error CategoryID_GET", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("User ID is required!", { status: 404 });
    }
    if (!name) {
      return new NextResponse("name is required!", { status: 404 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard ID is required!", { status: 404 });
    }

    const UserByStoreId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!UserByStoreId) {
      return new NextResponse("User by Store ID is required!", { status: 404 });
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("Error CategoryID_PATCH", error);
    return new NextResponse("Error Internal", { status: 500 });
  }
}

export async function DELETE(_req:Request,{
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UserID is Required!", { status: 404 });
    }

    if (!params.categoryId) {
      return new NextResponse("CategoryId is Required!", { status: 404 });
    }

    const UserByStoreId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if(!UserByStoreId){
        return new NextResponse("User by Store Id is Required!", {status:404})
    }

    const category= await prismadb.category.deleteMany({
        where:{
            id: params.categoryId
        }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("Error CategoryID_Delete", error);
    return new NextResponse("Internal Error", {status:500})    
  }
}
