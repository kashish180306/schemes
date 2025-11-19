import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, Scheme } from "@/lib/api";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, Loader2, Share2 } from "lucide-react";
import { toast } from "sonner";

const SchemeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadScheme(id);
    }
  }, [id]);

  const loadScheme = async (schemeId: string) => {
    setLoading(true);
    try {
      const data = await api.getScheme(schemeId);
      setScheme(data);
    } catch (error) {
      console.error("Failed to load scheme:", error);
      toast.error("Failed to load scheme details");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: scheme?.name,
        text: scheme?.details,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Scheme Not Found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/" className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all schemes
          </Link>

          <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-lg">
            <div className="relative h-64 md:h-96">
              <img
                src={scheme.imageUrl}
                alt={scheme.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium mb-3">
                  {scheme.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                  {scheme.name}
                </h1>
              </div>
            </div>

            <div className="p-6 md:p-12">
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="rounded-full flex-1"
                  asChild
                >
                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to Original Portal
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  {scheme.details}
                </p>

                <h2 className="text-2xl font-bold mb-4">Details</h2>
                <div
                  className="text-muted-foreground leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: scheme.content }}
                />
              </div>

              {scheme.createdAt && (
                <div className="mt-12 pt-6 border-t border-border text-sm text-muted-foreground">
                  Published on {new Date(scheme.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SchemeDetail;
