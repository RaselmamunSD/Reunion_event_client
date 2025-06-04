import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventDetails from "./pages/EventDetails";
import Registration from "./pages/Registration";
import Committee from "./pages/Committee";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FinancialReport from "./pages/FinancialReport";
import Notice from "./pages/Notice";
import Guests from "./pages/Guests";
import StudentPage from "./pages/StudentPage";
import ProfileFramesPage from "./pages/ProfileFramesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/event" element={<EventDetails />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/financial-report" element={<FinancialReport />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/profile-frames" element={<ProfileFramesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
