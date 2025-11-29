"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Search, Video, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard-layout"

interface SavedVideo {
  id: string
  name: string
  url: string
  thumbnailUrl: string
  timestamps: { timestamp: string; description: string }[]
}

export default function SavedVideosPage() {
  const [savedVideos, setSavedVideos] = useState<SavedVideo[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredVideos, setFilteredVideos] = useState<SavedVideo[]>([])

  useEffect(() => {
    // If no saved videos in localStorage, seed with a single demo video
    const existing = JSON.parse(localStorage.getItem("savedVideos") || "[]")

    if (!existing || existing.length === 0) {
      const demoSeed: SavedVideo[] = [
        {
          id: "demo-1",
          name: "Front Entrance Monitor - Demo",
          url: "/videos/Robbery1.mp4",
          thumbnailUrl: "/cat1.png",
          timestamps: [
            { timestamp: "00:15", description: "Person loitering near entrance for extended period" },
            { timestamp: "02:30", description: "Unauthorized access attempt detected" },
            { timestamp: "05:45", description: "Normal foot traffic" },
            { timestamp: "08:20", description: "Suspicious package left unattended" },
          ],
        },
      ]

      localStorage.setItem("savedVideos", JSON.stringify(demoSeed))
      setSavedVideos(demoSeed)
      setFilteredVideos(demoSeed)
    } else {
      setSavedVideos(existing)
      setFilteredVideos(existing)
    }
  }, [])

  useEffect(() => {
    const filtered = savedVideos.filter(
      (video) =>
        video.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.timestamps.some((timestamp) => timestamp.description.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredVideos(filtered)
  }, [searchTerm, savedVideos])

  const handleDelete = (id: string) => {
    const updatedVideos = savedVideos.filter((video) => video.id !== id)
    setSavedVideos(updatedVideos)
    localStorage.setItem("savedVideos", JSON.stringify(updatedVideos))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 mb-1">Saved Videos</h1>
            <p className="text-slate-800">{savedVideos.length} videos in your library</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-500 pl-10 pr-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="aspect-video bg-slate-50 relative overflow-hidden">
                <video
                  src={video.url}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-60" />
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full border border-slate-100">
                    <Video className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-slate-700 font-medium">{video.timestamps.length} Events</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-medium mb-2 text-slate-800 truncate">{video.name}</h2>
                <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{video.timestamps.length} key moments detected</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/pages/video/${video.id}`} className="flex-1">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                      <Eye className="h-4 w-4" />
                      View Analysis
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(video.id)}
                    variant="destructive"
                    size="icon"
                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <p className="text-center text-slate-400 mt-8 text-lg font-light">
            {searchTerm ? "No videos match your search." : "No saved videos yet."}
          </p>
        )}
      </div>
    </DashboardLayout>
  )
}
