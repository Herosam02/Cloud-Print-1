import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import TemplatesPage from './pages/TemplatesPage';
import OrderPage from './pages/OrderPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ProfessionalsPage from './pages/ProfessionalsPage';
import ProfilePage from './pages/ProfilePage';
import BackgroundRemovalpage from './pages/BackgroundRemovalpage';
import OrdersPage from './pages/OrdersPage';
import LoyaltyPage from './pages/LoyaltyPage';
import InvoicesPage from './pages/InvocesPage';
import InvoicePage from './pages/InvoicePage';
import { StudentsPage, ChurchesPage, EventPlannersPage, OfficesPage } from './pages/LandingPages';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/professionals" element={<ProfessionalsPage />} />
              <Route path="/BackgroundRemovalpage" element={<BackgroundRemovalpage />} />
              
              {/* User Account Pages */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/rewards" element={<LoyaltyPage />} />
              <Route path="/invoices" element={<InvoicesPage />} />
              <Route path="/invoice/:id" element={<InvoicePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;