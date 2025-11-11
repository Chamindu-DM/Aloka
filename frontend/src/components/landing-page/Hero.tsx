import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1.5 text-orange-700">
                🇱🇰 Trusted by Sri Lankan Communities
              </span>
            </div>
            
            <h1 className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Bring Light to Someone's Life with Aloka
            </h1>
            
            <p className="text-gray-600 max-w-xl">
              A transparent donation platform where every rupee is accounted for. 
              Support social causes, medical needs, education, and community development across Sri Lanka.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg"
                >
                  Start a Campaign
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                Explore Causes
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-orange-600">1,500+</div>
                <div className="text-gray-500">Campaigns Funded</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-orange-600">LKR 45M+</div>
                <div className="text-gray-500">Raised</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-orange-600">100%</div>
                <div className="text-gray-500">Transparent</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/20 to-yellow-400/20 blur-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1562709911-a355229de124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBoZWxwaW5nJTIwaGFuZHMlMjBTcmklMjBMYW5rYXxlbnwxfHx8fDE3NjI1NzgxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Community helping each other"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
