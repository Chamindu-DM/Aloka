export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Aloka</h3>
            <p className="text-gray-400">
              Making a difference, one campaign at a time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/campaigns" className="text-gray-400 hover:text-white">Browse Campaigns</a></li>
              <li><a href="/start-campaign" className="text-gray-400 hover:text-white">Start a Campaign</a></li>
              <li><a href="/how-it-works" className="text-gray-400 hover:text-white">How It Works</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-400 hover:text-white">Help Center</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Aloka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
