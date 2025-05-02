
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Star, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data pour démonstration
const product = {
  id: "1",
  name: "Collier artisanal en perles naturelles",
  price: 39.99,
  description: "Un magnifique collier artisanal créé à partir de perles naturelles soigneusement sélectionnées. Chaque pièce est unique et fabriquée à la main dans notre atelier. Le collier mesure 45 cm et possède un fermoir en argent de haute qualité.",
  details: [
    "Perles naturelles de 8mm",
    "Fermoir en argent 925",
    "Longueur: 45 cm",
    "Poids: 25g",
    "Fait main en France"
  ],
  images: [
    "https://images.unsplash.com/photo-1611085583191-a3b181a88578?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608050072142-08a90a621860?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
  ],
  shop: { 
    name: "Bijoux Naturels", 
    id: "1",
    avatar: "https://images.unsplash.com/photo-1617220377936-6423b02875d3?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    totalSales: 487
  },
  reviews: [
    {
      id: "1",
      user: { name: "Sophie L.", avatar: "https://i.pravatar.cc/150?img=1" },
      rating: 5,
      date: "15 avril 2025",
      content: "Superbe collier, exactement comme sur les photos ! La qualité est exceptionnelle et la livraison a été rapide. Je recommande vivement ce vendeur."
    },
    {
      id: "2",
      user: { name: "Martin R.", avatar: "https://i.pravatar.cc/150?img=2" },
      rating: 4,
      date: "2 avril 2025",
      content: "Très joli bijou, bien emballé et livré rapidement. Je retire une étoile car le fermoir est un peu difficile à manipuler."
    }
  ],
  likes: 24,
  comments: 3,
  category: "Bijoux",
  inStock: 5
};

const relatedProducts = [
  {
    id: "2",
    name: "Bracelet assorti en perles",
    price: 25.90,
    image: "https://images.unsplash.com/photo-1608050072142-08a90a621860?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Bijoux Naturels", id: "1" },
    likes: 18,
    comments: 2
  },
  {
    id: "3",
    name: "Boucles d'oreilles en pierre naturelle",
    price: 19.50,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Bijoux Naturels", id: "1" },
    likes: 32,
    comments: 5
  },
  {
    id: "4",
    name: "Pendentif en quartz",
    price: 29.95,
    image: "https://images.unsplash.com/photo-1576022162942-c67f2a5f29c2?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Bijoux Naturels", id: "1" },
    likes: 15,
    comments: 1
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(product.likes);
  
  const handleAddToCart = () => {
    toast.success(`${quantity} ${product.name} ajouté au panier`);
  };
  
  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Lien copié dans le presse-papier");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Accueil</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/category/${product.category.toLowerCase()}`}>
                    {product.category}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>{product.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div>
              <div className="aspect-square overflow-hidden rounded-lg border mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    className={`aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`} 
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Link 
                  to={`/shops/${product.shop.id}`}
                  className="text-sm text-muted-foreground hover:underline"
                >
                  {product.shop.name}
                </Link>
                <h1 className="text-3xl font-semibold mt-1">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium">{product.shop.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.shop.totalSales} ventes
                  </span>
                </div>
              </div>
              
              <p className="text-2xl font-semibold">{product.price.toFixed(2)} €</p>
              
              <div>
                <p className="text-sm text-muted-foreground">
                  {product.inStock > 0 ? `${product.inStock} en stock` : "Rupture de stock"}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <button 
                    className="px-3 py-1 text-lg"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{quantity}</span>
                  <button 
                    className="px-3 py-1 text-lg"
                    disabled={quantity >= product.inStock}
                    onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                  >
                    +
                  </button>
                </div>
                
                <Button 
                  className="bg-vendora-green text-white hover:bg-vendora-green-dark flex-1"
                  disabled={product.inStock === 0}
                  onClick={handleAddToCart}
                >
                  Ajouter au panier
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleLike}
                >
                  <Heart size={16} className={liked ? "fill-rose-500 text-rose-500" : ""} />
                  <span className="ml-2">{likes}</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                >
                  <Share2 size={16} />
                  <span className="ml-2">Partager</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger 
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-2"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-2"
              >
                Détails
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-2"
              >
                Avis ({product.reviews.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="pt-6">
              <p className="text-muted-foreground">
                {product.description}
              </p>
            </TabsContent>
            
            <TabsContent value="details" className="pt-6">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="reviews" id="comments" className="pt-6">
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.user.name}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-muted-foreground">{review.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Related Products */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Vous pourriez aussi aimer</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
