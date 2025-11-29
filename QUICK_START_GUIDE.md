# iSPY Analytics - Quick Start Guide

## 🚀 Getting Started

### Installation
The new UI components and dependencies have been installed. The application uses:
- **Recharts** for data visualization
- **Radix UI** for accessible components
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Running the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the new UI.

## 📊 Page Overview

### 1. Landing Page (`/`)
- **Purpose**: Marketing and user onboarding
- **Features**: 
  - Animated hero section
  - Feature highlights
  - Call-to-action buttons
- **Access**: Public

### 2. Main Dashboard (`/pages/dashboard`)
- **Purpose**: Central monitoring hub
- **Features**:
  - Live camera feed previews
  - Real-time metrics (cameras, alerts, uptime, zones)
  - System performance monitoring
  - Recent events feed
  - Zone status indicators
  - Quick action buttons
- **Best for**: Daily monitoring and overview

### 3. Analytics Dashboard (`/pages/statistics`)
- **Purpose**: Detailed data analysis
- **Features**:
  - KPI metrics cards
  - Bar chart: Incidents by video
  - Pie chart: Safety distribution
  - Area chart: Timeline of incidents
  - AI-generated summary
  - Detailed event log with sorting
  - CSV export functionality
- **Best for**: Weekly/monthly reporting and analysis

### 4. Live Stream (`/pages/realtimeStreamPage`)
- **Purpose**: Real-time video recording and analysis
- **Features**:
  - Live camera feed
  - Real-time AI detection
  - Timestamp generation
  - Speech transcription
- **Best for**: Active monitoring sessions

### 5. Upload & Analyze (`/pages/upload`)
- **Purpose**: Upload pre-recorded videos for analysis
- **Features**:
  - Drag-and-drop upload
  - Progress tracking
  - Automated analysis
  - Timestamp generation
- **Best for**: Batch processing of recorded footage

### 6. Saved Videos (`/pages/saved-videos`)
- **Purpose**: Video library management
- **Features**:
  - Grid view of all saved videos
  - Search functionality
  - Quick access to analysis
  - Delete functionality
- **Best for**: Reviewing past recordings

## 🎨 UI Components

### Sidebar Navigation
- **Location**: Left side of all dashboard pages
- **Features**:
  - Collapsible design
  - Active page highlighting
  - System status indicator
  - Icon-based navigation

### Header
- **Location**: Top of all dashboard pages
- **Features**:
  - Global search
  - Notifications dropdown
  - Settings access
  - User profile menu

### Metric Cards
- **Purpose**: Display KPIs
- **Usage**: `<MetricCard title="..." value="..." icon={Icon} />`
- **Variants**: Success, Warning, Danger, Info

### Charts
- **Library**: Recharts
- **Types Available**:
  - Bar Chart (comparisons)
  - Pie Chart (distributions)
  - Area Chart (trends over time)
  - Line Chart (continuous data)

## 🎯 User Workflows

### Monitoring Workflow
1. Sign in → `/sign-in`
2. View dashboard → `/pages/dashboard`
3. Check live feeds and alerts
4. Click "Start Recording" if needed → `/pages/realtimeStreamPage`

### Analysis Workflow
1. Upload video → `/pages/upload`
2. Wait for AI analysis
3. Review timestamps and events
4. Save video to library
5. View detailed analytics → `/pages/statistics`

### Reporting Workflow
1. Go to Analytics → `/pages/statistics`
2. Review charts and metrics
3. Read AI summary
4. Click "Export Report" for CSV
5. Share with stakeholders

## 🎨 Design System

### Colors
- **Primary**: Blue (600, 500, 400)
- **Secondary**: Purple (600, 500)
- **Success**: Green (500, 400)
- **Warning**: Orange/Yellow (500, 400)
- **Danger**: Red (500, 400)
- **Background**: Slate (950, 900, 800)
- **Text**: White, Slate (300, 400, 500)

### Typography
- **Headings**: Bold, White
- **Body**: Regular, Slate-300
- **Captions**: Small, Slate-400

### Spacing
- **Small**: 4px, 8px
- **Medium**: 16px, 24px
- **Large**: 32px, 48px

### Border Radius
- **Small**: 8px
- **Medium**: 12px
- **Large**: 16px

## 💡 Tips & Tricks

1. **Sidebar**: Click the collapse button to maximize screen space
2. **Search**: Use the global search in header to quickly find videos or events
3. **Notifications**: Click the bell icon to see recent alerts
4. **Charts**: Hover over data points for detailed information
5. **Export**: Use the "Export Report" button in Analytics for CSV downloads
6. **Mobile**: Sidebar automatically collapses on mobile devices

## 🔧 Customization

### Changing Colors
Edit `/app/globals.css` CSS variables:
```css
:root {
  --primary: /* your color */;
}
```

### Adding New Routes
1. Create new page in `/app/pages/your-route/page.tsx`
2. Wrap with `<DashboardLayout>`
3. Add to sidebar navigation in `/components/dashboard-sidebar.tsx`

### Creating New Charts
```tsx
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={yourData}>
    <XAxis dataKey="name" />
    <YAxis />
    <Bar dataKey="value" fill="#3b82f6" />
  </BarChart>
</ResponsiveContainer>
```

## 📱 Responsive Design

- **Desktop** (1024px+): Full sidebar, multi-column layouts
- **Tablet** (768px - 1023px): Collapsed sidebar, 2-column layouts
- **Mobile** (< 768px): Hidden sidebar with hamburger menu, single column

## 🚨 Troubleshooting

### Issue: Sidebar not showing
- **Solution**: Check window width, try refreshing

### Issue: Charts not rendering
- **Solution**: Ensure data format matches chart requirements

### Issue: CSS not loading
- **Solution**: Clear browser cache, restart dev server

## 📈 Performance Tips

1. Use lazy loading for heavy components
2. Implement pagination for large datasets
3. Optimize images and videos
4. Use React.memo for static components
5. Debounce search inputs

---

**Need Help?** Check the codebase documentation or UI_REDESIGN_SUMMARY.md for detailed implementation notes.
