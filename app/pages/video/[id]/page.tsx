"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, Video, Clock } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import VideoPlayer from "@/components/video-player"
import TimestampList from "@/components/timestamp-list"
import { Timeline } from "@/app/components/Timeline"
import type { Timestamp } from "@/app/types"

interface SavedVideo {
  id: string
  name: string
  url: string
  thumbnailUrl: string
  timestamps: Timestamp[]
}

export default function VideoPage() {
  const [video, setVideo] = useState<SavedVideo | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const params = useParams()
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const savedVideos: SavedVideo[] = JSON.parse(localStorage.getItem("savedVideos") || "[]")
    const foundVideo = savedVideos.find((v) => v.id === params.id)
    console.log('Found video:', foundVideo)
    if (foundVideo) {
      setVideo(foundVideo)
    } else {
      router.push("/saved-videos")
    }
  }, [params.id, router])

  // Track video time and duration
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      console.log('Current time:', video.currentTime)
    }

    const handleLoadedMetadata = () => {
      console.log('Video duration:', video.duration)
      setVideoDuration(video.duration)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    // Initial load if video is already loaded
    if (video.duration) {
      handleLoadedMetadata()
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  const handleTimestampClick = (timestamp: string) => {
    if (!videoRef.current) return

    const [minutes, seconds] = timestamp.split(":").map(Number)
    const timeInSeconds = minutes * 60 + seconds
    videoRef.current.currentTime = timeInSeconds
    videoRef.current.play()
  }

  if (!video) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Video className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Loading video...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/pages/saved-videos">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">{video.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{video.timestamps.length} key moments detected</span>
              </div>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Download className="h-4 w-4" />
            Export Analysis
          </Button>
        </div>

        <div className="max-w-6xl space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden">
            <VideoPlayer url={video.url} timestamps={video.timestamps} ref={videoRef} />
          </div>
          
          {/* Timeline component */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Key Moments Timeline</h2>
            <Timeline
              events={video.timestamps.map(ts => {
                console.log('Processing timestamp:', ts);
                // Handle both MM:SS and raw seconds formats
                let timeInSeconds;
                if (typeof ts.timestamp === 'string' && ts.timestamp.includes(':')) {
                  const [minutes, seconds] = ts.timestamp.split(':').map(Number);
                  timeInSeconds = minutes * 60 + seconds;
                } else {
                  timeInSeconds = Number(ts.timestamp);
                }
                console.log('Converted to seconds:', timeInSeconds);
                return {
                  startTime: timeInSeconds,
                  endTime: timeInSeconds + 3, // Each event lasts 3 seconds
                  type: ts.isDangerous ? 'warning' : 'normal',
                  label: ts.description
                };
              })}
              totalDuration={videoDuration || 100} // Provide a default duration
              currentTime={currentTime}
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button
              onClick={async () => {
                try {
                  // Create download link directly from video URL
                  const downloadUrl = video.url
                  
                  const a = document.createElement('a')
                  a.href = downloadUrl
                  const downloadName = video.name.toLowerCase().endsWith('.mp4')
                    ? video.name
                    : `${video.name}.mp4`
                  a.download = downloadName
                  a.setAttribute('type', 'video/mp4')
                  a.setAttribute('extension', 'mp4')
                  
                  // download
                  document.body.appendChild(a)
                  a.click()
                  
                  document.body.removeChild(a)
                } catch (error) {
                  console.error('Download error:', error)
                  alert('Failed to download video. Please try again.')
                }
              }}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2 backdrop-blur-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Download MP4
            </Button>
          </div>
          <TimestampList timestamps={video.timestamps} onTimestampClick={handleTimestampClick} />
        </div>
      </div>
    </DashboardLayout>
  )
}
