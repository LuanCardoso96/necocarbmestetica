import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, Award, Users, ChevronRight, Star, Trophy, Crown, Medal, ChevronLeft, Quote } from "lucide-react";

const heroImages = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68d01f4b0f1be92cf1092b7c/17bb304a8_1.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68d01f4b0f1be92cf1092b7c/336a9b499_2.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68d01f4b0f1be92cf1092b7c/a6524453f_3.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68d01f4b0f1be92cf1092b7c/ed4e3e47f_4.png"
];

const depoimentos = [
  {
    name: "Carlos Silva",
    text: "Serviço impecável! Meu carro ficou irreconhecível. A atenção aos detalhes é impressionante.",
    rating: 5,
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos"
  },
  {
    name: "Marina Costa",
    text: "O programa de fidelidade é excelente. Já economizei muito com os descontos acumulados.",
    rating: 5,
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marina"
  },
  {
    name: "Roberto Oliveira",
    text: "Profissionais extremamente qualificados. Confio de olhos fechados na BM Estética.",
    rating: 5,
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto"
  },
  {
    name: "Ana Paula",
    text: "Melhor estética automotiva da região! Meu Range Rover ficou perfeito. Super recomendo!",
    rating: 5,
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana"
  },
  {
    name: "João Santos",
    text: "Atendimento nota 10! A equipe é muito atenciosa e o resultado surpreende sempre.",
    rating: 5,
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao"
  },
  {
    name: "Fernanda Lima",
    text: "Vitrificação ficou incrível! Meu carro está brilhando há meses. Vale cada centavo!",
    rating: 5,
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda"
  },
  {
    name: "Ricardo Mendes",
    text: "Restauração do meu fusca antigo ficou perfeita! Equipe muito competente e dedicada.",
    rating: 5,
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo"
  }
];

// Mock data for rankings
const clientesComMaisServicos = [
  { email: "carlos@example.com", count: 12 },
  { email: "marina@example.com", count: 10 },
  { email: "roberto@example.com", count: 8 }
];

const topIndicadores = [
  { email: "ana@example.com", count: 5 },
  { email: "joao@example.com", count: 4 },
  { email: "fernanda@example.com", count: 3 }
];

