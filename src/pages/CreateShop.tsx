
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Store, Upload, MapPin, Phone, Mail, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const createShopSchema = z.object({
  name: z.string().min(2, "Le nom de la boutique doit contenir au moins 2 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  category: z.string().min(1, "Veuillez sélectionner une catégorie"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  phone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
  email: z.string().email("Adresse email invalide"),
  website: z.string().url("URL du site web invalide").optional().or(z.literal("")),
  logo: z.string().optional(),
  banner: z.string().optional(),
});

type CreateShopForm = z.infer<typeof createShopSchema>;

const categories = [
  "Mode & Vêtements",
  "Beauté & Cosmétiques",
  "Maison & Décoration",
  "Art & Artisanat",
  "Bijoux & Accessoires",
  "Électronique",
  "Livres & Médias",
  "Sport & Loisirs",
  "Alimentation & Boissons",
  "Santé & Bien-être",
  "Jouets & Enfants",
  "Automobile",
  "Jardin & Extérieur",
  "Animaux",
  "Services",
  "Autre"
];

const CreateShop = () => {
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");

  const form = useForm<CreateShopForm>({
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      logo: "",
      banner: "",
    },
  });

  const onSubmit = (data: CreateShopForm) => {
    console.log("Données de création de boutique:", data);
    toast.success("Boutique créée avec succès !");
    // Ici, on enverrait les données à l'API
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'logo') {
          setLogoPreview(result);
          form.setValue('logo', result);
        } else {
          setBannerPreview(result);
          form.setValue('banner', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Store className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Créer votre boutique</h1>
          <p className="text-muted-foreground">
            Rejoignez Vendora et commencez à vendre vos produits dès aujourd'hui
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Informations de base */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de base</CardTitle>
                <CardDescription>
                  Les informations principales de votre boutique
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de la boutique *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ma super boutique" {...field} />
                      </FormControl>
                      <FormDescription>
                        Ce nom apparaîtra sur votre profil public
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez votre boutique, vos produits et ce qui vous rend unique..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Une bonne description aide les clients à comprendre votre activité
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie principale *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choisissez la catégorie qui correspond le mieux à vos produits
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Images de la boutique */}
            <Card>
              <CardHeader>
                <CardTitle>Images de la boutique</CardTitle>
                <CardDescription>
                  Ajoutez un logo et une bannière pour personnaliser votre boutique
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="logo">Logo de la boutique</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'logo')}
                        className="mb-2"
                      />
                      <p className="text-sm text-muted-foreground">
                        Recommandé : 200x200px, format JPG ou PNG
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="banner">Bannière de la boutique</Label>
                  <div className="mt-2">
                    <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 mb-4">
                      {bannerPreview ? (
                        <img src={bannerPreview} alt="Banner preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Aperçu de votre bannière</p>
                        </div>
                      )}
                    </div>
                    <Input
                      id="banner"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'banner')}
                      className="mb-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      Recommandé : 1200x300px, format JPG ou PNG
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations de contact */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
                <CardDescription>
                  Comment les clients peuvent vous contacter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="123 Rue de la Paix, 75001 Paris" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="01 23 45 67 89" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="contact@ma-boutique.com" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site web (optionnel)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="https://www.ma-boutique.com" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Ajoutez l'URL de votre site web si vous en avez un
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button type="button" variant="outline" className="order-2 sm:order-1">
                Sauvegarder comme brouillon
              </Button>
              <Button type="submit" className="order-1 sm:order-2">
                Créer ma boutique
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Footer />
    </div>
  );
};

export default CreateShop;
