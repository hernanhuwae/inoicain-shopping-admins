"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from 'next-cloudinary'

interface IImageUploader {
  disable?: boolean;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUploader: React.FC<IImageUploader> = ({
  disable,
  value,
  onChange,
  onRemove,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload=(result:any)=>{
    onChange(result.info.secure_url)
  }

  if (!isMounted) {
    return null;
  }

  return(
    <div>
        <div className="flex items-center mb-4 gap-4">
            {value.map((url)=>(
                <div key={url} className="relative w-[200px] h-[200px] rounded-sm overflow-hidden">
                    <div className="z-10 absolute top-2 right-2">
                        <Button type="button" onClick={()=> onRemove(url)} variant="destructive" size="icon">
                            <Trash className="h-4 w-4"/>
                        </Button>
                    </div>

                    <Image fill className="object-cover" src={url} alt="image"/>
                </div>
            ))}
        </div>
        <CldUploadWidget  onSuccess={onUpload} uploadPreset="kzjz1wch">
           {({open})=>{
            const onClick=()=>{
                open()
            }
            return(
                <Button type="button" disabled={disable} variant="secondary" onClick={onClick}>
                    <ImagePlus className="mr-2 h-4 w-4"/>
                    Upload an Image Banner
                </Button>
            )
           }}
        </CldUploadWidget>
    </div>
  )
};

export default ImageUploader;
