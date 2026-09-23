const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 40, size: 'A4' });
const outputPath = path.join(__dirname, 'diario', '2026-09-23-relatorio-diario-implementacao.pdf');

// Ensure directory exists
if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Colors
const primaryColor = '#0f172a'; // slate-900
const accentColor = '#f59e0b'; // amber-500
const textColor = '#334155'; // slate-700
const lightBg = '#f8fafc'; // slate-50

// Header
doc.rect(0, 0, 595, 100).fill(primaryColor);

const logoPath = path.join(__dirname, '..', 'public', 'helpus-logo.jpg');
if (fs.existsSync(logoPath)) {
  doc.image(logoPath, 40, 15, { width: 70, height: 70 });
}

doc
  .fillColor('#ffffff')
  .fontSize(22)
  .font('Helvetica-Bold')
  .text('HelpUS Technology', 120, 25);

doc
  .fillColor(accentColor)
  .fontSize(12)
  .font('Helvetica-Bold')
  .text('Relatório Diário de Solicitações e Implementação', 120, 52);

doc
  .fillColor('#94a3b8')
  .fontSize(10)
  .font('Helvetica')
  .text('Data: 23/09/2026  |  Projeto: HelpUS Accounting Suite', 120, 70);

doc.moveDown(4);

// Section: Visao Geral
doc
  .fillColor(primaryColor)
  .fontSize(16)
  .font('Helvetica-Bold')
  .text('1. Visão Geral da Plataforma HelpUS Accounting', 40, 120);

doc
  .fillColor(textColor)
  .fontSize(10)
  .font('Helvetica')
  .text(
    'O HelpUS Accounting é uma solução SaaS Multi-Tenant desenvolvida para escritórios de contabilidade e empresas brasileiras. A ferramenta permite a consulta, gestão e download em lote de Notas Fiscais de Serviço (NFS-e) tanto prestadas quanto tomadas diretamente do Portal Nacional (ADN) e prefeituras integradas, utilizando qualquer Certificado Digital A1 (.pfx).',
    40,
    145,
    { width: 515, align: 'justify' }
  );

// Highlights box
doc.rect(40, 200, 515, 65).fill(lightBg).stroke('#e2e8f0');

doc
  .fillColor(primaryColor)
  .fontSize(10)
  .font('Helvetica-Bold')
  .text('Destaques da Solução:', 50, 210);

const highlights = [
  '• Autenticação efêmera mTLS via Certificado Digital A1 (sem retenção de chave privada).',
  '• Download em lote unificado (Pacote ZIP com XMLs assinalados + DANFSEs HTML + Excel .xlsx).',
  '• Suporte trilingue completo (Português, Inglês e Espanhol).',
  '• Domínio Oficial publicado: https://accounting.helpusbr.com',
];

let hY = 225;
highlights.forEach(h => {
  doc.fillColor(textColor).fontSize(9).font('Helvetica').text(h, 50, hY);
  hY += 12;
});

// Section 2: Historico de Solicitações
doc
  .fillColor(primaryColor)
  .fontSize(16)
  .font('Helvetica-Bold')
  .text('2. Solicitações do Usuário e Implementações', 40, 280);

const items = [
  {
    req: 'Captura de NFS-e Prestadas e Tomadas via Portal Nacional',
    desc: 'Construção da API backend (/api/nfse/consultar) com comunicação mTLS efêmera em Node.js com o ADN/Receita Federal e prefeituras.',
  },
  {
    req: 'Transformação em SaaS Universal Multi-Tenant',
    desc: 'Remoção de certificados hardcoded. Qualquer contador pode subir seu .pfx e senha. Configuração de DNS no Cloudflare (accounting.helpusbr.com) e Vercel.',
  },
  {
    req: 'Correção de Valores R$ 0,00 em XMLs de Prefeituras',
    desc: 'Desenvolvimento do analisador parseBrFloat() em src/lib/xml-parser.ts para tratamento de decimais brasileiros (1.500,00) e suporte a múltiplos padrões de tags XML.',
  },
  {
    req: 'Identidade Visual HelpUS, Logo Oficial, Favicon e Links',
    desc: 'Substituição dos ícones padrão pela logo oficial HelpUS (helpus-logo.jpg) no cabeçalho, favicon da aba do navegador e rodapé de desenvolvido por.',
  },
  {
    req: 'Rodapé Fixo (Sticky / Fixed) e Botão do WhatsApp Animado',
    desc: 'Rodapé fixo na parte inferior da tela (backdrop-blur) e botão flutuante animado do WhatsApp (83998721848) no canto inferior direito.',
  },
  {
    req: 'Manual do Usuário, Banner de Módulos, Cookies e Privacidade',
    desc: 'Implementação do Modal de Manual interativo no cabeçalho, card de apresentação dos futuros módulos (NF-e, CT-e, SPED) e aviso de Cookies com LGPD.',
  },
];

