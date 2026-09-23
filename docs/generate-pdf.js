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

// Theme Colors
const primaryColor = '#0f172a'; // slate-900
const accentColor = '#f59e0b'; // amber-500
const textColor = '#334155'; // slate-700
const lightBg = '#f8fafc'; // slate-50
const highlightGreen = '#10b981'; // emerald-500

// ----------------------------------------------------
// PAGE 1: HEADER & USER RELEASE NOTES
// ----------------------------------------------------

// Header Bar
doc.rect(0, 0, 595, 105).fill(primaryColor);

const logoPath = path.join(__dirname, '..', 'public', 'helpus-logo.jpg');
if (fs.existsSync(logoPath)) {
  doc.image(logoPath, 40, 15, { width: 75, height: 75 });
}

doc
  .fillColor('#ffffff')
  .fontSize(20)
  .font('Helvetica-Bold')
  .text('HelpUS Accounting Suite', 130, 22);

doc
  .fillColor(accentColor)
  .fontSize(12)
  .font('Helvetica-Bold')
  .text('Guia de Atualizações e Novidades para o Usuário', 130, 48);

doc
  .fillColor('#94a3b8')
  .fontSize(9)
  .font('Helvetica')
  .text('Versão: 2.1.0  |  Data: 23/09/2026  |  Plataforma: accounting.helpusbr.com', 130, 68);

doc.moveDown(4);

// Introductory Message to the Accountant / User
doc
  .fillColor(primaryColor)
  .fontSize(14)
  .font('Helvetica-Bold')
  .text('Prezado(a) Contador(a) e Usuário(a),', 40, 125);

doc
  .fillColor(textColor)
  .fontSize(9.5)
  .font('Helvetica')
  .text(
    'Apresentamos o resumo visual das novas funcionalidades e melhorias implementadas na plataforma HelpUS Accounting. O sistema passou por aprimoramentos para tornar a sua navegação mais ágil, intuitiva e totalmente responsiva em qualquer dispositivo (computadores, tablets e smartphones).',
    40,
    145,
    { width: 515, align: 'justify' }
  );

// Highlights Box
doc.rect(40, 195, 515, 60).fill('#fffbeb').stroke('#fef3c7');

doc
  .fillColor('#92400e')
  .fontSize(10)
  .font('Helvetica-Bold')
  .text('📌 O que você encontra nesta nova versão:', 50, 203);

const highlights = [
  '1. Ordenação Clicável nas Colunas da Tabela (Ordene por Tipo, Data, Nº, Prestador, Tomador, Valor e ISS).',
  '2. Logotipo Oficial HelpUS Technology no Cabeçalho, Favicon e Rodapé Fixo.',
  '3. Botão Flutuante do WhatsApp para Atendimento Rápido (83 99872-1848).',
  '4. Botão do Manual do Usuário e Aviso do Roadmap de Futuros Módulos (NF-e, CT-e, SPED).',
];

let hY = 218;
highlights.forEach(h => {
  doc.fillColor('#78350f').fontSize(8.5).font('Helvetica').text(h, 50, hY);
  hY += 10.5;
});

// Section: Onde encontrar na tela
doc
  .fillColor(primaryColor)
  .fontSize(13)
  .font('Helvetica-Bold')
  .text('1. Onde Localizar as Novidades no Site', 40, 270);

const features = [
  {
    title: 'A. Ordenação de Colunas na Tabela de Notas',
    loc: 'Barra de título da tabela (Linha de cabeçalho das Notas Fiscais)',
    desc: 'Basta clicar no nome de qualquer coluna (ex: TIPO, DATA EMISSÃO, VALOR SERVIÇO) para alternar a ordenação entre ordem crescente e decrescente. Um ícone de seta (⬆️/⬇️) indicará a coluna atualmente classificada.'
  },
  {
    title: 'B. Botão "Manual do Usuário"',
    loc: 'Topo superior direito (ao lado do seletor de idiomas PT/EN/ES)',
    desc: 'Ao clicar no botão "Manual do Usuário", uma janela interativa se abre na tela com o passo-a-passo detalhado de como enviar o certificado A1, consultar notas e exportar arquivos.'
  },
  {
    title: 'C. Card Explicativo de Módulos e Futuras Funcionalidades',
    loc: 'Abaixo do cabeçalho principal',
    desc: 'Apresenta o módulo de NFS-e Nacional & Municipal atualmente ativo e informa o lançamento dos novos módulos integrados em breve (NF-e de Produto, CT-e, SPED Fiscal e Conciliação).'
  },
  {
    title: 'D. Botão de Suporte via WhatsApp Flutuante',
    loc: 'Canto inferior direito da tela (Ícone verde animado)',
    desc: 'Permite abrir uma conversa direta no WhatsApp (83 99872-1848) com a equipe de suporte HelpUS com 1 único clique.'
  },
  {
    title: 'E. Rodapé Fixo e Aviso de Cookies LGPD',
    loc: 'Barra inferior fixa de navegação',
    desc: 'O rodapé acompanha a rolagem da página mantendo os créditos e políticas de privacidade sempre visíveis e acessíveis.'
  }
];

