import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Check } from "lucide-react";

export default function CodigoIndicacao({ cliente }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (cliente?.codigo_indicacao) {
      navigator.clipboard.writeText(cliente.codigo_indicacao);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="bg-white border-2 border-gray-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-blue-600 flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Código de Indicação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">
          Compartilhe seu código e ganhe 10% de desconto quando seus amigos agendarem!
        </p>
        
        {cliente?.codigo_indicacao && (
          <>
            <div className="flex gap-2">
              <Input
                value={cliente.codigo_indicacao}
                readOnly
                className="bg-gray-50 border-gray-300 text-blue-600 font-mono text-lg font-bold"
              />
              <Button
                onClick={handleCopy}
                className="bg-blue-600 text-white hover:bg-blue-700 font-bold"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            
            {cliente.desconto_disponivel > 0 && (
              <Badge className="bg-green-600 text-white font-semibold">
                Você tem {cliente.desconto_disponivel}% de desconto disponível!
              </Badge>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
