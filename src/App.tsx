
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import ShopDetail from "./pages/ShopDetail";
import CategoryPage from "./pages/CategoryPage";
import Explore from "./pages/Explore";
import Shops from "./pages/Shops";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import CreateShop from "./pages/CreateShop";

// Create a query client instance outside of the component
const queryClient = new QueryClient();

// Make App a proper React component function
const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/shops/:id" element={<ShopDetail />} />
              <Route path="/category/:name" element={<CategoryPage />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/shops" element={<Shops />} />
              <Route path="/account" element={<Account />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/create-shop" element={<CreateShop />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
