export function safeNum(val: any, fallback = 0): number {
  if (val === null || val === undefined) return fallback;
  const num = typeof val === 'number' ? val : parseFloat(String(val).replace(',', '.'));
  return isNaN(num) ? fallback : num;
}

export function formatCurrency(val: any): string {
  const num = safeNum(val);
  return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatFixed(val: any, decimals = 2): string {
  const num = safeNum(val);
  return num.toFixed(decimals);
}
