"use client"
import { UseStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetupPage=()=>{
  const onOpen = UseStoreModal((set)=>set.onOpen)
  const isOpen = UseStoreModal((set)=>set.isOpen)

  useEffect(()=>{
    if(!isOpen){
      onOpen()
    }
  },[isOpen, onOpen])

  return null
}

export default SetupPage