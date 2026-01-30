import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart } from "lucide-react";

interface Campaign {
  id: number;
  title: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
  category: string;
}

const API_BASE_URL = "http://localhost:5001/api";

function formatCurrency(amount: number) {
  return `LKR ${(amount / 1000).toFixed(0)}K`;
}

export function FeaturedCauses() {
  const [causes, setCauses] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedCampaigns();
  }, []);

  const fetchFeaturedCampaigns = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/campaigns`);
      const data = await response.json();
      if (data.status === 200) {
        // Get only featured campaigns or first 4 if no featured ones
        const featured = data.data.filter((c: any) => c.is_featured).slice(0, 4);
        const campaigns = featured.length > 0 ? featured : data.data.slice(0, 4);
        setCauses(campaigns.map((c: any) => ({
          id: c.id,
          title: c.title,
          image: c.image,
          raised: Number(c.raised),
          goal: Number(c.goal),
          donors: c.donors,
          category: c.category.charAt(0).toUpperCase() + c.category.slice(1)
        })));
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="explore" className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading campaigns...</div>
        </div>
      </section>
    );
  }

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
