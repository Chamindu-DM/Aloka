import { Button } from "../ui/button";
import { Lightbulb, Search, Bell, User, LogOut, Settings, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface DashboardHeaderProps {
  onStartCampaign?: () => void;
  onLogout?: () => void;
}

export function DashboardHeader({ onStartCampaign, onLogout }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-500">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">Aloka</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-900 hover:text-orange-500 transition-colors">Discover</a>
          <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">My Campaigns</a>
          <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">My Donations</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg"
            onClick={onStartCampaign}
          >
            <Plus className="h-4 w-4 mr-2" />
            Start Campaign
          </Button>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-1">
                <div className="p-3 hover:bg-gray-50 rounded cursor-pointer">
                  <p className="text-sm">New donation of LKR 5,000 received</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded cursor-pointer">
                  <p className="text-sm">Your campaign reached 50% of goal!</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded cursor-pointer">
                  <p className="text-sm">Welcome to Aloka! Get started now.</p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="ghost" className="w-full text-orange-600 hover:text-orange-700">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-yellow-500 text-white">
                    SK
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p>Saman Kumara</p>
                  <p className="text-gray-500 mt-1">samankumara@email.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
