import { Lightbulb, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-500">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <span className="text-white">Aloka</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Bringing light to lives across Sri Lanka through transparent and trustworthy crowdfunding. 
              Every donation, every rupee, every impact — fully visible.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Platform */}
          <div>
            <h4 className="text-white mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-orange-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Start a Campaign</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Explore Causes</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Success Stories</a></li>
            </ul>
          </div>
          
          {/* About */}
          <div>
            <h4 className="text-white mb-4">About</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Our Mission</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-white mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-orange-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">
            © 2025 Aloka. All rights reserved. Chamindu
          </p>
          
          <div className="flex items-center gap-6">
            <span className="text-gray-400">Language:</span>
            <button className="text-orange-400 hover:text-orange-300 transition-colors">English</button>
            <button className="hover:text-orange-400 transition-colors">සිංහල</button>
            <button className="hover:text-orange-400 transition-colors">தமிழ்</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
