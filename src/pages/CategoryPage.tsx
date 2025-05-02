
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Search, Filter, Grid3X3, LayoutList } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
const categories = {
  bijoux: {
    name: "Bijoux",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
    description: "Découvrez notre sélection de bijoux artisanaux uniques créés par des artisans talentueux.",
    subcategories: ["Colliers", "Bracelets", "Boucles d'oreilles", "Bagues", "Ensembles"]
  },
  decoration: {
    name: "Décoration",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop",
    description: "Transformez votre intérieur avec des objets de décoration faits main par des artisans créatifs.",
    subcategories: ["Vases", "Coussins", "Cadres", "Bougies", "Miroirs"]
  },
  art: {
    name: "Art",
    image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?q=80&w=800&auto=format&fit=crop",
    description: "Explorez des œuvres d'art originales réalisées par des artistes indépendants passionnés.",
    subcategories: ["Peintures", "Illustrations", "Photographies", "Sculptures", "Art numérique"]
  },
  vetements: {
    name: "Vêtements",
    image: "https://images.unsplash.com/photo-1479064555353-3e9d11bbcd85?q=80&w=800&auto=format&fit=crop",
    description: "Découvrez des vêtements uniques confectionnés par des créateurs indépendants.",
    subcategories: ["T-shirts", "Robes", "Pulls", "Accessoires", "Chaussures"]
  }
};

const categoryProducts = {
  bijoux: [
    {
      id: "1",
      name: "Collier artisanal en perles naturelles",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1611085583191-a3b181a88578?q=80&w=800&auto=format&fit=crop",
      shop: { name: "Bijoux Naturels", id: "1" },
      likes: 24,
      comments: 3
    },
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
    },
    {
      id: "5",
      name: "Bague en argent avec pierre naturelle",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
      shop: { name: "Atelier Gemmes", id: "2" },
      likes: 42,
      comments: 7
    },
    {
      id: "6",
      name: "Set de bracelets fins",
      price: 35.50,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop",
      shop: { name: "Bijoux Élégants", id: "3" },
      likes: 29,
      comments: 4
    },
    {
      id: "7",
      name: "Collier en cristal de roche",
      price: 42.00,
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2c?q=80&w=800&auto=format&fit=crop",
      shop: { name: "Cristaux & Nature", id: "4" },
      likes: 37,
      comments: 6
    },
    {
      id: "8",
      name: "Bracelet en cuir tressé",
      price: 28.50,
      image: "https://images.unsplash.com/photo-1632765854612-9d3e9f8b9db9?q=80&w=800&auto=format&fit=crop",
      shop: { name: "Créations Artisanales", id: "5" },
      likes: 21,
      comments: 3
    },
  ],
  decoration: [
    {
      id: "1",
      name: "Vase céramique fait main",
      price: 55.90,
      image: "https://images.unsplash.com/photo-1578913071795-38fea67b1775?q=80&w=800&auto=format&fit=crop",
      shop: { name: "Atelier Terre", id: "2" },
      likes: 42,
      comments: 7
    },
  ],
  art: [
    {
      id: "1",
      name: "Illustration d'art numérique",
      price: 25.00,
      image: "https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80&w=800&auto=format&fit=crop",
      shop: { name: "ArtDigital", id: "3" },
      likes: 68,
      comments: 12
    },
  ],
  vetements: [
    {
      id: "1",
      name: "T-shirt imprimé artisanal",
      price: 29.90,
      image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd0?q=80&w=800&auto=format&fit=crop",
      shop: { name: "Mode Créative", id: "6" },
      likes: 45,
      comments: 8
    },
  ]
};

const CategoryPage = () => {
  const { name } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  
  // Récupérer les informations de la catégorie
  const categoryData = name && categories[name as keyof typeof categories];
  const products = name && categoryProducts[name as keyof typeof categoryProducts] || [];
  
  // Filtrer et trier les produits
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedSubcategory || product.name.toLowerCase().includes(selectedSubcategory.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOption === "price_asc") return a.price - b.price;
      if (sortOption === "price_desc") return b.price - a.price;
      if (sortOption === "newest") return parseInt(b.id) - parseInt(a.id);
      // Par défaut : popular (likes)
      return b.likes - a.likes;
    });
  
  if (!categoryData) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container py-16">
          <h1 className="text-3xl font-bold mb-6">Catégorie non trouvée</h1>
          <p className="mb-6">La catégorie que vous recherchez n'existe pas.</p>
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header de catégorie */}
        <div className="h-64 md:h-80 overflow-hidden relative">
          <img 
            src={categoryData.image} 
            alt={categoryData.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
            <div className="container pb-6 text-white">
              <h1 className="text-3xl font-bold">{categoryData.name}</h1>
              <p className="mt-2 max-w-2xl">{categoryData.description}</p>
            </div>
          </div>
        </div>
        
        <div className="container py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/explore">Catégories</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink aria-current="page">{categoryData.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Filtres et recherche */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-1 space-y-4">
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Filter size={16} className="mr-2" />
                  Filtres
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Sous-catégories</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Button
                          variant={selectedSubcategory === null ? "default" : "outline"}
                          size="sm"
                          className="text-xs w-full justify-start"
                          onClick={() => setSelectedSubcategory(null)}
                        >
                          Toutes
                        </Button>
                      </div>
                      {categoryData.subcategories.map((subcat, index) => (
                        <div key={index} className="flex items-center">
                          <Button
                            variant={selectedSubcategory === subcat ? "default" : "outline"}
                            size="sm"
                            className="text-xs w-full justify-start"
                            onClick={() => setSelectedSubcategory(subcat)}
                          >
                            {subcat}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              {/* Barre de recherche et options */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={`Rechercher dans ${categoryData.name.toLowerCase()}...`}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 items-center">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      className="h-10"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 size={16} />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      className="h-10"
                      onClick={() => setViewMode("list")}
                    >
                      <LayoutList size={16} />
                    </Button>
                  </div>
                  
                  <Select
                    value={sortOption}
                    onValueChange={(value) => setSortOption(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Popularité</SelectItem>
                      <SelectItem value="newest">Plus récents</SelectItem>
                      <SelectItem value="price_asc">Prix croissant</SelectItem>
                      <SelectItem value="price_desc">Prix décroissant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Résultats */}
              {filteredProducts.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product.id}
                        className="flex flex-col sm:flex-row border rounded-lg overflow-hidden bg-card"
                      >
                        <Link 
                          to={`/products/${product.id}`}
                          className="sm:w-48 h-48 sm:h-auto overflow-hidden"
                        >
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </Link>
                        <div className="p-4 flex flex-col justify-between flex-grow">
                          <div>
                            <Link to={`/shops/${product.shop.id}`}>
                              <p className="text-sm text-muted-foreground hover:underline">
                                {product.shop.name}
                              </p>
                            </Link>
                            <Link to={`/products/${product.id}`}>
                              <h3 className="font-medium hover:underline">{product.name}</h3>
                            </Link>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="font-semibold">{product.price.toFixed(2)} €</p>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <Heart size={16} />
                                <span className="ml-1 text-sm">{product.likes}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageCircle size={16} />
                                <span className="ml-1 text-sm">{product.comments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Aucun produit ne correspond à votre recherche
                  </p>
                </div>
              )}
              
              {/* Pagination */}
              {filteredProducts.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
