import { LoginForm } from "@/features/auth/ui/LoginForm";
import { Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex w-1/2 bg-zinc-900 items-center justify-center p-12">
        <div className="max-w-md space-y-6">
          <div className="inline-flex p-3 bg-white/10 rounded-2xl text-white">
            <Lock size={32} />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-inter uppercase tracking-[0.3em] text-zinc-500">
              LVEM · La Vida en Movimiento
            </p>

            <h1 className="text-6xl font-heading text-white leading-tight tracking-wide">
              Movimiento <br /> para vivir mejor.
            </h1>

            <p className="text-zinc-400 font-inter text-lg leading-relaxed">
              Un espacio para ordenar alumnos, turnos y cobros sin perder de
              vista lo importante: acompañar el proceso de cada persona.
            </p>
          </div>

          <div className="border-l border-white/20 pl-4">
            <p className="text-zinc-300 font-inter text-sm leading-relaxed italic">
              “El cuerpo cambia cuando el movimiento se vuelve parte de la
              vida.”
            </p>
          </div>
        </div>
      </div>

      {/* Lado Derecho: Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zinc-50">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col space-y-2">
            <div className="lg:hidden mb-4">
              <h2 className="text-2xl font-heading text-zinc-900">LVEM</h2>
            </div>
            <h1 className="font-bold text-xl uppercase text-foreground">Iniciar Sesión</h1>
            <p className="text-zinc-500 font-inter">
              Ingresá tus credenciales para continuar.
            </p>
          </div>

          <LoginForm />

          <footer className="pt-8 text-center">
            <p className="text-xs text-zinc-400 font-inter">
              &copy; 2026 LVEM Management System. <br />
              Acceso restringido a personal autorizado.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
