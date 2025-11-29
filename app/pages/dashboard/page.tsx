"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
  Video,
  Activity,
  AlertTriangle,
  Clock,
  Play,
  Camera,
  TrendingUp,
  Shield,
  Eye,
  RefreshCw,
  ArrowUpRight
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [recentEvents, setRecentEvents] = useState<Array<{
    title: string;
    description: string;
    timestamp: string;
    type: "alert" | "warning" | "success";
    platform: string;
  }>>([
    {
      title: "Suspicious Activity Detected",
      description: "Motion detected in restricted Zone A",
      timestamp: "2 minutes ago",
      type: "alert",
      platform: "camera-1"
    },
    {
      title: "Safety Alert",
      description: "PPE compliance violation in Zone B",
      timestamp: "5 minutes ago",
      type: "warning",
      platform: "camera-2"
    },
    {
      title: "System Update",
      description: "Camera 3 reconnected successfully",
      timestamp: "10 minutes ago",
      type: "success",
      platform: "system"
    },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen -m-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-1">iSPY Security Monitor</h1>
            <p className="text-emerald-600 font-medium flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Real-time tracking of your security ecosystem
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-500">Last updated:</p>
              <p className="text-sm font-semibold text-slate-700">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-lg">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Cameras Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Active Cameras</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">8</div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>25.0%</span>
            </div>
          </div>

          {/* Total Incidents Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Total Incidents</span>
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">1,250</div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>8.2%</span>
            </div>
          </div>

          {/* Active Alerts Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Active Alerts</span>
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">4</div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>12.5%</span>
            </div>
          </div>

          {/* Response Time Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Avg Response Time</span>
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">2.3s</div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>15.0%</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Camera Feeds */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Feed */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                    <span className="text-sm font-semibold text-slate-800">Zone A - Main Entrance</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="/pages/realtimeStreamPage">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Play className="w-3 h-3 mr-1.5" />
                      Go Live
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <video 
                  src="/videos/Robbery1.mp4" 
                  autoPlay 
                  loop 
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Secondary Feeds Grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { zone: 'Zone B - Storage', video: '/videos/Shoplifting1.mp4' },
                { zone: 'Zone C - Office', video: '/videos/Fighting1.mp4' },
                { zone: 'Zone D - Parking', video: '/videos/Vandalism3.mp4' }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all cursor-pointer group">
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    <video 
                      src={item.video} 
                      autoPlay 
                      loop 
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-xs text-slate-700 font-medium">Active</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white rounded-full p-3 shadow-lg">
                        <Play className="w-5 h-5 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50">
                    <p className="text-xs text-slate-600 font-medium">{item.zone}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Camera Status Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Camera Status</h3>
                <Link href="/pages/saved-videos">
                  <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                    View All
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Zone A - Main Entrance', status: 'Active', incidents: 12 },
                  { name: 'Zone B - Storage', status: 'Active', incidents: 8 },
                  { name: 'Zone C - Office', status: 'Active', incidents: 5 },
                  { name: 'Zone D - Parking', status: 'Active', incidents: 15 },
                ].map((zone, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-sm font-medium text-slate-700">{zone.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{zone.incidents} incidents</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Activity Feed */}
          <div className="space-y-6">
            {/* Incident Timeline Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Incident Timeline</h3>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="text-slate-500 min-w-[80px]">Nov 23</div>
                  <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1.5 rounded-full" style={{ width: '65%' }} />
                  </div>
                  <div className="font-semibold text-slate-700">0.000257</div>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  Price: <span className="text-emerald-600 font-semibold">$0.000257</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-rose-500" />
                  Recent Activity
                </h3>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentEvents.map((event, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      event.type === 'alert' ? 'bg-rose-100' :
                      event.type === 'warning' ? 'bg-amber-100' :
                      'bg-emerald-100'
                    }`}>
                      {event.type === 'alert' && <AlertTriangle className="w-4 h-4 text-rose-600" />}
                      {event.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                      {event.type === 'success' && <Shield className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{event.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{event.description}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                          event.type === 'alert' ? 'bg-rose-100 text-rose-700' :
                          event.type === 'warning' ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {event.type === 'alert' ? 'Critical' : 
                           event.type === 'warning' ? 'Warning' : 'Resolved'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-400">{event.platform}</span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs text-slate-400">{event.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-1">System Status</h3>
              <p className="text-emerald-100 text-sm mb-4">All systems operational</p>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/pages/statistics">
                  <button className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm">
                    <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-xs font-medium">Analytics</p>
                  </button>
                </Link>
                <Link href="/pages/saved-videos">
                  <button className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm">
                    <Video className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-xs font-medium">Videos</p>
                  </button>
                </Link>
                <Link href="/pages/upload">
                  <button className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm">
                    <Camera className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-xs font-medium">Upload</p>
                  </button>
                </Link>
                <Link href="/pages/realtimeStreamPage">
                  <button className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm">
                    <Play className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-xs font-medium">Live Stream</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
