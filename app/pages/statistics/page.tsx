"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MetricCard, ActivityCard } from "@/components/dashboard-cards"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { 
  ArrowUpDown, 
  Download, 
  AlertTriangle, 
  TrendingUp, 
  Video, 
  Clock,
  Activity,
  Shield,
  Eye,
  BarChart3,
  FileText
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface KeyMoment {
  videoName: string
  timestamp: string
  description: string
  isDangerous: boolean
}

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

export default function StatisticsPage() {
  const [keyMoments, setKeyMoments] = useState<KeyMoment[]>([])
  const [summary, setSummary] = useState<string>('')
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [chartData, setChartData] = useState<any>({
    videoData: [],
    timelineData: [],
    dangerDistribution: [],
  })
  const [metrics, setMetrics] = useState({
    totalIncidents: 0,
    dangerousCount: 0,
    activeVideos: 0,
    avgResponseTime: '2.3s',
  })

  const exportToCSV = () => {
    const csvContent = [
      ['Video Name', 'Timestamp', 'Description', 'Is Dangerous'].join(','),
      ...keyMoments.map(moment => [
        moment.videoName,
        moment.timestamp,
        `"${moment.description}"`,
        moment.isDangerous
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `safety-statistics-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    // Demo data for when localStorage is empty
    const demoVideos = [
      {
        name: "Front Entrance Monitor",
        timestamps: [
          { timestamp: "00:15", description: "Person loitering near entrance for extended period", isDangerous: true },
          { timestamp: "02:30", description: "Unauthorized access attempt detected", isDangerous: true },
          { timestamp: "05:45", description: "Normal foot traffic", isDangerous: false },
          { timestamp: "08:20", description: "Suspicious package left unattended", isDangerous: true },
        ]
      },
      {
        name: "Parking Lot Camera A",
        timestamps: [
          { timestamp: "01:10", description: "Vehicle break-in detected", isDangerous: true },
          { timestamp: "03:25", description: "Regular parking activity", isDangerous: false },
          { timestamp: "06:40", description: "Altercation between two individuals", isDangerous: true },
          { timestamp: "09:15", description: "Vehicle departing normally", isDangerous: false },
        ]
      },
      {
        name: "Store Interior - Aisle 3",
        timestamps: [
          { timestamp: "00:45", description: "Shoplifting incident in progress", isDangerous: true },
          { timestamp: "02:55", description: "Customer browsing products", isDangerous: false },
          { timestamp: "05:30", description: "Potential theft - individual concealing items", isDangerous: true },
          { timestamp: "07:50", description: "Staff restocking shelves", isDangerous: false },
        ]
      },
      {
        name: "Warehouse Loading Dock",
        timestamps: [
          { timestamp: "01:20", description: "Unauthorized personnel in restricted area", isDangerous: true },
          { timestamp: "04:10", description: "Normal loading operations", isDangerous: false },
          { timestamp: "06:35", description: "Safety violation - no PPE detected", isDangerous: true },
          { timestamp: "08:45", description: "Equipment being moved safely", isDangerous: false },
        ]
      },
      {
        name: "Office Lobby Monitor",
        timestamps: [
          { timestamp: "00:30", description: "Aggressive behavior toward security", isDangerous: true },
          { timestamp: "03:15", description: "Employees arriving for work", isDangerous: false },
          { timestamp: "05:20", description: "Unidentified person attempting entry", isDangerous: true },
          { timestamp: "07:40", description: "Delivery personnel checking in", isDangerous: false },
        ]
      },
      {
        name: "Emergency Exit - East Wing",
        timestamps: [
          { timestamp: "02:00", description: "Emergency exit door forced open", isDangerous: true },
          { timestamp: "04:25", description: "Routine safety inspection", isDangerous: false },
          { timestamp: "06:50", description: "Fire alarm triggered - potential threat", isDangerous: true },
          { timestamp: "09:30", description: "Door secured after inspection", isDangerous: false },
        ]
      }
    ]

    const savedVideos = JSON.parse(localStorage.getItem("savedVideos") || "[]")
    
    // Use demo data if no saved videos exist
    const videosToUse = savedVideos.length > 0 ? savedVideos : demoVideos
    
    const moments: KeyMoment[] = videosToUse.flatMap((video: any) =>
      video.timestamps.map((ts: any) => ({
        videoName: video.name,
        timestamp: ts.timestamp,
        description: ts.description,
        isDangerous: ts.isDangerous || false,
      }))
    )
    setKeyMoments(moments)

    // Generate summary
    const fetchSummary = async () => {
      setIsLoadingSummary(true)
      try {
        const response = await fetch('/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keyMoments: moments })
        })
        const data = await response.json()
        if (data.error) throw new Error(data.error)
        setSummary(data.summary)
      } catch (error: any) {
        console.error('Error fetching summary:', error)
        setSummary(`Error: ${error?.message || 'Unable to generate summary'}`)
      } finally {
        setIsLoadingSummary(false)
      }
    }

    if (moments.length > 0) {
      fetchSummary()
    }

    // Process data for charts
    const dangerousMoments = moments.filter((m) => m.isDangerous)

    // Incidents by video
    const dangerousByVideo = dangerousMoments.reduce((acc: Record<string, number>, moment) => {
      acc[moment.videoName] = (acc[moment.videoName] || 0) + 1
      return acc
    }, {})

    const videoChartData = Object.entries(dangerousByVideo).map(([name, count]) => ({
      name,
      incidents: count,
    }))

    // Simple timeline aggregation by minute/seconds intervals (group by 15-second buckets)
    const trendData = moments.reduce((acc: Record<string, number>, m) => {
      const [mm, ss] = (m.timestamp || '00:00').split(':').map(Number)
      const interval = `${String(mm).padStart(2, '0')}:${String(Math.floor(ss / 15) * 15).padStart(2, '0')}`
      acc[interval] = (acc[interval] || 0) + 1
      return acc
    }, {})

    const timelineChartData = Object.entries(trendData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([time, count]) => ({ time, incidents: count }))

    const dangerousCount = dangerousMoments.length
    const nonDangerousCount = moments.length - dangerousCount

    setChartData({
      videoData: videoChartData,
      timelineData: timelineChartData,
      dangerDistribution: [
        { name: 'Dangerous', value: dangerousCount, color: '#ef4444' },
        { name: 'Safe', value: nonDangerousCount, color: '#10b981' },
      ],
    })

    setMetrics({
      totalIncidents: moments.length,
      dangerousCount,
      activeVideos: videosToUse.length,
      avgResponseTime: '2.3s',
    })
  }, [])

  const columnHelper = createColumnHelper<KeyMoment>()

  const columns = [
    columnHelper.accessor("videoName", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-slate-300 hover:text-white"
        >
          Video Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => <span className="text-slate-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor("timestamp", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-slate-300 hover:text-white"
        >
          Timestamp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => <span className="text-slate-400">{info.getValue()}</span>,
    }),
    columnHelper.accessor("description", {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-slate-300 hover:text-white"
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => <span className="text-slate-300">{info.getValue()}</span>,
    }),
    columnHelper.accessor("isDangerous", {
      header: "Status",
      cell: (info) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            info.getValue()
              ? "bg-red-500/10 text-red-400 border border-red-500/20"
              : "bg-green-500/10 text-green-400 border border-green-500/20"
          }`}
        >
          {info.getValue() ? "Dangerous" : "Safe"}
        </span>
      ),
    }),
  ]

  const table = useReactTable({
    data: keyMoments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
            <p className="text-slate-600">Comprehensive safety monitoring and incident analysis</p>
          </div>
          <Button
            onClick={exportToCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Incidents"
            value={metrics.totalIncidents}
            change="+12%"
            changeType="positive"
            icon={Activity}
            iconColor="text-blue-400"
          />
          <MetricCard
            title="Dangerous Events"
            value={metrics.dangerousCount}
            change={
              metrics.totalIncidents > 0
                ? `${((metrics.dangerousCount / metrics.totalIncidents) * 100).toFixed(1)}%`
                : `0.0%`
            }
            changeType="negative"
            icon={AlertTriangle}
            iconColor="text-red-400"
          />
          <MetricCard
            title="Active Videos"
            value={metrics.activeVideos}
            change="3 new"
            changeType="positive"
            icon={Video}
            iconColor="text-purple-400"
          />
          <MetricCard
            title="Avg Response Time"
            value={metrics.avgResponseTime}
            change="-0.2s"
            changeType="positive"
            icon={Clock}
            iconColor="text-green-400"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Incidents by Video */}
          <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Incidents by Video</h2>
              <BarChart3 className="w-5 h-5 text-slate-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.videoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="incidents" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Safety Distribution */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Safety Distribution</h2>
              <Shield className="w-5 h-5 text-slate-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.dangerDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.dangerDistribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Incident Timeline</h2>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData.timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <RechartsTooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="incidents" 
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Summary */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">AI Analysis Summary</h2>
          </div>
          {isLoadingSummary ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
            </div>
          ) : summary ? (
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 whitespace-pre-line leading-relaxed">{summary}</p>
            </div>
          ) : (
            <p className="text-slate-400">No data available for analysis</p>
          )}
        </div>

        {/* Data Table */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-semibold text-white">Detailed Event Log</h2>
            <p className="text-sm text-slate-400 mt-1">
              {keyMoments.length} events recorded across all videos
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-6 py-4 text-left">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-slate-800 hover:bg-slate-800/50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="h-32 text-center text-slate-400">
                      No events found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
