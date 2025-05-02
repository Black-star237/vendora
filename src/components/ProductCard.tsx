import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  shop: {
    name: string;
    id: string;
  };
  likes: number;
  comments: number;
}

const ProductCard = ({ id, name, price, image, shop, likes: initialLikes, comments }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const isMobile = useIsMobile();
  
  // Image par défaut si aucune n'est fournie
  const defaultImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";
  const productImage = image || defaultImage;

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleShare = () => {
    // Dans une version complète, cela ouvrirait une boîte de dialogue de partage
    navigator.clipboard.writeText(`https://vendora.com/products/${id}`);
    toast.success("Lien copié dans le presse-papier");
  };

  return (
    <div className="product-card animate-fade-in">
      <Link to={`/products/${id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img 
            src={productImage} 
            alt={name} 
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-3 sm:p-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="max-w-[70%]">
            <h3 className="font-medium line-clamp-1 text-sm sm:text-base">
              <Link to={`/products/${id}`}>{name}</Link>
            </h3>
            <Link 
              to={`/shops/${shop.id}`}
              className="text-xs sm:text-sm text-muted-foreground hover:underline line-clamp-1"
            >
              {shop.name}
            </Link>
          </div>
          <p className="font-semibold text-sm sm:text-base">{price.toFixed(2)} €</p>
        </div>
        
        <div className="flex items-center justify-between border-t mt-1 pt-1 sm:mt-2 sm:pt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 sm:h-8 px-1 sm:px-2 text-muted-foreground"
            onClick={toggleLike}
          >
            <Heart size={isMobile ? 14 : 16} className={liked ? "fill-rose-500 text-rose-500" : ""} />
            <span className="ml-1 text-xs sm:text-sm">{likes}</span>
          </Button>
          
          <Link to={`/products/${id}#comments`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 sm:h-8 px-1 sm:px-2 text-muted-foreground"
            >
              <MessageCircle size={isMobile ? 14 : 16} />
              <span className="ml-1 text-xs sm:text-sm">{comments}</span>
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 sm:h-8 px-1 sm:px-2 text-muted-foreground"
            onClick={handleShare}
          >
            <Share2 size={isMobile ? 14 : 16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
