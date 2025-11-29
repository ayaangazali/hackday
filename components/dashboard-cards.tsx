import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  iconColor?: string
  trend?: ReactNode
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-blue-400",
  trend
}: MetricCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-lg bg-slate-50 shadow-sm", iconColor)}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full",
              changeType === "positive" && "bg-green-500/10 text-green-400",
              changeType === "negative" && "bg-rose-50 text-rose-700",
              changeType === "neutral" && "bg-slate-50 text-slate-600"
            )}
          >
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-slate-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        {trend && <div className="mt-3">{trend}</div>}
      </div>
    </div>
  )
}

interface ActivityCardProps {
  title: string
  description: string
  timestamp: string
  type: "alert" | "info" | "warning" | "success"
  icon: LucideIcon
}

export function ActivityCard({
  title,
  description,
  timestamp,
  type,
  icon: Icon
}: ActivityCardProps) {
  const typeStyles = {
    alert: "bg-red-500/10 text-red-400 border-red-500/20",
    warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    success: "bg-green-500/10 text-green-400 border-green-500/20"
  }

  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-lg hover:shadow-sm transition-colors">
      <div className={cn("p-2 rounded-lg", typeStyles[type])}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 mb-1">{title}</p>
        <p className="text-xs text-slate-600 mb-2">{description}</p>
        <p className="text-xs text-slate-500">{timestamp}</p>
      </div>
    </div>
  )
}
