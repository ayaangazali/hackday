"use client"

import { Bell, Search, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const router = useRouter()
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search videos, events, analytics..."
            className="pl-10 bg-slate-50 border-slate-200 focus:border-emerald-500 text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white border-slate-200">
            <DropdownMenuLabel className="text-slate-900 font-semibold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-200" />
            <div className="max-h-96 overflow-y-auto">
              <DropdownMenuItem className="flex-col items-start p-4 hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center gap-2 mb-1 w-full">
                  <div className="w-2 h-2 bg-rose-500 rounded-full" />
                  <span className="text-sm font-semibold text-slate-900">Security Alert</span>
                  <span className="text-xs text-slate-500 ml-auto">2m ago</span>
                </div>
                <p className="text-xs text-slate-600">
                  Suspicious activity detected in Zone A
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex-col items-start p-4 hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center gap-2 mb-1 w-full">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-sm font-semibold text-slate-900">System Warning</span>
                  <span className="text-xs text-slate-500 ml-auto">15m ago</span>
                </div>
                <p className="text-xs text-slate-600">
                  Camera 3 connection unstable
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex-col items-start p-4 hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center gap-2 mb-1 w-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm font-semibold text-slate-900">Info</span>
                  <span className="text-xs text-slate-500 ml-auto">1h ago</span>
                </div>
                <p className="text-xs text-slate-600">
                  Weekly report is ready
                </p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-slate-200" />
            <DropdownMenuItem asChild>
              <Link href="/notifications" className="text-center text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="hover:bg-slate-100">
          <Settings className="w-5 h-5 text-slate-600" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border-slate-200">
            <DropdownMenuLabel className="text-slate-900 font-semibold">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-200" />
            <DropdownMenuItem 
              className="text-slate-700 hover:bg-slate-50 cursor-pointer"
              onClick={() => router.push('/account-settings')}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-slate-700 hover:bg-slate-50 cursor-pointer"
              onClick={() => router.push('/settings')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-200" />
            <DropdownMenuItem 
              className="text-rose-600 hover:bg-rose-50 cursor-pointer font-medium"
              onClick={() => router.push('/sign-in')}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
