"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Video, 
  BarChart3, 
  Upload, 
  Clock, 
  AlertTriangle,
  Settings,
  LogOut,
  Menu,
  X,
  Eye,
  Activity
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/pages/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/pages/statistics", icon: BarChart3 },
  { name: "Live Stream", href: "/pages/realtimeStreamPage", icon: Activity },
  { name: "Saved Videos", href: "/pages/saved-videos", icon: Video },
  { name: "Upload", href: "/pages/upload", icon: Upload },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 border border-slate-700 rounded-lg"
      >
        {collapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-40",
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <Eye className="w-6 h-6 text-slate-700" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-xl font-bold text-slate-900 block">iSPY</span>
                <span className="text-xs text-emerald-600 font-medium">Security Monitor</span>
              </div>
            )}
          </Link>
        </div>

        {/* Section Header */}
        {!collapsed && (
          <div className="px-6 py-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monitoring Hub</h3>
          </div>
        )}

        {/* Navigation */}
        <nav className="px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-medium"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm">{item.name}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick Stats */}
        {!collapsed && (
          <div className="absolute bottom-20 left-4 right-4 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-700">System Status</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Active</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                <span className="text-xs text-emerald-600 font-semibold">Online</span>
              </div>
            </div>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute bottom-4 left-4 right-4 items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
        >
          {collapsed ? (
            <Menu className="w-4 h-4 text-slate-600" />
          ) : (
            <>
              <X className="w-4 h-4 text-slate-600" />
              <span className="text-xs text-slate-600 font-medium">Collapse</span>
            </>
          )}
        </button>
      </aside>
    </>
  )
}
