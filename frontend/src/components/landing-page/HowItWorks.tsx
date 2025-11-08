import { PenSquare, Heart, TrendingUp, Sparkles } from "lucide-react";

const steps = [
  {
    icon: PenSquare,
    title: "Create a Campaign",
    description: "Share your story and set your fundraising goal. It's free and takes just minutes.",
    color: "from-orange-400 to-orange-500"
  },
  {
    icon: Heart,
    title: "Receive Donations Securely",
    description: "Donors contribute safely through our verified payment system with full transparency.",
    color: "from-yellow-400 to-yellow-500"
  },
  {
    icon: TrendingUp,
    title: "Track & Share Updates",
    description: "Keep donors informed with real-time progress updates and transparent fund usage.",
    color: "from-orange-500 to-yellow-500"
  },
  {
    icon: Sparkles,
    title: "See Real Impact",
    description: "Watch your campaign bring light to lives and transform your community.",
    color: "from-yellow-500 to-orange-400"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 mb-4">
            Simple & Transparent
          </span>
          <h2 className="mb-4">How Aloka Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From creating your campaign to seeing the impact, we make the process simple, 
            secure, and completely transparent every step of the way.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="text-center space-y-4">
                  <div className="relative inline-flex">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-orange-600">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3>{step.title}</h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-orange-300 to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
