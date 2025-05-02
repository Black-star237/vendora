
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import ProductCard from "@/components/ProductCard";
import { Heart, Package, Settings, ShoppingBag, Star, User } from "lucide-react";

// Mock data pour démonstration
const userData = {
  name: "Marie Dupont",
  email: "marie.dupont@example.com",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  joinedDate: "Avril 2023",
};

const favoriteProducts = [
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
    id: "3",
    name: "Illustration d'art numérique",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80&w=800&auto=format&fit=crop",
    shop: { name: "ArtDigital", id: "3" },
    likes: 68,
    comments: 12
  }
];

const recentOrders = [
  {
    id: "ORD-123456",
    date: "15 avril 2025",
    total: 64.99,
    status: "Livré",
    items: [
      { name: "Collier artisanal en perles naturelles", quantity: 1, price: 39.99 },
      { name: "Bracelet assorti", quantity: 1, price: 25.00 }
    ]
  },
  {
    id: "ORD-789012",
    date: "2 avril 2025",
    total: 55.90,
    status: "En cours de livraison",
    items: [
      { name: "Vase céramique fait main", quantity: 1, price: 55.90 }
    ]
  }
];

const Account = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile summary */}
          <div className="md:w-1/4">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={userData.image} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{userData.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Membre depuis {userData.joinedDate}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="justify-start" size="sm">
                    <User className="mr-2" size={16} />
                    Profil
                  </Button>
                  <Button variant="outline" className="justify-start" size="sm">
                    <ShoppingBag className="mr-2" size={16} />
                    Commandes
                  </Button>
                  <Button variant="outline" className="justify-start" size="sm">
                    <Heart className="mr-2" size={16} />
                    Favoris
                  </Button>
                  <Button variant="outline" className="justify-start" size="sm">
                    <Settings className="mr-2" size={16} />
                    Paramètres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="mr-2" size={16} />
                  Profil
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center">
                  <Package className="mr-2" size={16} />
                  Commandes
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex items-center">
                  <Heart className="mr-2" size={16} />
                  Favoris
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" defaultValue={userData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData.email} />
                    </div>
                    <div className="flex justify-end">
                      <Button>Enregistrer les modifications</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Adresses</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Domicile</p>
                        <p className="text-sm text-muted-foreground">123 Rue Exemple, 75000 Paris</p>
                      </div>
                      <Badge>Par défaut</Badge>
                    </div>
                    <Button variant="outline">Ajouter une adresse</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div>
                            <CardTitle className="text-base">Commande {order.id}</CardTitle>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <Badge 
                            variant={order.status === "Livré" ? "default" : "outline"}
                            className="mt-2 sm:mt-0"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <p className="text-sm">
                                {item.quantity}x {item.name}
                              </p>
                              <p className="text-sm font-medium">{item.price.toFixed(2)}€</p>
                            </div>
                          ))}
                          <div className="flex justify-between border-t pt-2 mt-2">
                            <p className="font-medium">Total</p>
                            <p className="font-medium">{order.total.toFixed(2)}€</p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="outline" size="sm">Voir les détails</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {recentOrders.length === 0 && (
                    <div className="text-center py-12">
                      <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <p className="mt-4 text-lg font-medium">Vous n'avez pas encore passé de commande</p>
                      <p className="text-muted-foreground">Vos commandes apparaîtront ici une fois que vous aurez effectué un achat.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="favorites">
                <div className="space-y-4">
                  {favoriteProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {favoriteProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <p className="mt-4 text-lg font-medium">Aucun favori</p>
                      <p className="text-muted-foreground">Les produits que vous aimez apparaîtront ici.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Account;
