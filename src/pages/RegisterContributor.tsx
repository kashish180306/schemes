import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const RegisterContributor = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    expertise: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.bio) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create mailto link
    const mailtoLink = `mailto:schemeshub2025@gmail.com?subject=Contributor Registration - ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
      `Contributor Registration Details:\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nBio:\n${formData.bio}\n\nAreas of Expertise:\n${formData.expertise}`
    )}`;

    window.location.href = mailtoLink;
    toast.success("Opening your email client to submit your registration...");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="py-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="bg-card p-12 rounded-3xl border border-border">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Application Submitted!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your interest in becoming a contributor. Our admin
                team will review your application and contact you via email soon.
              </p>
              <Button size="lg" className="rounded-full" onClick={() => window.location.href = "/"}>
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Become a Contributor
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help us keep government scheme information accurate and up-to-date.
              Join our community of contributors today.
            </p>
          </div>

          <div className="bg-card p-8 md:p-12 rounded-3xl border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bio">Short Bio *</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="mt-1 min-h-24"
                  placeholder="Tell us about yourself and your background..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="expertise">Areas of Expertise</Label>
                <Input
                  id="expertise"
                  value={formData.expertise}
                  onChange={(e) =>
                    setFormData({ ...formData, expertise: e.target.value })
                  }
                  className="mt-1"
                  placeholder="e.g., Agriculture, Education, Healthcare"
                />
              </div>

              <div className="bg-muted p-4 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This is a demonstration form. Your
                  information is stored locally and our admin team will be
                  notified to contact you via email.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full rounded-full">
                Submit Application
              </Button>
            </form>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <h3 className="font-bold text-xl mb-2">Share Knowledge</h3>
              <p className="text-muted-foreground text-sm">
                Help citizens discover schemes they're eligible for
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="font-bold text-xl mb-2">Make an Impact</h3>
              <p className="text-muted-foreground text-sm">
                Contribute to accurate, up-to-date information
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="font-bold text-xl mb-2">Join Community</h3>
              <p className="text-muted-foreground text-sm">
                Connect with other contributors nationwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterContributor;
