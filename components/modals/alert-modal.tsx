"use client"

import { useEffect, useState } from "react"
import { Modal } from "../ui/modal"
import { Button } from "../ui/button"

interface IAlertModal{
    isOpen:boolean
    loading:boolean
    onClose:()=>void
    onConfirm:()=>void
}

export const AlertModal:React.FC<IAlertModal>=({
    isOpen,loading,onConfirm,onClose
})=>{
    const [isMounted, setMounted]= useState(false)

    useEffect(()=>{
        setMounted(true)
    },[])

    if(!isMounted){
        return null
    }

    return(
        <Modal 
            title="Are you sure?" desc="You will delete this data" isOpen={isOpen} onClose={onClose}
        >
            <div className="flex items-center justify-end w-full pt-6 space-x-2 ">
                <Button disabled={loading} variant="outline" onClick={onClose}>Cancel</Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>Continue</Button>
            </div>
        </Modal>
    )
}