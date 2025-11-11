import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../dashboard/DashboardHeader";
import { CampaignCard } from "../dashboard/CampaignCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Search,
  Filter,
  TrendingUp,
  Heart,
  Users,
  Target,
  MapPin,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const mockCampaigns = [
  {
    id: 1,
    title: "Help Rebuild Rural Schools After Floods",
    image: "https://images.unsplash.com/photo-1761604478724-13fe879468cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjI1NzgxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 850000,
    goal: 1200000,
    donors: 342,
    category: "Education",
    location: "Matara, Southern Province",
    daysLeft: 28,
    isFeatured: true,
    organizer: "Education Trust Sri Lanka",
  },
  {
    id: 2,
    title: "Support Amaya's Heart Surgery",
    image: "https://images.unsplash.com/photo-1613377512409-59c33c10c821?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FyZSUyMGhvc3BpdGFsfGVufDF8fHx8MTc2MjU3ODEzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 425000,
    goal: 500000,
    donors: 189,
    category: "Medical",
    location: "Colombo",
    daysLeft: 12,
    isUrgent: true,
    organizer: "Amaya's Family",
  },
  {
    id: 3,
    title: "Community Well Project - Anuradhapura",
    image: "https://images.unsplash.com/photo-1728038024967-69afb838f5ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBidWlsZGluZyUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NjI1NzgxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 320000,
    goal: 400000,
    donors: 156,
    category: "Community",
    location: "Anuradhapura",
    daysLeft: 45,
    organizer: "Rural Development Foundation",
  },
  {
    id: 4,
    title: "Provide Meals for Underprivileged Children",
    image: "https://images.unsplash.com/photo-1574309122960-34273ebda15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGNlbGVicmF0aW5nfGVufDF8fHx8MTc2MjU3ODE0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 680000,
    goal: 750000,
    donors: 421,
    category: "Social",
    location: "Kandy",
    daysLeft: 20,
    isFeatured: true,
    organizer: "Hope for Children LK",
  },
  {
    id: 5,
    title: "Emergency Relief for Flood Victims",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZnxlbnwxfHx8fDE3MzE1MDk5Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 1250000,
    goal: 2000000,
    donors: 634,
    category: "Emergency",
    location: "Galle",
    daysLeft: 7,
    isUrgent: true,
    isFeatured: true,
    organizer: "Red Cross Sri Lanka",
  },
  {
    id: 6,
    title: "Scholarship Fund for Rural Students",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nfGVufDF8fHx8MTczMTUwOTkzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 450000,
    goal: 800000,
    donors: 198,
    category: "Education",
    location: "Badulla",
    daysLeft: 35,
    organizer: "Future Leaders Foundation",
  },
  {
    id: 7,
    title: "Medical Equipment for Rural Clinic",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50fGVufDF8fHx8MTczMTUwOTkzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 720000,
    goal: 1000000,
    donors: 289,
    category: "Medical",
    location: "Jaffna",
    daysLeft: 25,
    organizer: "Healthcare Access Initiative",
  },
  {
    id: 8,
    title: "Support Small Business Recovery",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzfGVufDF8fHx8MTczMTUwOTkzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    raised: 380000,
    goal: 600000,
    donors: 145,
    category: "Economic",
    location: "Negombo",
    daysLeft: 40,
    organizer: "Small Business Alliance",
  },
];

const categories = [
  { id: "all", label: "All Causes", icon: TrendingUp },
  { id: "medical", label: "Medical", icon: Heart },
  { id: "education", label: "Education", icon: Target },
  { id: "community", label: "Community", icon: Users },
  { id: "emergency", label: "Emergency", icon: Target },
  { id: "social", label: "Social", icon: Heart },
  { id: "economic", label: "Economic", icon: TrendingUp },
];

const recentActivity = [
  {
    id: 1,
    donor: "Anonymous",
    amount: 10000,
    campaign: "Help Rebuild Rural Schools",
    time: "5 minutes ago",
  },
  {
    id: 2,
    donor: "Priya Fernando",
    amount: 5000,
    campaign: "Support Amaya's Heart Surgery",
    time: "23 minutes ago",
  },
  {
    id: 3,
    donor: "Rajith Silva",
    amount: 15000,
    campaign: "Emergency Relief for Flood Victims",
    time: "1 hour ago",
  },
  {
    id: 4,
    donor: "Anonymous",
    amount: 25000,
    campaign: "Provide Meals for Underprivileged Children",
    time: "2 hours ago",
  },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const userName = localStorage.getItem("userName") || "User";
  const firstName = userName.split(" ")[0];

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
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

  const formatCurrency = (amount: number) => {
    return `LKR ${(amount / 1000).toFixed(0)}K`;
  };

  const totalRaised = mockCampaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalDonors = mockCampaigns.reduce((sum, c) => sum + c.donors, 0);

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
                  <h3>{mockCampaigns.length}</h3>
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
                    onDonate={(id) => console.log("Donate to:", id)}
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
            {/* Recent Activity */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {activity.donor[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">
                          <span className="text-gray-900">{activity.donor}</span>
                          {' '}donated{' '}
                          <span className="text-orange-600">{formatCurrency(activity.amount)}</span>
                        </p>
                        <p className="text-sm text-gray-500 truncate">{activity.campaign}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Urgent Campaigns */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-orange-50">
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center text-red-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  Urgent Campaigns
                </h3>
                <div className="space-y-4">
                  {mockCampaigns
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
    </div>
  );
}
