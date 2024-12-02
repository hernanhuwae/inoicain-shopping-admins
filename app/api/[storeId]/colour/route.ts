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
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 404 });
    }
    if (!name) {
      return new NextResponse("name is Required", { status: 404 });
    }
    if (!value) {
      return new NextResponse("value is Required", { status: 404 });
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
      return new NextResponse("User by store ID is required!");
    }

    const colour = await prismadb.colour.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(colour);
  } catch (error) {
    console.log("colour POST PORT ERROR", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("StoreId is Required", { status: 404 });
    }
    const colour = await prismadb.colour.findMany({
        where:{
            storeId:params.storeId
        }
    });
    return NextResponse.json(colour);
  } catch (error) {
    console.log("colour GET PORT ERROR", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}
