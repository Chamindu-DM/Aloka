import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart, MapPin, Clock, TrendingUp } from "lucide-react";
import { Badge } from "../ui/badge";

interface CampaignCardProps {
  id: number;
  title: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
  category: string;
  location?: string;
  daysLeft?: number;
  isUrgent?: boolean;
  isFeatured?: boolean;
  organizer?: string;
  onDonate?: (id: number) => void;
  onViewDetails?: (id: number) => void;
}

function formatCurrency(amount: number) {
  if (amount >= 1000000) {
    return `LKR ${(amount / 1000000).toFixed(1)}M`;
  }
  return `LKR ${(amount / 1000).toFixed(0)}K`;
}

export function CampaignCard({
  id,
  title,
  image,
  raised,
  goal,
  donors,
  category,
  location,
  daysLeft,
  isUrgent,
  isFeatured,
  organizer,
  onDonate,
  onViewDetails,
}: CampaignCardProps) {
  const progress = (raised / goal) * 100;
  
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md group cursor-pointer">
      <div 
        className="relative h-48 overflow-hidden"
        onClick={() => onViewDetails?.(id)}
      >
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className="bg-white/90 backdrop-blur-sm text-orange-600 border-0 hover:bg-white">
            {category}
          </Badge>
          {isFeatured && (
            <Badge className="bg-linear-to-r from-orange-500 to-yellow-500 text-white border-0">
              Featured
            </Badge>
          )}
          {isUrgent && (
            <Badge variant="destructive" className="bg-red-500 text-white border-0">
              Urgent
            </Badge>
          )}
        </div>
        {daysLeft !== undefined && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-black/70 backdrop-blur-sm text-white border-0 hover:bg-black/80">
              <Clock className="h-3 w-3 mr-1" />
              {daysLeft} days left
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-5 space-y-4">
        <div onClick={() => onViewDetails?.(id)}>
          <h3 className="line-clamp-2 group-hover:text-orange-600 transition-colors">{title}</h3>
          
          {organizer && (
            <p className="text-gray-500 mt-2">by {organizer}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">{progress.toFixed(0)}%</span>
            </div>
            <span className="text-sm text-gray-400">of {formatCurrency(goal)}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between">
            <span className="text-gray-900">{formatCurrency(raised)}</span>
            <span className="text-gray-500">{donors} donors</span>
          </div>
        </div>
        
        {location && (
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{location}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex gap-2">
        <Button 
          className="flex-1 bg-linear-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
          onClick={(e) => {
            e.stopPropagation();
            onDonate?.(id);
          }}
        >
          <Heart className="h-4 w-4 mr-2" />
          Donate
        </Button>
        <Button 
          variant="outline" 
          className="border-orange-300 text-orange-600 hover:bg-orange-50"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.(id);
          }}
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
