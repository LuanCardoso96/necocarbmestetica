import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Edit, Shield, Image as ImageIcon } from "lucide-react";

const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
];

export default function PerfilInfo({ user, cliente }) {
  const [editing, setEditing] = React.useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = React.useState(false);
  const [lgpdAccepted, setLgpdAccepted] = React.useState(cliente?.lgpd_consentimento || false);
  const [uploadingFoto, setUploadingFoto] = React.useState(false);
  const [formData, setFormData] = React.useState({
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    foto_perfil: ""
  });

  React.useEffect(() => {
    if (cliente) {
      setFormData({
        telefone: cliente.telefone || "",
        endereco: cliente.endereco || "",
        cidade: cliente.cidade || "",
        estado: cliente.estado || "",
        foto_perfil: cliente.foto_perfil || ""
      });
      setLgpdAccepted(cliente.lgpd_consentimento || false);
    }
  }, [cliente]);

  const handleSave = () => {
    if (!lgpdAccepted) {
      alert("Você precisa aceitar os termos da LGPD para continuar.");
      return;
    }
    console.log("Saving profile data:", formData);
    setEditing(false);
  };

  return (
    <Card className="bg-white border-2 border-gray-200 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-gold flex items-center gap-2">
            <User className="w-5 h-5" />
            Informações Pessoais
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editing ? handleSave() : setEditing(true)}
            className="text-gold hover:text-yellow-600 hover:bg-gold/10"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Foto de Perfil */}
        <div className="flex flex-col items-center gap-4 pb-4 border-b-2 border-gray-100">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-gold shadow-lg">
              {formData.foto_perfil ? (
                <img src={formData.foto_perfil} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold to-gold-dark">
                  <User className="w-12 h-12 text-black" />
                </div>
              )}
            </div>
            {editing && (
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-gold text-black hover:bg-gold-dark"
                onClick={() => setShowAvatarDialog(true)}
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 font-medium">Nome:</p>
          <p className="text-black font-semibold">{user?.full_name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">Email:</p>
          <p className="text-black">{user?.email}</p>
        </div>
        
        {editing ? (
          <>
            <div>
              <Label className="text-black font-medium">Telefone: *</Label>
              <Input
                value={formData.telefone}
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                placeholder="(00) 00000-0000"
                className="bg-white border-gray-300 text-black"
              />
            </div>
            <div>
              <Label className="text-black font-medium">Endereço:</Label>
              <Input
                value={formData.endereco}
                onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                className="bg-white border-gray-300 text-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-black font-medium">Cidade:</Label>
                <Input
                  value={formData.cidade}
                  onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                  className="bg-white border-gray-300 text-black"
                />
              </div>
              <div>
                <Label className="text-black font-medium">Estado:</Label>
                <Input
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value})}
                  maxLength={2}
                  placeholder="SP"
                  className="bg-white border-gray-300 text-black"
                />
              </div>
            </div>

            {/* LGPD */}
            <Alert className="bg-blue-50 border-2 border-blue-300">
              <Shield className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-900">
                <div className="flex items-start gap-3 mt-2">
                  <Checkbox
                    checked={lgpdAccepted}
                    onCheckedChange={setLgpdAccepted}
                    className="mt-1 border-blue-600 data-[state=checked]:bg-blue-600"
                  />
                  <div className="text-sm">
                    <p className="font-semibold mb-2">Consentimento LGPD</p>
                    <p>
                      Autorizo a NecoCar a coletar, armazenar e processar meus dados pessoais 
                      (nome, email, telefone, endereço e fotos de veículos) para prestação de serviços 
                      de estética automotiva, agendamentos e comunicações relacionadas. 
                      Seus dados estarão protegidos conforme a Lei Geral de Proteção de Dados (LGPD).
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm text-gray-600 font-medium">Telefone:</p>
              <p className="text-black">{cliente?.telefone || "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Endereço:</p>
              <p className="text-black">{cliente?.endereco || "Não informado"}</p>
            </div>
            {cliente?.lgpd_consentimento && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Shield className="w-4 h-4" />
                <span>Consentimento LGPD aceito</span>
              </div>
            )}
          </>
        )}
      </CardContent>

      {/* Dialog de Avatares */}
      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-gold">Escolha sua Foto de Perfil</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label className="text-black font-semibold mb-3 block">Avatares Disponíveis</Label>
              <div className="grid grid-cols-4 gap-4">
                {AVATAR_OPTIONS.map((avatar, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFormData({ ...formData, foto_perfil: avatar });
                      setShowAvatarDialog(false);
                    }}
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 hover:border-gold transition-all hover:scale-110"
                  >
                    <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-black font-semibold mb-3 block">Ou Envie sua Própria Foto</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    console.log("File selected:", file);
                    setShowAvatarDialog(false);
                  }
                }}
                disabled={uploadingFoto}
                className="bg-white border-gray-300 text-black"
              />
              {uploadingFoto && (
                <p className="text-sm text-gray-600 mt-2">Enviando foto...</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
