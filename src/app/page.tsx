'use client';

import React, { useState, useEffect } from 'react';
import {
  FileCheck2,
  ShieldCheck,
  Building2,
  Download,
  FileSpreadsheet,
  Search,
  RefreshCw,
  Eye,
  AlertCircle,
  KeyRound,
  UploadCloud,
  ArrowUpRight,
  ArrowDownLeft,
  Lock,
  Globe,
  Sparkles
} from 'lucide-react';
import { NfseItem } from '@/lib/xml-parser';
import { Language, translations } from '@/lib/i18n';

interface CertMetadata {
  cnpj: string;
  cnpjFormatted: string;
  companyName: string;
  validTo: string;
  daysRemaining: number;
  valid: boolean;
}

export default function AccountingPortalPage() {
  const [lang, setLang] = useState<Language>('pt');
  const t = translations[lang];

  const [certInfo, setCertInfo] = useState<CertMetadata | null>(null);
  const [pfxBase64, setPfxBase64] = useState<string>('');
  const [passphrase, setPassphrase] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [loadingCert, setLoadingCert] = useState<boolean>(false);
  const [certError, setCertError] = useState<string>('');

  // Query state
  const [filterTipo, setFilterTipo] = useState<'todas' | 'prestada' | 'tomada'>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [items, setItems] = useState<NfseItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loadingQuery, setLoadingQuery] = useState<boolean>(false);
  const [downloadingZip, setDownloadingZip] = useState<boolean>(false);

  // Modal preview state
  const [previewItem, setPreviewItem] = useState<NfseItem | null>(null);
  const [previewTab, setPreviewTab] = useState<'danfse' | 'xml'>('danfse');

  // Handle user upload of PFX file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const b64 = evt.target?.result?.toString().split(',')[1] || '';
      setPfxBase64(b64);
    };
    reader.readAsDataURL(file);
  };

  const handleValidateCert = async () => {
    if (!pfxBase64) {
      setCertError('Selecione um arquivo .pfx de certificado digital A1.');
      return;
    }
    setLoadingCert(true);
    setCertError('');
    try {
      const res = await fetch('/api/nfse/cert-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pfxBase64,
          passphrase
        }),
      });
      const data = await res.json();
      if (data.success && data.cert) {
        setCertInfo(data.cert);
        fetchNotes({ pfxBase64, passphrase });
      } else {
        setCertError(data.error || 'Senha incorreta ou certificado inválido.');
      }
    } catch (err: any) {
      setCertError('Erro ao processar certificado: ' + err.message);
    } finally {
      setLoadingCert(false);
    }
  };

  // Fetch Notes
  const fetchNotes = async (paramsOverride?: any) => {
    setLoadingQuery(true);
    try {
      const payload = {
        pfxBase64,
        passphrase,
        tipo: filterTipo,
        ...paramsOverride
      };
      const res = await fetch('/api/nfse/consultar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.queryResult) {
        setItems(data.queryResult.items || []);
        setSelectedIds(new Set((data.queryResult.items || []).map((i: NfseItem) => i.id)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQuery(false);
    }
  };

  useEffect(() => {
    if (certInfo) {
      fetchNotes();
    }
  }, [filterTipo]);

  // Download ZIP / Excel
  const handleDownloadZip = async (format: 'zip' | 'excel' = 'zip') => {
    const selectedItems = items.filter(i => selectedIds.has(i.id));
    if (selectedItems.length === 0) {
      alert('Selecione ao menos uma NFS-e para realizar o download.');
      return;
    }
    setDownloadingZip(true);
    try {
      const res = await fetch('/api/nfse/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: selectedItems,
          format,
          cnpj: certInfo?.cnpj || 'Empresa',
          companyName: certInfo?.companyName || 'Empresa'
        }),
      });

      if (!res.ok) throw new Error('Falha ao gerar o arquivo de download.');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = format === 'excel'
        ? `NFSe_Relatorio_${certInfo?.cnpj || 'Accounting'}.xlsx`
        : `NFSe_Pacote_Completo_${certInfo?.cnpj || 'Accounting'}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: any) {
      alert('Erro no download: ' + err.message);
    } finally {
      setDownloadingZip(false);
    }
  };

  // Filtered items view
  const filteredItems = items.filter(item => {
    if (filterTipo === 'prestada' && item.tipo !== 'prestada') return false;
    if (filterTipo === 'tomada' && item.tipo !== 'tomada') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.numero.includes(q) ||
        item.prestadorNome.toLowerCase().includes(q) ||
        item.tomadorNome.toLowerCase().includes(q) ||
        item.prestadorCnpj.includes(q) ||
        item.tomadorCnpj.includes(q) ||
        item.discriminacao.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const prestadasList = filteredItems.filter(i => i.tipo === 'prestada');
  const tomadasList = filteredItems.filter(i => i.tipo === 'tomada');

  const totalValPrestado = prestadasList.reduce((acc, i) => acc + i.valorServicos, 0);
  const totalValTomado = tomadasList.reduce((acc, i) => acc + i.valorServicos, 0);
  const totalIss = filteredItems.reduce((acc, i) => acc + i.valorIss, 0);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map(i => i.id)));
    }
  };

  const toggleSelectItem = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation Bar with HelpUS Accounting Branding */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl tracking-tighter">
            H
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
              {t.portalTitle}
              <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {t.badgeNfse}
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              {t.portalSub}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher (PT / EN / ES) */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-amber-400 mx-1.5" />
            <button
              onClick={() => setLang('pt')}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${
                lang === 'pt' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${
                lang === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('es')}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${
                lang === 'es' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ES
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Universal Certificate Upload Card */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  {t.certAuthTitle}
                </div>
                <span className="text-[11px] text-slate-400 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-full">
                  💡 Suporta qualquer Certificado Digital A1 (.pfx)
                </span>
              </div>

              {!certInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 relative">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      {t.certFileLabel}
                    </label>
                    <div className="flex items-center border border-slate-700 bg-slate-950 rounded-xl px-3 py-2 text-sm text-slate-300">
                      <input
                        type="file"
                        accept=".pfx,.p12"
                        onChange={handleFileChange}
                        className="hidden"
                        id="pfx-file-input"
                      />
                      <label
                        htmlFor="pfx-file-input"
                        className="cursor-pointer flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-xs bg-amber-950/40 border border-amber-800/60 px-3 py-1.5 rounded-lg mr-3 shrink-0"
                      >
                        <UploadCloud className="w-4 h-4" /> {t.selectFile}
                      </label>
                      <span className="truncate text-xs text-slate-400">
                        {selectedFileName || t.noFileSelected}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      {t.passphraseLabel}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder={t.passphrasePlaceholder}
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                      <button
                        onClick={handleValidateCert}
                        disabled={loadingCert || !pfxBase64}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/20"
                      >
                        {loadingCert ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                        {t.validateBtn}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        {certInfo.companyName}
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                          {t.connectedBadge}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-4">
                        <span>CNPJ: <strong className="text-slate-200">{certInfo.cnpjFormatted}</strong></span>
                        <span>{t.validUntil} <strong className="text-slate-200">{certInfo.validTo}</strong></span>
                        <span className="text-emerald-400">({certInfo.daysRemaining} {t.daysRemaining})</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCertInfo(null);
                      setSelectedFileName('');
                      setPfxBase64('');
                      setPassphrase('');
                      setItems([]);
                    }}
                    className="text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800 px-3.5 py-1.5 rounded-lg transition self-start md:self-auto cursor-pointer"
                  >
                    {t.switchCert}
                  </button>
                </div>
              )}

              {certError && (
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  {certError}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        {certInfo ? (
          <>
            {/* KPI Cards */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
                  <span>{t.kpiTotalNotes}</span>
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {filteredItems.length} <span className="text-xs font-normal text-slate-400">{t.kpiNotesLabel}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {prestadasList.length} prestadas • {tomadasList.length} tomadas
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
                  <span>{t.kpiIssuedVal}</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-emerald-400">
                  R$ {totalValPrestado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {prestadasList.length} {t.kpiIssuedSub}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
                  <span>{t.kpiReceivedVal}</span>
                  <ArrowDownLeft className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  R$ {totalValTomado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {tomadasList.length} {t.kpiReceivedSub}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
                  <span>{t.kpiTotalIss}</span>
                  <Lock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-300">
                  R$ {totalIss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {t.kpiIssSub}
                </div>
              </div>
            </section>

            {/* Filter & Action Controls */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl w-full md:w-auto">
                <button
                  onClick={() => setFilterTipo('todas')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    filterTipo === 'todas'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.filterAll} ({items.length})
                </button>
                <button
                  onClick={() => setFilterTipo('prestada')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    filterTipo === 'prestada'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.filterIssued} ({items.filter(i => i.tipo === 'prestada').length})
                </button>
                <button
                  onClick={() => setFilterTipo('tomada')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    filterTipo === 'tomada'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.filterReceived} ({items.filter(i => i.tipo === 'tomada').length})
                </button>
              </div>

              {/* Search Input */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => fetchNotes()}
                  disabled={loadingQuery}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition cursor-pointer"
                  title="Atualizar busca"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingQuery ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={() => handleDownloadZip('excel')}
                  disabled={downloadingZip}
                  className="flex items-center gap-2 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/80 text-emerald-300 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  {t.exportExcel}
                </button>

                <button
                  onClick={() => handleDownloadZip('zip')}
                  disabled={downloadingZip}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {downloadingZip ? t.generatingZip : `${t.downloadZip} (${selectedIds.size})`}
                </button>
              </div>
            </section>

            {/* NFS-e Table */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-4 w-10">
                        <input
                          type="checkbox"
                          checked={selectedIds.size === filteredItems.length && filteredItems.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer"
                        />
                      </th>
                      <th className="p-4">{t.tableType}</th>
                      <th className="p-4">{t.tableNum}</th>
                      <th className="p-4">{t.tableDate}</th>
                      <th className="p-4">{t.tablePrestador}</th>
                      <th className="p-4">{t.tableTomador}</th>
                      <th className="p-4 text-right">{t.tableValServ}</th>
                      <th className="p-4 text-right">{t.tableIss}</th>
                      <th className="p-4 text-center">{t.tableStatus}</th>
                      <th className="p-4 text-center">{t.tableActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="p-12 text-center text-slate-500">
                          {t.emptyState}
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item) => {
                        const isPrest = item.tipo === 'prestada';
                        const isSelected = selectedIds.has(item.id);
                        return (
                          <tr
                            key={item.id}
                            className={`hover:bg-slate-800/50 transition ${
                              isSelected ? 'bg-amber-950/20' : ''
                            }`}
                          >
                            <td className="p-4">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectItem(item.id)}
                                className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer"
                              />
                            </td>
                            <td className="p-4">
                              <span
                                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                                  isPrest
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                    : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                }`}
                              >
                                {isPrest ? (
                                  <>
                                    <ArrowUpRight className="w-3 h-3" /> PRESTADA
                                  </>
                                ) : (
                                  <>
                                    <ArrowDownLeft className="w-3 h-3" /> TOMADA
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="p-4 font-mono font-bold text-white">
                              {item.numero}
                              <div className="text-[10px] text-slate-500 font-normal">
                                Cod: {item.codigoVerificacao}
                              </div>
                            </td>
                            <td className="p-4 text-slate-300">{item.dataEmissao}</td>
                            <td className="p-4">
                              <div className="font-semibold text-slate-200 truncate max-w-[200px]">
                                {item.prestadorNome}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                CNPJ: {item.prestadorCnpjFormatado}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-semibold text-slate-200 truncate max-w-[200px]">
                                {item.tomadorNome}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                CNPJ: {item.tomadorCnpjFormatado}
                              </div>
                            </td>
                            <td className="p-4 text-right font-bold text-white">
                              R$ {item.valorServicos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="p-4 text-right text-slate-300">
                              R$ {item.valorIss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              <div className="text-[10px] text-slate-500">({item.aliquota}%)</div>
                            </td>
                            <td className="p-4 text-center">
                              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-md font-semibold">
                                {item.status}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => {
                                  setPreviewItem(item);
                                  setPreviewTab('danfse');
                                }}
                                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs px-3 py-1.5 rounded-lg transition font-medium cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" /> {t.btnViewDanfse}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          /* Empty Initial State Banner */
          <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-12 text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-lg font-bold text-white">
                Pronto para consultar as Notas Fiscais
              </h3>
              <p className="text-xs text-slate-400">
                Selecione o arquivo do Certificado Digital A1 (.pfx) do cliente acima, informe a senha e clique em <strong>Autenticar & Conectar</strong> para baixar as NFS-e prestadas e tomadas.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* DANFSE / XML Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white text-base">
                  NFS-e Nº {previewItem.numero}
                </span>
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                  {previewItem.tipo === 'prestada' ? 'PRESTADA' : 'TOMADA'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewTab('danfse')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    previewTab === 'danfse' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.modalViewDanfse}
                </button>
                <button
                  onClick={() => setPreviewTab('xml')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    previewTab === 'xml' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.modalXmlSource}
                </button>

                <button
                  onClick={() => setPreviewItem(null)}
                  className="text-slate-400 hover:text-white text-xl font-bold ml-4 px-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-950">
              {previewTab === 'danfse' ? (
                <iframe
                  srcDoc={require('@/lib/danfse-generator').generateDanfseHtml(previewItem)}
                  className="w-full h-[600px] rounded-xl border border-slate-800 bg-white"
                  title="DANFSE Preview"
                />
              ) : (
                <pre className="text-xs font-mono text-emerald-400 bg-slate-900 p-4 rounded-xl border border-slate-800 overflow-x-auto whitespace-pre-wrap">
                  {previewItem.xmlRaw}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer with HelpUS Technology Branding */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 px-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">{t.footerPortalName}</span>
            <span>•</span>
            <span>© 2026 {t.footerRights}</span>
          </div>

          <a
            href="https://helpusbr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 px-3.5 py-1.5 rounded-full transition group"
          >
            <span className="text-slate-400 group-hover:text-slate-200 transition">
              {t.footerDevelopedBy}
            </span>
            <div className="flex items-center gap-1.5 font-bold text-white">
              <span className="h-4 w-4 rounded-md bg-amber-500 flex items-center justify-center text-[10px] text-slate-950">
                H
              </span>
              <span className="text-amber-400 group-hover:text-amber-300 transition">
                HelpUS Technology
              </span>
            </div>
          </a>
        </div>
      </footer>
    </div>
  );
}