let fY = 290;
features.forEach(item => {
  doc
    .fillColor(accentColor)
    .fontSize(10)
    .font('Helvetica-Bold')
    .text(item.title, 40, fY);

  fY += 12;
  doc
    .fillColor('#475569')
    .fontSize(8.5)
    .font('Helvetica-Bold')
    .text(`• Onde ver: ${item.loc}`, 50, fY);

  fY += 11;
  doc
    .fillColor(textColor)
    .fontSize(8.5)
    .font('Helvetica')
    .text(item.desc, 50, fY, { width: 505 });

  fY += 20;
});

// Footer Page 1
doc
  .fillColor('#94a3b8')
  .fontSize(8)
  .font('Helvetica')
  .text('HelpUS Accounting Suite — Guia de Atualizações do Usuário © 2026', 40, 780, { width: 515, align: 'center' });

// ----------------------------------------------------
// PAGE 2: SCREENSHOTS & VISUAL GUIDE
// ----------------------------------------------------
doc.addPage();

// Page 2 Header Bar
doc.rect(0, 0, 595, 50).fill(primaryColor);
doc
  .fillColor('#ffffff')
  .fontSize(14)
  .font('Helvetica-Bold')
  .text('Capturas de Tela e Guia Visual do Sistema', 40, 18);

doc
  .fillColor(primaryColor)
  .fontSize(13)
  .font('Helvetica-Bold')
  .text('2. Telas Reais do Sistema (https://accounting.helpusbr.com)', 40, 65);

// Screenshot 1: Desktop Portal
const shot1 = path.join(__dirname, 'screenshots', '01-visao-geral-portal.png');
if (fs.existsSync(shot1)) {
  doc.image(shot1, 40, 85, { width: 515 });
}

doc
  .fillColor('#475569')
  .fontSize(8)
  .font('Helvetica-Oblique')
  .text(
    'Figura 1: Tela Principal Desktop — Exibindo a logo HelpUS no topo, botão de Manual, Banner de Módulos e a barra de cabeçalho da tabela com os botões de ordenação por coluna.',
    40,
    455,
    { width: 515, align: 'center' }
  );

// Screenshot 2: Modal Manual
const shot2 = path.join(__dirname, 'screenshots', '02-modal-manual-usuario.png');
if (fs.existsSync(shot2)) {
  doc.image(shot2, 40, 480, { width: 250 });
}

// Screenshot 3: Mobile View
const shot3 = path.join(__dirname, 'screenshots', '03-visao-mobile-responsiva.png');
if (fs.existsSync(shot3)) {
  doc.image(shot3, 305, 480, { width: 250 });
}

doc
  .fillColor('#475569')
  .fontSize(8)
  .font('Helvetica-Oblique')
  .text(
    'Figura 2: Modal do Manual do Usuário (esquerda) e Visão Mobile Responsiva em Smartphone (direita).',
    40,
    760,
    { width: 515, align: 'center' }
  );

// Footer Page 2
doc
  .fillColor('#94a3b8')
  .fontSize(8)
  .font('Helvetica')
  .text('HelpUS Technology — Suporte: (83) 99872-1848  |  accounting.helpusbr.com', 40, 780, { width: 515, align: 'center' });

doc.end();

writeStream.on('finish', () => {
  console.log('PDF para o usuário gerado com sucesso em:', outputPath);
});