export default function Home() {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [currentDepoimento, setCurrentDepoimento] = React.useState(0);
  const [showVideo, setShowVideo] = React.useState(true);
  const [videoEnded, setVideoEnded] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    // Verificar se o vídeo já foi visto nesta sessão
    const hasSeenVideo = sessionStorage.getItem('hasSeenIntroVideo');
    if (hasSeenVideo) {
      setShowVideo(false);
      setVideoEnded(true);
    }
  }, []);

  React.useEffect(() => {
    if (!videoEnded) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [videoEnded]);

  const handleVideoEnd = () => {
    sessionStorage.setItem('hasSeenIntroVideo', 'true');
    setShowVideo(false);
    setVideoEnded(true);
  };

  const medalIcons = [
    { icon: Crown, color: "text-yellow-500" },
    { icon: Trophy, color: "text-gray-400" },
    { icon: Medal, color: "text-amber-600" }
  ];

  const nextDepoimento = () => {
    setCurrentDepoimento((prev) => (prev + 1) % depoimentos.length);
  };

  const prevDepoimento = () => {
    setCurrentDepoimento((prev) => (prev - 1 + depoimentos.length) % depoimentos.length);
  };

  // Auto-scroll carrossel de depoimentos
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDepoimento((prev) => (prev + 1) % depoimentos.length);
    }, 5000); // Troca a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Vídeo Inicial */}
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-20"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
            >
              <source src="/img/logoemvideo.mp4" type="video/mp4" />
            </video>
          </motion.div>
        )}

        {/* Carrossel de Imagens */}
        {videoEnded && heroImages.map((img, index) => (
          <motion.div
            key={img}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImage === index ? 1 : 0,
              scale: currentImage === index ? 1 : 1.1
            }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </motion.div>
        ))}

        {videoEnded && (
          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center max-w-4xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-block mb-6"
              >
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f51afc1323bf402418319c/ec62377ec_logo.png" 
                  alt="BM Logo" 
                  className="w-32 h-32 mx-auto drop-shadow-2xl"
                />
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-lg">
                BM Estética Automotiva
              </h1>
              <p className="text-2xl md:text-3xl text-blue-300 mb-4 font-semibold">
                Excelência em Estética Automotiva
              </p>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                Transformando seu veículo em uma obra de arte com técnicas profissionais e acabamento perfeito
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Agendamento")}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 text-lg px-8 py-6 shadow-lg shadow-blue-500/50 transition-all hover:scale-105 font-bold"
                  >
                    Agendar Serviço
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to={createPageUrl("Servicos")}>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-blue-500 text-white hover:bg-blue-500 hover:text-white text-lg px-8 py-6 transition-all hover:scale-105 font-semibold bg-black/50"
                  >
                    Ver Serviços
                  </Button>
                </Link>
              </div>

              <div className="flex gap-2 justify-center mt-12">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-1 rounded-full transition-all ${
                      currentImage === index 
                        ? 'w-12 bg-blue-500' 
                        : 'w-8 bg-gray-500 hover:bg-blue-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {videoEnded && (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-blue-500"
          >
            <ChevronRight className="w-8 h-8 rotate-90" />
          </motion.div>
        )}
      </section>

      {/* Imagem BM com Transição ao Rolar - Design Luxuoso */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
        {/* Efeitos de fundo animados */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <div className="relative group">
            {/* Borda animada */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-gradient-xy"></div>
            
            {/* Imagem com efeitos */}
            <div className="relative bg-slate-900 rounded-2xl p-3 overflow-hidden">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f51afc1323bf402418319c/57670a2b8_ChatGPTImage19_10_202521_34_47.png" 
                alt="BM Estética Automotiva" 
                className="w-full h-auto rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </motion.div>

        {/* Grid decorativo */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      </section>

      {/* Seção de Parceiros */}
      <section className="py-16 px-4 bg-white border-y-2 border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Nossos Parceiros</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-gold/10 to-yellow-500/10 p-8 rounded-xl border-2 border-gold/30 shadow-lg"
              >
                <p className="text-4xl font-bold bg-gradient-to-r from-gold via-yellow-500 to-gold bg-clip-text text-transparent">
                  NecoCar
                </p>
                <p className="text-sm text-gray-600 mt-2">Parceiro Premium</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl border-2 border-blue-500/30 shadow-lg hover:shadow-xl transition-all"
              >
                <img 
                  src="/img/logo1.png" 
                  alt="Logo Parceiro" 
                  className="h-20 w-auto object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rankings Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-600"
          >
            Hall da Fama BM Estética
          </motion.h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Nossos clientes mais fiéis e engajados</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Clientes com Mais Serviços */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-blue-500/30 shadow-xl hover:shadow-2xl transition-all">
                <CardHeader className="border-b-2 border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-transparent">
                  <CardTitle className="text-2xl font-bold text-blue-600 flex items-center gap-3">
                    <Trophy className="w-8 h-8" />
                    Top Clientes VIP
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">Clientes com mais serviços realizados</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {clientesComMaisServicos.map((cliente, index) => {
                      const MedalIcon = medalIcons[index]?.icon || Star;
                      const medalColor = medalIcons[index]?.color || "text-gray-400";
                      
                      return (
                        <motion.div
                          key={cliente.email}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105 ${
                            index === 0 
                              ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-500 shadow-md' 
                              : 'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              index === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gray-200'
                            }`}>
                              <MedalIcon className={`w-6 h-6 ${index === 0 ? 'text-white' : medalColor}`} />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-bold truncate ${index === 0 ? 'text-blue-600 text-lg' : 'text-gray-900'}`}>
                              {cliente.email}
                            </p>
                            <p className="text-sm text-gray-600">
                              {cliente.count} serviços realizados
                            </p>
                          </div>
                          <Badge className={`${
                            index === 0 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-700 text-white'
                          } font-bold text-lg px-3 py-1`}>
                            #{index + 1}
                          </Badge>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Indicadores */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-blue-500/30 shadow-xl hover:shadow-2xl transition-all">
                <CardHeader className="border-b-2 border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-transparent">
                  <CardTitle className="text-2xl font-bold text-blue-600 flex items-center gap-3">
                    <Users className="w-8 h-8" />
                    Top Embaixadores
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">Clientes que mais indicaram amigos</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {topIndicadores.map((indicador, index) => {
                      const MedalIcon = medalIcons[index]?.icon || Star;
                      const medalColor = medalIcons[index]?.color || "text-gray-400";
                      
                      return (
                        <motion.div
                          key={indicador.email}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105 ${
                            index === 0 
                              ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-500 shadow-md' 
                              : 'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              index === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gray-200'
                            }`}>
                              <MedalIcon className={`w-6 h-6 ${index === 0 ? 'text-white' : medalColor}`} />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-bold truncate ${index === 0 ? 'text-blue-600 text-lg' : 'text-gray-900'}`}>
                              {indicador.email}
                            </p>
                            <p className="text-sm text-gray-600">
                              {indicador.count} indicações realizadas
                            </p>
                          </div>
                          <Badge className={`${
                            index === 0 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-700 text-white'
                          } font-bold text-lg px-3 py-1`}>
                            #{index + 1}
                          </Badge>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefícios - Design Premium */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <Badge className="bg-blue-50 text-blue-600 border border-blue-200 px-6 py-2 text-sm font-semibold">
                ✨ Diferenciais Exclusivos
              </Badge>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Por que escolher a BM Estética?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Benefícios exclusivos que só nós oferecemos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Programa de Fidelidade",
                description: "Acumule pontos a cada serviço e ganhe descontos exclusivos",
                gradient: "from-blue-500 to-blue-600",
                color: "blue"
              },
              {
                icon: Users,
                title: "Indique e Ganhe",
                description: "Indique amigos e ganhe 10% de desconto no próximo serviço",
                gradient: "from-purple-500 to-purple-600",
                color: "purple"
              },
              {
                icon: Calendar,
                title: "Agendamento Online",
                description: "Agende seus serviços de forma rápida e prática pelo app",
                gradient: "from-indigo-500 to-indigo-600",
                color: "indigo"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                {/* Card com efeito glassmorphism */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                
                <Card className="relative bg-white/80 backdrop-blur-sm border-2 border-gray-100 rounded-2xl p-8 hover:border-transparent transition-all hover:scale-105 hover:shadow-2xl shadow-lg h-full">
                  <CardContent className="p-0">
                    {/* Icon com efeito luxuoso */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-20 h-20 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-all relative`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                      <benefit.icon className="w-10 h-10 text-white relative z-10" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed text-base">
                      {benefit.description}
                    </p>

                    {/* Decorative line */}
                    <div className="mt-6 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos Carrossel - Design Luxuoso */}
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Efeitos de fundo luxuosos */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-6 py-2 text-sm font-semibold backdrop-blur-sm">
                ⭐ Depoimentos Verificados
              </Badge>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              O que nossos clientes dizem
            </h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Excelência reconhecida por quem confia no nosso trabalho
            </p>
          </motion.div>

          {/* Carrossel Automático */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                key={currentDepoimento}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-xl border-2 border-white/20 shadow-2xl overflow-hidden">
                  {/* Efeito de brilho superior */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                  
                  <CardContent className="p-12 md:p-16">
                    <div className="flex flex-col items-center text-center">
                      {/* Quote Icon decorativo */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-blue-500/50"
                      >
                        <Quote className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Avatar com efeito luxuoso */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative mb-8"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                          <img 
                            src={depoimentos[currentDepoimento].foto} 
                            alt={depoimentos[currentDepoimento].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>

                      {/* Stars com efeito dourado */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-2 mb-8"
                      >
                        {[...Array(depoimentos[currentDepoimento].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <Star className="w-7 h-7 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Texto do depoimento */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-800 mb-8 text-xl md:text-2xl leading-relaxed max-w-3xl font-light italic"
                      >
                        &ldquo;{depoimentos[currentDepoimento].text}&rdquo;
                      </motion.p>

                      {/* Nome e divider */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-2"
                      >
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                        <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                          {depoimentos[currentDepoimento].name}
                        </p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Botões de navegação com design premium */}
            <button
              onClick={prevDepoimento}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all shadow-2xl hover:scale-110 hover:shadow-blue-500/50 backdrop-blur-sm border border-white/20"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={nextDepoimento}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all shadow-2xl hover:scale-110 hover:shadow-blue-500/50 backdrop-blur-sm border border-white/20"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Indicadores com design luxuoso */}
          <div className="flex gap-3 justify-center mt-12">
            {depoimentos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDepoimento(index)}
                className={`h-2 rounded-full transition-all ${
                  currentDepoimento === index 
                    ? 'w-12 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 shadow-lg shadow-blue-500/50' 
                    : 'w-2 bg-white/30 hover:bg-white/50 hover:w-8'
                }`}
              />
            ))}
          </div>

          {/* Badge de progresso automático */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8"
          >
            <Badge className="bg-white/10 text-white border border-white/20 backdrop-blur-sm px-4 py-2">
              🔄 Rotação automática a cada 5 segundos
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* CTA Final - Design Ultra Premium */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background com gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz48L2c+PC9zdmc+')] opacity-30"></div>
        </div>

        {/* Efeitos de luz */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <Badge className="bg-white/20 text-white border border-white/30 backdrop-blur-sm px-6 py-2 text-sm font-semibold">
                🎁 Oferta Especial para Novos Clientes
              </Badge>
            </motion.div>

            {/* Título */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl"
            >
              Pronto para transformar
              <br />
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
                seu veículo?
              </span>
            </motion.h2>

            {/* Subtítulo */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/95 mb-12 font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Agende agora e ganhe <span className="font-bold text-yellow-300">15% de desconto</span> no primeiro serviço
            </motion.p>

            {/* Botão */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link to={createPageUrl("Agendamento")}>
                <Button 
                  size="lg"
                  className="group relative bg-white text-blue-600 hover:bg-yellow-50 text-xl px-16 py-8 shadow-2xl transition-all hover:scale-110 font-bold rounded-full overflow-hidden"
                >
                  {/* Efeito de brilho no hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <span className="relative z-10 flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    Agendar Agora
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-white/80"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                <span className="text-sm font-medium">4.9/5 Avaliação</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">450+ Clientes Satisfeitos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">15 Anos de Experiência</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
