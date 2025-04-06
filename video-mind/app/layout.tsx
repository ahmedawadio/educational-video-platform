import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ThemeProvider } from "next-themes";
import { SidebarToggle } from "@/components/layout/SidebarToggle";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { SearchCommand } from "@/components/layout/SearchCommand";
import { StoreProvider } from "@/providers/StoreProvider";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VideoMind",
  description: "A platform for video sharing and discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="video-mind-theme"
        >
          <Providers>
            <StoreProvider>
              <SidebarProvider>
                <div className="flex h-screen w-screen overflow-hidden">
                  <AppSidebar />
                  <main className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex w-full items-center justify-between p-4 h-16">
                      <div className="flex items-center">
                        <div className="w-8 flex-shrink-0">
                          <SidebarToggle />
                        </div>
                        <div className="h-4 w-px bg-gray-200 mx-4" />
                        <PageBreadcrumbs />
                      </div>
                      <SearchCommand />
                    </div>
                    <div className="flex-1 overflow-auto p-8">{children}</div>
                  </main>
                </div>
              </SidebarProvider>
            </StoreProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
