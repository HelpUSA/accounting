import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MFCONT — Contabilidade Empresarial | Portal NFS-e',
  description: 'Um escritório completo de contabilidade para a sua empresa. Download de Notas Fiscais de Serviço (Prestadas e Tomadas) via Portal Nacional da NFS-e',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
