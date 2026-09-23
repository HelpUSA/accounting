import { NextRequest, NextResponse } from 'next/server';
import { parsePfxCertificate } from '@/lib/cert-engine';
import { generateSampleNfeList } from '@/lib/nfe-client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pfxBase64, passphrase } = body;

    let cnpj = '00.000.000/0001-00';
    let companyName = 'EMPRESA USUÁRIA';

    if (pfxBase64) {
      const pfxBuffer = Buffer.from(pfxBase64, 'base64');
      const certInfo = parsePfxCertificate(pfxBuffer, passphrase || '');
      if (certInfo.valid) {
        cnpj = certInfo.cnpjFormatted;
        companyName = certInfo.companyName;
      }
    }

    const items = generateSampleNfeList(cnpj, companyName);

    return NextResponse.json({
      success: true,
      items
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Erro ao consultar NF-e de Mercadorias.' },
      { status: 500 }
    );
  }
}
