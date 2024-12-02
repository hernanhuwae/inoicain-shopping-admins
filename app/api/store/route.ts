import prismadb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const {userId}= auth()
        const body= await req.json()
        const {name}= body

        if(!userId){
            return new NextResponse("Unauthorized!", {status:404})
        }

        if(!name){
            return new NextResponse("Name is Required", {status:404})
        }

        const store= await prismadb.store.create({
            data:{
                userId,
                name
            }
        })
        return NextResponse.json(store)
    } catch (error) {
        console.log("STORES PORT ERROR", error);
        return new NextResponse("Internal ERROR", {status:500})
    }
}