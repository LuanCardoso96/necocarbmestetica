import { useState } from 'react';
import Layout from "./Layout.jsx";
import PublicHeader from "../components/PublicHeader.jsx";
import LoginModal from "../components/LoginModal.jsx";

import Home from "./Home";
import Servicos from "./Servicos";
import Agendamento from "./Agendamento";
import Perfil from "./Perfil";
import AdminDashboard from "./AdminDashboard";
import AdminAgendamentos from "./AdminAgendamentos";
import AdminClientes from "./AdminClientes";
import AdminServicos from "./AdminServicos";
import Notificacoes from "./Notificacoes";
import Portfolio from "./Portfolio";
import Projetos from "./Projetos";
import Depoimentos from "./Depoimentos";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PAGES = {
    Home: Home,
    Servicos: Servicos,
    Agendamento: Agendamento,
    Perfil: Perfil,
    AdminDashboard: AdminDashboard,
    AdminAgendamentos: AdminAgendamentos,
    AdminClientes: AdminClientes,
    AdminServicos: AdminServicos,
    Notificacoes: Notificacoes,
    Portfolio: Portfolio,
    Projetos: Projetos,
    Depoimentos: Depoimentos,
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    const { isAuthenticated } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    
    // Páginas públicas (não requerem login)
    const publicPages = ['/', '/portfolio', '/projetos', '/depoimentos'];
    const isPublicPage = publicPages.includes(location.pathname.toLowerCase());
    
    // Se não está logado e está em página pública, usa header público
    if (!isAuthenticated && isPublicPage) {
      return (
        <>
          <PublicHeader onLoginClick={() => setShowLoginModal(true)} />
          <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
          <div className="pt-16"> {/* Padding para compensar o header fixo */}
            <Routes>            
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/depoimentos" element={<Depoimentos />} />
            </Routes>
          </div>
        </>
      );
    }
    
    // Se está logado ou em página privada, usa layout com sidebar
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Servicos" element={<Servicos />} />
                <Route path="/Agendamento" element={<Agendamento />} />
                <Route path="/Perfil" element={<Perfil />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/AdminAgendamentos" element={<AdminAgendamentos />} />
                <Route path="/AdminClientes" element={<AdminClientes />} />
                <Route path="/AdminServicos" element={<AdminServicos />} />
                <Route path="/Notificacoes" element={<Notificacoes />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route path="/depoimentos" element={<Depoimentos />} />
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}
