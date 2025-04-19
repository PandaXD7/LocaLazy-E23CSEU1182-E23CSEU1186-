
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StoreSignup from "./pages/StoreSignup";
import StoreDashboard from "./pages/StoreDashboard";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import LocationPage from "./pages/LocationPage";
import ShopsListPage from "./pages/ShopsListPage";
import ShopDetailPage from "./pages/ShopDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import DeliverySetupPage from "./pages/DeliverySetupPage";
import DeliveryOrdersPage from "./pages/DeliveryOrdersPage";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import StoreProfilePage from "./pages/StoreProfilePage";
import DeliveryProfilePage from "./pages/DeliveryProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Customer Routes */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/stores" element={<ShopsListPage />} />
          <Route path="/shop/:id" element={<ShopDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile/customer" element={<CustomerProfilePage />} />

          {/* Store Routes */}
          <Route path="/signup/store" element={<StoreSignup />} />
          <Route path="/auth/store" element={<AuthPage userType="store" />} />
          <Route path="/store/dashboard" element={<StoreDashboard />} />
          <Route path="/profile/store" element={<StoreProfilePage />} />

          {/* Delivery Routes */}
          <Route path="/signup/delivery" element={<AuthPage userType="delivery" />} />
          <Route path="/delivery/setup" element={<DeliverySetupPage />} />
          <Route path="/delivery/orders" element={<DeliveryOrdersPage />} />
          <Route path="/profile/delivery" element={<DeliveryProfilePage />} />
          
          {/* Additional Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
