import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Lightbulb, Facebook, Mail } from "lucide-react";

interface SignInProps {
  onSignUpClick?: () => void;
  onBackToHome?: () => void;
}

export function SignIn({ onSignUpClick, onBackToHome }: SignInProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("Attempting sign in for:", email);

    try {
      const res = await fetch("http://localhost:5001/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Invalid email or password");
      }

      console.log("Sign in successful:", data);
      alert("Login successful!");
      // Handle successful sign in (e.g., redirect, store token, etc.)
      if (data.data && data.data.id) {
        localStorage.setItem("userId", data.data.id.toString());
        localStorage.setItem("userEmail", data.data.email);
      }
      // For now, just show success. In production, you'd redirect to dashboard
      // window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Sign in error:", err);
      alert(err.message || "Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 mx-auto hover:opacity-80 transition-opacity"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-500">
              <Lightbulb className="h-7 w-7 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
              Aloka
            </span>
          </button>
          <p className="text-gray-600 mt-2">Welcome back! Sign in to continue</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-gray-700 cursor-pointer"
                >
                  Remember me for 30 days
                </label>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
              >
                Sign In
              </Button>
            </form>
            
            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSignUpClick}
                className="text-orange-600 hover:text-orange-700 transition-colors"
              >
                Sign up for free
              </button>
            </div>
          </CardFooter>
        </Card>
        
        <p className="text-center text-gray-500 mt-6">
          By signing in, you agree to our{" "}
          <a href="#" className="text-orange-600 hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}