import { UserButton } from "@clerk/nextjs";
import { MainNavbar } from "./main-navbar";
import StoreSwitch from "./store-switch";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismaDb";
import { ThemeToggle } from "./theme-toggle";

const Navbar = async() => {
    const {userId}= auth()

    if(!userId){
        redirect('/sign-in')
    }

    const stores= await prismadb.store.findMany({
        where:{
            userId
        }
    })

    return ( 
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitch items={stores}/>
                <MainNavbar className="mx-5"/>
                <div className="flex ml-auto items-center space-x-5">
                    <ThemeToggle/>
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;