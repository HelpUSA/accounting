import { NextRequest, NextResponse } from 'next/server';
import { generateReinfEvents } from '@/lib/reinf-generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items = [], cnpj = '00.000.000/0001-00', companyName = 'Empresa' } = body;

    const summary = generateReinfEvents(items, cnpj, companyName);

    return NextResponse.json({
      success: true,
      summary
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Erro ao gerar eventos EFD-Reinf.' },
      { status: 500 }
    );
  }
}
