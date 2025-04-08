import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export interface MainMenu {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
}

export interface ContactLink {
    title: string;
    url: string;
    icon: IconType;
}