
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto p-4">
          <div className="mb-6">
            <span className="text-6xl font-bold bg-gradient-to-r from-vendora-green to-vendora-orange bg-clip-text text-transparent">404</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Page introuvable</h1>
          <p className="text-muted-foreground mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button className="bg-vendora-green text-white hover:bg-vendora-green-dark">
                Retour à l'accueil
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline">
                Explorer les produits
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
