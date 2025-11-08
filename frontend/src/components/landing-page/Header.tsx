import { Button } from "../ui/button";
import { Lightbulb } from "lucide-react";

export function Header() {
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
          <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Home</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-orange-500 transition-colors">How It Works</a>
          <a href="#explore" className="text-gray-600 hover:text-orange-500 transition-colors">Explore Causes</a>
          <a href="#about" className="text-gray-600 hover:text-orange-500 transition-colors">About</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex text-gray-600 hover:text-orange-500">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg">
            Start a Campaign
          </Button>
        </div>
      </div>
    </header>
  );
}
