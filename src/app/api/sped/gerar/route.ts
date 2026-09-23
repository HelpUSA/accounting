import { NextRequest, NextResponse } from 'next/server';
import { generateSpedFiscalFile } from '@/lib/sped-generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cnpj = '00000000000000', companyName = 'EMPRESA', items = [] } = body;

    const spedContent = generateSpedFiscalFile(cnpj, companyName, '2026-09', items);

    return new Response(spedContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="SPED_FISCAL_${cnpj}.txt"`
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Erro ao gerar arquivo SPED Fiscal.' },
      { status: 500 }
    );
  }
}
