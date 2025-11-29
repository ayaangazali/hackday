# iSPY Analytics - Component Architecture

## 📁 New File Structure

```
iSPY/
├── app/
│   ├── pages/
│   │   ├── dashboard/          # NEW: Main dashboard overview
│   │   │   └── page.tsx
│   │   ├── statistics/         # REDESIGNED: Analytics dashboard
│   │   │   ├── page.tsx
│   │   │   └── page_old.tsx   # Backup
│   │   ├── upload/             # UPDATED: Uses DashboardLayout
│   │   │   └── page.tsx
│   │   ├── saved-videos/       # UPDATED: Uses DashboardLayout
│   │   │   └── page.tsx
│   │   └── realtimeStreamPage/
│   │       └── page.tsx
│   ├── page.tsx               # REDESIGNED: Landing page
│   └── globals.css            # UPDATED: New animations
│
├── components/
│   ├── dashboard-layout.tsx   # NEW: Main layout wrapper
│   ├── dashboard-sidebar.tsx  # NEW: Sidebar navigation
│   ├── dashboard-header.tsx   # NEW: Top header
│   ├── dashboard-cards.tsx    # NEW: MetricCard & ActivityCard
│   ├── stats-widget.tsx       # NEW: Stats display widget
│   └── ui/                    # Existing UI components
│
└── docs/
    ├── UI_REDESIGN_SUMMARY.md
    └── QUICK_START_GUIDE.md
```

## 🧩 Component Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                      DashboardLayout                         │
│  ┌────────────┐  ┌────────────────────────────────────────┐ │
│  │  Sidebar   │  │          Header                        │ │
│  │            │  │  ┌──────┐ ┌──────┐ ┌──────┐           │ │
│  │ Dashboard  │  │  │Search│ │Notify│ │ User │           │ │
│  │ Analytics  │  │  └──────┘ └──────┘ └──────┘           │ │
│  │ LiveStream │  │────────────────────────────────────────│ │
│  │ Saved      │  │                                        │ │
│  │ Upload     │  │         Page Content                   │ │
│  │ Monitor    │  │                                        │ │
│  │            │  │  ┌──────────┐  ┌──────────┐          │ │
│  │ [Status]   │  │  │MetricCard│  │MetricCard│  ...     │ │
│  │            │  │  └──────────┘  └──────────┘          │ │
│  └────────────┘  │                                        │ │
│                  │  ┌──────────────────────────────┐     │ │
│                  │  │   Charts / Content Area      │     │ │
│                  │  └──────────────────────────────┘     │ │
│                  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Component Hierarchy

### DashboardLayout
```tsx
<DashboardLayout>
  ├── <DashboardSidebar />
  │   ├── Logo
  │   ├── Navigation Links
  │   ├── Status Widget
  │   └── Collapse Button
  │
  └── <div className="lg:pl-64">
      ├── <DashboardHeader />
      │   ├── Search Bar
      │   ├── Notifications
      │   ├── Settings
      │   └── User Menu
      │
      └── <main>
          └── {children}
```

### Statistics Page
```tsx
<DashboardLayout>
  └── <div className="space-y-6">
      ├── Page Header
      ├── Metrics Grid
      │   ├── <MetricCard /> (Total Incidents)
      │   ├── <MetricCard /> (Dangerous Events)
      │   ├── <MetricCard /> (Active Videos)
      │   └── <MetricCard /> (Response Time)
      │
      ├── Charts Section
      │   ├── Bar Chart (Incidents by Video)
      │   ├── Pie Chart (Safety Distribution)
      │   └── Area Chart (Timeline)
      │
      ├── AI Summary Card
      └── Data Table
```

### Dashboard Page
```tsx
<DashboardLayout>
  └── <div className="space-y-6">
      ├── Header + Actions
      ├── Real-time Metrics
      │   └── <MetricCard /> × 4
      │
      ├── Main Content Grid
      │   ├── Live Camera Feeds
      │   │   ├── Primary Feed
      │   │   └── Secondary Grid
      │   │
      │   └── Right Sidebar
      │       ├── System Performance
      │       ├── Recent Events
      │       │   └── <ActivityCard /> × n
      │       └── Zone Status
      │
      └── Quick Actions
```

## 🔄 Data Flow

```
User Interaction
       ↓
   Component
       ↓
   useState/useEffect
       ↓
   localStorage / API
       ↓
   State Update
       ↓
   Re-render
       ↓
   Updated UI
```

### Example: Video Analysis Flow
```
1. User uploads video (Upload Page)
   ↓
2. File stored in localStorage/blob
   ↓
3. AI analysis triggered (API route)
   ↓
4. Timestamps generated
   ↓
5. Video saved to localStorage
   ↓
6. User redirected to Saved Videos
   ↓
7. Statistics page reads localStorage
   ↓
8. Charts update with new data
```

## 🎯 Component Props

### MetricCard
```tsx
interface MetricCardProps {
  title: string              // "Total Incidents"
  value: string | number     // "42" or "99.8%"
  change?: string            // "+12%"
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon           // Activity
  iconColor?: string         // "text-blue-400"
  trend?: ReactNode          // Optional chart
}
```

### ActivityCard
```tsx
interface ActivityCardProps {
  title: string              // "Security Alert"
  description: string        // "Motion detected..."
  timestamp: string          // "2 minutes ago"
  type: "alert" | "info" | "warning" | "success"
  icon: LucideIcon          // AlertTriangle
}
```

### DashboardLayout
```tsx
interface DashboardLayoutProps {
  children: ReactNode        // Page content
}
```

## 🎨 Styling Patterns

### Card Pattern
```tsx
<div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all">
  {/* content */}
</div>
```

### Gradient Button
```tsx
<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
  {/* content */}
</button>
```

### Metric Display
```tsx
<div className="flex items-center gap-3">
  <div className="p-3 bg-blue-500/10 rounded-lg">
    <Icon className="w-6 h-6 text-blue-400" />
  </div>
  <div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-sm text-slate-400">{label}</div>
  </div>
</div>
```

## 📊 State Management

### Local State (useState)
- Component-specific UI states
- Form inputs
- Modal visibility
- Loading states

### Local Storage
- Saved videos
- User preferences
- Cached data

### Server State (Future)
- API responses
- Real-time updates
- User authentication

## 🔌 Integration Points

### APIs Used
```tsx
// Video Analysis
POST /api/analyze
  - Analyzes video content
  - Returns timestamps

// AI Summary
POST /api/summary
  - Generates text summary
  - Returns formatted text

// Upload
POST /api/upload
  - Stores video file
  - Returns URL
```

### External Libraries
- **Recharts**: Data visualization
- **Radix UI**: Accessible components
- **Lucide React**: Icon library
- **TensorFlow.js**: ML detection (existing)
- **Next.js**: Framework
- **Tailwind**: Styling

## 🚀 Performance Optimizations

1. **Code Splitting**: Each page loads independently
2. **Lazy Loading**: Heavy components load on demand
3. **Memoization**: Static components use React.memo
4. **Debouncing**: Search inputs debounced
5. **Virtual Scrolling**: Large lists (future enhancement)

## 🔐 Security Considerations

1. **Input Validation**: All file uploads validated
2. **XSS Prevention**: User content sanitized
3. **CORS**: API routes configured properly
4. **Authentication**: Stack Auth integration (existing)

---

This architecture provides a scalable, maintainable foundation for the iSPY Analytics platform.
