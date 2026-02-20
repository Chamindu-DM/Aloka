import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../dashboard/DashboardHeader";
import { CampaignCard } from "../dashboard/CampaignCard";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Plus,
  TrendingUp,
  Target,
  Users,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { API_BASE_URL } from "@/config/api";

interface Campaign {
  id: number;
  user_id: number;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
  category: string;
  location: string;
  days_left: number;
  is_urgent: boolean;
  is_featured: boolean;
  organizer: string;
  status: string;
  created_at: string;
}

export function MyCampaigns() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  const userId = localStorage.getItem("userId") || "1";

  useEffect(() => {
    fetchUserCampaigns();
  }, []);

  const fetchUserCampaigns = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/campaigns/user/${userId}`);
      const data = await response.json();
      if (data.status === 200) {
        setCampaigns(data.data);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const handleDeleteCampaign = async (id: number) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.status === 200) {
        setCampaigns(campaigns.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  const completedCampaigns = campaigns.filter((c) => c.status === "completed");
  const draftCampaigns = campaigns.filter((c) => c.status === "draft");

  const totalRaised = campaigns.reduce((sum, c) => sum + Number(c.raised), 0);
  const totalDonors = campaigns.reduce((sum, c) => sum + c.donors, 0);
  const totalGoal = campaigns.reduce((sum, c) => sum + Number(c.goal), 0);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `LKR ${(amount / 1000000).toFixed(1)}M`;
    }
    return `LKR ${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-orange-50/30 to-white">
      <DashboardHeader onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="mb-2">My Campaigns</h1>
            <p className="text-gray-600">
              Manage and track all your fundraising campaigns
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-linear-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg"
            onClick={() => navigate("/campaigns/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Campaign
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md bg-linear-to-br from-orange-500 to-yellow-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 mb-1">Total Raised</p>
                  <h3 className="text-white">{formatCurrency(totalRaised)}</h3>
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
                  <h3>{activeCampaigns.length}</h3>
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
                  <p className="text-gray-600 mb-1">Avg. Progress</p>
                  <h3>
                    {totalGoal > 0
                      ? ((totalRaised / totalGoal) * 100).toFixed(0)
                      : 0}
                    %
                  </h3>
                </div>
                <TrendingUp className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="active" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Active ({activeCampaigns.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Completed ({completedCampaigns.length})
            </TabsTrigger>
            <TabsTrigger value="draft" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Drafts ({draftCampaigns.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading campaigns...</p>
              </div>
            ) : activeCampaigns.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCampaigns.map((campaign) => (
                  <div key={campaign.id} className="relative">
                    <CampaignCard
                      id={campaign.id}
                      title={campaign.title}
                      image={campaign.image}
                      raised={Number(campaign.raised)}
                      goal={Number(campaign.goal)}
                      donors={campaign.donors}
                      category={campaign.category}
                      location={campaign.location}
                      daysLeft={campaign.days_left}
                      isUrgent={campaign.is_urgent}
                      isFeatured={campaign.is_featured}
                      organizer={campaign.organizer}
                      onDonate={(id) => console.log("Donate to:", id)}
                      onViewDetails={(id) => navigate(`/campaigns/${id}`)}
                    />
                    <div className="absolute top-3 right-14 z-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/90 backdrop-blur-sm hover:bg-white h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="mb-2">No active campaigns</h3>
                  <p className="text-gray-600 mb-4">
                    Start your first campaign and make a difference today!
                  </p>
                  <Button
                    className="bg-linear-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                    onClick={() => navigate("/campaigns/new")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedCampaigns.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCampaigns.map((campaign) => (
                  <div key={campaign.id} className="relative opacity-75">
                    <CampaignCard
                      id={campaign.id}
                      title={campaign.title}
                      image={campaign.image}
                      raised={Number(campaign.raised)}
                      goal={Number(campaign.goal)}
                      donors={campaign.donors}
                      category={campaign.category}
                      location={campaign.location}
                      organizer={campaign.organizer}
                      onViewDetails={(id) => navigate(`/campaigns/${id}`)}
                    />
                    <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                      Completed
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="mb-2">No completed campaigns yet</h3>
                  <p className="text-gray-600">
                    Your successfully funded campaigns will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="draft">
            {draftCampaigns.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {draftCampaigns.map((campaign) => (
                  <div key={campaign.id} className="relative opacity-75">
                    <CampaignCard
                      id={campaign.id}
                      title={campaign.title}
                      image={campaign.image}
                      raised={Number(campaign.raised)}
                      goal={Number(campaign.goal)}
                      donors={campaign.donors}
                      category={campaign.category}
                      location={campaign.location}
                      organizer={campaign.organizer}
                      onViewDetails={(id) => navigate(`/campaigns/${id}/edit`)}
                    />
                    <Badge className="absolute top-3 right-3 bg-gray-500 text-white">
                      Draft
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <Edit className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="mb-2">No draft campaigns</h3>
                  <p className="text-gray-600">
                    Saved drafts will appear here for you to complete later.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

