import { NextRequest, NextResponse } from 'next/server';
import AdmZip from 'adm-zip';
import { NfseItem } from '@/lib/xml-parser';
import { generateDanfseHtml } from '@/lib/danfse-generator';
import { generateNfseExcelWorkbook } from '@/lib/excel-exporter';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, format = 'zip', cnpj, companyName } = body as {
      items: NfseItem[];
      format: 'zip' | 'excel';
      cnpj: string;
      companyName: string;
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Nenhuma NFS-e selecionada para download.' },
        { status: 400 }
      );
    }

    if (format === 'excel') {
      const excelBuf = generateNfseExcelWorkbook(items, cnpj, companyName);
      return new NextResponse(new Uint8Array(excelBuf), {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="NFSe-Relatorio-${cnpj || 'FabioContabilidade'}.xlsx"`
        }
      });
    }

    // Default ZIP generation with XMLs, DANFSE HTML/PDFs, and Excel Summary
    const zip = new AdmZip();

    // 1. Add XMLs and DANFSE HTMLs in organized folders
    items.forEach(item => {
      const isPrest = item.tipo === 'prestada';
      const folderName = isPrest ? 'Servicos_Prestados' : 'Servicos_Tomados';
      const filenameBase = `${folderName}/NFSe_${item.numero}_${item.prestadorCnpj}_${item.dataEmissao}`;

      // Add XML
      const xmlContent = item.xmlRaw || `<NFSe><nNFSe>${item.numero}</nNFSe></NFSe>`;
      zip.addFile(`${filenameBase}.xml`, Buffer.from(xmlContent, 'utf-8'));

      // Add DANFSE HTML
      const danfseHtml = generateDanfseHtml(item);
      zip.addFile(`${filenameBase}_DANFSE.html`, Buffer.from(danfseHtml, 'utf-8'));
    });

    // 2. Add Summary Excel Sheet to the root of ZIP
    const excelBuf = generateNfseExcelWorkbook(items, cnpj, companyName);
    zip.addFile(`Resumo_Fiscal_NFSe_${cnpj || 'FabioContabilidade'}.xlsx`, excelBuf);

    const zipBuffer = zip.toBuffer();

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="NFSe_Pacote_Completo_${cnpj || 'FabioContabilidade'}.zip"`
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Erro ao gerar pacote de download.' },
      { status: 500 }
    );
  }
}
