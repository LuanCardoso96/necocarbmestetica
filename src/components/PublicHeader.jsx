import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublicHeader({ onLoginClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Portfólio', path: '/portfolio' },
    { name: 'Projetos', path: '/projetos' },
    { name: 'Depoimentos', path: '/depoimentos' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo e Parceiros */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f51afc1323bf402418319c/ec62377ec_logo.png" 
                alt="BM Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold text-blue-600 hidden sm:block">
                BM Estética
              </span>
            </Link>
            
            {/* Logos Parceiros - Desktop */}
            <div className="hidden lg:flex items-center gap-3 ml-4 pl-4 border-l border-gray-300">
              <img 
                src="/img/logo2.png" 
                alt="Parceiro" 
                className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
              <img 
                src="/img/logo3.png" 
                alt="Parceiro" 
                className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative ${
                  isActive(link.path)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-[1.3rem] left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </Link>
            ))}
            <Button
              onClick={onLoginClick}
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            >
              Faça Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Logos Parceiros - Mobile */}
                <div className="flex items-center justify-center gap-4 py-3 border-t border-gray-200">
                  <img 
                    src="/img/logo2.png" 
                    alt="Parceiro" 
                    className="h-8 object-contain"
                  />
                  <img 
                    src="/img/logo3.png" 
                    alt="Parceiro" 
                    className="h-8 object-contain"
                  />
                </div>
                
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLoginClick();
                  }}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                >
                  Faça Login
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

