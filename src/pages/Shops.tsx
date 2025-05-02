
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopCard from "@/components/ShopCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Check, SlidersHorizontal, X } from "lucide-react";

// Mock data pour démonstration
const allShops = [
  {
    id: "1",
    name: "Bijoux Naturels",
    description: "Créations de bijoux avec des matériaux naturels et éco-responsables.",
    image: "https://images.unsplash.com/photo-1617220377936-6423b02875d3?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    productsCount: 24,
    category: "bijoux"
  },
  {
    id: "2",
    name: "Atelier Terre",
    description: "Céramiques artisanales faites à la main dans notre atelier parisien.",
    image: "https://images.unsplash.com/photo-1605374036117-a510b0ae2510?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    productsCount: 18,
    category: "décoration"
  },
  {
    id: "3",
    name: "ArtDigital",
    description: "Illustrations numériques, posters et tirages d'art limités.",
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    productsCount: 36,
    category: "art"
  },
  {
    id: "4",
    name: "Créations Uniques",
    description: "Objets et accessoires personnalisables pour tous les goûts.",
    image: "https://images.unsplash.com/photo-1605117882932-f1b0219b2a1e?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    productsCount: 42,
    category: "décoration"
  },
  {
    id: "5",
    name: "Vêtements Éthiques",
    description: "Mode durable et éthique, confectionnée localement.",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    productsCount: 29,
    category: "vêtements"
  },
  {
    id: "6",
    name: "Papier & Co",
    description: "Papeterie artisanale, carnets et cartes faits main.",
    image: "https://images.unsplash.com/photo-1607344645866-aada6e0615be?q=80&w=800&auto=format&fit=crop",
    rating: 4.4,
    productsCount: 15,
    category: "papeterie"
  }
];

const categories = [
  { name: "Toutes", value: "all" },
  { name: "Bijoux", value: "bijoux" },
  { name: "Décoration", value: "décoration" },
  { name: "Art", value: "art" },
  { name: "Vêtements", value: "vêtements" },
  { name: "Papeterie", value: "papeterie" }
];

const sorts = [
  { name: "Meilleures notes", value: "rating" },
  { name: "Nombre de produits", value: "products" },
  { name: "Nom A-Z", value: "name-asc" },
  { name: "Nom Z-A", value: "name-desc" }
];

const Shops = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShops = allShops.filter(shop => {
    // Filter by category
    const categoryMatch = activeCategory === "all" || shop.category === activeCategory;
    
    // Filter by search query
    const searchMatch = 
      searchQuery === "" || 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  // Sort shops
  const sortedShops = [...filteredShops].sort((a, b) => {
    switch (activeSort) {
      case "rating":
        return b.rating - a.rating;
      case "products":
        return b.productsCount - a.productsCount;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Filters for mobile */}
          <div className="w-full flex md:hidden justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Boutiques</h1>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal size={16} />
              Filtres
            </Button>
          </div>
          
          {/* Mobile filters panel */}
          {showFilters && (
            <div className="fixed inset-0 bg-background z-50 p-4 overflow-y-auto md:hidden animate-in slide-in-from-bottom">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filtres</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X size={24} />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Catégories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant={activeCategory === category.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(category.value)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Trier par</h3>
                  <div className="flex flex-wrap gap-2">
                    {sorts.map((sort) => (
                      <Button
                        key={sort.value}
                        variant={activeSort === sort.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveSort(sort.value)}
                      >
                        {sort.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    onClick={() => setShowFilters(false)}
                  >
                    Appliquer les filtres
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop sidebar filters */}
          <div className="hidden md:block w-1/4 bg-card rounded-lg p-4 sticky top-20">
            <h2 className="text-lg font-bold mb-4">Filtres</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.value} className="flex items-center">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${activeCategory === category.value ? 'font-medium text-primary' : ''}`}
                        onClick={() => setActiveCategory(category.value)}
                      >
                        {activeCategory === category.value && <Check size={16} className="mr-2" />}
                        {category.name}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Trier par</h3>
                <div className="space-y-2">
                  {sorts.map((sort) => (
                    <div key={sort.value} className="flex items-center">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${activeSort === sort.value ? 'font-medium text-primary' : ''}`}
                        onClick={() => setActiveSort(sort.value)}
                      >
                        {activeSort === sort.value && <Check size={16} className="mr-2" />}
                        {sort.name}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="hidden md:flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Boutiques</h1>
              <div className="relative w-64">
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            
            {/* Search for mobile */}
            <div className="flex md:hidden mb-4 w-full">
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Shops */}
            {sortedShops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedShops.map((shop) => (
                  <ShopCard key={shop.id} {...shop} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Aucune boutique ne correspond à vos critères.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shops;
