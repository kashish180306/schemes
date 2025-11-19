import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scheme } from "@/lib/api";
import { Link } from "react-router-dom";

interface HeroCarouselProps {
  schemes: Scheme[];
}

const HeroCarousel = ({ schemes }: HeroCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="overflow-hidden rounded-3xl shadow-2xl" ref={emblaRef}>
        <div className="flex">
          {schemes.map((scheme) => (
            <Link
              key={scheme._id}
              to={`/scheme/${scheme._id}`}
              className="flex-[0_0_100%] min-w-0 relative"
            >
              <div className="relative h-[300px] md:h-[380px] lg:h-[420px]">
                <img
                  src={scheme.imageUrl}
                  alt={scheme.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                  <div className="max-w-4xl">
                    <span className="inline-block px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium mb-3">
                      {scheme.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold mb-3">
                      {scheme.name}
                    </h2>
                    <p className="text-base md:text-lg text-white/90 line-clamp-2">
                      {scheme.details}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {schemes.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;
