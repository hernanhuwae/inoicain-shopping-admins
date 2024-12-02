import prismadb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 404 });
    }
    if (!name) {
      return new NextResponse("Name is required!", { status: 404 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard ID is required!", { status: 404 });
    }
    if (!params.storeId) {
      return new NextResponse("StoreId is Required", { status: 404 });
    }

    const UserByStoreId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!UserByStoreId) {
      return new NextResponse("User by store ID is required!", {status:404});
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY POST PORT ERROR", error);

    return new NextResponse("Internal ERROR", { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID not found", { status: 404 });
    }

    const category = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY GET PORT ERROR", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}
