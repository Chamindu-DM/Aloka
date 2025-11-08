import { Card, CardContent } from "../ui/card";
import { Quote } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const testimonials = [
  {
    id: 1,
    name: "Priya Wickramasinghe",
    role: "Campaign Creator",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    quote: "Aloka helped me raise funds for my daughter's education in just 2 weeks. The transparency gave donors confidence, and I could share every expense with complete honesty.",
    location: "Colombo"
  },
  {
    id: 2,
    name: "Rohan Fernando",
    role: "Regular Donor",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
    quote: "I love knowing exactly where my money goes. The receipt verification and real-time updates make me feel confident that I'm making a real difference.",
    location: "Kandy"
  },
  {
    id: 3,
    name: "Amara Perera",
    role: "Community Leader",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amara",
    quote: "We rebuilt our village school through Aloka. The platform's transparency helped us gain trust from the entire community and beyond. Truly grateful.",
    location: "Galle"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 mb-4">
            Trusted by Communities
          </span>
          <h2 className="mb-4">Stories of Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from the people who've experienced the power of transparent giving through Aloka.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-8 space-y-6">
                <Quote className="h-10 w-10 text-orange-400" />
                
                <p className="text-gray-700 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-500">{testimonial.role} • {testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
