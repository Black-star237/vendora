import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ShopCard from "@/components/ShopCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data pour démonstration
const featuredProducts = [
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
    name: "Vase céramique fait main",
    price: 55.90,
    image: "https://images.unsplash.com/photo-1578913071795-38fea67b1775?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Atelier Terre", id: "2" },
    likes: 42,
    comments: 7
  },
  {
    id: "3",
    name: "Illustration d'art numérique",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80&w=800&auto=format&fit=crop",
    shop: { name: "ArtDigital", id: "3" },
    likes: 68,
    comments: 12
  },
  {
    id: "4",
    name: "Tasse personnalisée en porcelaine",
    price: 19.90,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Créations Uniques", id: "4" },
    likes: 36,
    comments: 5
  }
];

const popularShops = [
  {
    id: "1",
    name: "Bijoux Naturels",
    description: "Créations de bijoux avec des matériaux naturels et éco-responsables.",
    image: "https://images.unsplash.com/photo-1617220377936-6423b02875d3?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    productsCount: 24
  },
  {
    id: "2",
    name: "Atelier Terre",
    description: "Céramiques artisanales faites à la main dans notre atelier parisien.",
    image: "https://images.unsplash.com/photo-1605374036117-a510b0ae2510?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    productsCount: 18
  },
  {
    id: "3",
    name: "ArtDigital",
    description: "Illustrations numériques, posters et tirages d'art limités.",
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    productsCount: 36
  }
];

const categories = [
  { name: "Bijoux", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop" },
  { name: "Décoration", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop" },
  { name: "Art", image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?q=80&w=800&auto=format&fit=crop" },
  { name: "Vêtements", image: "https://images.unsplash.com/photo-1479064555353-3e9d11bbcd85?q=80&w=800&auto=format&fit=crop" }
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero section */}
      <section className="bg-gradient-to-b from-vendora-green-light/30 to-vendora-orange-light/20 py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-slide-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Découvrez et achetez des produits uniques sur Vendora
              </h1>
              <p className="text-lg text-muted-foreground">
                La marketplace qui connecte vendeurs passionnés et acheteurs en quête d'articles authentiques.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/explore">
                  <Button className="bg-vendora-green text-white hover:bg-vendora-green-dark">
                    Explorer les produits
                  </Button>
                </Link>
                <Link to="/create-shop">
                  <Button variant="outline">
                    Ouvrir votre boutique
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1000&auto=format&fit=crop" 
                alt="Vendora Marketplace" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured products */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Produits tendance</h2>
            <Link to="/explore">
              <Button variant="link">Voir tout</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Parcourir par catégorie</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link to={`/category/${category.name.toLowerCase()}`} key={index}>
                <div className="relative rounded-lg overflow-hidden aspect-square">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular shops */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Boutiques populaires</h2>
            <Link to="/shops">
              <Button variant="link">Voir tout</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularShops.map((shop) => (
              <ShopCard key={shop.id} {...shop} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-vendora-green/20 to-vendora-orange/20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Prêt à vendre vos créations ?</h2>
            <p className="text-muted-foreground">
              Rejoignez des milliers de créateurs et artisans qui ont trouvé leur public sur Vendora.
              Ouvrez votre boutique dès aujourd'hui et commencez à vendre !
            </p>
            <Link to="/create-shop">
              <Button className="bg-vendora-orange text-white hover:bg-vendora-orange-dark">
                Démarrer ma boutique
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
