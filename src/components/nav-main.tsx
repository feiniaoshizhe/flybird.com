"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { MainMenu } from "@/types/main-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavMain({ items }: { items: MainMenu[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <MainLink key={index} item={item} index={index} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function MainLink({ item, index }: { item: MainMenu; index: number }) {
  const pathname = usePathname();
  let isActive = false;
  if (pathname?.length > 0) {
    const splittedPathname = pathname.split("/");
    const currentPathname = splittedPathname[1] ?? "";
    isActive = currentPathname === item.url.split("/")[1];
  }

  return (
    <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={item.title}
          // isActive={isActive}
          className={cn(
            "group flex items-center justify-between rounded-lg p-2 active:bg-black",
            isActive && "bg-black text-white not-hover:*"
          )}
        >
          <a href={item.url}>
            <span className="flex items-center gap-2">
              <item.icon size={16} />
              <span className={cn("font-medium")}>{item.title}</span>
            </span>
            <span
              className={cn(
                "hidden size-5 place-content-center rounded-sm border border-gray-200 bg-gray-100 text-xs font-medium text-gray-500 transition-colors duration-200 group-hover:border-gray-300 lg:grid",
                isActive &&
                  "border-gray-600 bg-gray-700 text-gray-200 group-hover:border-gray-600"
              )}
              title={`Shortcut key: ${index + 1}`}
            >
              {index + 1}
            </span>
          </a>
        </SidebarMenuButton>
        {/* 子菜单 */}
        {item.items?.length ? (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRight />
                <span className="sr-only">Toggle</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      <a href={subItem.url}>
                        <span>{subItem.title}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  );
}
