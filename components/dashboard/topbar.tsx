'use client'

import { Search, Bell, User } from 'lucide-react'

export function TopBar() {
  return (
    <div className="h-16 border-b border-border bg-white flex items-center justify-between px-4 sm:px-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-full sm:max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search patients, medicines..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4 ml-4 sm:ml-8">
        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
            SK
          </div>
          <span className="text-sm font-medium text-foreground">Shivam</span>
        </button>
      </div>
    </div>
  )
}
