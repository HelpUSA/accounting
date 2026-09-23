export type Language = 'pt' | 'en' | 'es';

export interface Translations {
  portalTitle: string;
  portalSub: string;
  badgeNfse: string;
  useFabioCert: string;
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
    portalTitle: 'MFCONT — Contabilidade Empresarial',
    portalSub: 'Um escritório completo de contabilidade para a sua empresa • Portal NFS-e Nacional',
    badgeNfse: 'Portal Nacional NFS-e (ADN)',
    useFabioCert: 'Usar Certificado do Fábio (MFCONT)',
    certAuthTitle: 'Autenticação com Certificado Digital A1 (.pfx)',
    certFileLabel: 'Arquivo do Certificado Digital A1 (.pfx)',
    selectFile: 'Selecionar .pfx',
    noFileSelected: 'Nenhum arquivo selecionado',
    passphraseLabel: 'Senha da Chave Privada',
    passphrasePlaceholder: 'Senha do .pfx',
    validateBtn: 'Validar',
    connectedBadge: 'CONECTADO mTLS',
    validUntil: 'Válido até:',
    daysRemaining: 'dias restantes',
    switchCert: 'Trocar Certificado',
    kpiTotalNotes: 'TOTAL DE NOTAS',
    kpiNotesLabel: 'notas',
    kpiIssuedVal: 'VALOR PRESTADO (BRUTO)',
    kpiReceivedVal: 'VALOR TOMADO (RECEBIDO)',
    kpiTotalIss: 'TOTAL ISS CALCULADO',
    kpiIssuedSub: 'NFS-e emitidas',
    kpiReceivedSub: 'NFS-e tomadas',
    kpiIssSub: 'Impostos de serviço apurados',
    filterAll: 'Todas',
    filterIssued: 'Serviços Prestados',
    filterReceived: 'Serviços Tomados',
    searchPlaceholder: 'Buscar por número, tomador, prestador ou CNPJ...',
    exportExcel: 'Exportar Excel',
    downloadZip: 'Baixar Pacote ZIP',
    generatingZip: 'Gerando ZIP...',
    tableType: 'Tipo',
    tableNum: 'Nº NFS-e',
    tableDate: 'Emissão',
    tablePrestador: 'Prestador',
    tableTomador: 'Tomador',
    tableValServ: 'Valor Serviço',
    tableIss: 'ISS',
    tableStatus: 'Status',
    tableActions: 'Ações',
    btnViewDanfse: 'Ver DANFSE',
    emptyState: 'Nenhuma Nota Fiscal de Serviço encontrada para os filtros selecionados.',
    modalViewDanfse: 'Visualizar DANFSE',
    modalXmlSource: 'XML Fonte',
    footerDevelopedBy: 'Desenvolvido por',
    footerRights: 'Todos os direitos reservados.',
    footerPortalName: 'MFCONT Contabilidade Empresarial LTDA'
  },
  en: {
    portalTitle: 'MFCONT — Corporate Accounting',
    portalSub: 'A complete accounting firm for your business • National NFS-e Portal',
    badgeNfse: 'National NFS-e Portal (ADN)',
    useFabioCert: 'Use Fabio\'s Certificate (MFCONT)',
    certAuthTitle: 'Digital Certificate A1 Authentication (.pfx)',
    certFileLabel: 'Digital Certificate A1 File (.pfx)',
    selectFile: 'Select .pfx',
    noFileSelected: 'No file selected',
    passphraseLabel: 'Private Key Password',
    passphrasePlaceholder: '.pfx password',
    validateBtn: 'Validate',
    connectedBadge: 'CONNECTED mTLS',
    validUntil: 'Valid until:',
    daysRemaining: 'days remaining',
    switchCert: 'Change Certificate',
    kpiTotalNotes: 'TOTAL INVOICES',
    kpiNotesLabel: 'invoices',
    kpiIssuedVal: 'SERVICES ISSUED (GROSS)',
    kpiReceivedVal: 'SERVICES RECEIVED',
    kpiTotalIss: 'TOTAL ISS TAX',
    kpiIssuedSub: 'NFS-e issued',
    kpiReceivedSub: 'NFS-e received',
    kpiIssSub: 'Service taxes calculated',
    filterAll: 'All',
    filterIssued: 'Services Issued',
    filterReceived: 'Services Received',
    searchPlaceholder: 'Search by number, buyer, provider or CNPJ...',
    exportExcel: 'Export Excel',
    downloadZip: 'Download ZIP Package',
    generatingZip: 'Generating ZIP...',
    tableType: 'Type',
    tableNum: 'Invoice No.',
    tableDate: 'Issued Date',
    tablePrestador: 'Provider',
    tableTomador: 'Client / Buyer',
    tableValServ: 'Service Value',
    tableIss: 'ISS Tax',
    tableStatus: 'Status',
    tableActions: 'Actions',
    btnViewDanfse: 'View DANFSE',
    emptyState: 'No Service Invoices found for the selected filters.',
    modalViewDanfse: 'Preview DANFSE',
    modalXmlSource: 'XML Source',
    footerDevelopedBy: 'Developed by',
    footerRights: 'All rights reserved.',
    footerPortalName: 'MFCONT Corporate Accounting LTDA'
  },
  es: {
    portalTitle: 'MFCONT — Contabilidad Empresarial',
    portalSub: 'Una oficina contable completa para su empresa • Portal Nacional NFS-e',
    badgeNfse: 'Portal Nacional NFS-e (ADN)',
    useFabioCert: 'Usar Certificado de Fabio (MFCONT)',
    certAuthTitle: 'Autenticación con Certificado Digital A1 (.pfx)',
    certFileLabel: 'Archivo de Certificado Digital A1 (.pfx)',
    selectFile: 'Seleccionar .pfx',
    noFileSelected: 'Ningún archivo seleccionado',
    passphraseLabel: 'Contraseña de Clave Privada',
    passphrasePlaceholder: 'Contraseña .pfx',
    validateBtn: 'Validar',
    connectedBadge: 'CONECTADO mTLS',
    validUntil: 'Válido hasta:',
    daysRemaining: 'días restantes',
    switchCert: 'Cambiar Certificado',
    kpiTotalNotes: 'TOTAL DE FACTURAS',
    kpiNotesLabel: 'facturas',
    kpiIssuedVal: 'SERVICIOS PRESTADOS (BRUTO)',
    kpiReceivedVal: 'SERVICIOS RECIBIDOS',
    kpiTotalIss: 'TOTAL ISS CALCULADO',
    kpiIssuedSub: 'NFS-e emitidas',
    kpiReceivedSub: 'NFS-e recibidas',
    kpiIssSub: 'Impuestos de servicio calculados',
    filterAll: 'Todas',
    filterIssued: 'Servicios Prestados',
    filterReceived: 'Servicios Recibidos',
    searchPlaceholder: 'Buscar por número, tomador, prestador o CNPJ...',
    exportExcel: 'Exportar Excel',
    downloadZip: 'Descargar Paquete ZIP',
    generatingZip: 'Generando ZIP...',
    tableType: 'Tipo',
    tableNum: 'Nº NFS-e',
    tableDate: 'Emisión',
    tablePrestador: 'Prestador',
    tableTomador: 'Tomador / Cliente',
    tableValServ: 'Valor Servicio',
    tableIss: 'ISS',
    tableStatus: 'Estado',
    tableActions: 'Acciones',
    btnViewDanfse: 'Ver DANFSE',
    emptyState: 'No se encontraron facturas de servicio para los filtros seleccionados.',
    modalViewDanfse: 'Vista Previa DANFSE',
    modalXmlSource: 'XML Fuente',
    footerDevelopedBy: 'Desarrollado por',
    footerRights: 'Todos los derechos reservados.',
    footerPortalName: 'MFCONT Contabilidad Empresarial LTDA'
  }
};
