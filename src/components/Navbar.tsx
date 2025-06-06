
import { Link } from "react-router-dom";
import { Compass, Search, ShoppingCart, Store, User, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-vendora-green to-vendora-orange bg-clip-text text-transparent">
            vendora
          </span>
        </Link>

        {/* Recherche - caché sur mobile */}
        <div className="hidden md:flex flex-1 mx-4 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des produits, boutiques..."
              className="w-full pl-8"
            />
          </div>
        </div>

        {/* Navigation - visible sur desktop */}
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/explore">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Compass size={18} />
              Explorer
            </Button>
          </Link>
          <Link to="/shops">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Store size={18} />
              Boutiques
            </Button>
          </Link>
          <Link to="/create-shop">
            <Button variant="outline" size="sm">Ouvrir une boutique</Button>
          </Link>
          
          <ThemeToggle />
          
          <Link to="/account/favorites">
            <Button variant="ghost" size="sm" className="w-9 px-0">
              <Heart size={18} />
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="sm" className="w-9 px-0">
              <ShoppingCart size={18} />
            </Button>
          </Link>
          
          <Link to="/account">
            <Button variant="ghost" size="sm" className="w-9 px-0">
              <User size={18} />
            </Button>
          </Link>
        </nav>

        {/* Mobile menu boutons */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          
          <Link to="/account/favorites">
            <Button variant="ghost" size="sm" className="w-9 px-0">
              <Heart size={18} />
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="sm" className="w-9 px-0">
              <ShoppingCart size={18} />
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-9 px-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={18} />
          </Button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="container md:hidden py-4 animate-fade-in">
          <div className="flex mb-4">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des produits, boutiques..."
                className="w-full pl-8"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Link to="/explore" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <Compass size={18} className="mr-2" />
                Explorer
              </Button>
            </Link>
            <Link to="/shops" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <Store size={18} className="mr-2" />
                Boutiques
              </Button>
            </Link>
            <Link to="/create-shop" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                Ouvrir une boutique
              </Button>
            </Link>
            <Link to="/account" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <User size={18} className="mr-2" />
                Mon compte
              </Button>
            </Link>
            <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <ShoppingCart size={18} className="mr-2" />
                Panier
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
