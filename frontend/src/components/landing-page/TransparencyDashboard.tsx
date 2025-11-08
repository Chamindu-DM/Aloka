import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle2, Receipt, TrendingUp, Shield } from "lucide-react";

export function TransparencyDashboard() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 mb-4">
                Our Promise to You
              </span>
              <h2 className="mb-4">100% Transparency on Every Donation</h2>
              <p className="text-gray-600">
                Unlike other platforms, Aloka provides complete visibility into how your donations 
                are used. Every rupee is tracked, verified, and reported back to you.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  icon: CheckCircle2,
                  title: "Real-time Updates",
                  description: "See exactly how funds are being used as they're spent"
                },
                {
                  icon: Receipt,
                  title: "Receipt Verification",
                  description: "All expenses are backed by verified receipts and documentation"
                },
                {
                  icon: TrendingUp,
                  title: "Progress Tracking",
                  description: "Visual breakdowns show impact and milestones achieved"
                },
                {
                  icon: Shield,
                  title: "Verified Campaigns",
                  description: "Every campaign is reviewed and verified by our team"
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-1">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-3xl blur-3xl opacity-30"></div>
            <Card className="relative border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Live Donation Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pie Chart Visualization */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-40 h-40">
                      {/* Simple pie chart representation */}
                      <svg className="transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#FED7AA" strokeWidth="20" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#FB923C"
                          strokeWidth="20"
                          strokeDasharray="175.93 251.33"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#FBBF24"
                          strokeWidth="20"
                          strokeDasharray="50.27 251.33"
                          strokeDashoffset="-175.93"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-orange-600">LKR</div>
                          <div className="text-gray-900">425K</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-gray-700">Medical Expenses</span>
                      </div>
                      <span className="text-gray-900">70%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-gray-700">Administrative</span>
                      </div>
                      <span className="text-gray-900">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-200"></div>
                        <span className="text-gray-700">Remaining</span>
                      </div>
                      <span className="text-gray-900">10%</span>
                    </div>
                  </div>
                </div>
                
                {/* Recent Updates */}
                <div className="space-y-3">
                  <h4>Recent Updates</h4>
                  {[
                    { date: "Nov 6, 2025", desc: "Surgery completed successfully", amount: "LKR 295,000" },
                    { date: "Nov 4, 2025", desc: "Medical tests conducted", amount: "LKR 85,000" },
                    { date: "Nov 1, 2025", desc: "Hospital admission", amount: "LKR 45,000" }
                  ].map((update, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900">{update.desc}</p>
                        <p className="text-gray-500">{update.date}</p>
                      </div>
                      <span className="text-orange-600">{update.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
