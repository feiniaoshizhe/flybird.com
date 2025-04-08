import {
  FolderLock,
  BookmarkIcon,
  NavigationIcon,
  PencilLineIcon,
  SparklesIcon,
  Images,
} from "lucide-react";

export const NavMenu = [
  {
    url: "/",
    title: "Home",
    icon: SparklesIcon,
    isActive: true,
    items: [],
  },
  {
    url: "/writing",
    title: "Writing",
    icon: PencilLineIcon,
    isActive: true,
    items: [],
  },
  {
    url: "/journey",
    title: "Journey",
    icon: NavigationIcon,
    isActive: true,
    items: [],
  },
  {
    url: "/bookmarks",
    title: "Bookmarks",
    icon: BookmarkIcon,
    isActive: true,
    items: [],
  },
  {
    url: "/gallery",
    title: "Gallery",
    icon: Images,
    isActive: true,
    items: [],
  },
  {
    url: "/projects",
    title: "Projects",
    icon: FolderLock,
    isActive: true,
    items: [],
  },
];
