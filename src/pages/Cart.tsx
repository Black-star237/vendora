
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { MinusCircle, PlusCircle, ShoppingCart, Trash2, X } from "lucide-react";
import { useState } from "react";

// Mock data pour démonstration
const initialCartItems = [
  {
    id: "1",
    name: "Collier artisanal en perles naturelles",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88578?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Bijoux Naturels", id: "1" },
    quantity: 1,
  },
  {
    id: "2",
    name: "Vase céramique fait main",
    price: 55.90,
    image: "https://images.unsplash.com/photo-1578913071795-38fea67b1775?q=80&w=800&auto=format&fit=crop",
    shop: { name: "Atelier Terre", id: "2" },
    quantity: 1,
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount when promo applied
  const total = subtotal + shipping - discount;
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const applyPromoCode = () => {
    if (promoCode === "VENDORA10") {
      setPromoApplied(true);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="container py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Votre panier</h1>
        
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="flex-1">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <Link to={`/shops/${item.shop.id}`}>
                                <p className="text-sm text-muted-foreground hover:underline">
                                  {item.shop.name}
                                </p>
                              </Link>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeItem(item.id)}
                            >
                              <X size={18} />
                            </Button>
                          </div>
                          
                          <div className="flex justify-between items-center mt-auto">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <MinusCircle size={16} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <PlusCircle size={16} />
                              </Button>
                            </div>
                            
                            <p className="font-medium">{(item.price * item.quantity).toFixed(2)}€</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" asChild>
                  <Link to="/explore">Continuer les achats</Link>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                  onClick={() => setCartItems([])}
                >
                  <Trash2 size={16} className="mr-2" />
                  Vider le panier
                </Button>
              </div>
            </div>
            
            {/* Summary */}
            <div className="lg:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Réduction</span>
                      <span>-{discount.toFixed(2)}€</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Livraison</span>
                    <span>{shipping.toFixed(2)}€</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Code promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button onClick={applyPromoCode} disabled={promoApplied}>
                      Appliquer
                    </Button>
                  </div>
                  
                  {promoApplied && (
                    <p className="text-sm text-green-600">Code promo VENDORA10 appliqué !</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-vendora-green hover:bg-vendora-green-dark">
                    Procéder au paiement
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground opacity-50" />
            <h2 className="mt-4 text-xl font-medium">Votre panier est vide</h2>
            <p className="text-muted-foreground mt-2 mb-6">Découvrez nos produits et commencez vos achats</p>
            <Button asChild>
              <Link to="/explore">Explorer les produits</Link>
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
