import {
  FolderLock,
  BookmarkIcon,
  NavigationIcon,
  PencilLineIcon,
  SparklesIcon,
  Images,
} from "lucide-react";

export const NavMain = [
  {
    href: "/",
    label: "Home",
    icon: <SparklesIcon size={16} />,
  },
  {
    href: "/writing",
    label: "Writing",
    icon: <PencilLineIcon size={16} />,
  },
  {
    href: "/journey",
    label: "Journey",
    icon: <NavigationIcon size={16} />,
  },
  {
    href: "/bookmarks",
    label: "Bookmarks",
    icon: <BookmarkIcon size={16} />,
  },
  {
    href: "/gallery",
    label: "Gallery",
    icon: <Images size={16} />,
  },
  {
    href: "/projects",
    label: "Projects",
    icon: <FolderLock size={16} />,
  },
];
