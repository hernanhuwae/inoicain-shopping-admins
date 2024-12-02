import prismadb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { SettingForm } from "./components/setting-form"

 interface ISetting{
  params:{
    storeId:string
  }
 }


const SettingPage:React.FC<ISetting> = async ({
  params
}) => {

  const {userId}= auth()

  if(!userId){
    redirect("/sign-in")
  }

  const store= await prismadb.store.findFirst({
    where:{
      id:params.storeId,
      userId
    }
  })

  if(!store){
    redirect("/")
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-7 pt-8">
        <SettingForm initialData={store}/>
      </div>
     
    </div>
  )
}

export default SettingPage