let currentY = 305;
items.forEach((item, index) => {
  doc
    .fillColor(accentColor)
    .fontSize(10)
    .font('Helvetica-Bold')
    .text(`${index + 1}. ${item.req}`, 40, currentY);

  currentY += 14;
  doc
    .fillColor(textColor)
    .fontSize(9)
    .font('Helvetica')
    .text(item.desc, 50, currentY, { width: 505 });

  currentY += 24;
});

// Footer of Page 1
doc
  .fillColor('#94a3b8')
  .fontSize(8)
  .font('Helvetica')
  .text('HelpUS Accounting Suite — Documentação Oficial 2026', 40, 780, { width: 515, align: 'center' });

// Add Page 2 for screenshots and technical specs
doc.addPage();

// Page 2 Header
doc.rect(0, 0, 595, 50).fill(primaryColor);
doc
  .fillColor('#ffffff')
  .fontSize(14)
  .font('Helvetica-Bold')
  .text('Documentação Técnica e Telas do Sistema', 40, 18);

doc
  .fillColor(primaryColor)
  .fontSize(14)
  .font('Helvetica-Bold')
  .text('3. Telas e Evidências Visuais', 40, 70);

// Embed HelpUS Logo Box
if (fs.existsSync(logoPath)) {
  doc.image(logoPath, 40, 95, { width: 140 });
}

doc
  .fillColor(textColor)
  .fontSize(10)
  .font('Helvetica-Bold')
  .text('Logotipo Oficial HelpUS Technology', 200, 95);

doc
  .fillColor(textColor)
  .fontSize(9)
  .font('Helvetica')
  .text(
    'O logotipo oficial foi inserido em alta resolução na aplicação web, garantindo a presença de marca no cabeçalho principal, no favicon da aba do navegador e no rodapé fixo do sistema.',
    200,
    115,
    { width: 355 }
  );

// Spec table
doc
  .fillColor(primaryColor)
  .fontSize(14)
  .font('Helvetica-Bold')
  .text('4. Matriz de Arquivos do Projeto', 40, 260);

const fileMatrix = [
  ['Componente', 'Caminho do Arquivo', 'Descrição'],
  ['Favicon & Metadata', 'src/app/layout.tsx', 'Apontamento para /helpus-logo.jpg'],
  ['i18n & Idiomas', 'src/lib/i18n.ts', 'Traduções PT, EN e ES para todos os componentes'],
  ['Interface Principal', 'src/app/page.tsx', 'Header, Footer fixo, WhatsApp, Modais'],
  ['Analisador XML', 'src/lib/xml-parser.ts', 'Suporte multi-prefeitura e parseBrFloat'],
  ['Documentação Obsidian', 'docs/Obsidian/*', '4 notas interligadas por wikilinks'],
  ['Relatório PDF', 'docs/diario/*', 'PDF com histórico de atividades'],
];

let tableY = 285;
fileMatrix.forEach((row, rIdx) => {
  const isHeader = rIdx === 0;
  doc
    .rect(40, tableY, 515, 20)
    .fill(isHeader ? primaryColor : rIdx % 2 === 0 ? lightBg : '#ffffff')
    .stroke('#e2e8f0');

  doc
    .fillColor(isHeader ? '#ffffff' : textColor)
    .fontSize(8)
    .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
    .text(row[0], 45, tableY + 5, { width: 100 });

  doc
    .fillColor(isHeader ? '#ffffff' : textColor)
    .fontSize(8)
    .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
    .text(row[1], 150, tableY + 5, { width: 140 });

  doc
    .fillColor(isHeader ? '#ffffff' : textColor)
    .fontSize(8)
    .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
    .text(row[2], 295, tableY + 5, { width: 255 });

  tableY += 20;
});

// Final signature box
doc.rect(40, 470, 515, 80).fill('#f1f5f9').stroke('#cbd5e1');

doc
  .fillColor(primaryColor)
  .fontSize(11)
  .font('Helvetica-Bold')
  .text('Validação de Produção & Status de Liberação', 55, 482);

doc
  .fillColor(textColor)
  .fontSize(9)
  .font('Helvetica')
  .text('Status de Compilação: APROVADO (Build 0 errors)', 55, 500);

doc
  .fillColor(textColor)
  .fontSize(9)
  .font('Helvetica')
  .text('Ambiente Vercel: https://accounting.helpusbr.com', 55, 514);

doc
  .fillColor(textColor)
  .fontSize(9)
  .font('Helvetica')
  .text('DNS Cloudflare: CNAME accounting.helpusbr.com -> cname.vercel-dns.com (OK)', 55, 528);

doc
  .fillColor('#94a3b8')
  .fontSize(8)
  .font('Helvetica')
  .text('HelpUS Technology — Todos os direitos reservados © 2026', 40, 780, { width: 515, align: 'center' });

doc.end();

writeStream.on('finish', () => {
  console.log('PDF gerado com sucesso em:', outputPath);
});
