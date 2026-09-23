import { NextRequest, NextResponse } from 'next/server';
import { parsePfxCertificate } from '@/lib/cert-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pfxBase64, passphrase } = body;

    if (!pfxBase64) {
      return NextResponse.json(
        { success: false, error: 'Selecione um arquivo de certificado digital A1 (.pfx).' },
        { status: 400 }
      );
    }

    const pfxBuffer = Buffer.from(pfxBase64, 'base64');
    const certInfo = parsePfxCertificate(pfxBuffer, passphrase || '');

    return NextResponse.json({
      success: certInfo.valid,
      cert: {
        cnpj: certInfo.cnpj,
        cnpjFormatted: certInfo.cnpjFormatted,
        companyName: certInfo.companyName,
        validFrom: certInfo.validFrom,
        validTo: certInfo.validTo,
        daysRemaining: certInfo.daysRemaining,
        valid: certInfo.valid
      },
      error: certInfo.error
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Erro ao processar certificado PFX.' },
      { status: 500 }
    );
  }
}
