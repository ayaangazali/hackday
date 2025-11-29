import Link from "next/link"
import { Shield, Video, TrendingUp, Bell, Eye, Activity, AlertTriangle, BarChart3, Zap, Lock } from "lucide-react"
import HomeLink from "@/components/home-link"
import { HeaderNav } from "@/components/header-nav"
import HeaderAuth from "@/components/header-auth"
import { GeminiFooter } from "@/components/gemini-footer"

export default function Home() {
  return (
    <>
      {/* Top Navigation */}
      <nav className="w-full flex justify-center border-b border-b-slate-800 h-16 bg-slate-950/80 backdrop-blur-sm fixed top-0 z-50">
        <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex items-center gap-8">
            <HomeLink />
            <HeaderNav />
          </div>
          <HeaderAuth />
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
              <Eye className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-sm text-blue-400 font-medium">Next-Gen AI Surveillance Intelligence</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-8xl font-bold tracking-tight">
              <span className="inline-block text-white">iSPY</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
                Analytics
              </span>
            </h1>
            
            <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Transform surveillance into <span className="text-blue-400 font-semibold">actionable intelligence</span>. 
              Monitor, analyze, and respond to security events with cutting-edge AI-powered insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-6 justify-center pt-8">
              <Link
                href="/pages/dashboard"
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 flex items-center gap-2"
              >
                Access Dashboard
                <BarChart3 className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/sign-up"
                className="px-10 py-5 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 text-white rounded-xl font-semibold hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 pt-8 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Enterprise-Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Real-Time Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-24">
            <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-slate-400">Live Monitoring</div>
                </div>
              </div>
              <p className="text-xs text-slate-500">Continuous surveillance coverage</p>
            </div>

            <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">99.8%</div>
                  <div className="text-sm text-slate-400">Detection Rate</div>
                </div>
              </div>
              <p className="text-xs text-slate-500">Industry-leading accuracy</p>
            </div>

            <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-green-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">&lt;2s</div>
                  <div className="text-sm text-slate-400">Response Time</div>
                </div>
              </div>
              <p className="text-xs text-slate-500">Lightning-fast detection</p>
            </div>

            <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-orange-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Bell className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">Instant</div>
                  <div className="text-sm text-slate-400">Alert System</div>
                </div>
              </div>
              <p className="text-xs text-slate-500">Multi-channel notifications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Dashboard Preview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Experience the Dashboard</h2>
          <p className="text-slate-400 text-lg">Interactive preview of your security command center</p>
        </div>

        {/* Mock Dashboard Container */}
        <div className="relative">
          {/* Browser Chrome */}
          <div className="bg-slate-800 rounded-t-2xl border-2 border-slate-700 p-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 bg-slate-900 rounded-lg px-4 py-1 mx-4">
              <p className="text-xs text-slate-400">ispy.app/dashboard</p>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-t-0 border-slate-700 rounded-b-2xl overflow-hidden shadow-2xl">
            <div className="flex">
              {/* Mini Sidebar */}
              <div className="w-16 bg-white border-r border-slate-200 py-4 flex flex-col items-center gap-4">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <Activity className="w-5 h-5 text-slate-400" />
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <Video className="w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">iSPY Security Monitor</h3>
                    <p className="text-emerald-600 text-sm font-medium flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      Real-time tracking of your security ecosystem
                    </p>
                  </div>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-medium text-slate-600">Active Cameras</span>
                      <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">8</div>
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>25.0%</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-medium text-slate-600">Incidents</span>
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">1,250</div>
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>8.2%</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-medium text-slate-600">Active Alerts</span>
                      <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">4</div>
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>12.5%</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-medium text-slate-600">Response</span>
                      <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">2.3s</div>
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>15.0%</span>
                    </div>
                  </div>
                </div>

                {/* Video Feeds */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-slate-800">Zone A - Main Entrance</span>
                      </div>
                    </div>
                    <div className="aspect-video bg-slate-200 relative">
                      <video 
                        src="/videos/Robbery1.mp4" 
                        autoPlay 
                        loop 
                        muted
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                    <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-rose-500" />
                      Recent Activity
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 bg-rose-50 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-900">Security Alert</p>
                          <p className="text-xs text-slate-600">Motion detected Zone A</p>
                          <span className="text-xs text-slate-400">2m ago</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-amber-50 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-900">Safety Alert</p>
                          <p className="text-xs text-slate-600">PPE violation Zone B</p>
                          <span className="text-xs text-slate-400">5m ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay with CTA */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end justify-center pb-12 rounded-2xl pointer-events-none">
            <Link
              href="/sign-up"
              className="pointer-events-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
            >
              Try Full Dashboard Free
              <BarChart3 className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Powerful Analytics Platform</h2>
          <p className="text-slate-400 text-lg">Everything you need for intelligent security monitoring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Threat Detection</h3>
            <p className="text-slate-400">Advanced AI identifies suspicious activities, violence, theft, and safety hazards in real-time.</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Real-Time Analytics</h3>
            <p className="text-slate-400">Live dashboards with comprehensive metrics, trends, and actionable insights.</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Smart Alerts</h3>
            <p className="text-slate-400">Instant notifications with context, video evidence, and severity classification.</p>
          </div>
        </div>
      </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-t-slate-800 p-8 flex justify-center bg-slate-950/50">
        <GeminiFooter />
      </footer>
    </>
  )
}