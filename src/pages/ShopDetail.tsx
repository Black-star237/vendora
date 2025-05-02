
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Package, Calendar, ChevronRight, Search } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data pour démonstration
const shop = {
  id: "1",
  name: "Bijoux Naturels",
  description: "Créations de bijoux avec des matériaux naturels et éco-responsables. Chaque pièce est unique et fabriquée à la main dans notre atelier à Paris.",
  longDescription: "Bijoux Naturels est une boutique artisanale spécialisée dans la création de bijoux éco-responsables. Fondée en 2018 par Marie Dubois, notre marque s'engage à utiliser uniquement des matériaux naturels, recyclés ou issus du commerce équitable. Notre mission est de proposer des bijoux élégants qui respectent à la fois l'environnement et les conditions de travail de nos artisans partenaires. Tous nos bijoux sont fabriqués à la main dans notre atelier parisien, avec une attention particulière portée aux détails et à la qualité.",
  image: "https://images.unsplash.com/photo-1617220377936-6423b02875d3?q=80&w=800&auto=format&fit=crop",
  banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
  rating: 4.8,
  location: "Paris, France",
  foundedDate: "2018",
  productsCount: 24,
  salesCount: 487,
  policies: [
    {
      title: "Livraison",
      content: "Livraison standard en 3-5 jours ouvrés. Livraison express disponible en 24-48h avec supplément."
    },
    {
      title: "Retours",
      content: "Retours acceptés dans les 14 jours suivant la livraison. Les produits doivent être dans leur état d'origine."
    },
    {
      title: "Garantie",
      content: "Tous nos bijoux sont garantis 1 an contre les défauts de fabrication."
    }
  ]
};

const shopProducts = [
  {
    id: "1",
    name: "Collier artisanal en perles naturelles",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88578?q=80&w=800&auto=format&fit=crop",
    shop: { name: shop.name, id: shop.id },
    likes: 24,
    comments: 3
  },
  {
    id: "2",
    name: "Bracelet assorti en perles",
    price: 25.90,
    image: "https://images.unsplash.com/photo-1608050072142-08a90a621860?q=80&w=800&auto=format&fit=crop",
    shop: { name: shop.name, id: shop.id },
    likes: 18,
    comments: 2
  },
  {
    id: "3",
    name: "Boucles d'oreilles en pierre naturelle",
    price: 19.50,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
    shop: { name: shop.name, id: shop.id },
    likes: 32,
    comments: 5
  },
  {
    id: "4",
    name: "Pendentif en quartz",
    price: 29.95,
    image: "https://images.unsplash.com/photo-1576022162942-c67f2a5f29c2?q=80&w=800&auto=format&fit=crop",
    shop: { name: shop.name, id: shop.id },
    likes: 15,
    comments: 1
  },
  {
    id: "5",
    name: "Bague en argent avec pierre naturelle",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    shop: { name: shop.name, id: shop.id },
    likes: 42,
    comments: 7
  },
  {
    id: "6",
    name: "Set de bracelets fins",
    price: 35.50,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop",
    shop: { name: shop.name, id: shop.id },
    likes: 29,
    comments: 4
  }
];

const shopReviews = [
  {
    id: "1",
    user: { name: "Sophie L.", avatar: "https://i.pravatar.cc/150?img=1" },
    rating: 5,
    date: "15 avril 2025",
    content: "J'adore cette boutique ! Les bijoux sont magnifiques et de très bonne qualité. Le service client est impeccable, j'ai eu un petit problème avec ma commande et il a été résolu très rapidement. Je recommande vivement !"
  },
  {
    id: "2",
    user: { name: "Martin R.", avatar: "https://i.pravatar.cc/150?img=2" },
    rating: 4,
    date: "2 avril 2025",
    content: "Très bons produits, je suis satisfait de mes achats. J'enlève une étoile car les délais de livraison étaient un peu plus longs que prévu, mais la qualité des bijoux compense largement ce petit désagrément."
  },
  {
    id: "3",
    user: { name: "Julie M.", avatar: "https://i.pravatar.cc/150?img=3" },
    rating: 5,
    date: "28 mars 2025",
    content: "Des créations uniques et de grande qualité. Ma femme a adoré son cadeau ! L'emballage était également très soigné. Parfait pour offrir."
  }
];

const ShopDetail = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProducts = shopProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="h-64 md:h-80 overflow-hidden relative">
          <img 
            src={shop.banner} 
            alt={`${shop.name} banner`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
            <div className="container pb-6 text-white">
              <h1 className="text-3xl font-bold">{shop.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center mr-4">
                  <Star size={16} className="fill-yellow-500 text-yellow-500" />
                  <span className="ml-1">{shop.rating.toFixed(1)} ({shopReviews.length} avis)</span>
                </div>
                <div className="flex items-center mr-4">
                  <Package size={16} />
                  <span className="ml-1">{shop.productsCount} produits</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} />
                  <span className="ml-1">{shop.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container py-8">
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
                  <Link to="/shops">Boutiques</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>{shop.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Tabs defaultValue="products" className="mb-12">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger 
                value="products"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-2"
              >
                Produits
              </TabsTrigger>
              <TabsTrigger 
                value="about"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-2"
              >
                À propos
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-2"
              >
                Avis ({shopReviews.length})
              </TabsTrigger>
              <TabsTrigger 
                value="policies"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent px-4 py-2"
              >
                Politiques
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="pt-6">
              <div className="mb-6">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher des produits..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Aucun produit ne correspond à votre recherche</p>
                </div>
              )}
              
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TabsContent>
            
            <TabsContent value="about" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 space-y-4">
                  <h2 className="text-2xl font-semibold">À propos de {shop.name}</h2>
                  <p className="text-muted-foreground">{shop.longDescription}</p>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Fondée en</p>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>{shop.foundedDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Localisation</p>
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1" />
                          <span>{shop.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Ventes réalisées</p>
                        <span>{shop.salesCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Évaluation</p>
                        <div className="flex items-center">
                          <Star size={16} className="fill-yellow-500 text-yellow-500 mr-1" />
                          <span>{shop.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 space-y-6">
                  {shopReviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img 
                            src={review.user.avatar} 
                            alt={review.user.name}
                            className="w-10 h-10 rounded-full"
                          />
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
                
                <div>
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-medium">Évaluation de la boutique</h3>
                      <div className="flex items-center">
                        <div className="text-3xl font-bold mr-3">{shop.rating.toFixed(1)}</div>
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => {
                            const fillPercentage = i < Math.floor(shop.rating) 
                              ? 100 
                              : i === Math.floor(shop.rating) 
                                ? (shop.rating % 1) * 100
                                : 0;
                                
                            return (
                              <Star 
                                key={i} 
                                size={20} 
                                className={fillPercentage > 0 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                              />
                            );
                          })}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Basé sur {shopReviews.length} avis</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="policies" className="pt-6">
              <div className="space-y-8">
                {shop.policies.map((policy, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-medium">{policy.title}</h3>
                    <p className="text-muted-foreground">{policy.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopDetail;
