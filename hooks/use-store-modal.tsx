import { create } from "zustand"

interface IUseStroreModal{
    isOpen: boolean
    onOpen: ()=>void
    onClose: ()=> void
}

export const UseStoreModal=create<IUseStroreModal>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))