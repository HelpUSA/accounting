import * as XLSX from 'xlsx';
import { NfseItem } from './xml-parser';

export function generateNfseExcelWorkbook(items: NfseItem[], cnpjClient: string, companyName: string): Buffer {
  const wb = XLSX.utils.book_new();

  const prestadas = items.filter(i => i.tipo === 'prestada');
  const tomadas = items.filter(i => i.tipo === 'tomada');

  const totalPrestadasVal = prestadas.reduce((acc, i) => acc + i.valorServicos, 0);
  const totalPrestadasIss = prestadas.reduce((acc, i) => acc + i.valorIss, 0);

  const totalTomadasVal = tomadas.reduce((acc, i) => acc + i.valorServicos, 0);
  const totalTomadasIss = tomadas.reduce((acc, i) => acc + i.valorIss, 0);

  // 1. Resumo Sheet
  const resumoData = [
    ['RELATÓRIO FISCAL DE NOTAS FISCAIS DE SERVIÇO (NFS-e)'],
    ['Empresa:', companyName],
    ['CNPJ:', cnpjClient],
    ['Data da Consulta:', new Date().toLocaleDateString('pt-BR')],
    [''],
    ['CATEGORIA', 'QUANTIDADE DE NOTAS', 'VALOR TOTAL DOS SERVIÇOS (R$)', 'VALOR TOTAL ISS (R$)'],
    ['Serviços Prestados (Emitidos)', prestadas.length, totalPrestadasVal.toFixed(2), totalPrestadasIss.toFixed(2)],
    ['Serviços Tomados (Recebidos)', tomadas.length, totalTomadasVal.toFixed(2), totalTomadasIss.toFixed(2)],
    ['TOTAL GERAL', items.length, (totalPrestadasVal + totalTomadasVal).toFixed(2), (totalPrestadasIss + totalTomadasIss).toFixed(2)]
  ];
  const wsResumo = XLSX.utils.aoa_to_sheet(resumoData);
  XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo Fiscal');

  // Helper for item rows
  const formatRows = (list: NfseItem[]) => [
    ['Nº NFS-e', 'Cód. Verificação', 'Data Emissão', 'Prestador CNPJ', 'Prestador Nome', 'Tomador CNPJ', 'Tomador Nome', 'Valor Serviço (R$)', 'Alíquota (%)', 'Valor ISS (R$)', 'ISS Retido', 'Valor Líquido (R$)', 'Discriminação dos Serviços'],
    ...list.map(item => [
      item.numero,
      item.codigoVerificacao,
      item.dataEmissao,
      item.prestadorCnpjFormatado,
      item.prestadorNome,
      item.tomadorCnpjFormatado,
      item.tomadorNome,
      item.valorServicos,
      item.aliquota,
      item.valorIss,
      item.issRetido ? 'SIM' : 'NÃO',
      item.valorLiquido,
      item.discriminacao
    ])
  ];

  // 2. Prestadas Sheet
  if (prestadas.length > 0) {
    const wsPrestadas = XLSX.utils.aoa_to_sheet(formatRows(prestadas));
    XLSX.utils.book_append_sheet(wb, wsPrestadas, 'Serviços Prestados');
  }

  // 3. Tomadas Sheet
  if (tomadas.length > 0) {
    const wsTomadas = XLSX.utils.aoa_to_sheet(formatRows(tomadas));
    XLSX.utils.book_append_sheet(wb, wsTomadas, 'Serviços Tomados');
  }

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  return buf;
}
