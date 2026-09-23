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

  // New features
  userManualBtn: string;
  privacyPolicyLink: string;
  cookieBannerTitle: string;
  cookieBannerText: string;
  cookieAcceptBtn: string;
  moduleBannerTitle: string;
  moduleBannerDesc: string;
  moduleBannerFuture: string;
  manualModalTitle: string;
  privacyModalTitle: string;
}

export const translations: Record<Language, Translations> = {
  pt: {
    portalTitle: 'HelpUS Accounting',
    portalSub: 'Plataforma Universal de Gestão e Download de NFS-e para Escritórios de Contabilidade',
    badgeNfse: 'Portal Nacional NFS-e (ADN)',
    certAuthTitle: 'Autenticação com Certificado Digital A1 (.pfx)',
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
    kpiTotalNotes: 'TOTAL DE NOTAS',
    kpiNotesLabel: 'notas',
    kpiIssuedVal: 'SERVIÇOS PRESTADOS (BRUTO)',
    kpiReceivedVal: 'SERVIÇOS TOMADOS (RECEBIDOS)',
    kpiTotalIss: 'TOTAL ISS CALCULADO',
    kpiIssuedSub: 'NFS-e emitidas pela empresa',
    kpiReceivedSub: 'NFS-e tomadas de terceiros',
    kpiIssSub: 'Impostos de serviço apurados',
    filterAll: 'Todas as Notas',
    filterIssued: 'Serviços Prestados',
    filterReceived: 'Serviços Tomados',
    searchPlaceholder: 'Buscar por número da nota, tomador, prestador ou CNPJ...',
    exportExcel: 'Exportar Planilha Excel',
    downloadZip: 'Baixar Pacote Completo (ZIP)',
    generatingZip: 'Gerando pacote ZIP...',
    tableType: 'Tipo',
    tableNum: 'Nº NFS-e',
    tableDate: 'Data Emissão',
    tablePrestador: 'Prestador dos Serviços',
    tableTomador: 'Tomador / Cliente',
    tableValServ: 'Valor Serviço',
    tableIss: 'ISS',
    tableStatus: 'Status',
    tableActions: 'Ações',
    btnViewDanfse: 'Ver DANFSE',
    emptyState: 'Carregue um Certificado Digital A1 (.pfx) acima para visualizar e baixar as Notas Fiscais de Serviço.',
    modalViewDanfse: 'Visualizar DANFSE',
    modalXmlSource: 'XML Fonte',
    footerDevelopedBy: 'Desenvolvido por',
    footerRights: 'Todos os direitos reservados.',
    footerPortalName: 'HelpUS Accounting Suite — Multi-Tenant NFS-e Engine',

    userManualBtn: 'Manual do Usuário',
    privacyPolicyLink: 'Política de Privacidade',
    cookieBannerTitle: 'Aviso de Cookies & LGPD',
    cookieBannerText: 'Utilizamos apenas cookies essenciais e armazenamento local estritamente necessários para o funcionamento da sessão segura e retenção do seu idioma preferido.',
    cookieAcceptBtn: 'Aceitar & Continuar',
    moduleBannerTitle: 'Módulo NFS-e Nacional & Municipal',
    moduleBannerDesc: 'Esta ferramenta realiza a captura unificada, consulta e download em lote de Notas Fiscais de Serviço (Prestadas e Tomadas) diretamente do Portal Nacional e Prefeituras via Certificado Digital A1.',
    moduleBannerFuture: '🚀 Em Breve: Esta suite contábil receberá novos módulos integrados (NF-e de Produto, CT-e, EFD Reinf, SPED Fiscal e Conciliação Bancária).',
    manualModalTitle: 'Manual Detalhado de Utilização',
    privacyModalTitle: 'Política de Privacidade e Proteção de Dados (LGPD)'
  },
  en: {
    portalTitle: 'HelpUS Accounting',
    portalSub: 'Universal NFS-e Management & Batch Download Suite for Accounting Firms',
    badgeNfse: 'National NFS-e Portal (ADN)',
    certAuthTitle: 'Digital Certificate A1 Authentication (.pfx)',
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
    kpiTotalNotes: 'TOTAL INVOICES',
    kpiNotesLabel: 'invoices',
    kpiIssuedVal: 'SERVICES ISSUED (GROSS)',
    kpiReceivedVal: 'SERVICES RECEIVED',
    kpiTotalIss: 'TOTAL ISS TAX',
    kpiIssuedSub: 'NFS-e issued by company',
    kpiReceivedSub: 'NFS-e received from suppliers',
    kpiIssSub: 'Calculated service taxes',
    filterAll: 'All Invoices',
    filterIssued: 'Services Issued',
    filterReceived: 'Services Received',
    searchPlaceholder: 'Search by invoice number, buyer, provider or CNPJ...',
    exportExcel: 'Export Excel Spreadsheet',
    downloadZip: 'Download Full Package (ZIP)',
    generatingZip: 'Generating ZIP package...',
    tableType: 'Type',
    tableNum: 'Invoice No.',
    tableDate: 'Issue Date',
    tablePrestador: 'Service Provider',
    tableTomador: 'Client / Buyer',
    tableValServ: 'Service Value',
    tableIss: 'ISS Tax',
    tableStatus: 'Status',
    tableActions: 'Actions',
    btnViewDanfse: 'View DANFSE',
    emptyState: 'Upload a Digital Certificate A1 (.pfx) above to query and download Service Invoices.',
    modalViewDanfse: 'Preview DANFSE',
    modalXmlSource: 'XML Source',
    footerDevelopedBy: 'Developed by',
    footerRights: 'All rights reserved.',
    footerPortalName: 'HelpUS Accounting Suite — Multi-Tenant NFS-e Engine',

    userManualBtn: 'User Manual',
    privacyPolicyLink: 'Privacy Policy',
    cookieBannerTitle: 'Cookies & Privacy Notice',
    cookieBannerText: 'We only use essential cookies and local storage necessary for secure session management and language preference retention.',
    cookieAcceptBtn: 'Accept & Continue',
    moduleBannerTitle: 'National & Municipal NFS-e Module',
    moduleBannerDesc: 'This tool performs unified capture, query, and batch downloading of Service Invoices (Issued & Received) directly from the National Portal and Municipalities using Digital Certificate A1.',
    moduleBannerFuture: '🚀 Coming Soon: This accounting suite will integrate new modules (Product NF-e, CT-e, EFD Reinf, SPED Fiscal, and Bank Reconciliation).',
    manualModalTitle: 'Detailed User Manual',
    privacyModalTitle: 'Privacy Policy & Data Protection'
  },
  es: {
    portalTitle: 'HelpUS Accounting',
    portalSub: 'Plataforma Universal de Gestión y Descarga de NFS-e para Despachos Contables',
    badgeNfse: 'Portal Nacional NFS-e (ADN)',
    certAuthTitle: 'Autenticación con Certificado Digital A1 (.pfx)',
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
    kpiTotalNotes: 'TOTAL DE FACTURAS',
    kpiNotesLabel: 'facturas',
    kpiIssuedVal: 'SERVICIOS PRESTADOS (BRUTO)',
    kpiReceivedVal: 'SERVICIOS RECIBIDOS',
    kpiTotalIss: 'TOTAL ISS CALCULADO',
    kpiIssuedSub: 'NFS-e emitidas por la empresa',
    kpiReceivedSub: 'NFS-e recibidas de proveedores',
    kpiIssSub: 'Impuestos de servicio calculados',
    filterAll: 'Todas las Facturas',
    filterIssued: 'Servicios Prestados',
    filterReceived: 'Servicios Recibidos',
    searchPlaceholder: 'Buscar por número de factura, cliente, proveedor o CNPJ...',
    exportExcel: 'Exportar Planilla Excel',
    downloadZip: 'Descargar Paquete Completo (ZIP)',
    generatingZip: 'Generando paquete ZIP...',
    tableType: 'Tipo',
    tableNum: 'Nº NFS-e',
    tableDate: 'Fecha Emisión',
    tablePrestador: 'Prestador del Servicio',
    tableTomador: 'Tomador / Cliente',
    tableValServ: 'Valor Servicio',
    tableIss: 'ISS',
    tableStatus: 'Estado',
    tableActions: 'Acciones',
    btnViewDanfse: 'Ver DANFSE',
    emptyState: 'Cargue un Certificado Digital A1 (.pfx) arriba para consultar y descargar Facturas de Servicio.',
    modalViewDanfse: 'Vista Previa DANFSE',
    modalXmlSource: 'XML Fuente',
    footerDevelopedBy: 'Desarrollado por',
    footerRights: 'Todos los derechos reservados.',
    footerPortalName: 'HelpUS Accounting Suite — Multi-Tenant NFS-e Engine',

    userManualBtn: 'Manual de Usuario',
    privacyPolicyLink: 'Política de Privacidad',
    cookieBannerTitle: 'Aviso de Cookies y Privacidad',
    cookieBannerText: 'Utilizamos únicamente cookies esenciales y almacenamiento local estrictamente necesarios para el funcionamiento seguro de la sesión y preferencia de idioma.',
    cookieAcceptBtn: 'Aceptar y Continuar',
    moduleBannerTitle: 'Módulo NFS-e Nacional y Municipal',
    moduleBannerDesc: 'Esta herramienta realiza captura unificada, consulta y descarga en lote de Facturas de Servicio (Emitidas y Recibidas) directamente del Portal Nacional y Municipios mediante Certificado Digital A1.',
    moduleBannerFuture: '🚀 Próximamente: Esta suite contable incluirá nuevos módulos (NF-e de Producto, CT-e, EFD Reinf, SPED Fiscal y Conciliación Bancaria).',
    manualModalTitle: 'Manual Detallado de Usuario',
    privacyModalTitle: 'Política de Privacidad y Protección de Datos'
  }
};
