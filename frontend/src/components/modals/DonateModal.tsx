import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Heart, Upload, CheckCircle2, AlertCircle, CreditCard, Wallet } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: {
    id: number;
    title: string;
    image: string;
    goal: number;
    raised: number;
    category: string;
  };
  onSuccess?: () => void;
}

export function DonateModal({ isOpen, onClose, campaign, onSuccess }: DonateModalProps) {
  const [step, setStep] = useState<"amount" | "details" | "success">("amount");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 25000];

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount(value);
  };

  const handleNext = () => {
    const donationAmount = parseInt(amount);
    if (!amount || donationAmount < 100) {
      setError("Minimum donation amount is LKR 100");
      return;
    }
    setError("");
    setStep("details");
  };

  const handleSubmit = async () => {
    if (!userId) {
      setError("Please sign in to make a donation");
      return;
    }

    if (!receiptUrl && !import.meta.env.VITE_STRIPE_KEY) {
      setError("Please upload a payment receipt");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const donationData = {
        userId: parseInt(userId),
        campaignId: campaign.id,
        amount: parseInt(amount),
        donorName: isAnonymous ? "Anonymous" : (donorName || userName || "Anonymous"),
        isAnonymous,
        message: message.trim(),
        receiptUrl: receiptUrl.trim() || null,
        paymentMethod: "manual" // Will be "stripe" when integrated
      };

      const response = await fetch(`${API_BASE_URL}/donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to process donation");
      }

      setStep("success");
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err: any) {
      console.error("Error processing donation:", err);
      setError(err.message || "Failed to process donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("amount");
    setAmount("");
    setCustomAmount("");
    setDonorName("");
    setIsAnonymous(false);
    setMessage("");
    setReceiptUrl("");
    setError("");
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        {step === "amount" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-orange-500" />
                Make a Donation
              </DialogTitle>
              <DialogDescription>
                Support: {campaign.title}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Campaign Progress */}
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Raised</span>
                  <span className="font-semibold text-orange-600">
                    {formatCurrency(campaign.raised)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Goal</span>
                  <span className="font-semibold">
                    {formatCurrency(campaign.goal)}
                  </span>
                </div>
              </div>

              {/* Predefined Amounts */}
              <div>
                <Label className="mb-3 block">Select Amount (LKR)</Label>
                <div className="grid grid-cols-3 gap-3">
                  {predefinedAmounts.map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant={amount === value.toString() ? "default" : "outline"}
                      className={
                        amount === value.toString()
                          ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0"
                          : "border-gray-300 hover:border-orange-500"
                      }
                      onClick={() => handleAmountSelect(value)}
                    >
                      {formatCurrency(value)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <Label htmlFor="customAmount">Or enter custom amount</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    LKR
                  </span>
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-12 border-gray-300 focus:border-orange-500"
                    min="100"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Minimum: LKR 100</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
              >
                Continue
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-orange-500" />
                Donation Details
              </DialogTitle>
              <DialogDescription>
                Amount: <span className="font-semibold text-orange-600">{formatCurrency(parseInt(amount))}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Payment Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment Instructions
                </h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>1. Transfer {formatCurrency(parseInt(amount))} to:</p>
                  <p className="font-mono bg-white px-2 py-1 rounded">
                    Bank: Bank of Ceylon<br />
                    Account: 1234567890<br />
                    Name: Aloka Platform
                  </p>
                  <p>2. Upload your payment receipt below</p>
                </div>
              </div>

              {/* Receipt Upload */}
              <div>
                <Label htmlFor="receipt">Payment Receipt URL *</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="receipt"
                    type="url"
                    placeholder="https://example.com/receipt.jpg"
                    value={receiptUrl}
                    onChange={(e) => setReceiptUrl(e.target.value)}
                    className="border-gray-300 focus:border-orange-500"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-shrink-0"
                    title="Upload to image hosting service (e.g., imgur.com)"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload your receipt to an image hosting service and paste the URL
                </p>
              </div>

              <Separator />

              {/* Donor Details */}
              <div>
                <Label htmlFor="donorName">Your Name (optional)</Label>
                <Input
                  id="donorName"
                  type="text"
                  placeholder="John Doe"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  disabled={isAnonymous}
                  className="mt-2 border-gray-300 focus:border-orange-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                />
                <label
                  htmlFor="anonymous"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Make this donation anonymous
                </label>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Message (optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Leave a message of support..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 min-h-20 border-gray-300 focus:border-orange-500"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {message.length}/500 characters
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("amount")}>
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Submit Donation
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "success" && (
          <>
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  Your donation of <span className="font-semibold text-orange-600">{formatCurrency(parseInt(amount))}</span> has been submitted successfully.
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-sm text-gray-700">
                <p>Your donation is pending verification. Once your payment receipt is reviewed, it will be added to the campaign.</p>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
              >
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
