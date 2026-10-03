export type Language = 'pt' | 'en' | 'es';

export interface Translations {
  portalTitle: string;
  portalSub: string;
  badgeNfse: string;
  certAuthTitle: string;
  certHelpSub: string;
  certFileLabel: string;
  selectFile: string;
  noFileSelected: string;
  passphraseLabel: string;
  passphrasePlaceholder: string;
  validateBtn: string;
  connectedBadge: string;
  validUntil: string;
  daysRemaining: string;
  switchCert: string;
  kpiTotalNotes: string;
  kpiNotesLabel: string;
  kpiIssuedVal: string;
  kpiReceivedVal: string;
  kpiTotalIss: string;
  kpiIssuedSub: string;
  kpiReceivedSub: string;
  kpiIssSub: string;
  filterAll: string;
  filterIssued: string;
  filterReceived: string;
  searchPlaceholder: string;
  exportExcel: string;
  downloadZip: string;
  generatingZip: string;
  importXmlBtn: string;
  tableType: string;
  tableNum: string;
  tableDate: string;
  tablePrestador: string;
  tableTomador: string;
  tableValServ: string;
  tableIss: string;
  tableStatus: string;
  tableActions: string;
  btnViewDanfse: string;
  emptyState: string;
  modalViewDanfse: string;
  modalXmlSource: string;
  footerDevelopedBy: string;
  footerRights: string;
  footerPortalName: string;

  // Modals & Banners
  adminAreaBtn: string;
  adminModalTitle: string;
  userManualBtn: string;
  privacyPolicyLink: string;
  cookieBannerTitle: string;
  cookieBannerText: string;
  cookieAcceptBtn: string;
  manualModalTitle: string;
  privacyModalTitle: string;

  // Date filters & Presets
  startDate: string;
  endDate: string;
  filterPeriod: string;
  clearDateFilter: string;
  presetThisMonth: string;
  presetLastMonth: string;
  preset2026: string;
  preset2025: string;
  preset2024: string;

  // Modules & Tabs
  modNfse: string;
  modNfe: string;
  modCte: string;
  modReinf: string;
  modSped: string;
  modConciliacao: string;

  // Universal Banners per module
  bannerNfseTitle: string;
  bannerNfseDesc: string;
  bannerNfeTitle: string;
  bannerNfeDesc: string;
  bannerCteTitle: string;
  bannerCteDesc: string;
  bannerReinfTitle: string;
  bannerReinfDesc: string;
  bannerSpedTitle: string;
  bannerSpedDesc: string;
  bannerConciliacaoTitle: string;
  bannerConciliacaoDesc: string;

  // Manual & Privacy Modals
  btnUnderstand: string;
  btnClose: string;
  manualMod1Title: string;
  manualMod1Desc: string;
  manualMod2Title: string;
  manualMod2Desc: string;
  manualMod3Title: string;
  manualMod3Desc: string;
  manualMod4Title: string;
  manualMod4Desc: string;
  manualMod5Title: string;
  manualMod5Desc: string;
  manualMod6Title: string;
  manualMod6Desc: string;

  privacyCommitmentTitle: string;
  privacyCommitmentDesc: string;
  privacyRule1Title: string;
  privacyRule1Desc: string;
  privacyRule2Title: string;
  privacyRule2Desc: string;
  privacyRule3Title: string;
  privacyRule3Desc: string;

  // Fale Conosco / Contact Us Form
  feedbackTitle: string;
  feedbackSub: string;
  feedbackNameLabel: string;
  feedbackNamePlaceholder: string;
  feedbackEmailLabel: string;
  feedbackEmailPlaceholder: string;
  feedbackSubjectLabel: string;
  feedbackOptInterface: string;
  feedbackOptFeature: string;
  feedbackOptFiscal: string;
  feedbackOptSupport: string;
  feedbackMsgLabel: string;
  feedbackMsgPlaceholder: string;
  feedbackSendBtn: string;
  feedbackSendingBtn: string;
  feedbackSuccessMsg: string;
}

