"use client";

import {
  ArrowUpRightIcon,
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { IconType } from "react-icons/lib";

export function NavLinks({
  links,
}: {
  links: {
    title: string;
    url: string;
    icon: IconType;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Contact Me</SidebarGroupLabel>
      <SidebarMenu>
        {links.map((link) => (
          <SidebarMenuItem key={link.title}>
            <SidebarMenuButton asChild>
              <a
                key={link.url}
                target="_blank"
                href={link.url}
                className="flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-gray-200"
              >
                <span className="inline-flex items-center gap-2 font-medium">
                  <link.icon size={16} />
                  {link.title}
                </span>
                <ArrowUpRightIcon className="" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {/* <SidebarMenuItem>
          <SidebarMenuButton>
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
