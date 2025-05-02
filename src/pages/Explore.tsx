import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Check, SlidersHorizontal, X } from "lucide-react";

// Mock data for demonstration
const allProducts = [
  {
    id: "1",
    name: "Collier artisanal en perles naturelles",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88578?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Bijoux Naturels", id: "1" },
    likes: 24,
    comments: 3,
    category: "bijoux"
  },
  {
    id: "2",
    name: "Vase céramique fait main",
    price: 55.90,
    image: "https://images.unsplash.com/photo-1578913071795-38fea67b1775?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Atelier Terre", id: "2" },
    likes: 42,
    comments: 7,
    category: "décoration"
  },
  {
    id: "3",
    name: "Illustration d'art numérique",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80&w=800&auto=format&fit=crop",
    shop: { name: "ArtDigital", id: "3" },
    likes: 68,
    comments: 12,
    category: "art"
  },
  {
    id: "4",
    name: "Tasse personnalisée en porcelaine",
    price: 19.90,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Créations Uniques", id: "4" },
    likes: 36,
    comments: 5,
    category: "décoration"
  },
  {
    id: "5",
    name: "Boucles d'oreilles en argent",
    price: 45.50,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Bijoux Naturels", id: "1" },
    likes: 51,
    comments: 8,
    category: "bijoux"
  },
  {
    id: "6",
    name: "T-shirt imprimé à la main",
    price: 29.90,
    image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Vêtements Éthiques", id: "5" },
    likes: 73,
    comments: 15,
    category: "vêtements"
  },
  {
    id: "7",
    name: "Tableau peinture acrylique",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop",
    shop: { name: "ArtDigital", id: "3" },
    likes: 95,
    comments: 22,
    category: "art"
  },
  {
    id: "8",
    name: "Bonnet tricoté main",
    price: 34.50,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Vêtements Éthiques", id: "5" },
    likes: 62,
    comments: 9,
    category: "vêtements"
  }
];

const categories = [
  { name: "Tout", value: "all" },
  { name: "Bijoux", value: "bijoux" },
  { name: "Décoration", value: "décoration" },
  { name: "Art", value: "art" },
  { name: "Vêtements", value: "vêtements" }
];

const sorts = [
  { name: "Pertinence", value: "relevance" },
  { name: "Prix croissant", value: "price-asc" },
  { name: "Prix décroissant", value: "price-desc" },
  { name: "Popularité", value: "popularity" },
  { name: "Les plus récents", value: "newest" }
];

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("relevance");
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = allProducts.filter(product => {
    // Filter by category
    const categoryMatch = activeCategory === "all" || product.category === activeCategory;
    
    // Filter by price
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    
    // Filter by search query
    const searchMatch = 
      searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shop.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && priceMatch && searchMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeSort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "popularity":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Filters for mobile */}
          <div className="w-full flex md:hidden justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Explorer</h1>
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
                  <h3 className="font-medium mb-3">Prix</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
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
                <h3 className="font-medium mb-3">Prix</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{priceRange[0]}€</span>
                    <span>{priceRange[1]}€</span>
                  </div>
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
              <h1 className="text-2xl font-bold">Explorer</h1>
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
            
            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Aucun produit ne correspond à vos critères.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Explore;
