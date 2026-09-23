import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HelpUS Accounting — Universal NFS-e Suite',
  description: 'Plataforma Universal de Gestão e Download de Notas Fiscais de Serviço (Prestadas e Tomadas) para Escritórios de Contabilidade',
  icons: {
    icon: '/helpus-logo.jpg',
    shortcut: '/helpus-logo.jpg',
    apple: '/helpus-logo.jpg',
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
        <link rel="icon" href="/helpus-logo.jpg" type="image/jpeg" />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
