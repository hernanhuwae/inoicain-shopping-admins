import prismadb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    if (!name) {
      return new NextResponse("Name is Required!", { status: 404 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 404 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id:params.storeId,
        userId
      },
      data: {
        name
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("error STORE_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(_req:Request,{ params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 404 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id:params.storeId,
        userId 
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("error STORE_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
