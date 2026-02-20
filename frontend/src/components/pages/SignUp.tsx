import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Lightbulb, Facebook, Mail } from "lucide-react";
import { useState } from "react";

export function SignUp() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("donor");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    console.log("Submitting signup with:", { firstName, lastName, email, phone, accountType });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          email,
          phone, 
          password, 
          accountType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Sign up failed");
      }

      console.log("Sign up successful:", data);
      alert("Account created successfully! Please sign in.");
      // Redirect to sign in
      navigate("/signin");
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err.message || "Sign up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 mx-auto hover:opacity-80 transition-opacity"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-500">
              <Lightbulb className="h-7 w-7 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
              Aloka
            </span>
          </Link>
          <p className="text-gray-600 mt-2">Create an account to start making a difference</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Join thousands making an impact in Sri Lanka
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
              >
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>
            
            <div className="relative mb-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500">
                Or sign up with email
              </span>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Priya"
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Silva"
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+94 XX XXX XXXX"
                  required
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  required
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
                <p className="text-sm text-gray-500">
                  Must be at least 8 characters
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accountType">I want to</Label>
                <Select value={accountType} onValueChange={setAccountType}>
                  <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donor">Donate to causes</SelectItem>
                    <SelectItem value="campaigner">Start a campaign</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required className="mt-1" />
                <label
                  htmlFor="terms"
                  className="text-gray-700 cursor-pointer"
                >
                  I agree to the{" "}
                  <a href="#" className="text-orange-600 hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="newsletter" className="mt-1" />
                <label
                  htmlFor="newsletter"
                  className="text-gray-700 cursor-pointer"
                >
                  Send me updates about campaigns and impact stories
                </label>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
              >
                Create Account
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-orange-600 hover:text-orange-700 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
          <p className="text-center text-gray-700">
            🇱🇰 <strong>Note:</strong> Aloka is not intended for collecting personally identifiable information (PII) or handling sensitive data.
          </p>
        </div>
      </div>
    </div>
  );
}
