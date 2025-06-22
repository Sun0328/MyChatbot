'use client'
import * as React from "react"
import { MessageSquare, Briefcase, Settings, LogOut, User, ChartCandlestick } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Sidebar data.
const data = {
  navMain: [
    {
      title: "My bots",
      items: [
        {
          title: "Chat Bot",
          url: "/chat",
          icon: MessageSquare,
        },
        {
          title: "Job Tracker Bot",
          url: "/jobtracker",
          icon: Briefcase,
        },
        {
          title: "US Stock Analysis Bot",
          url: "/stock",
          icon: ChartCandlestick,
        },
      ],
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Account",
          url: "/account",
          icon: User,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
        {
          title: "Log out",
          url: "/logout",
          icon: LogOut,
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {

  // toast when switch to different bot
  const pathname = usePathname()
  const [previousPath, setPreviousPath] = React.useState(pathname)

  React.useEffect(() => {
    // Check if path has changed and it's a bot page
    if (previousPath !== pathname) {
      const currentBot = data.navMain[0].items.find(item => item.url === pathname)
      if (currentBot) {
        toast.success(`Switched to ${currentBot.title}`)
      }
      setPreviousPath(pathname)
    }
  }, [pathname, previousPath])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row items-center justify-between">
        <a href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden **:hover:cursor-pointer hover:text-gray-500">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="font-semibold">Trained Bots</span>
        </a>

        <SidebarTrigger className="h-8 w-8 group-data-[collapsible=icon]:mx-auto cursor-pointer"/>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                        <Link href={item.url}>
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent> 
      <SidebarRail />
    </Sidebar>
  );
}
