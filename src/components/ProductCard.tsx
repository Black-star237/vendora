
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
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
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="font-medium line-clamp-1">
              <Link to={`/products/${id}`}>{name}</Link>
            </h3>
            <Link 
              to={`/shops/${shop.id}`}
              className="text-sm text-muted-foreground hover:underline"
            >
              {shop.name}
            </Link>
          </div>
          <p className="font-semibold">{price.toFixed(2)} €</p>
        </div>
        
        <div className="flex items-center justify-between border-t mt-2 pt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-muted-foreground"
            onClick={toggleLike}
          >
            <Heart size={16} className={liked ? "fill-rose-500 text-rose-500" : ""} />
            <span className="ml-1">{likes}</span>
          </Button>
          
          <Link to={`/products/${id}#comments`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-muted-foreground"
            >
              <MessageCircle size={16} />
              <span className="ml-1">{comments}</span>
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-muted-foreground"
            onClick={handleShare}
          >
            <Share2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
