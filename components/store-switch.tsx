"use client";

import { store } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { UseStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
} from "./ui/command";

type PopoverTriggerprops = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface IStoreSwitch extends PopoverTriggerprops {
  items: store[];
}

export default function StoreSwitch({ className, items = [] }: IStoreSwitch) {
  const storeModal = UseStoreModal();
  const params = useParams();
  const router = useRouter();

  const formatItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formatItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Store"
          className={cn("w-[200px] justify-between", className)}
        >
          <Store className="mr-2 h-4 w-4" />
            {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search list store..." />
            <CommandEmpty>Not found a store</CommandEmpty>
            <CommandGroup>
              {formatItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <Store className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
            
            {/* Todo: Add new a store */}
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={()=>{
                setOpen(false)
                storeModal.onOpen()
              }}>
                <PlusCircle className="mr-2 h-2 w-5"/>
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>

        </Command>
      </PopoverContent>
    </Popover>
  );
}
