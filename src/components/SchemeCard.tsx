import { Link } from "react-router-dom";
import { Scheme } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SchemeCardProps {
  scheme: Scheme;
}

const SchemeCard = ({ scheme }: SchemeCardProps) => {
  return (
    <Link
      to={`/scheme/${scheme._id}`}
      className="group flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
    >
      <div className="w-full md:w-48 h-48 md:h-32 flex-shrink-0 overflow-hidden rounded-xl">
        <img
          src={scheme.imageUrl}
          alt={scheme.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {scheme.name}
            </h3>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full whitespace-nowrap">
              {scheme.category}
            </span>
          </div>
          <p className="text-muted-foreground line-clamp-2 mb-4">
            {scheme.details}
          </p>
        </div>
        
        <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
          View Details
          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default SchemeCard;