export const translations: Record<Language, Translations> = {
  pt: {
    portalTitle: 'HelpUS Accounting',
    portalSub: 'Suite Contábil Universal Multi-Tenant para Empresas e Escritórios de Contabilidade',
    badgeNfse: 'NFS-e / SEFAZ / SPED / OFX',
    certAuthTitle: 'Autenticação Universal com Certificado Digital A1 (.pfx)',
    certHelpSub: 'Insira qualquer certificado digital A1 (.pfx) para autenticar todos os 6 módulos contábeis de forma universal.',
    certFileLabel: 'Arquivo do Certificado Digital A1 (.pfx)',
    selectFile: 'Selecionar arquivo .pfx',
    noFileSelected: 'Nenhum certificado selecionado',
    passphraseLabel: 'Senha da Chave Privada',
    passphrasePlaceholder: 'Digite a senha do certificado',
    validateBtn: 'Autenticar & Conectar',
    connectedBadge: 'SESSÃO mTLS ACTIVA',
    validUntil: 'Válido até:',
    daysRemaining: 'dias de validade',
    switchCert: 'Trocar Certificado',
    kpiTotalNotes: 'TOTAL DE REGISTROS',
    kpiNotesLabel: 'documentos',
    kpiIssuedVal: 'VALOR TOTAL EMITIDO',
    kpiReceivedVal: 'VALOR TOTAL RECEBIDO',
    kpiTotalIss: 'TOTAL IMPOSTOS APURADOS',
    kpiIssuedSub: 'Documentos emitidos pela empresa',
    kpiReceivedSub: 'Documentos recebidos de terceiros',
    kpiIssSub: 'Impostos fiscais calculados',
    filterAll: 'Todos os Registros',
    filterIssued: 'Emitidos / Prestados',
    filterReceived: 'Recebidos / Tomados',
    searchPlaceholder: 'Buscar por número, tomador, prestador ou CNPJ...',
    exportExcel: 'Exportar Planilha Excel',
    downloadZip: 'Baixar Pacote Completo (ZIP)',
    generatingZip: 'Gerando pacote ZIP...',
    importXmlBtn: 'Importar Lote XML / ZIP (Qualquer Prefeitura do Brasil)',
    tableType: 'Tipo',
    tableNum: 'Nº Documento',
    tableDate: 'Data Emissão',
    tablePrestador: 'Prestador / Emitente',
    tableTomador: 'Tomador / Cliente',
    tableValServ: 'Valor Total',
    tableIss: 'Imposto / ISS',
    tableStatus: 'Status',
    tableActions: 'Ações',
    btnViewDanfse: 'Visualizar',
    emptyState: 'Carregue um Certificado Digital A1 (.pfx) acima para visualizar e processar os documentos contábeis.',
    modalViewDanfse: 'Visualizar Documento',
    modalXmlSource: 'XML Fonte',
    footerDevelopedBy: 'Desenvolvido por',
    footerRights: 'Todos os direitos reservados.',
    footerPortalName: 'HelpUS Accounting Suite — Multi-Tenant Fiscal Engine',

    adminAreaBtn: 'Área Admin',
    adminModalTitle: 'Área Administrativa & Telemetria HelpUS',
    userManualBtn: 'Manual do Usuário',
    privacyPolicyLink: 'Política de Privacidade & LGPD',
    cookieBannerTitle: 'Aviso Discreto de Cookies & LGPD',
    cookieBannerText: 'Utilizamos apenas cookies essenciais e armazenamento local estritamente necessários para o funcionamento da sessão segura e retenção do seu idioma preferido.',
    cookieAcceptBtn: 'Aceitar & Continuar',
    manualModalTitle: 'Manual Detalhado da Suite Contábil (6 Módulos)',
    privacyModalTitle: 'Política de Privacidade e Proteção de Dados (LGPD)',

    startDate: 'Data Inicial',
    endDate: 'Data Final',
    filterPeriod: 'Filtrar Período',
    clearDateFilter: 'Limpar Datas',
    presetThisMonth: 'Este Mês',
    presetLastMonth: 'Mês Anterior',
    preset2026: 'Ano 2026',
    preset2025: 'Ano 2025',
    preset2024: 'Ano 2024',

    modNfse: '1. NFS-e (Serviços)',
    modNfe: '2. NF-e (Produtos)',
    modCte: '3. CT-e (Fretes)',
    modReinf: '4. EFD-Reinf',
    modSped: '5. SPED Fiscal',
    modConciliacao: '6. Conciliação OFX',

    bannerNfseTitle: 'Módulo 1: NFS-e (Nacional & Municipal)',
    bannerNfseDesc: '💡 Como usar: Qualquer usuário pode enviar o Certificado A1 (.pfx) para consultar e baixar em lote Notas de Serviço Prestadas e Tomadas diretamente do Portal Nacional (ADN) e Prefeituras.',
    
    bannerNfeTitle: 'Módulo 2: NF-e de Produto (SEFAZ Mercadorias)',
    bannerNfeDesc: '💡 Como usar: Conecte seu Certificado A1 para buscar automaticamente todas as NF-e emitidas contra o CNPJ da empresa, realizar Manifestação do Destinatário e baixar DANFEs e XMLs.',

    bannerCteTitle: 'Módulo 3: CT-e (Conhecimento de Transporte Eletrônico)',
    bannerCteDesc: '💡 Como usar: Autentique seu Certificado A1 para listar conhecimentos de frete tomados pela empresa, monitorar custos logísticos e gerar DACTEs gráficos.',

    bannerReinfTitle: 'Módulo 4: EFD-Reinf (Gerador de Eventos R-4010 / R-4020)',
    bannerReinfDesc: '💡 Como usar: O sistema lê as retenções na fonte (IRRF, PIS, COFINS, CSLL, INSS) das notas e gera os lotes XML oficiais do EFD-Reinf prontos para transmissão.',

    bannerSpedTitle: 'Módulo 5: SPED Fiscal (EFD ICMS IPI .txt)',
    bannerSpedDesc: '💡 Como usar: Converte automaticamente as notas de produtos e transportes do período no arquivo texto .txt normatizado do SPED Fiscal pronto para o PVA da Receita Federal.',

    bannerConciliacaoTitle: 'Módulo 6: Conciliação Bancária & Financeira',
    bannerConciliacaoDesc: '💡 Como usar: Arraste ou selecione o extrato bancário em formato .OFX ou .CSV de qualquer banco. O sistema cruza os lançamentos com as notas fiscais e aponta divergências.',

    btnUnderstand: 'Entendi & Concordo',
    btnClose: 'Fechar',
    manualMod1Title: '📋 Módulo 1: NFS-e (Notas Fiscais de Serviço)',
    manualMod1Desc: 'Insira seu Certificado A1 (.pfx) e senha para consultar e baixar em lote Notas de Serviço Prestadas e Tomadas do Portal Nacional e Prefeituras.',
    manualMod2Title: '📦 Módulo 2: NF-e de Produto (SEFAZ Mercadorias)',
    manualMod2Desc: 'Conecte seu Certificado A1 para buscar notas de produtos/compras emitidas contra o CNPJ da empresa, realizar Manifestação do Destinatário e baixar DANFEs.',
    manualMod3Title: '🚚 Módulo 3: CT-e (Conhecimento de Transporte)',
    manualMod3Desc: 'Liste todos os conhecimentos de frete da empresa para controlar custos logísticos e gerar DACTEs em PDF/HTML.',
    manualMod4Title: '📑 Módulo 4: EFD-Reinf (Gerador R-4010 / R-4020)',
    manualMod4Desc: 'Processa as retenções na fonte (IRRF, PIS, COFINS, CSLL, INSS) e gera os lotes em XML oficiais para transmissão à Receita Federal.',
    manualMod5Title: '📊 Módulo 5: SPED Fiscal (EFD ICMS IPI .txt)',
    manualMod5Desc: 'Converte as notas do mês no arquivo texto .txt normatizado do SPED Fiscal pronto para o PVA da Receita Federal.',
    manualMod6Title: '🏦 Módulo 6: Conciliação Bancária (OFX / CSV)',
    manualMod6Desc: 'Arraste o extrato bancário de qualquer banco (.OFX ou .CSV) para cruzar os lançamentos com as notas fiscais e gerar relatório de fluxo de caixa.',

    privacyCommitmentTitle: '🔒 Compromisso de Segurança & LGPD (Lei nº 13.709/2018)',
    privacyCommitmentDesc: 'O HelpUS Accounting segue rigorosamente as diretrizes da Lei Geral de Proteção de Dados (LGPD) e as melhores práticas de segurança da informação da ICP-Brasil.',
    privacyRule1Title: '1. Processamento Efêmero em Memória (Sem Armazenamento de Certificado)',
    privacyRule1Desc: 'O seu Certificado Digital A1 (.pfx) e a respectiva senha são utilizados exclusivamente na memória RAM do servidor durante o momento da conexão mTLS com as APIs oficiais da SEFAZ, Receita Federal e Prefeituras. Nenhuma chave privada ou certificado é gravado em disco ou banco de dados.',
    privacyRule2Title: '2. Uso Discreto de Cookies e Armazenamento Local',
    privacyRule2Desc: 'Utilizamos apenas cookies estritamente necessários e localStorage para armazenar preferências do usuário (como o idioma selecionado e o aceite deste termo). Não utilizamos cookies de rastreamento publicitário ou compartilhamento com terceiros.',
    privacyRule3Title: '3. Direitos do Titular dos Dados',
    privacyRule3Desc: 'Você pode a qualquer momento limpar os dados salvos em seu próprio navegador limpando os dados de navegação ou entrando em contato com nosso DPO/Encarregado através do e-mail helpus.ecommerce@gmail.com.',

    // Fale Conosco Form
    feedbackTitle: 'Fale Conosco / Sugestões & Suporte Técnico',
    feedbackSub: 'Envie sua sugestão de melhoria ou reporte de experiência para nossa equipe técnica',
    feedbackNameLabel: 'Seu Nome / Empresa',
    feedbackNamePlaceholder: 'Ex: Tércio (Public Arte / Contabilidade)',
    feedbackEmailLabel: 'Seu E-mail de Contato',
    feedbackEmailPlaceholder: 'seu.email@exemplo.com.br',
    feedbackSubjectLabel: 'Tipo de Sugestão / Assunto',
    feedbackOptInterface: '✨ Melhoria de Interface & Visual',
    feedbackOptFeature: '🚀 Nova Funcionalidade / Recurso',
    feedbackOptFiscal: '📑 Integração Fiscal / SPED / Reinf',
    feedbackOptSupport: '❓ Dúvida ou Suporte Técnico',
    feedbackMsgLabel: 'Sua Mensagem / Sugestão de Melhoria',
    feedbackMsgPlaceholder: 'Descreva detalhadamente sua sugestão de melhoria para a aplicação HelpUS Accounting...',
    feedbackSendBtn: 'Enviar Sugestão',
    feedbackSendingBtn: 'Enviando Mensagem...',
    feedbackSuccessMsg: 'Sua sugestão foi enviada com sucesso para helpus.ecommerce@gmail.com! Muito obrigado por colaborar com o aprimoramento do sistema.'
  },
  en: {
    portalTitle: 'HelpUS Accounting',
    portalSub: 'Universal Multi-Tenant Accounting Suite for Businesses and Accounting Firms',
    badgeNfse: 'NFS-e / SEFAZ / SPED / OFX',
    certAuthTitle: 'Universal Authentication with Digital Certificate A1 (.pfx)',
    certHelpSub: 'Upload any A1 digital certificate (.pfx) to universally authenticate across all 6 accounting modules.',
    certFileLabel: 'Digital Certificate A1 File (.pfx)',
    selectFile: 'Select .pfx file',
    noFileSelected: 'No certificate selected',
    passphraseLabel: 'Private Key Password',
    passphrasePlaceholder: 'Enter certificate password',
    validateBtn: 'Authenticate & Connect',
    connectedBadge: 'ACTIVE mTLS SESSION',
    validUntil: 'Valid until:',
    daysRemaining: 'days remaining',
    switchCert: 'Change Certificate',
    kpiTotalNotes: 'TOTAL RECORDS',
    kpiNotesLabel: 'documents',
    kpiIssuedVal: 'TOTAL ISSUED VALUE',
    kpiReceivedVal: 'TOTAL RECEIVED VALUE',
    kpiTotalIss: 'TOTAL CALCULATED TAXES',
    kpiIssuedSub: 'Documents issued by company',
    kpiReceivedSub: 'Documents received from suppliers',
    kpiIssSub: 'Calculated fiscal taxes',
    filterAll: 'All Records',
    filterIssued: 'Issued / Provided',
    filterReceived: 'Received / Taken',
    searchPlaceholder: 'Search by number, buyer, provider or CNPJ...',
    exportExcel: 'Export Excel Spreadsheet',
    downloadZip: 'Download Full Package (ZIP)',
    generatingZip: 'Generating ZIP package...',
    importXmlBtn: 'Import XML / ZIP Batch (Any Municipal Portal)',
    tableType: 'Type',
    tableNum: 'Doc No.',
    tableDate: 'Issue Date',
    tablePrestador: 'Provider / Issuer',
    tableTomador: 'Client / Buyer',
    tableValServ: 'Total Amount',
    tableIss: 'Tax / ISS',
    tableStatus: 'Status',
    tableActions: 'Actions',
    btnViewDanfse: 'Preview',
    emptyState: 'Upload a Digital Certificate A1 (.pfx) above to view and process accounting documents.',
    modalViewDanfse: 'Preview Document',
    modalXmlSource: 'XML Source',
    footerDevelopedBy: 'Developed by',
    footerRights: 'All rights reserved.',
    footerPortalName: 'HelpUS Accounting Suite — Multi-Tenant Fiscal Engine',

    adminAreaBtn: 'Admin Area',
    adminModalTitle: 'HelpUS Administrative Area & Telemetry',
    userManualBtn: 'User Manual',
    privacyPolicyLink: 'Privacy Policy & GDPR',
    cookieBannerTitle: 'Cookies & Privacy Notice',
    cookieBannerText: 'We only use essential cookies and local storage necessary for secure session management and language preference retention.',
    cookieAcceptBtn: 'Accept & Continue',
    manualModalTitle: 'Detailed Accounting Suite Manual (6 Modules)',
    privacyModalTitle: 'Privacy Policy & Data Protection',

    startDate: 'Start Date',
    endDate: 'End Date',
    filterPeriod: 'Filter Period',
    clearDateFilter: 'Clear Dates',
    presetThisMonth: 'This Month',
    presetLastMonth: 'Last Month',
    preset2026: 'Year 2026',
    preset2025: 'Year 2025',
    preset2024: 'Year 2024',

    modNfse: '1. NFS-e (Services)',
    modNfe: '2. NF-e (Products)',
    modCte: '3. CT-e (Freight)',
    modReinf: '4. EFD-Reinf',
    modSped: '5. SPED Fiscal',
    modConciliacao: '6. OFX Reconciliation',

    bannerNfseTitle: 'Module 1: NFS-e (National & Municipal Service Invoices)',
    bannerNfseDesc: '💡 How to use: Upload any A1 Certificate (.pfx) to query and batch download issued and received service invoices directly from the National Portal (ADN) and Municipalities.',
    
    bannerNfeTitle: 'Module 2: Product NF-e (SEFAZ Goods)',
    bannerNfeDesc: '💡 How to use: Connect your A1 Certificate to auto-fetch supplier product invoices, perform Buyer Manifestation, and download DANFEs and XMLs.',

    bannerCteTitle: 'Module 3: CT-e (Electronic Freight Transport)',
    bannerCteDesc: '💡 How to use: Authenticate your A1 Certificate to list freight documents, monitor logistics costs, and generate graphical DACTEs.',

    bannerReinfTitle: 'Module 4: EFD-Reinf (WHT Event Generator R-4010 / R-4020)',
    bannerReinfDesc: '💡 How to use: Reads tax withholdings (IRRF, PIS, COFINS, CSLL, INSS) and generates official XML event batches ready for transmission.',

    bannerSpedTitle: 'Module 5: SPED Fiscal (EFD ICMS IPI .txt)',
    bannerSpedDesc: '💡 How to use: Automatically converts product and freight invoices into the normalized SPED Fiscal text file ready for Receita Federal PVA.',

    bannerConciliacaoTitle: 'Module 6: Bank & Financial Reconciliation',
    bannerConciliacaoDesc: '💡 How to use: Drag or upload your bank statement in .OFX or .CSV format from any bank. The engine matches entries against tax invoices and flags discrepancies.',

    btnUnderstand: 'Understand & Agree',
    btnClose: 'Close',
    manualMod1Title: '📋 Module 1: NFS-e (Service Invoices)',
    manualMod1Desc: 'Upload your A1 Certificate (.pfx) and password to query and batch download issued and received service invoices from National and Municipal Portals.',
    manualMod2Title: '📦 Module 2: Product NF-e (SEFAZ Goods)',
    manualMod2Desc: 'Connect your A1 Certificate to auto-fetch product purchase invoices issued against your CNPJ, perform Buyer Manifestation, and download DANFEs.',
    manualMod3Title: '🚚 Module 3: CT-e (Freight Transport)',
    manualMod3Desc: 'List all freight bills of lading to control logistics expenses and generate PDF/HTML DACTEs.',
    manualMod4Title: '📑 Module 4: EFD-Reinf (Generator R-4010 / R-4020)',
    manualMod4Desc: 'Processes tax withholdings (IRRF, PIS, COFINS, CSLL, INSS) and generates official XML batches for Receita Federal transmission.',
    manualMod5Title: '📊 Module 5: SPED Fiscal (EFD ICMS IPI .txt)',
    manualMod5Desc: 'Converts monthly invoices into the standardized SPED Fiscal .txt file ready for PVA validation.',
    manualMod6Title: '🏦 Module 6: Bank Reconciliation (OFX / CSV)',
    manualMod6Desc: 'Drag your bank statement (.OFX or .CSV) to match entries against invoices and generate cash flow reports.',

    privacyCommitmentTitle: '🔒 Security & Data Protection Commitment (GDPR / LGPD)',
    privacyCommitmentDesc: 'HelpUS Accounting strictly follows Data Protection regulations and ICP-Brasil information security standards.',
    privacyRule1Title: '1. Ephemeral Memory Processing (Zero Storage of Certificate)',
    privacyRule1Desc: 'Your Digital Certificate A1 (.pfx) and password are used exclusively in server RAM during mTLS connection with SEFAZ and Receita Federal APIs. No private key or certificate is ever saved on disk or database.',
    privacyRule2Title: '2. Essential Cookies & Local Storage Only',
    privacyRule2Desc: 'We only use strictly necessary cookies and localStorage to store user preferences (language and terms consent). We do not use advertising or tracking cookies.',
    privacyRule3Title: '3. Data Subject Rights',
    privacyRule3Desc: 'You can clear your saved browser data at any time or contact our Data Protection Officer via email at helpus.ecommerce@gmail.com.',

    // Fale Conosco Form
    feedbackTitle: 'Contact Us / Suggestions & Technical Support',
    feedbackSub: 'Send your improvement suggestion or feedback to our engineering team',
    feedbackNameLabel: 'Your Name / Company',
    feedbackNamePlaceholder: 'Ex: John Doe (Accounting Firm / Business)',
    feedbackEmailLabel: 'Your Contact Email',
    feedbackEmailPlaceholder: 'your.email@example.com',
    feedbackSubjectLabel: 'Suggestion Category / Subject',
    feedbackOptInterface: '✨ UI & Visual Improvement',
    feedbackOptFeature: '🚀 New Feature / Functionality',
    feedbackOptFiscal: '📑 Tax Integration / SPED / Reinf',
    feedbackOptSupport: '❓ Question or Tech Support',
    feedbackMsgLabel: 'Your Message / Improvement Suggestion',
    feedbackMsgPlaceholder: 'Describe your improvement suggestion for the HelpUS Accounting application in detail...',
    feedbackSendBtn: 'Send Suggestion',
    feedbackSendingBtn: 'Sending Message...',
    feedbackSuccessMsg: 'Your suggestion has been sent successfully to helpus.ecommerce@gmail.com! Thank you very much for helping us improve.'
  },
  es: {
    portalTitle: 'HelpUS Accounting',
    portalSub: 'Suite Contable Universal Multi-Tenant para Empresas y Despachos Contables',
    badgeNfse: 'NFS-e / SEFAZ / SPED / OFX',
    certAuthTitle: 'Autenticación Universal con Certificado Digital A1 (.pfx)',
    certHelpSub: 'Cargue cualquier certificado digital A1 (.pfx) para autenticar universalmente los 6 módulos contables.',
    certFileLabel: 'Archivo de Certificado Digital A1 (.pfx)',
    selectFile: 'Seleccionar archivo .pfx',
    noFileSelected: 'Ningún certificado seleccionado',
    passphraseLabel: 'Contraseña de Clave Privada',
    passphrasePlaceholder: 'Ingrese contraseña del certificado',
    validateBtn: 'Autenticar y Conectar',
    connectedBadge: 'SESIÓN mTLS ACTIVA',
    validUntil: 'Válido hasta:',
    daysRemaining: 'días restantes',
    switchCert: 'Cambiar Certificado',
    kpiTotalNotes: 'TOTAL DE REGISTROS',
    kpiNotesLabel: 'documentos',
    kpiIssuedVal: 'VALOR TOTAL EMITIDO',
    kpiReceivedVal: 'VALOR TOTAL RECIBIDO',
    kpiTotalIss: 'TOTAL IMPUESTOS CALCULADOS',
    kpiIssuedSub: 'Documentos emitidos por la empresa',
    kpiReceivedSub: 'Documentos recibidos de proveedores',
    kpiIssSub: 'Impuestos fiscales calculados',
    filterAll: 'Todos los Registros',
    filterIssued: 'Emitidos / Prestados',
    filterReceived: 'Recibidos / Tomados',
    searchPlaceholder: 'Buscar por número, cliente, proveedor o CNPJ...',
    exportExcel: 'Exportar Planilla Excel',
    downloadZip: 'Descargar Paquete Completo (ZIP)',
    generatingZip: 'Generando paquete ZIP...',
    importXmlBtn: 'Importar Lote XML / ZIP (Cualquier Municipio)',
    tableType: 'Tipo',
    tableNum: 'Nº Doc.',
    tableDate: 'Fecha Emisión',
    tablePrestador: 'Prestador / Emisor',
    tableTomador: 'Tomador / Cliente',
    tableValServ: 'Valor Total',
    tableIss: 'Impuesto / ISS',
    tableStatus: 'Estado',
    tableActions: 'Acciones',
    btnViewDanfse: 'Visualizar',
    emptyState: 'Cargue un Certificado Digital A1 (.pfx) arriba para consultar y procesar documentos contables.',
    modalViewDanfse: 'Visualizar Documento',
    modalXmlSource: 'XML Fuente',
    footerDevelopedBy: 'Desarrollado por',
    footerRights: 'Todos los derechos reservados.',
    footerPortalName: 'HelpUS Accounting Suite — Multi-Tenant Fiscal Engine',

    adminAreaBtn: 'Área Admin',
    adminModalTitle: 'Área Administrativa y Telemetría HelpUS',
    userManualBtn: 'Manual de Usuario',
    privacyPolicyLink: 'Política de Privacidad y LGPD',
    cookieBannerTitle: 'Aviso de Cookies y Privacidad',
    cookieBannerText: 'Utilizamos únicamente cookies esenciales y almacenamiento local estrictamente necesarios para el funcionamiento seguro de la sesión.',
    cookieAcceptBtn: 'Aceptar y Continuar',
    manualModalTitle: 'Manual Detalhado de la Suite Contable (6 Módulos)',
    privacyModalTitle: 'Política de Privacidad y Protección de Datos',

    startDate: 'Fecha Inicial',
    endDate: 'Fecha Final',
    filterPeriod: 'Filtrar Período',
    clearDateFilter: 'Limpiar Fechas',
    presetThisMonth: 'Este Mes',
    presetLastMonth: 'Mes Anterior',
    preset2026: 'Año 2026',
    preset2025: 'Año 2025',
    preset2024: 'Año 2024',

    modNfse: '1. NFS-e (Servicios)',
    modNfe: '2. NF-e (Productos)',
    modCte: '3. CT-e (Fletes)',
    modReinf: '4. EFD-Reinf',
    modSped: '5. SPED Fiscal',
    modConciliacao: '6. Conciliación OFX',

    bannerNfseTitle: 'Módulo 1: NFS-e (Facturas de Servicio Nacional y Municipal)',
    bannerNfseDesc: '💡 Cómo usar: Cargue su Certificado A1 (.pfx) para consultar y descargar en lote Facturas de Servicio del Portal Nacional (ADN) y Municipios.',
    
    bannerNfeTitle: 'Módulo 2: NF-e de Producto (SEFAZ Mercancías)',
    bannerNfeDesc: '💡 Cómo usar: Conecte su Certificado A1 para obtener automáticamente facturas de compras de proveedores, Manifestación del Destinatario y DANFEs.',

    bannerCteTitle: 'Módulo 3: CT-e (Conocimiento de Transporte Electrónico)',
    bannerCteDesc: '💡 Cómo usar: Autentique su Certificado A1 para listar fletes, monitorear costos logísticos y generar DACTEs gráficos.',

    bannerReinfTitle: 'Módulo 4: EFD-Reinf (Retenciones de Impuestos R-4010 / R-4020)',
    bannerReinfDesc: '💡 Cómo usar: Lee retenciones de impuestos (IRRF, PIS, COFINS, CSLL, INSS) y genera lotes XML oficiales listos para enviar a la Receita Federal.',

    bannerSpedTitle: 'Módulo 5: SPED Fiscal (EFD ICMS IPI .txt)',
    bannerSpedDesc: '💡 Cómo usar: Convierte automáticamente las facturas del período en el archivo de texto .txt normatizado para el PVA de la Receita Federal.',

    bannerConciliacaoTitle: 'Módulo 6: Conciliación Bancaria y Financiera',
    bannerConciliacaoDesc: '💡 Cómo usar: Cargue el extracto bancario en formato .OFX o .CSV de cualquier banco. El sistema cruza lanzamientos con facturas y muestra inconsistencias.',

    btnUnderstand: 'Entendido y Acepto',
    btnClose: 'Cerrar',
    manualMod1Title: '📋 Módulo 1: NFS-e (Facturas de Servicio)',
    manualMod1Desc: 'Cargue su Certificado A1 (.pfx) y contraseña para consultar y descargar en lote Facturas de Servicio Prestadas y Tomadas del Portal Nacional y Municipios.',
    manualMod2Title: '📦 Módulo 2: NF-e de Producto (SEFAZ Mercancías)',
    manualMod2Desc: 'Conecte su Certificado A1 para obtener facturas de compras emitidas contra su CNPJ, realizar Manifestación del Destinatario y descargar DANFEs.',
    manualMod3Title: '🚚 Módulo 3: CT-e (Transporte de Carga)',
    manualMod3Desc: 'Muestre todos los conocimientos de flete para controlar gastos logísticos y generar DACTEs en PDF/HTML.',
    manualMod4Title: '📑 Módulo 4: EFD-Reinf (Generador R-4010 / R-4020)',
    manualMod4Desc: 'Procesa retenciones de impuestos (IRRF, PIS, COFINS, CSLL, INSS) y genera lotes XML oficiales para la Receita Federal.',
    manualMod5Title: '📊 Módulo 5: SPED Fiscal (EFD ICMS IPI .txt)',
    manualMod5Desc: 'Convierte facturas del mes en el archivo de texto .txt normatizado listo para el PVA de la Receita Federal.',
    manualMod6Title: '🏦 Módulo 6: Conciliación Bancaria (OFX / CSV)',
    manualMod6Desc: 'Arrastre el extracto bancario (.OFX o .CSV) para cruzar lanzamientos con facturas y generar informe de flujo de caja.',

    privacyCommitmentTitle: '🔒 Compromiso de Seguridad y Protección de Datos (LGPD / GDPR)',
    privacyCommitmentDesc: 'HelpUS Accounting cumple estrictamente las normativas de Protección de Datos y estándares de seguridad de ICP-Brasil.',
    privacyRule1Title: '1. Procesamiento Efímero en Memoria (Sin Almacenamiento de Certificado)',
    privacyRule1Desc: 'Su Certificado Digital A1 (.pfx) y contraseña se utilizan exclusivamente en la memoria RAM del servidor durante la conexión mTLS con SEFAZ y Receita Federal. Ninguna clave privada o certificado se graba en disco o base de datos.',
    privacyRule2Title: '2. Uso de Cookies Esenciales y Almacenamiento Local',
    privacyRule2Desc: 'Utilizamos únicamente cookies estrictamente necesarias y localStorage para guardar sus preferencias (idioma y aceptación de términos). No utilizamos cookies publicitarias ni de seguimiento de terceros.',
    privacyRule3Title: '3. Derechos del Titular de los Datos',
    privacyRule3Desc: 'Puede borrar los datos guardados en su navegador en cualquier momento o contactar a nuestro Delegado de Protección de Datos en helpus.ecommerce@gmail.com.',

    // Fale Conosco Form
    feedbackTitle: 'Contáctenos / Sugerencias y Soporte Técnico',
    feedbackSub: 'Envíe su sugerencia de mejora o comentarios a nuestro equipo técnico',
    feedbackNameLabel: 'Su Nombre / Empresa',
    feedbackNamePlaceholder: 'Ej: Juan Pérez (Despacho Contable / Empresa)',
    feedbackEmailLabel: 'Su Correo Electrónico de Contacto',
    feedbackEmailPlaceholder: 'su.correo@ejemplo.com',
    feedbackSubjectLabel: 'Tipo de Sugerencia / Asunto',
    feedbackOptInterface: '✨ Mejora de Interfaz y Visual',
    feedbackOptFeature: '🚀 Nueva Funcionalidade / Recurso',
    feedbackOptFiscal: '📑 Integración Fiscal / SPED / Reinf',
    feedbackOptSupport: '❓ Duda o Soporte Técnico',
    feedbackMsgLabel: 'Su Mensaje / Sugerencia de Mejora',
    feedbackMsgPlaceholder: 'Describa en detalle su sugerencia de mejora para la aplicación HelpUS Accounting...',
    feedbackSendBtn: 'Enviar Sugerencia',
    feedbackSendingBtn: 'Enviando Mensaje...',
    feedbackSuccessMsg: '¡Su sugerencia fue enviada con éxito a helpus.ecommerce@gmail.com! Muchas gracias por colaborar.'
  }
};
