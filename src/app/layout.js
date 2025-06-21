import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Chatbot</title>
        <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet"></link>
      </head>
        <body>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-gradient-to-br from-[#ece9fc] to-[#d6e0fc]">
              <div className="flex justify-center h-screen py-8 px-4">
                <div className="w-full max-w-2xl">
                  {children}
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </body>
    </html>
  );
}
