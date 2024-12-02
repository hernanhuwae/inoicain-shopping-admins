"use client"

import { Copy, Server } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Badge, BadgeProps } from "./badge"
import { Button } from "./button"
import toast from "react-hot-toast"

interface IApi{
    title:string
    desc:string
    variant: "public" | "admin"
}

const textMap: Record<IApi["variant"], string>={
    public:"Public",
    admin:"Admin"
}

const variantMap: Record<IApi["variant"], BadgeProps["variant"]>={
    public:"secondary",
    admin:"destructive"
}

export const ApiAlert:React.FC<IApi>=({
    title,desc,variant="public"
})=>{

    const onCopy=()=>{
        navigator.clipboard.writeText(desc)
        toast.success("Copied your API Route!")
    }

    return(
        <Alert>
            <Server className="h-4 w-4"/>
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className="flex mt-4 items-center justify-between">
                <code className="realtive rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {desc}
                </code>
                <Button  variant="outline" size="icon" onClick={onCopy}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>
        </Alert>
    )
}