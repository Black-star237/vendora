
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ShopCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  productsCount: number;
}

const ShopCard = ({ id, name, description, image, rating, productsCount }: ShopCardProps) => {
  return (
    <div className="shop-card animate-fade-in">
      <Link to={`/shops/${id}`} className="block">
        <div className="aspect-[3/1] overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/shops/${id}`}>
            <h3 className="font-semibold">{name}</h3>
          </Link>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">{productsCount} produits</span>
          <Link to={`/shops/${id}`}>
            <Button variant="outline" size="sm">Voir la boutique</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
