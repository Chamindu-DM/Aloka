import { Button } from "../ui/button";
import { ArrowRight, Lightbulb } from "lucide-react";

interface CTASectionProps {
  onGetStartedClick?: () => void;
}

export function CTASection({ onGetStartedClick }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm">
            <Lightbulb className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-white">
            Start Your Campaign Today and Bring Light to Others
          </h2>
          
          <p className="text-white/90 max-w-2xl mx-auto">
            Join thousands of Sri Lankans who are making a difference in their communities. 
            Create your campaign for free and experience the power of transparent giving.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl"
              onClick={onGetStartedClick}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 bg-transparent">
              Learn More
            </Button>
          </div>
          
          <p className="text-white/80 pt-4">
            No platform fees for the first 30 days • Quick approval • 24/7 support
          </p>
        </div>
      </div>
    </section>
  );
}
