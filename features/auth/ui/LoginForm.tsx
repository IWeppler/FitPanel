"use client";

import { useState } from "react";
import { loginAction } from "../api/login-action";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-lg font-inter">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="font-inter font-bold text-zinc-700">
          Correo Electrónico
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="admin@lvemgym.com"
          required
          className="h-12 border-zinc-200 focus:ring-primary font-inter"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="font-inter font-bold text-zinc-700"
          >
            Contraseña
          </Label>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          required
          className="h-12 border-zinc-200 focus:ring-primary font-inter"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl transition-all font-inter"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verificando...
          </>
        ) : (
          "Entrar al Panel"
        )}
      </Button>
    </form>
  );
}
