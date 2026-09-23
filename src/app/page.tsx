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
  Sparkles,
  BookOpen,
  MessageCircle,
  ShieldAlert,
  X,
  Layers,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  FilterX
} from 'lucide-react';
import { NfseItem } from '@/lib/xml-parser';
import { generateDanfseHtml } from '@/lib/danfse-generator';
import { formatCurrency, safeNum } from '@/lib/formatters';
import { Language, translations } from '@/lib/i18n';

interface CertMetadata {
  cnpj: string;
  cnpjFormatted: string;
  companyName: string;
  validTo: string;
  daysRemaining: number;
  valid: boolean;
}

type SortField = 'tipo' | 'numero' | 'dataEmissao' | 'prestadorNome' | 'tomadorNome' | 'valorServicos' | 'valorIss';
type SortOrder = 'asc' | 'desc';

export default function AccountingPortalPage() {
  const [lang, setLang] = useState<Language>('pt');
  const t = translations[lang];

  const [certInfo, setCertInfo] = useState<CertMetadata | null>(null);
  const [pfxBase64, setPfxBase64] = useState<string>('');
  const [passphrase, setPassphrase] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [loadingCert, setLoadingCert] = useState<boolean>(false);
  const [certError, setCertError] = useState<string>('');

  // Query & Filter state
  const [filterTipo, setFilterTipo] = useState<'todas' | 'prestada' | 'tomada'>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  const [items, setItems] = useState<NfseItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loadingQuery, setLoadingQuery] = useState<boolean>(false);
  const [downloadingZip, setDownloadingZip] = useState<boolean>(false);

  // Column Sorting state
  const [sortField, setSortField] = useState<SortField>('dataEmissao');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Modal preview state
  const [previewItem, setPreviewItem] = useState<NfseItem | null>(null);
  const [previewTab, setPreviewTab] = useState<'danfse' | 'xml'>('danfse');

  // Modais de informação
  const [showManualModal, setShowManualModal] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);

  // Cookie banner state
  const [cookieConsent, setCookieConsent] = useState<boolean>(true);

  useEffect(() => {
    const consent = localStorage.getItem('helpus_cookie_consent');
    if (!consent) {
      setCookieConsent(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('helpus_cookie_consent', 'true');
    setCookieConsent(true);
  };

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
        dataInicio: startDate,
        dataFim: endDate,
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

  // Quick Date Preset Helpers
  const setPresetThisMonth = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const today = now.toISOString().split('T')[0];
    setStartDate(firstDay);
    setEndDate(today);
  };

  const setPresetLastMonth = () => {
    const now = new Date();
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];
    setStartDate(firstDayLastMonth);
    setEndDate(lastDayLastMonth);
  };

  const setPreset90Days = () => {
    const now = new Date();
    const d90 = new Date();
    d90.setDate(now.getDate() - 90);
    setStartDate(d90.toISOString().split('T')[0]);
    setEndDate(now.toISOString().split('T')[0]);
  };

  const clearDates = () => {
    setStartDate('');
    setEndDate('');
  };

  // Handle column sort toggle
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

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

  // Filtered items view (including date filters)
  const filteredItems = items.filter(item => {
    if (!item) return false;
    if (filterTipo === 'prestada' && item.tipo !== 'prestada') return false;
    if (filterTipo === 'tomada' && item.tipo !== 'tomada') return false;
    
    // Date Filtering
    if (startDate && item.dataEmissao) {
      if (item.dataEmissao < startDate) return false;
    }
    if (endDate && item.dataEmissao) {
      if (item.dataEmissao > endDate) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        (item.numero || '').includes(q) ||
        (item.prestadorNome || '').toLowerCase().includes(q) ||
        (item.tomadorNome || '').toLowerCase().includes(q) ||
        (item.prestadorCnpj || '').includes(q) ||
        (item.tomadorCnpj || '').includes(q) ||
        (item.discriminacao || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sorted items view
  const sortedItems = [...filteredItems].sort((a, b) => {
    let valA: any = a[sortField];
    let valB: any = b[sortField];

    if (sortField === 'valorServicos' || sortField === 'valorIss') {
      valA = safeNum(valA);
      valB = safeNum(valB);
    } else if (sortField === 'numero') {
      valA = parseInt(valA || '0', 10);
      valB = parseInt(valB || '0', 10);
    } else {
      valA = (valA || '').toString().toLowerCase();
      valB = (valB || '').toString().toLowerCase();
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const prestadasList = filteredItems.filter(i => i.tipo === 'prestada');
  const tomadasList = filteredItems.filter(i => i.tipo === 'tomada');

  const totalValPrestado = prestadasList.reduce((acc, i) => acc + safeNum(i.valorServicos), 0);
  const totalValTomado = tomadasList.reduce((acc, i) => acc + safeNum(i.valorServicos), 0);
  const totalIss = filteredItems.reduce((acc, i) => acc + safeNum(i.valorIss), 0);

  const toggleSelectAll = () => {
    if (selectedIds.size === sortedItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedItems.map(i => i.id)));
    }
  };

  const toggleSelectItem = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-600 group-hover:text-amber-400 transition" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-amber-400 font-bold" />
    ) : (
      <ArrowDown className="w-3 h-3 text-amber-400 font-bold" />
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation Bar with Official HelpUS Logo & Header Links */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 sm:gap-4 truncate">
          <img
            src="/helpus-logo.jpg"
            alt="HelpUS Logo"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl object-cover shadow-lg shadow-amber-500/20 border border-amber-500/30 shrink-0"
          />
          <div className="truncate">
            <h1 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2 truncate">
              <span className="truncate">{t.portalTitle}</span>
              <span className="hidden md:flex text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold items-center gap-1 shrink-0">
                <ShieldCheck className="w-3 h-3" /> {t.badgeNfse}
              </span>
            </h1>
            <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
              {t.portalSub}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Botão Manual do Usuário */}
          <button
            onClick={() => setShowManualModal(true)}
            className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{t.userManualBtn}</span>
            <span className="sm:hidden">Manual</span>
          </button>

          {/* Language Switcher (PT / EN / ES) */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-amber-400 mx-1 hidden sm:block" />
            <button
              onClick={() => setLang('pt')}
              className={`px-1.5 sm:px-2 py-0.5 rounded transition cursor-pointer ${
                lang === 'pt' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-1.5 sm:px-2 py-0.5 rounded transition cursor-pointer ${
                lang === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('es')}
              className={`px-1.5 sm:px-2 py-0.5 rounded transition cursor-pointer ${
                lang === 'es' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ES
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 pb-28">
        
        {/* Banner Explicativo de Módulo e Futuras Funcionalidades */}
        <section className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Módulo Ativo
                </span>
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {t.moduleBannerTitle}
                </h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.moduleBannerDesc}
              </p>
              <div className="text-[11px] text-amber-400/90 font-medium flex items-center gap-1.5 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t.moduleBannerFuture}</span>
              </div>
            </div>

            <button
              onClick={() => setShowManualModal(true)}
              className="w-full md:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              {t.userManualBtn}
            </button>
          </div>
        </section>

        {/* Certificate Upload & Auth Card */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 mb-5 gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white">
                  {t.certAuthTitle}
                </h2>
                <p className="text-xs text-slate-400">
                  Insira qualquer certificado digital A1 para consultar e baixar Notas Fiscais de Serviço.
                </p>
              </div>
            </div>

            {certInfo && (
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> {t.connectedBadge}
                </span>
                <button
                  onClick={() => setCertInfo(null)}
                  className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
                >
                  {t.switchCert}
                </button>
              </div>
            )}
          </div>

          {!certInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Step 1: File Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  1. {t.certFileLabel}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pfx,.p12"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cert-file-input"
                  />
                  <label
                    htmlFor="cert-file-input"
                    className="flex items-center justify-between border border-dashed border-slate-700 hover:border-amber-500 bg-slate-950 p-3.5 rounded-xl cursor-pointer transition group"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <UploadCloud className="w-5 h-5 text-amber-400 group-hover:scale-110 transition shrink-0" />
                      <span className="text-xs text-slate-300 font-medium truncate">
                        {selectedFileName || t.noFileSelected}
                      </span>
                    </div>
                    <span className="bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-lg transition shrink-0">
                      {t.selectFile}
                    </span>
                  </label>
                </div>
              </div>

              {/* Step 2: Passphrase & Submit */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  2. {t.passphraseLabel}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                      placeholder={t.passphrasePlaceholder}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs text-white pl-10 pr-4 py-3 rounded-xl outline-none transition"
                    />
                  </div>
                  <button
                    onClick={handleValidateCert}
                    disabled={loadingCert}
                    className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold px-5 py-3 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    {loadingCert ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                    {t.validateBtn}
                  </button>
                </div>
              </div>

              {certError && (
                <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{certError}</span>
                </div>
              )}
            </div>
          ) : (
            /* Active Certificate Details Bar */
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {certInfo.companyName}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    CNPJ: {certInfo.cnpjFormatted}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-400 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    {t.validUntil}
                  </span>
                  <span className="font-semibold text-slate-200">{certInfo.validTo}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    Status
                  </span>
                  <span className="font-bold text-emerald-400">
                    {certInfo.daysRemaining} {t.daysRemaining}
                  </span>
                </div>
                <button
                  onClick={() => fetchNotes()}
                  disabled={loadingQuery}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingQuery ? 'animate-spin' : ''}`} />
                  Atualizar
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Dashboards & Notes Table */}
        {certInfo && (
          <>
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {t.kpiTotalNotes}
                  </span>
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-black text-white">{sortedItems.length}</span>
                  <span className="text-xs text-slate-400 ml-1.5">{t.kpiNotesLabel}</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    {t.kpiIssuedVal}
                  </span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xl font-black text-emerald-400">
                    {formatCurrency(totalValPrestado)}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.kpiIssuedSub}</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    {t.kpiReceivedVal}
                  </span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <ArrowDownLeft className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xl font-black text-amber-400">
                    {formatCurrency(totalValTomado)}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.kpiReceivedSub}</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    {t.kpiTotalIss}
                  </span>
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xl font-black text-indigo-400">
                    {formatCurrency(totalIss)}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.kpiIssSub}</p>
                </div>
              </div>
            </div>

            {/* Filter Toolbar: Tipo + Date Range Filter + Search + Export */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
              
              {/* Row 1: Tipo Filter + Date Range Picker + Presets */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                
                {/* Tipo Filter Tabs */}
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs font-semibold shrink-0">
                  <button
                    onClick={() => setFilterTipo('todas')}
                    className={`flex-1 lg:flex-initial px-3 sm:px-4 py-2 rounded-lg transition cursor-pointer ${
                      filterTipo === 'todas'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.filterAll}
                  </button>
                  <button
                    onClick={() => setFilterTipo('prestada')}
                    className={`flex-1 lg:flex-initial px-3 sm:px-4 py-2 rounded-lg transition cursor-pointer ${
                      filterTipo === 'prestada'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.filterIssued}
                  </button>
                  <button
                    onClick={() => setFilterTipo('tomada')}
                    className={`flex-1 lg:flex-initial px-3 sm:px-4 py-2 rounded-lg transition cursor-pointer ${
                      filterTipo === 'tomada'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.filterReceived}
                  </button>
                </div>

                {/* Date Range Selection Box */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-950 border border-slate-800 p-2 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400 ml-1 shrink-0" />
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-slate-400 font-semibold">{t.startDate}:</span>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-white text-xs px-2 py-1 rounded-lg outline-none focus:border-amber-500 transition font-mono"
                      />
                    </div>
                    <span className="text-slate-500 font-bold">-</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-slate-400 font-semibold">{t.endDate}:</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-white text-xs px-2 py-1 rounded-lg outline-none focus:border-amber-500 transition font-mono"
                      />
                    </div>
                  </div>

                  {/* Date Quick Presets & Clear */}
                  <div className="flex items-center gap-1.5 pt-1 sm:pt-0 sm:border-l border-slate-800 sm:pl-2">
                    <button
                      onClick={setPresetThisMonth}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg border border-slate-700 transition cursor-pointer"
                    >
                      Este Mês
                    </button>
                    <button
                      onClick={setPresetLastMonth}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg border border-slate-700 transition cursor-pointer"
                    >
                      Mês Anterior
                    </button>
                    <button
                      onClick={setPreset90Days}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg border border-slate-700 transition cursor-pointer hidden sm:block"
                    >
                      90 Dias
                    </button>
                    {(startDate || endDate) && (
                      <button
                        onClick={clearDates}
                        title={t.clearDateFilter}
                        className="text-red-400 hover:text-red-300 p-1 rounded-lg transition cursor-pointer"
                      >
                        <FilterX className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 2: Search + Export Buttons */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
                {/* Search input */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-9 pr-4 py-2.5 rounded-xl outline-none focus:border-amber-500 transition"
                  />
                </div>

                {/* Export Buttons */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handleDownloadZip('excel')}
                    disabled={downloadingZip || selectedIds.size === 0}
                    className="flex-1 md:flex-initial bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    {t.exportExcel}
                  </button>
                  <button
                    onClick={() => handleDownloadZip('zip')}
                    disabled={downloadingZip || selectedIds.size === 0}
                    className="flex-1 md:flex-initial bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <Download className={`w-4 h-4 ${downloadingZip ? 'animate-bounce' : ''}`} />
                    {downloadingZip ? t.generatingZip : t.downloadZip}
                  </button>
                </div>
              </div>
            </div>

            {/* Notes Table with Interactive Column Sorting */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 min-w-[850px]">
                  <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 select-none">
                    <tr>
                      <th className="p-3.5 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={sortedItems.length > 0 && selectedIds.size === sortedItems.length}
                          onChange={toggleSelectAll}
                          className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer"
                        />
                      </th>
                      
                      {/* Interactive Sort Column Headers */}
                      <th className="p-3.5">
                        <button
                          onClick={() => handleSort('tipo')}
                          className="flex items-center gap-1.5 hover:text-white transition group cursor-pointer font-bold"
                        >
                          <span>{t.tableType}</span>
                          {renderSortIcon('tipo')}
                        </button>
                      </th>

                      <th className="p-3.5">
                        <button
                          onClick={() => handleSort('numero')}
                          className="flex items-center gap-1.5 hover:text-white transition group cursor-pointer font-bold"
                        >
                          <span>{t.tableNum}</span>
                          {renderSortIcon('numero')}
                        </button>
                      </th>

                      <th className="p-3.5">
                        <button
                          onClick={() => handleSort('dataEmissao')}
                          className="flex items-center gap-1.5 hover:text-white transition group cursor-pointer font-bold"
                        >
                          <span>{t.tableDate}</span>
                          {renderSortIcon('dataEmissao')}
                        </button>
                      </th>

                      <th className="p-3.5">
                        <button
                          onClick={() => handleSort('prestadorNome')}
                          className="flex items-center gap-1.5 hover:text-white transition group cursor-pointer font-bold"
                        >
                          <span>{t.tablePrestador}</span>
                          {renderSortIcon('prestadorNome')}
                        </button>
                      </th>

                      <th className="p-3.5">
                        <button
                          onClick={() => handleSort('tomadorNome')}
                          className="flex items-center gap-1.5 hover:text-white transition group cursor-pointer font-bold"
                        >
                          <span>{t.tableTomador}</span>
                          {renderSortIcon('tomadorNome')}
                        </button>
                      </th>

                      <th className="p-3.5 text-right">
                        <button
                          onClick={() => handleSort('valorServicos')}
                          className="flex items-center gap-1.5 hover:text-white transition group cursor-pointer font-bold ml-auto"
                        >
                          <span>{t.tableValServ}</span>
                          {renderSortIcon('valorServicos')}
                        </button>
                      </th>

                      <th className="p-3.5 text-right">
                        <button
                          onClick={() => handleSort('valorIss')}
                          className="flex items-center gap-1.5 hover:text-white transition group cursor-pointer font-bold ml-auto"
                        >
                          <span>{t.tableIss}</span>
                          {renderSortIcon('valorIss')}
                        </button>
                      </th>

                      <th className="p-3.5 text-center">{t.tableActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {loadingQuery ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-400">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-400 mb-2" />
                          Consultando Portal Nacional (ADN) e Prefeituras...
                        </td>
                      </tr>
                    ) : sortedItems.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-400">
                          Nenhuma Nota Fiscal de Serviço encontrada para os filtros selecionados.
                        </td>
                      </tr>
                    ) : (
                      sortedItems.map((item) => {
                        const isSelected = selectedIds.has(item.id);
                        return (
                          <tr
                            key={item.id}
                            className={`hover:bg-slate-800/50 transition ${
                              isSelected ? 'bg-amber-500/5' : ''
                            }`}
                          >
                            <td className="p-3.5 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectItem(item.id)}
                                className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer"
                              />
                            </td>
                            <td className="p-3.5">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  item.tipo === 'prestada'
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                }`}
                              >
                                {item.tipo === 'prestada' ? 'PRESTADA' : 'TOMADA'}
                              </span>
                            </td>
                            <td className="p-3.5 font-mono font-bold text-white">{item.numero}</td>
                            <td className="p-3.5 font-mono text-slate-400">{item.dataEmissao}</td>
                            <td className="p-3.5 max-w-[200px] truncate">
                              <div className="font-semibold text-slate-200 truncate">
                                {item.prestadorNome}
                              </div>
                              <div className="text-[10px] font-mono text-slate-500">
                                CNPJ: {item.prestadorCnpj}
                              </div>
                            </td>
                            <td className="p-3.5 max-w-[200px] truncate">
                              <div className="font-semibold text-slate-200 truncate">
                                {item.tomadorNome}
                              </div>
                              <div className="text-[10px] font-mono text-slate-500">
                                CNPJ: {item.tomadorCnpj}
                              </div>
                            </td>
                            <td className="p-3.5 text-right font-mono font-bold text-slate-100">
                              {formatCurrency(safeNum(item.valorServicos))}
                            </td>
                            <td className="p-3.5 text-right font-mono text-indigo-400 font-semibold">
                              {formatCurrency(safeNum(item.valorIss))}
                            </td>
                            <td className="p-3.5 text-center">
                              <button
                                onClick={() => {
                                  setPreviewItem(item);
                                  setPreviewTab('danfse');
                                }}
                                className="bg-slate-800 hover:bg-slate-700 text-amber-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 mx-auto cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                {t.btnViewDanfse}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {!certInfo && (
          <section className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 sm:p-12 text-center space-y-4">
            <div className="h-14 w-14 sm:h-16 sm:w-16 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto">
              <UploadCloud className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                Pronto para consultar suas NFS-e?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.emptyState}
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
                <span className="font-bold text-white text-sm sm:text-base">
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
                  srcDoc={generateDanfseHtml(previewItem)}
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

      {/* Modal: Manual do Usuário */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-sm sm:text-base">
                  {t.manualModalTitle}
                </h3>
              </div>
              <button
                onClick={() => setShowManualModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs text-slate-300 leading-relaxed">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-xs shrink-0">1</span>
                  Autenticação com Certificado Digital A1
                </h4>
                <p>
                  No card superior, clique em <strong>Selecionar arquivo .pfx</strong> e escolha o certificado digital A1 da sua empresa ou cliente (.pfx ou .p12). Digite a senha da chave privada correspondente e clique no botão <strong>Autenticar & Conectar</strong>.
                </p>
              </div>

              <div className="space-y-2 border-b border-slate-800 pb-4">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-xs shrink-0">2</span>
                  Consulta Automática de Notas Prestadas e Tomadas
                </h4>
                <p>
                  Após a validação, a plataforma conecta-se de forma segura (mTLS) ao Portal Nacional da NFS-e (ADN) e às prefeituras integradas, exibindo o montante bruto de serviços prestados, tomados e os impostos de ISS apurados.
                </p>
              </div>

              <div className="space-y-2 border-b border-slate-800 pb-4">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-xs shrink-0">3</span>
                  Filtros por Período de Datas, Ordenação e Pesquisa
                </h4>
                <p>
                  Utilize os campos de <strong>Data Inicial</strong> e <strong>Data Final</strong> (ou botões de atalho <strong>Este Mês</strong>, <strong>Mês Anterior</strong>, <strong>90 Dias</strong>) para filtrar o período desejado. Clique nos cabeçalhos de coluna para ordenar a tabela e use a barra de busca por CNPJ ou nome.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-xs shrink-0">4</span>
                  Download em Lote para ZIP e Planilha Excel
                </h4>
                <p>
                  Selecione as notas desejadas nas caixas de seleção. Clique em <strong>Exportar Planilha Excel</strong> para gerar um resumo financeiro consolidado (.xlsx) ou em <strong>Baixar Pacote Completo (ZIP)</strong> para obter todos os XMLs originais e espelhos DANFSE em HTML.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setShowManualModal(false)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Política de Privacidade */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm sm:text-base">
                  {t.privacyModalTitle}
                </h3>
              </div>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs text-slate-300 leading-relaxed">
              <h4 className="font-bold text-white text-sm">1. Compromisso com a Segurança e LGPD</h4>
              <p>
                A <strong>HelpUS Technology</strong> prioriza a privacidade e a segurança dos dados fiscais dos seus clientes e parceiros. Todas as operações seguem rigorosamente a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
              </p>

              <h4 className="font-bold text-white text-sm">2. Processamento Efêmero do Certificado Digital A1</h4>
              <p>
                O seu Certificado Digital A1 (.pfx) e a senha da chave privada enviados nesta aplicação são processados exclusivamente na memória RAM durante a requisição de consulta mTLS. <strong>Nenhuma chave privada, certificado ou senha é armazenada em disco ou em banco de dados permanente.</strong>
              </p>

              <h4 className="font-bold text-white text-sm">3. Criptografia em Trânsito</h4>
              <p>
                Toda a transmissão de dados entre o seu navegador, os servidores da Vercel e o Ambiente de Distribuição Nacional (ADN) é protegida com criptografia TLS 1.3 de ponta a ponta.
              </p>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Consent Banner */}
      {!cookieConsent && (
        <div className="fixed bottom-16 left-4 right-4 sm:right-auto sm:left-6 sm:max-w-md z-50 bg-slate-900 border border-slate-700 shadow-2xl p-4 rounded-2xl flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-white text-xs">
                {t.cookieBannerTitle}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {t.cookieBannerText}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-800">
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="text-[11px] text-slate-400 hover:text-white underline px-2 cursor-pointer"
            >
              {t.privacyPolicyLink}
            </button>
            <button
              onClick={handleAcceptCookies}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-1.5 rounded-xl text-xs transition cursor-pointer"
            >
              {t.cookieAcceptBtn}
            </button>
          </div>
        </div>
      )}

      {/* Floating Animated WhatsApp Button */}
      <a
        href="https://wa.me/5583998721848?text=Ol%C3%A1%2C%20gostaria%20de%20ajuda%20com%20o%20HelpUS%20Accounting"
        target="_blank"
        rel="noopener noreferrer"
        title="Falar no WhatsApp (83) 99872-1848"
        className="fixed bottom-16 right-4 sm:right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3 sm:p-3.5 rounded-full shadow-2xl shadow-emerald-500/40 transition-transform transform hover:scale-110 animate-bounce flex items-center justify-center group cursor-pointer"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 fill-slate-950" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-black text-slate-950 ml-0 group-hover:ml-2">
          (83) 99872-1848
        </span>
      </a>

      {/* Fixed Footer (Rodapé Fixo) with Official HelpUS Branding */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-800 bg-slate-900/90 backdrop-blur py-2.5 sm:py-3 px-4 sm:px-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] flex-wrap justify-center">
            <span className="font-semibold text-slate-300">{t.footerPortalName}</span>
            <span>•</span>
            <span>© 2026 {t.footerRights}</span>
            <span>•</span>
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="text-slate-400 hover:text-slate-200 underline cursor-pointer"
            >
              {t.privacyPolicyLink}
            </button>
          </div>

          <a
            href="https://helpusbr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 px-3.5 py-1 rounded-full transition group shrink-0"
          >
            <span className="text-[10px] sm:text-[11px] text-slate-400 group-hover:text-slate-200 transition">
              {t.footerDevelopedBy}
            </span>
            <div className="flex items-center gap-1.5 font-bold text-white text-xs">
              <img
                src="/helpus-logo.jpg"
                alt="HelpUS Logo"
                className="h-4 w-4 rounded-md object-cover"
              />
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
