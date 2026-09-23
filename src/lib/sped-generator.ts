import { NfseItem } from './xml-parser';

export function generateSpedFiscalFile(
  cnpj: string,
  companyName: string,
  periodoStr: string,
  items: NfseItem[]
): string {
  const cleanCnpj = cnpj.replace(/\D/g, '') || '00000000000000';
  const now = new Date();
  const dtIni = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}01`;
  const dtFin = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}30`;

  let lines: string[] = [];

  // BLOCO 0: ABERTURA E IDENTIFICAÇÃO
  lines.push(`|0000|017|0|${dtIni}|${dtFin}|${companyName.substring(0, 60)}|${cleanCnpj}||PB||||0001|||A|1|`);
  lines.push(`|0001|0|`);
  lines.push(`|0005|RESPONSAVEL FISCAL|${cleanCnpj}|58000000|RUA PRINCIPAL|100||CENTRO|83998721848||financeiro@helpusbr.com|`);

  // BLOCO C: DOCUMENTOS FISCAIS DE MERCADORIAS (NF-e)
  lines.push(`|C001|0|`);
  items.forEach((item, idx) => {
    const num = item.numero || String(idx + 100);
    const val = (item.valorServicos || 100).toFixed(2);
    lines.push(`|C100|0|1|${cleanCnpj}|55|00|1|${num}|352609${cleanCnpj}55001000${num}12345678|${dtIni}|${dtIni}|${val}|0|0|0|${val}|0|0|0|0|0|0|0|0|0|`);
  });

  // BLOCO D: DOCUMENTOS FISCAIS DE SERVIÇOS DE TRANSPORTE (CT-e)
  lines.push(`|D001|0|`);

  // BLOCO E: APURAÇÃO DO ICMS E IPI
  lines.push(`|E001|0|`);
  lines.push(`|E100|${dtIni}|${dtFin}|`);

  // BLOCO 9: CONTROLE E ENCERRAMENTO
  lines.push(`|9001|0|`);
  lines.push(`|9900|0000|1|`);
  lines.push(`|9900|0001|1|`);
  lines.push(`|9900|C001|1|`);
  lines.push(`|9900|D001|1|`);
  lines.push(`|9900|E001|1|`);
  lines.push(`|9900|9001|1|`);
  lines.push(`|9900|9999|1|`);
  lines.push(`|9999|${lines.length + 1}|`);

  return lines.join('\r\n');
}
