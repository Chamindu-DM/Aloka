import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../dashboard/DashboardHeader";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Heart,
  TrendingUp,
  Calendar,
  Receipt,
  Download,
  ExternalLink,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Donation {
  id: number;
  user_id: number;
  campaign_id: number;
  amount: number;
  donor_name: string;
  is_anonymous: boolean;
  message: string;
  payment_status: string;
  created_at: string;
  campaign_title: string;
  campaign_image: string;
  campaign_category: string;
  organizer: string;
}

interface DonationStats {
  total_donations: string;
  total_amount: string;
  campaigns_supported: string;
}

const API_BASE_URL = "http://localhost:5001/api";

export function MyDonations() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [filterCategory, setFilterCategory] = useState("all");

  const userId = localStorage.getItem("userId") || "1";

  useEffect(() => {
    fetchUserDonations();
    fetchUserStats();
  }, []);

  const fetchUserDonations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/donations/user/${userId}`);
      const data = await response.json();
      if (data.status === 200) {
        setDonations(data.data);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/donations/user/${userId}/stats`);
      const data = await response.json();
      if (data.status === 200) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `LKR ${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `LKR ${(amount / 1000).toFixed(0)}K`;
    }
    return `LKR ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return formatDate(dateString);
  };

  // Get unique categories from donations
  const categories = Array.from(new Set(donations.map((d) => d.campaign_category).filter(Boolean)));

  // Filter and sort donations
  const filteredDonations = donations
    .filter((d) => filterCategory === "all" || d.campaign_category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "amount-high":
          return Number(b.amount) - Number(a.amount);
        case "amount-low":
          return Number(a.amount) - Number(b.amount);
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const thisMonthDonations = donations.filter((d) => {
    const date = new Date(d.created_at);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });

  const thisMonthTotal = thisMonthDonations.reduce((sum, d) => sum + Number(d.amount), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
      <DashboardHeader onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="mb-2">My Donations</h1>
            <p className="text-gray-600">
              Track your contributions and see the impact you've made
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg"
            onClick={() => navigate("/dashboard")}
          >
            <Heart className="h-4 w-4 mr-2" />
            Donate Now
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 mb-1">Total Donated</p>
                  <h3 className="text-white">
                    {stats ? formatCurrency(Number(stats.total_amount)) : "LKR 0"}
                  </h3>
                </div>
                <Heart className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Total Donations</p>
                  <h3>{stats?.total_donations || 0}</h3>
                </div>
                <Receipt className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Campaigns Supported</p>
                  <h3>{stats?.campaigns_supported || 0}</h3>
                </div>
                <TrendingUp className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">This Month</p>
                  <h3>{formatCurrency(thisMonthTotal)}</h3>
                </div>
                <Calendar className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-md mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Filter & Sort</span>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="amount-high">Amount: High to Low</SelectItem>
                    <SelectItem value="amount-low">Amount: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donations List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              All Donations ({donations.length})
            </TabsTrigger>
            <TabsTrigger value="this-month" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              This Month ({thisMonthDonations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading donations...</p>
              </div>
            ) : filteredDonations.length > 0 ? (
              <div className="space-y-4">
                {filteredDonations.map((donation) => (
                  <Card
                    key={donation.id}
                    className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Campaign Image */}
                        <div className="md:w-48 h-32 md:h-auto flex-shrink-0">
                          <ImageWithFallback
                            src={donation.campaign_image}
                            alt={donation.campaign_title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Donation Details */}
                        <div className="flex-1 p-5">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-orange-100 text-orange-600 border-0">
                                  {donation.campaign_category}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                  {getRelativeTime(donation.created_at)}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                                {donation.campaign_title}
                              </h3>
                              <p className="text-sm text-gray-500 mb-2">
                                by {donation.organizer}
                              </p>
                              {donation.message && (
                                <p className="text-sm text-gray-600 italic">
                                  "{donation.message}"
                                </p>
                              )}
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <div className="text-right">
                                <p className="text-2xl font-bold text-orange-600">
                                  LKR {Number(donation.amount).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {formatDate(donation.created_at)} at {formatTime(donation.created_at)}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                                  onClick={() => navigate(`/campaigns/${donation.campaign_id}`)}
                                >
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  View Campaign
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Receipt
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="mb-2">No donations yet</h3>
                  <p className="text-gray-600 mb-4">
                    Make your first donation and start making a difference!
                  </p>
                  <Button
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                    onClick={() => navigate("/dashboard")}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Explore Campaigns
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="this-month">
            {thisMonthDonations.length > 0 ? (
              <div className="space-y-4">
                {thisMonthDonations.map((donation) => (
                  <Card
                    key={donation.id}
                    className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-32 md:h-auto flex-shrink-0">
                          <ImageWithFallback
                            src={donation.campaign_image}
                            alt={donation.campaign_title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-5">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <Badge className="bg-orange-100 text-orange-600 border-0 mb-2">
                                {donation.campaign_category}
                              </Badge>
                              <h3 className="text-lg font-semibold mb-1">
                                {donation.campaign_title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                by {donation.organizer}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-orange-600">
                                LKR {Number(donation.amount).toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDate(donation.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="mb-2">No donations this month</h3>
                  <p className="text-gray-600">
                    Your donations for this month will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Impact Summary */}
        {donations.length > 0 && (
          <Card className="border-0 shadow-md mt-8 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardContent className="p-6">
              <h3 className="mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
                Your Impact Summary
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="text-3xl font-bold text-orange-600 mb-1">
                    {stats?.campaigns_supported || 0}
                  </p>
                  <p className="text-gray-600">Campaigns Supported</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="text-3xl font-bold text-orange-600 mb-1">
                    {stats ? formatCurrency(Number(stats.total_amount)) : "LKR 0"}
                  </p>
                  <p className="text-gray-600">Total Contribution</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="text-3xl font-bold text-orange-600 mb-1">
                    {categories.length}
                  </p>
                  <p className="text-gray-600">Categories Helped</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

