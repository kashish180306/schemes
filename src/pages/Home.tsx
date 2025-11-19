import { useEffect, useState } from "react";
import { api, Scheme } from "@/lib/api";
import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";
import SchemeCard from "@/components/SchemeCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Home = () => {
  const [heroSchemes, setHeroSchemes] = useState<Scheme[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    loadHeroSchemes();
  }, []);

  useEffect(() => {
    loadSchemes();
  }, [page]);

  const loadHeroSchemes = async () => {
    try {
      const response = await api.getSchemes(1, 6);
      setHeroSchemes(response.data);
    } catch (error) {
      console.error("Failed to load hero schemes:", error);
      toast.error("Failed to load featured schemes");
    }
  };

  const loadSchemes = async () => {
    setLoading(true);
    try {
      const response = await api.getSchemes(page, limit);
      setSchemes(response.data);
      setTotalPages(Math.ceil(response.total / limit));
    } catch (error) {
      console.error("Failed to load schemes:", error);
      toast.error("Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-hero py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Government Schemes,
              <br />
              <span className="text-primary">Empower Your Future</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              All-in-one platform to explore, learn about, and access government
              schemes — faster and smarter.
            </p>
            <Button 
              size="lg" 
              className="rounded-full px-8"
              onClick={() => document.getElementById('schemes-list')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Schemes
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {heroSchemes.length > 0 && (
            <div className="max-w-6xl mx-auto">
              <HeroCarousel schemes={heroSchemes} />
            </div>
          )}
        </div>
      </section>

      {/* All Schemes Section */}
      <section id="schemes-list" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              All Government Schemes
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse through our comprehensive collection of government schemes
              across all categories
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="space-y-4 md:space-y-6 mb-12">
                {schemes.map((scheme) => (
                  <SchemeCard key={scheme._id} scheme={scheme} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Button
                        key={p}
                        variant={page === p ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(p)}
                        className="rounded-full w-10 h-10"
                      >
                        {p}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
