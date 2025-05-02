
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-vendora-green to-vendora-orange bg-clip-text text-transparent mb-4">
              vendora
            </h3>
            <p className="text-muted-foreground">
              Votre marketplace pour découvrir des produits uniques créés par des vendeurs passionnés.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-foreground">
                  Explorer
                </Link>
              </li>
              <li>
                <Link to="/shops" className="text-muted-foreground hover:text-foreground">
                  Boutiques
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-foreground">
                  Catégories
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Vendeurs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/create-shop" className="text-muted-foreground hover:text-foreground">
                  Ouvrir une boutique
                </Link>
              </li>
              <li>
                <Link to="/seller-guide" className="text-muted-foreground hover:text-foreground">
                  Guide du vendeur
                </Link>
              </li>
              <li>
                <Link to="/seller-terms" className="text-muted-foreground hover:text-foreground">
                  Conditions vendeurs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">À propos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vendora. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
