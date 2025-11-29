"use client"

import { Button } from "@/components/ui/button"
import { Clock, AlertTriangle, Shield, ShieldAlert, ChevronDown, ChevronUp } from "lucide-react"
import type { Timestamp } from "@/app/types"
import { useState, useEffect, useRef } from "react"

interface TimestampListProps {
  timestamps: Timestamp[]
  onTimestampClick: (timestamp: string) => void
}

export default function TimestampList({ timestamps, onTimestampClick }: TimestampListProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [longDescriptions, setLongDescriptions] = useState<number[]>([])
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const checkTextOverflow = () => {
      const longItems = timestamps
        .map((_, index) => {
          const textElement = textRefs.current[index]
          if (!textElement) return { index, hasOverflow: false }

          // Check if the element has overflow and ellipsis
          const hasOverflow = (
            textElement.offsetWidth < textElement.scrollWidth ||
            textElement.offsetHeight < textElement.scrollHeight
          )
          
          return { index, hasOverflow }
        })
        .filter(({ hasOverflow }) => hasOverflow)
        .map(({ index }) => index)

      setLongDescriptions(longItems)
    }

    // Check after a short delay to ensure rendering is complete
    const timeoutId = setTimeout(checkTextOverflow, 100)

    // Recheck on window resize
    const handleResize = () => {
      clearTimeout(timeoutId)
      setTimeout(checkTextOverflow, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
  }, [timestamps])

  const toggleExpand = (index: number, e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation()
    setExpandedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }
  return (
    <div className="grid gap-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-slate-800">Key Moments</h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-600" />
            <span className="text-slate-600">Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-rose-600" />
            <span className="text-slate-600">Dangerous</span>
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        {timestamps.map((item, index) => (
          <Button
            key={index}
            variant="outline"
            className={`group w-full justify-start gap-3 h-auto py-4 transition-all duration-200 rounded-lg ${
              item.isDangerous 
                ? 'bg-rose-50 border-rose-100 hover:bg-rose-100' 
                : 'bg-white border-slate-100 hover:bg-slate-50'
            } text-left relative overflow-hidden`}
            onClick={() => onTimestampClick(item.timestamp)}
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 ${
              item.isDangerous
                ? 'bg-rose-600 group-hover:bg-rose-500'
                : 'bg-emerald-600 group-hover:bg-emerald-500'
            }`} />
            {item.isDangerous ? (
              <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600" />
            ) : (
              <Shield className="h-5 w-5 shrink-0 text-emerald-600" />
            )}
            <div className="flex flex-col items-start w-full overflow-hidden">
              <div className="flex items-center gap-3 flex-wrap w-full">
                <span className="font-mono text-slate-800 shrink-0">{item.timestamp}</span>
                {item.isDangerous && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 shrink-0">
                    Dangerous
                  </span>
                )}
              </div>
              <div className="w-full mt-1.5">
                <div 
                  className={`relative text-sm transition-all duration-200 ${longDescriptions.includes(index) ? 'cursor-pointer' : ''}`}
                  onClick={(e: React.MouseEvent) => longDescriptions.includes(index) && toggleExpand(index, e)}
                >
                  <p 
                    ref={(el) => { textRefs.current[index] = el }}
                    className={`whitespace-pre-wrap break-words ${expandedItems.includes(index) ? '' : 'line-clamp-1'} ${
                    item.isDangerous ? 'text-rose-800' : 'text-slate-700'
                  }`}>
                    {item.description}
                  </p>
                  {longDescriptions.includes(index) && (
                    <div 
                      role="button"
                      tabIndex={0}
                      onClick={(e: React.MouseEvent) => toggleExpand(index, e)}
                      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && toggleExpand(index, e)}
                      className={`flex items-center gap-1 text-xs mt-1 cursor-pointer ${item.isDangerous ? 'text-rose-600 hover:text-rose-500' : 'text-slate-500 hover:text-slate-400'} transition-colors`}
                    >
                      {expandedItems.includes(index) ? (
                        <>
                          <ChevronUp className="h-3 w-3" />
                          Show less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3" />
                          Show more
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
