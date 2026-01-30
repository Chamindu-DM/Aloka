import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../dashboard/DashboardHeader";
import { CampaignCard } from "../dashboard/CampaignCard";
import { DonateModal } from "../modals/DonateModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Search,
  TrendingUp,
  Heart,
  Users,
  Target,
  MapPin,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5001/api";

interface Campaign {
  id: number;
  title: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
  category: string;
  location: string;
  daysLeft: number;
  isFeatured?: boolean;
  isUrgent?: boolean;
  organizer: string;
}

const categories = [
  { id: "all", label: "All Causes", icon: TrendingUp },
  { id: "medical", label: "Medical", icon: Heart },
  { id: "education", label: "Education", icon: Target },
  { id: "community", label: "Community", icon: Users },
  { id: "emergency", label: "Emergency", icon: Target },
  { id: "social", label: "Social", icon: Heart },
  { id: "economic", label: "Economic", icon: TrendingUp },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const userName = localStorage.getItem("userName") || "User";

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/campaigns`);
      const data = await response.json();
      if (data.status === 200) {
        const formattedCampaigns = data.data.map((c: any) => ({
          id: c.id,
          title: c.title,
          image: c.image,
          raised: Number(c.raised),
          goal: Number(c.goal),
          donors: c.donors,
          category: c.category.charAt(0).toUpperCase() + c.category.slice(1),
          location: c.location,
          daysLeft: c.days_left,
          isFeatured: c.is_featured,
          isUrgent: c.is_urgent,
          organizer: c.organizer
        }));
        setCampaigns(formattedCampaigns);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = (id: number) => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      setSelectedCampaign(campaign);
      setDonateModalOpen(true);
    }
  };

  const handleDonationSuccess = () => {
    // Refresh campaigns to show updated amounts
    fetchCampaigns();
    setTimeout(() => {
      setDonateModalOpen(false);
      setSelectedCampaign(null);
    }, 2500);
  };

  const firstName = userName.split(" ")[0];

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesCategory = selectedCategory === "all" || 
      campaign.category.toLowerCase() === selectedCategory;
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return b.donors - a.donors;
      case "recent":
        return b.id - a.id;
      case "ending":
        return (a.daysLeft || 999) - (b.daysLeft || 999);
      case "goal":
        return b.goal - a.goal;
      default: // featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalDonors = campaigns.reduce((sum, c) => sum + c.donors, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
        <DashboardHeader onLogout={handleLogout} />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
      <DashboardHeader onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="mb-2">Welcome back, {firstName}! 👋</h1>
          <p className="text-gray-600">
            Discover meaningful causes and make a difference today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 mb-1">Total Raised</p>
                  <h3 className="text-white">LKR {(totalRaised / 1000000).toFixed(1)}M</h3>
                </div>
                <TrendingUp className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Active Campaigns</p>
                  <h3>{campaigns.length}</h3>
                </div>
                <Target className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Total Donors</p>
                  <h3>{totalDonors.toLocaleString()}</h3>
                </div>
                <Users className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Your Impact</p>
                  <h3>3 Donations</h3>
                </div>
                <Heart className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search campaigns by name, location, or keyword..."
                        className="pl-10 bg-white border-gray-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      className={`border-orange-300 ${showFilters ? 'bg-orange-50 text-orange-600' : 'text-orange-600'} hover:bg-orange-50`}
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>

                  {showFilters && (
                    <div className="flex gap-4 pt-4 border-t">
                      <div className="flex-1">
                        <label className="text-sm text-gray-600 mb-2 block">Sort By</label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="trending">Most Popular</SelectItem>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="ending">Ending Soon</SelectItem>
                            <SelectItem value="goal">Highest Goal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <label className="text-sm text-gray-600 mb-2 block">Location</label>
                        <Select>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="All Locations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="colombo">Colombo</SelectItem>
                            <SelectItem value="kandy">Kandy</SelectItem>
                            <SelectItem value="galle">Galle</SelectItem>
                            <SelectItem value="jaffna">Jaffna</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0 whitespace-nowrap"
                        : "border-orange-200 text-gray-700 hover:bg-orange-50 whitespace-nowrap"
                    }
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.label}
                  </Button>
                );
              })}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Showing {sortedCampaigns.length} campaign{sortedCampaigns.length !== 1 ? 's' : ''}
              </p>
              {searchQuery && (
                <Button
                  variant="ghost"
                  className="text-orange-600"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              )}
            </div>

            {/* Campaigns Grid */}
            {sortedCampaigns.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {sortedCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    {...campaign}
                    onDonate={handleDonate}
                    onViewDetails={(id) => console.log("View details:", id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="mb-2">No campaigns found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filters
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity - Commented out since we need donation data from backend */}
            {/* <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  Recent activity will be displayed here
                </div>
              </CardContent>
            </Card> */}

            {/* Urgent Campaigns */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-orange-50">
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center text-red-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  Urgent Campaigns
                </h3>
                <div className="space-y-4">
                  {campaigns
                    .filter((c) => c.isUrgent)
                    .slice(0, 3)
                    .map((campaign) => (
                      <div key={campaign.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <p className="line-clamp-2 mb-2">{campaign.title}</p>
                        <div className="flex items-center justify-between text-sm">
                          <Badge variant="destructive" className="bg-red-500">
                            {campaign.daysLeft} days left
                          </Badge>
                          <span className="text-gray-600">
                            {((campaign.raised / campaign.goal) * 100).toFixed(0)}% funded
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start border-orange-200 text-gray-700 hover:bg-orange-50">
                    <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                    Browse by Location
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-orange-200 text-gray-700 hover:bg-orange-50">
                    <Heart className="h-4 w-4 mr-2 text-orange-500" />
                    My Saved Campaigns
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-orange-200 text-gray-700 hover:bg-orange-50">
                    <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                    My Donation History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Donate Modal */}
      {selectedCampaign && (
        <DonateModal
          isOpen={donateModalOpen}
          onClose={() => {
            setDonateModalOpen(false);
            setSelectedCampaign(null);
          }}
          campaign={selectedCampaign}
          onSuccess={handleDonationSuccess}
        />
      )}
    </div>
  );
}
