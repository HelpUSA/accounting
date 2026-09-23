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
    footerPortalName: 'HelpUS Accounting Suite — Multi-Tenant NFS-e Engine'
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
    footerPortalName: 'HelpUS Accounting Suite — Multi-Tenant NFS-e Engine'
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
    footerPortalName: 'HelpUS Accounting Suite — Multi-Tenant NFS-e Engine'
  }
};
