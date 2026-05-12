🚀 GymFlow MVP: Gestión de Asistencia y Cobros
GymFlow es una solución ligera diseñada para dueños de gimnasios que necesitan abandonar la libreta de papel. El enfoque es simple: resolver la fricción entre la asistencia a clase y el estado de pago del alumno en tiempo real.

🎯 El Problema
Muchos gimnasios pequeños/medianos operan con 50-100 alumnos. El dueño suele dar la clase y, al mismo tiempo, debe controlar quién pagó el mes o la clase suelta.
El dolor: "No sé quién me debe cuando llega la hora de la clase".

💡 La Solución
Una Web App Mobile-First que permite tomar asistencia en 3 segundos, visualizando instantáneamente el estado financiero de cada alumno y permitiendo registrar pagos en el acto.

🛠 Stack Tecnológico
Framework: Next.js 16 (App Router, Server Actions).

Styling: Tailwind CSS v4 (CSS-first configuration).

Backend & DB: Supabase (PostgreSQL, Auth, Realtime).

Arquitectura: Feature-Sliced Design (FSD) para máxima escalabilidad y reuso.

Validación: Zod + React Hook Form.

Fechas: Day.js (Configurado para feriados y zona horaria de Argentina 🇦🇷).

🏗 Arquitectura (FSD)
El proyecto sigue la metodología Feature-Sliced Design para desacoplar la lógica de negocio:
src/
├── app/ # Rutas, Layouts y Providers (Next.js)
├── processes/ # (Opcional) Flujos complejos que cruzan varias páginas
├── pages/ # Composición de la página usando Widgets
├── widgets/ # Componentes complejos (ej: AttendanceTable, RevenueStats)
├── features/ # Acciones del usuario (ej: register-payment, mark-attendance)
├── entities/ # Lógica de dominio y tipos (ej: student, payment, plan)
└── shared/ # UI Kit, API clients, Utils, Hooks base

📝 Funcionalidades MVP (V1)

1. Control de Asistencia "Smart"
   Vista de clases diarias con cupos.

Check-in de alumnos con badge de estado de pago: Al día, Debe, Vence hoy.

Override de cupos para clases llenas.

2. Gestión de Alumnos y Pagos
   Alta rápida de alumnos (Mensual o Por Clase).

Registro de pagos multimetodo (Efectivo, Transferencia, Otros).

Cálculo automático de próximos vencimientos.

3. Dashboard Administrativo
   Métricas: Alumnos activos, Ingresos del mes, Gastos, Resultado Estimado.

Listado de deudores con acceso directo a WhatsApp (wa.me) para recordatorios manuales.

4. Control de Gastos
   Carga de gastos operativos (Alquiler, servicios, mantenimiento).

Balance simple Ingresos vs. Gastos.

## Alcance del MVP

Esta primera versión no busca ser una plataforma completa para gimnasios, sino una herramienta operativa para centralizar alumnos, pagos, turnos, asistencia y gastos básicos.

## Fuera de alcance en V1

- App para alumnos
- Pagos online automáticos
- Rutinas
- Nutrición
- Control de acceso por QR
- Stock de productos
- Multi-sucursal

📊 Modelo de Datos (High Level)
Students: Datos personales, tipo de facturación y fecha de vencimiento.

Classes: Definición de horarios y cupos.

Attendance: Registro histórico de presencia con "snapshot" del estado de pago.

Payments: Historial de transacciones vinculadas a alumnos.

Expenses: Salidas de dinero del gimnasio.

🚀 Instalación y Setup
Clonar el repositorio.

Instalar dependencias: pnpm install.

Configurar variables de entorno (.env.local) con tus credenciales de Supabase.

Correr migraciones en Supabase (ver carpeta /supabase/migrations).

Ejecutar: pnpm run dev.

🚩 Roadmap Próximo
[ ] Exportación de reportes a PDF/Excel.

[ ] Soporte para "Packs de Clases" (Ej: 10 clases con vencimiento).

[ ] Modo oscuro nativo con Tailwind v4.

Desarrollado con ❤️ para optimizar el día a día del entrenamiento.
