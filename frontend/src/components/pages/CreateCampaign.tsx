import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DashboardHeader } from "../dashboard/DashboardHeader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  ArrowLeft,
  Image as ImageIcon,
  Target,
  MapPin,
  Calendar,
  AlertCircle,
  Sparkles,
  Save,
  Eye,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5001/api";

const CATEGORIES = [
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "environment", label: "Environment" },
  { value: "disaster-relief", label: "Disaster Relief" },
  { value: "community", label: "Community Development" },
  { value: "animals", label: "Animal Welfare" },
  { value: "arts", label: "Arts & Culture" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
  { value: "other", label: "Other" },
];

const LOCATIONS = [
  { value: "colombo", label: "Colombo" },
  { value: "kandy", label: "Kandy" },
  { value: "galle", label: "Galle" },
  { value: "jaffna", label: "Jaffna" },
  { value: "negombo", label: "Negombo" },
  { value: "anuradhapura", label: "Anuradhapura" },
  { value: "trincomalee", label: "Trincomalee" },
  { value: "batticaloa", label: "Batticaloa" },
  { value: "matara", label: "Matara" },
  { value: "kurunegala", label: "Kurunegala" },
  { value: "nationwide", label: "Nationwide" },
  { value: "other", label: "Other" },
];

interface FormErrors {
  title?: string;
  description?: string;
  goal?: string;
  category?: string;
  location?: string;
  daysLeft?: string;
}

