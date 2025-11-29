"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Save, Video, FileVideo, BarChart3 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard-layout"

import VideoPlayer from "@/components/video-player"
import TimestampList from "@/components/timestamp-list"
import type { Timestamp } from "@/app/types"
import { detectEvents, type VideoEvent } from "./actions"
import Link from "next/link"

interface SavedVideo {
  id: string
  name: string
  url: string
  thumbnailUrl: string
  timestamps: Timestamp[]
}

export default function UploadPage() {
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [timestamps, setTimestamps] = useState<Timestamp[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoName, setVideoName] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  const captureFrame = async (video: HTMLVideoElement, time: number): Promise<string | null> => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Failed to get canvas context');
      return null;
    }

    try {
      video.currentTime = time;
    } catch (error) {
      console.error('Error setting video time:', error);
      return null;
    }
    
    // Wait for video to seek to the specified time
    await new Promise((resolve) => {
      video.onseeked = resolve;
    });

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const handleFileUpload = async (e: { target: { files: FileList | null } }) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    setTimestamps([])

    try {

      const localUrl = URL.createObjectURL(file)
      setVideoUrl(localUrl)
      setVideoName(file.name)

      // Wait for video element to be available
      while (!videoRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      // Set the source and wait for video to load
      const video = videoRef.current
      video.src = localUrl

      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Timeout waiting for video metadata'))
        }, 10000)

        const handleLoad = () => {
          clearTimeout(timeout)
          resolve(true)
        }

        const handleError = () => {
          clearTimeout(timeout)
          reject(new Error('Failed to load video: ' + video.error?.message))
        }

        video.addEventListener('loadeddata', handleLoad)
        video.addEventListener('error', handleError)

        if (video.readyState >= 2) {
          handleLoad()
        }

        return () => {
          video.removeEventListener('loadeddata', handleLoad)
          video.removeEventListener('error', handleError)
        }
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsUploading(false)
      setUploadProgress(100)

      // Start analysis
      setIsAnalyzing(true)
      const duration = video.duration
      
      if (!duration || duration === Infinity || isNaN(duration)) {
        throw new Error('Invalid video duration')
      }

      console.log('Video duration:', duration)
      const interval = 3 // Analyze one frame every 3 seconds
      const totalFrames = Math.floor(duration / interval)
      const newTimestamps: Timestamp[] = []

      // Process frames at regular intervals
      for (let time = 0; time < duration; time += interval) {
        const progress = Math.floor((time / duration) * 100)
        setUploadProgress(progress)
        console.log(`Analyzing frame at ${time}s (${progress}%)...`)

        const frame = await captureFrame(video, time)
        if (frame) {
          try {
            const result = await detectEvents(frame)
            console.log('Frame analysis result:', result)
            if (result.events && result.events.length > 0) {
              result.events.forEach((event: VideoEvent) => {
                const minutes = Math.floor(time / 60)
                const seconds = Math.floor(time % 60)
                newTimestamps.push({
                  timestamp: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
                  description: event.description,
                  isDangerous: event.isDangerous
                })
              })
            }
          } catch (error) {
            console.error('Error analyzing frame:', error)
          }
        }
      }

      console.log('Analysis complete, found timestamps:', newTimestamps)
      setTimestamps(newTimestamps)
      setIsAnalyzing(false)
      setUploadProgress(100)
    } catch (error) {
      console.error("Error uploading/analyzing video:", error)
      setIsUploading(false)
      setIsAnalyzing(false)
    }
  }

  const handleTimestampClick = (timestamp: string) => {
    if (!videoRef.current) return

    const [minutes, seconds] = timestamp.split(":").map(Number)
    const timeInSeconds = minutes * 60 + seconds
    videoRef.current.currentTime = timeInSeconds
    videoRef.current.play()
  }

  const handleSaveVideo = () => {
    if (!videoUrl || !videoName) return

    const savedVideos: SavedVideo[] = JSON.parse(localStorage.getItem("savedVideos") || "[]")
    const newVideo: SavedVideo = {
      id: Date.now().toString(),
      name: videoName,
      url: videoUrl,
      thumbnailUrl: videoUrl, 
      timestamps: timestamps,
    }
    savedVideos.push(newVideo)
    localStorage.setItem("savedVideos", JSON.stringify(savedVideos))
    alert("Video saved successfully!")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Upload & Analyze</h1>
            <p className="text-slate-400">Upload videos to detect key moments and safety incidents</p>
          </div>
          <Link href="/pages/saved-videos">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
              <Video className="h-4 w-4" />
              View Saved Videos
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl">
          <div className="space-y-6">

            {!videoUrl && (
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8">
                <div className="w-full">
                  <label
                    htmlFor="video-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.add('border-purple-500');
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.remove('border-purple-500');
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.remove('border-purple-500');
                      
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith('video/')) {
                        const input = document.getElementById('video-upload') as HTMLInputElement;
                        if (input) {
                          const dataTransfer = new DataTransfer();
                          dataTransfer.items.add(file);
                          input.files = dataTransfer.files;
                          handleFileUpload({ target: { files: dataTransfer.files } } as any);
                        }
                      }
                    }}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-4 bg-blue-500/10 rounded-full mb-4">
                        <FileVideo className="h-12 w-12 text-blue-400" />
                      </div>
                      <p className="mb-2 text-lg font-semibold text-white">
                        Upload Your Video
                      </p>
                      <p className="text-sm text-slate-400 mb-4">
                        <span className="text-blue-400 font-medium">Click to browse</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-500">MP4, MOV, AVI up to 500MB</p>
                    </div>
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading || isAnalyzing}
                    />
                  </label>
                </div>
              </div>
            )}

            {(isUploading || isAnalyzing) && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-center text-sm text-zinc-400">
                  {isUploading ? "Uploading video..." : "Analyzing video content..."}
                </p>
              </div>
            )}

            {videoUrl && (
              <div className="space-y-4">
                <VideoPlayer url={videoUrl} timestamps={timestamps} ref={videoRef} />
                <TimestampList timestamps={timestamps} onTimestampClick={handleTimestampClick} />
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Video name"
                    value={videoName}
                    onChange={(e) => setVideoName(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                  <Button onClick={handleSaveVideo} className="bg-white text-black hover:bg-gray-200">
                    <Save className="w-4 h-4 mr-2" />
                    Save Video
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
