import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart } from "lucide-react";

const causes = [
  {
    id: 1,
    title: "Help Rebuild Rural Schools After Floods",
    image: "https://images.unsplash.com/photo-1761604478724-13fe879468cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjI1NzgxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 850000,
    goal: 1200000,
    donors: 342,
    category: "Education"
  },
  {
    id: 2,
    title: "Support Amaya's Heart Surgery",
    image: "https://images.unsplash.com/photo-1613377512409-59c33c10c821?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FyZSUyMGhvc3BpdGFsfGVufDF8fHx8MTc2MjU3ODEzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 425000,
    goal: 500000,
    donors: 189,
    category: "Medical"
  },
  {
    id: 3,
    title: "Community Well Project - Anuradhapura",
    image: "https://images.unsplash.com/photo-1728038024967-69afb838f5ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBidWlsZGluZyUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NjI1NzgxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 320000,
    goal: 400000,
    donors: 156,
    category: "Community"
  },
  {
    id: 4,
    title: "Provide Meals for Underprivileged Children",
    image: "https://images.unsplash.com/photo-1574309122960-34273ebda15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGNlbGVicmF0aW5nfGVufDF8fHx8MTc2MjU3ODE0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 680000,
    goal: 750000,
    donors: 421,
    category: "Social"
  }
];

function formatCurrency(amount: number) {
  return `LKR ${(amount / 1000).toFixed(0)}K`;
}

export function FeaturedCauses() {
  return (
    <section id="explore" className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 mb-4">
            Make a Difference Today
          </span>
          <h2 className="mb-4">Featured Causes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every donation makes an impact. Choose a cause that resonates with you and 
            watch your contribution create real change.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {causes.map((cause) => {
            const progress = (cause.raised / cause.goal) * 100;
            
            return (
              <Card key={cause.id} className="overflow-hidden hover:shadow-xl transition-shadow border-0 shadow-md">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-orange-600">
                      {cause.category}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-5 space-y-4">
                  <h3 className="line-clamp-2">{cause.title}</h3>
                  
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-gray-600">
                      <span>{formatCurrency(cause.raised)}</span>
                      <span className="text-gray-400">of {formatCurrency(cause.goal)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-500">
                    <Heart className="h-4 w-4" />
                    <span>{cause.donors} donors</span>
                  </div>
                </CardContent>
                
                <CardFooter className="p-5 pt-0">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                    Donate Now
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
            View All Causes
          </Button>
        </div>
      </div>
    </section>
  );
}