export function CreateCampaign() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [daysLeft, setDaysLeft] = useState("30");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const userId = localStorage.getItem("userId") || "1";
  const userName = localStorage.getItem("userName") || "Anonymous";

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Campaign title is required";
    } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    }

    if (!goal || parseFloat(goal) <= 0) {
      newErrors.goal = "Please enter a valid goal amount";
    } else if (parseFloat(goal) < 1000) {
      newErrors.goal = "Minimum goal amount is LKR 1,000";
    }

    if (!category) {
      newErrors.category = "Please select a category";
    }

    if (!location) {
      newErrors.location = "Please select a location";
    }

    if (!daysLeft || parseInt(daysLeft) < 1 || parseInt(daysLeft) > 365) {
      newErrors.daysLeft = "Duration must be between 1 and 365 days";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const campaignData = {
        userId: parseInt(userId),
        title: title.trim(),
        description: description.trim(),
        image: imageUrl.trim() || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
        goal: parseFloat(goal),
        category,
        location,
        daysLeft: parseInt(daysLeft),
        isUrgent,
        isFeatured,
        organizer: userName,
      };

      console.log("Creating campaign:", campaignData);

      const response = await fetch(`${API_BASE_URL}/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create campaign");
      }

      console.log("Campaign created successfully:", data);
      alert("Campaign created successfully!");
      navigate("/my-campaigns");
    } catch (err: any) {
      console.error("Error creating campaign:", err);
      alert(err.message || "Failed to create campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      alert("Please enter at least a campaign title to save as draft");
      return;
    }

    setLoading(true);

    try {
      const campaignData = {
        userId: parseInt(userId),
        title: title.trim(),
        description: description.trim(),
        image: imageUrl.trim() || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
        goal: parseFloat(goal) || 0,
        category: category || "other",
        location: location || "other",
        daysLeft: parseInt(daysLeft) || 30,
        isUrgent,
        isFeatured,
        organizer: userName,
        status: "draft",
      };

      const response = await fetch(`${API_BASE_URL}/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save draft");
      }

      console.log("Draft saved successfully:", data);
      alert("Draft saved successfully!");
      navigate("/my-campaigns");
    } catch (err: any) {
      console.error("Error saving draft:", err);
      alert(err.message || "Failed to save draft. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    return new Intl.NumberFormat("en-LK").format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
      <DashboardHeader onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            to="/my-campaigns"
            className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Campaigns
          </Link>
          <h1 className="mb-2">Create New Campaign</h1>
          <p className="text-gray-600">
            Share your cause and start raising funds to make a difference
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  Campaign Details
                </CardTitle>
                <CardDescription>
                  Provide the basic information about your campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Campaign Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter a compelling title for your campaign"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                      errors.title ? "border-red-500" : ""
                    }`}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell your story. Explain why this cause matters and how the funds will be used..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`min-h-32 border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                      errors.description ? "border-red-500" : ""
                    }`}
                  />
                  <div className="flex justify-between">
                    {errors.description ? (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.description}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Minimum 50 characters
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      {description.length} characters
                    </p>
                  </div>
                </div>

                {/* Category and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger
                        className={`w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                          errors.category ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Location *
                    </Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger
                        className={`w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                          errors.location ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value}>
                            {loc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.location && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.location}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funding Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  Funding Goal
                </CardTitle>
                <CardDescription>
                  Set your fundraising target and campaign duration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Goal Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="goal">Goal Amount (LKR) *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        LKR
                      </span>
                      <Input
                        id="goal"
                        type="number"
                        placeholder="100000"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className={`pl-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                          errors.goal ? "border-red-500" : ""
                        }`}
                        min="1000"
                        step="1000"
                      />
                    </div>
                    {goal && parseFloat(goal) > 0 && (
                      <p className="text-sm text-gray-500">
                        {formatCurrency(goal)} LKR
                      </p>
                    )}
                    {errors.goal && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.goal}
                      </p>
                    )}
                  </div>

                  {/* Campaign Duration */}
                  <div className="space-y-2">
                    <Label htmlFor="daysLeft">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Campaign Duration (Days) *
                    </Label>
                    <Input
                      id="daysLeft"
                      type="number"
                      placeholder="30"
                      value={daysLeft}
                      onChange={(e) => setDaysLeft(e.target.value)}
                      className={`border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                        errors.daysLeft ? "border-red-500" : ""
                      }`}
                      min="1"
                      max="365"
                    />
                    {errors.daysLeft && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.daysLeft}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Image */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-orange-500" />
                  Campaign Image
                </CardTitle>
                <CardDescription>
                  Add an image to make your campaign stand out
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <p className="text-sm text-gray-500">
                    Paste a URL to your campaign image. Leave empty to use a default image.
                  </p>
                </div>

                {imageUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 max-w-md">
                      <img
                        src={imageUrl}
                        alt="Campaign preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800";
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Options */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-500" />
                  Additional Options
                </CardTitle>
                <CardDescription>
                  Highlight your campaign with special flags
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="urgent"
                    checked={isUrgent}
                    onCheckedChange={(checked) => setIsUrgent(checked as boolean)}
                    className="mt-1"
                  />
                  <div>
                    <label
                      htmlFor="urgent"
                      className="text-gray-700 font-medium cursor-pointer"
                    >
                      Mark as Urgent
                    </label>
                    <p className="text-sm text-gray-500">
                      Urgent campaigns are highlighted to attract immediate attention
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="featured"
                    checked={isFeatured}
                    onCheckedChange={(checked) => setIsFeatured(checked as boolean)}
                    className="mt-1"
                  />
                  <div>
                    <label
                      htmlFor="featured"
                      className="text-gray-700 font-medium cursor-pointer"
                    >
                      Request Featured Status
                    </label>
                    <p className="text-sm text-gray-500">
                      Featured campaigns appear on the homepage (subject to review)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                disabled={loading}
                className="border-gray-300 hover:bg-gray-50"
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg"
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Launch Campaign
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Tips Section */}
        <div className="mt-8 p-6 bg-orange-50 rounded-xl border border-orange-100">
          <h3 className="text-orange-800 mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Tips for a Successful Campaign
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              Write a compelling title that clearly describes your cause
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              Share your personal story and connection to the cause
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              Explain exactly how the funds will be used
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              Use high-quality images that showcase your cause
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              Share regular updates with your donors
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
