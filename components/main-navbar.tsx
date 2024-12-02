"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNavbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboard`,
      label: "Billboard",
      active: pathname === `/${params.storeId}/billboard`,
    },
    {
      href: `/${params.storeId}/category`,
      label: "Category",
      active: pathname === `/${params.storeId}/category`,
    },
    {
      href: `/${params.storeId}/size`,
      label: "Size",
      active: pathname === `/${params.storeId}/size`,
    },
    {
      href: `/${params.storeId}/colour`,
      label: "Colour",
      active: pathname === `/${params.storeId}/colour`,
    },
    {
      href: `/${params.storeId}/product`,
      label: "Product",
      active: pathname === `/${params.storeId}/product`,
    },
    {
      href: `/${params.storeId}/order`,
      label: "Orders",
      active: pathname === `/${params.storeId}/order`,
    },
    
    {
      href: `/${params.storeId}/settingpage`,
      label: "Setting",
      active: pathname === `/${params.storeId}/settingpage`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-5", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-purple-700 font-semibold "
              : "text-black-700 font-semibold"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
