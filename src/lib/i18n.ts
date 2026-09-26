export type Language = 'pt' | 'en' | 'es';

export interface Translations {
  portalTitle: string;
  portalSub: string;
  badgeNfse: string;
  certAuthTitle: string;
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

  // Date filters
  startDate: string;
  endDate: string;
  filterPeriod: string;
  clearDateFilter: string;

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
}

export const translations: Record<Language, Translations> = {
  pt: {
    portalTitle: 'HelpUS Accounting',
    portalSub: 'Suite Contábil Universal Multi-Tenant para Empresas e Escritórios de Contabilidade',
    badgeNfse: 'NFS-e / SEFAZ / SPED / OFX',
    certAuthTitle: 'Autenticação Universal com Certificado Digital A1 (.pfx)',
    certFileLabel: 'Arquivo do Certificado Digital A1 (.pfx)',
    selectFile: 'Selecionar arquivo .pfx',
    noFileSelected: 'Nenhum certificado selecionado',
    passphraseLabel: 'Senha da Chave Privada',
    passphrasePlaceholder: 'Digite a senha do certificado',
    validateBtn: 'Autenticar & Conectar',
    connectedBadge: 'SESSÃO mTLS ATIVA',
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
    privacyPolicyLink: 'Política de Privacidade',
    cookieBannerTitle: 'Aviso de Cookies & LGPD',
    cookieBannerText: 'Utilizamos apenas cookies essenciais e armazenamento local estritamente necessários para o funcionamento da sessão segura e retenção do seu idioma preferido.',
    cookieAcceptBtn: 'Aceitar & Continuar',
    manualModalTitle: 'Manual Detalhado da Suite Contábil (6 Módulos)',
    privacyModalTitle: 'Política de Privacidade e Proteção de Dados (LGPD)',

    startDate: 'Data Inicial',
    endDate: 'Data Final',
    filterPeriod: 'Filtrar Período',
    clearDateFilter: 'Limpar Datas',

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
    bannerConciliacaoDesc: '💡 Como usar: Arraste ou selecione o extrato bancário em formato .OFX ou .CSV de qualquer banco. O sistema cruza os lançamentos com as notas fiscais e aponta divergências.'
  },
  en: {
    portalTitle: 'HelpUS Accounting',
    portalSub: 'Universal Multi-Tenant Accounting Suite for Businesses and Accounting Firms',
    badgeNfse: 'NFS-e / SEFAZ / SPED / OFX',
    certAuthTitle: 'Universal Authentication with Digital Certificate A1 (.pfx)',
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
    privacyPolicyLink: 'Privacy Policy',
    cookieBannerTitle: 'Cookies & Privacy Notice',
    cookieBannerText: 'We only use essential cookies and local storage necessary for secure session management and language preference retention.',
    cookieAcceptBtn: 'Accept & Continue',
    manualModalTitle: 'Detailed Accounting Suite Manual (6 Modules)',
    privacyModalTitle: 'Privacy Policy & Data Protection',

    startDate: 'Start Date',
    endDate: 'End Date',
    filterPeriod: 'Filter Period',
    clearDateFilter: 'Clear Dates',

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
    bannerConciliacaoDesc: '💡 How to use: Drag or upload your bank statement in .OFX or .CSV format from any bank. The engine matches entries against tax invoices and flags discrepancies.'
  },
  es: {
    portalTitle: 'HelpUS Accounting',
    portalSub: 'Suite Contable Universal Multi-Tenant para Empresas y Despachos Contables',
    badgeNfse: 'NFS-e / SEFAZ / SPED / OFX',
    certAuthTitle: 'Autenticación Universal con Certificado Digital A1 (.pfx)',
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
    privacyPolicyLink: 'Política de Privacidad',
    cookieBannerTitle: 'Aviso de Cookies y Privacidad',
    cookieBannerText: 'Utilizamos únicamente cookies esenciales y almacenamiento local estrictamente necesarios para el funcionamiento seguro de la sesión.',
    cookieAcceptBtn: 'Aceptar y Continuar',
    manualModalTitle: 'Manual Detallado de la Suite Contable (6 Módulos)',
    privacyModalTitle: 'Política de Privacidad y Protección de Datos',

    startDate: 'Fecha Inicial',
    endDate: 'Fecha Final',
    filterPeriod: 'Filtrar Período',
    clearDateFilter: 'Limpiar Fechas',

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
    bannerConciliacaoDesc: '💡 Cómo usar: Cargue el extracto bancario en formato .OFX o .CSV de cualquier banco. El sistema cruza lanzamientos con facturas y muestra inconsistencias.'
  }
};
