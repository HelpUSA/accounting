'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  BarChart3,
  TrendingUp,
  Activity,
  Users,
  Download,
  FileCheck2,
  AlertCircle,
  X,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';

interface AdminAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'pt' | 'en' | 'es';
}

interface AuditLogItem {
  id: string;
  timestamp: string;
  userEmail: string;
  companyName: string;
  cnpj: string;
  module: string;
  action: string;
  count: number;
  status: '200 OK' | '201 Created' | '400 Error';
  latencyMs: number;
}

export default function AdminAreaModal({ isOpen, onClose, lang = 'pt' }: AdminAreaModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(false);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  // Google OAuth Popup & Loading states
  const [showGoogleAccountPicker, setShowGoogleAccountPicker] = useState<boolean>(false);
  const [googleAuthLoading, setGoogleAuthLoading] = useState<boolean>(false);
  const [googleAuthError, setGoogleAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'audit' | 'modules'>('overview');
  const [filterModule, setFilterModule] = useState<string>('todos');

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      setCaptchaVerified(false);
      setCaptchaError(false);
      setShowGoogleAccountPicker(false);
      setGoogleAuthError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Captcha Click
  const handleCaptchaClick = () => {
    if (captchaVerified) return;
    setCaptchaLoading(true);
    setCaptchaError(false);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaVerified(true);
    }, 600);
  };

  // Trigger Google Login Button Click
  const handleGoogleLoginButtonClick = () => {
    if (!captchaVerified) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setGoogleAuthError(null);
    setShowGoogleAccountPicker(true);
  };

  // Process Account Selection in Google OAuth Popup
  const handleSelectGoogleAccount = (selectedEmail: string) => {
    setGoogleAuthLoading(true);
    setGoogleAuthError(null);

    setTimeout(() => {
      setGoogleAuthLoading(false);
      if (selectedEmail === 'helpus.ecommerce@gmail.com') {
        setShowGoogleAccountPicker(false);
        setIsAuthenticated(true);
      } else {
        setGoogleAuthError(`A conta "${selectedEmail}" não possui permissões de Superadmin. Apenas helpus.ecommerce@gmail.com é autorizado.`);
      }
    }, 800);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCaptchaVerified(false);
    setCaptchaError(false);
    setShowGoogleAccountPicker(false);
    setGoogleAuthError(null);
  };

  // Mock Audit Logs
  const auditLogs: AuditLogItem[] = [
    {
      id: 'LOG-9821',
      timestamp: '2026-09-26 14:32:05',
      userEmail: 'helpus.ecommerce@gmail.com',
      companyName: 'OFICIO DE REGISTRO CIVIL E TABELIONATO DE NOTAS',
      cnpj: '04.123.456/0001-89',
      module: 'NFS-e (Serviços)',
      action: 'Download Lote ZIP (120 XMLs + DANFSEs)',
      count: 120,
      status: '200 OK',
      latencyMs: 340
    },
    {
      id: 'LOG-9820',
      timestamp: '2026-09-26 14:15:22',
      userEmail: 'contato@escritoriocontabil.com.br',
      companyName: 'DM SERVICOS MEDICOS E HOSPITALARES LTDA',
      cnpj: '12.876.543/0001-10',
      module: 'EFD-Reinf',
      action: 'Geração de Lote R-4020 Retenções',
      count: 45,
      status: '200 OK',
      latencyMs: 180
    },
    {
      id: 'LOG-9819',
      timestamp: '2026-09-26 13:50:41',
      userEmail: 'gestao@postodecombustiveis.com.br',
      companyName: 'POSTO DE COMBUSTIVEIS E CONVENIENCIA LTDA',
      cnpj: '45.321.987/0001-55',
      module: 'NF-e (Produtos)',
      action: 'Manifestação do Destinatário & Download',
      count: 88,
      status: '200 OK',
      latencyMs: 290
    },
    {
      id: 'LOG-9818',
      timestamp: '2026-09-26 13:10:14',
      userEmail: 'logistica@transporteexpress.com.br',
      companyName: 'TRANSPORTE EXPRESS LOGISTICA E CARGAS SA',
      cnpj: '33.555.777/0001-22',
      module: 'CT-e (Fretes)',
      action: 'Consulta DACTEs e Conhecimentos',
      count: 32,
      status: '200 OK',
      latencyMs: 210
    },
    {
      id: 'LOG-9817',
      timestamp: '2026-09-26 12:45:00',
      userEmail: 'financeiro@industriadealimentos.com.br',
      companyName: 'INDUSTRIA E COMERCIO DE ALIMENTOS LTDA',
      cnpj: '78.999.111/0001-00',
      module: 'SPED Fiscal',
      action: 'Conversão de Registros para Arquivo .TXT PVA',
      count: 310,
      status: '200 OK',
      latencyMs: 410
    },
    {
      id: 'LOG-9816',
      timestamp: '2026-09-26 11:30:19',
      userEmail: 'helpus.ecommerce@gmail.com',
      companyName: 'HELPUS MULTISERVICOS E TECNOLOGIA LTDA',
      cnpj: '16.235.346/0001-76',
      module: 'Conciliação OFX',
      action: 'Importação de Extrato Bancário e Matching',
      count: 154,
      status: '200 OK',
      latencyMs: 150
    }
  ];

  const filteredLogs = auditLogs.filter(log => {
    if (filterModule === 'todos') return true;
    return log.module.toLowerCase().includes(filterModule.toLowerCase());
  });

  // Export Telemetry Report
  const handleExportTelemetry = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,DataHora,Usuario,Empresa,CNPJ,Modulo,Acao,Quantidade,Status,LatenciaMs\n"
      + auditLogs.map(l => `${l.id},"${l.timestamp}","${l.userEmail}","${l.companyName}","${l.cnpj}","${l.module}","${l.action}",${l.count},"${l.status}",${l.latencyMs}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `HelpUS_Telemetria_Relatorio_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto text-slate-100 relative">
        
        {/* Modal Header */}
        <div className="bg-slate-950/90 border-b border-slate-800 px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base sm:text-lg tracking-wide">
                  Área Administrativa & Telemetria HelpUS
                </h3>
                {isAuthenticated && (
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Superadmin
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Painel Oficial de Controle de Volumetria, Monitoramento e Gestão de Uso da Suite Contábil
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {!isAuthenticated ? (
            /* ================= STATE 1: UNAUTHENTICATED EXPLANATORY & AUTHENTICATION SCREEN ================= */
            <div className="space-y-6 max-w-3xl mx-auto py-2">
              
              {/* Explanatory Hero Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-inner">
                <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-1">
                  <Lock className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">
                  Acesso Restrito: Área Administrativa HelpUS Accounting
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  Esta área destina-se à auditoria quantitativa, telemetria de uso e acompanhamento de requisições do sistema em tempo real.
                  Para prosseguir, é obrigatório validar a verificação de segurança (CAPTCHA) e autenticar-se com a conta de Superadmin autorizada no Google.
                </p>

                {/* Key Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
                  <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                      <BarChart3 className="w-4 h-4" /> Volumetria & Gráficos
                    </div>
                    <p className="text-xs text-slate-400">
                      Métricas consolidadas de downloads de notas e arquivos fiscais por mês e módulo.
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                      <Users className="w-4 h-4" /> Auditoria de Uso
                    </div>
                    <p className="text-xs text-slate-400">
                      Registro transparente das empresas e certificados consultados com segurança LGPD.
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                      <Activity className="w-4 h-4" /> Saúde da API
                    </div>
                    <p className="text-xs text-slate-400">
                      Monitoramento de latência e disponibilidade dos portais ADN/SERPRO da Receita Federal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Captcha & Google Authentication Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <h5 className="font-bold text-white text-sm flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-400" /> Autenticação Exigida
                  </h5>
                  <span className="text-[11px] text-slate-400">
                    Conta autorizada: <strong className="text-amber-400">helpus.ecommerce@gmail.com</strong>
                  </span>
                </div>

                {/* SimpleCaptcha Component (Técnica do post.helpusbr.com) */}
                <div className={`bg-slate-900 p-4 rounded-xl border transition-all flex items-center justify-between select-none ${
                  captchaError
                    ? 'border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/10 animate-shake'
                    : captchaVerified
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-slate-800'
                }`}>
                  <div
                    onClick={handleCaptchaClick}
                    className="flex items-center gap-3.5 cursor-pointer group"
                  >
                    <div className={`w-7 h-7 rounded-md border flex items-center justify-center transition-all ${
                      captchaVerified
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                        : captchaLoading
                        ? 'border-amber-500 bg-amber-500/10'
                        : captchaError
                        ? 'border-rose-400 bg-rose-950'
                        : 'border-slate-600 bg-slate-950 group-hover:border-slate-400'
                    }`}>
                      {captchaVerified ? (
                        <Check className="w-5 h-5 stroke-[3]" />
                      ) : captchaLoading ? (
                        <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                      ) : null}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">
                        {captchaVerified ? 'Verificação de Segurança Concluída' : 'Não sou um robô'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {captchaVerified
                          ? 'Sessão verificada pelo HelpUS Security Shield'
                          : 'Clique na caixa para validar o CAPTCHA obrigatório'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 border-l border-slate-800 pl-3">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>HelpUS Security</span>
                  </div>
                </div>

                {/* Captcha Error Alert */}
                {captchaError && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Por favor, confirme o CAPTCHA "Não sou um robô" acima antes de clicar no login com o Google.</span>
                  </div>
                )}

                {/* Google Sign-In Button */}
                <div className="space-y-3 pt-1">
                  <button
                    onClick={handleGoogleLoginButtonClick}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition cursor-pointer"
                  >
                    {/* Official Google Multicolor Logo */}
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Entrar com o Google</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                    <span>Função: <strong>Superadmin Corporate</strong></span>
                    <span>Modo: <strong>Google OAuth 2.0 (Live)</strong></span>
                  </div>
                </div>

              </div>

              {/* GOOGLE OAUTH ACCOUNT SELECTOR POPUP MODAL */}
              {showGoogleAccountPicker && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-fade-in">
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl relative text-slate-100">
                    
                    <button
                      onClick={() => setShowGoogleAccountPicker(false)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* Google Header */}
                    <div className="flex items-center justify-center gap-2 border-b border-slate-800 pb-4">
                      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <h4 className="font-bold text-white text-base">Fazer login com o Google</h4>
                    </div>

                    <p className="text-xs text-slate-300 text-center">
                      Escolha uma conta para prosseguir para o aplicativo <strong className="text-amber-400">HelpUS Accounting Admin</strong>
                    </p>

                    {googleAuthError && (
                      <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs p-3 rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{googleAuthError}</span>
                      </div>
                    )}

                    {googleAuthLoading ? (
                      <div className="py-8 text-center space-y-3">
                        <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                        <p className="text-xs text-slate-300 font-semibold">Autenticando sessão com o Google OAuth 2.0...</p>
                      </div>
                    ) : (
                      /* Accounts List */
                      <div className="space-y-2.5">
                        {/* Authorized Superadmin Account */}
                        <div
                          onClick={() => handleSelectGoogleAccount('helpus.ecommerce@gmail.com')}
                          className="bg-slate-950 hover:bg-slate-800 border border-amber-500/40 hover:border-amber-400 p-3.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition shadow-md"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                              HE
                            </div>
                            <div className="truncate">
                              <span className="font-bold text-white text-xs block truncate">HelpUS Corporate</span>
                              <span className="text-[11px] text-amber-400 font-semibold block truncate">helpus.ecommerce@gmail.com</span>
                            </div>
                          </div>
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
                            Superadmin
                          </span>
                        </div>

                        {/* Unauthorized Account Example for Security Validation */}
                        <div
                          onClick={() => handleSelectGoogleAccount('usuario.comum@gmail.com')}
                          className="bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 p-3.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition opacity-70 hover:opacity-100"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <div className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 font-bold flex items-center justify-center text-xs shrink-0">
                              UC
                            </div>
                            <div className="truncate">
                              <span className="font-bold text-slate-300 text-xs block truncate">Usuário Comum</span>
                              <span className="text-[11px] text-slate-500 block truncate">usuario.comum@gmail.com</span>
                            </div>
                          </div>
                          <span className="bg-slate-800 text-slate-400 text-[9px] px-2 py-0.5 rounded-full font-semibold shrink-0">
                            Sem Acesso
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="text-center text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                      Para proteger sua conta, o HelpUS Security verifica seu token OAuth e chave mTLS.
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* ================= STATE 2: AUTHENTICATED SUPERADMIN TELEMETRY DASHBOARD ================= */
            <div className="space-y-6">
              
              {/* Top Control Bar & User Info */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center text-sm">
                    HE
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm sm:text-base">
                        helpus.ecommerce@gmail.com
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Superadmin Autorizado
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      Autenticado via Google OAuth 2.0 • Sessão ativa de monitoramento e auditoria
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleExportTelemetry}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-400" /> Exportar Relatório (CSV)
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sair
                  </button>
                </div>
              </div>

              {/* 4 Main KPI Cards (Quantitativo) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Total NFS-e Processadas</span>
                    <FileCheck2 className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    14.820
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" /> +24% em relação ao mês anterior
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Downloads ZIP & Excel</span>
                    <Download className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    1.450
                  </div>
                  <div className="text-[11px] text-amber-400 font-semibold">
                    100% de pacotes gerados com sucesso
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Empresas / Certificados</span>
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    342
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Certificados A1 distintos autenticados
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Taxa de Sucesso API</span>
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                    99.8%
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Latência média: 210ms
                  </div>
                </div>
              </div>

              {/* Module Usage Breakdown (Quantitative Bar Charts) */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-400" /> Volumetria por Módulo da Suite Contábil (2026)
                  </h4>
                  <span className="text-xs text-slate-400">Total: 14.820 requisições</span>
                </div>

                <div className="space-y-3">
                  {/* Module 1: NFS-e */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">1. NFS-e (Serviços ADN / SERPRO)</span>
                      <span className="text-amber-400">9.188 docs (62%)</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>

                  {/* Module 2: NF-e */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">2. NF-e (Produtos SEFAZ Mercadorias)</span>
                      <span className="text-amber-400">2.667 docs (18%)</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>

                  {/* Module 3: CT-e */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">3. CT-e (Fretes e DACTE)</span>
                      <span className="text-amber-400">1.185 docs (8%)</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>

                  {/* Module 4: EFD-Reinf */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">4. EFD-Reinf (Lotes XML R-4010 / R-4020)</span>
                      <span className="text-amber-400">741 lotes (5%)</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-400 h-2.5 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>

                  {/* Module 5: SPED Fiscal */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">5. SPED Fiscal (Gerador PVA .txt)</span>
                      <span className="text-amber-400">592 arquivos (4%)</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-rose-500 to-pink-400 h-2.5 rounded-full" style={{ width: '4%' }}></div>
                    </div>
                  </div>

                  {/* Module 6: Conciliação OFX */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">6. Conciliação OFX (Extratos Bancários)</span>
                      <span className="text-amber-400">447 extratos (3%)</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-400 to-yellow-300 h-2.5 rounded-full" style={{ width: '3%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Log Table (Quem usou & Ações) */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" /> Registro de Atividades & Auditoria de Uso
                    </h4>
                    <p className="text-xs text-slate-400">
                      Histórico em tempo real de requisições, empresas e volumetria processada
                    </p>
                  </div>

                  {/* Module Filter Tabs */}
                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-semibold self-start sm:self-auto overflow-x-auto max-w-full">
                    <button
                      onClick={() => setFilterModule('todos')}
                      className={`px-2.5 py-1 rounded transition cursor-pointer ${
                        filterModule === 'todos' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => setFilterModule('nfs-e')}
                      className={`px-2.5 py-1 rounded transition cursor-pointer ${
                        filterModule === 'nfs-e' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      NFS-e
                    </button>
                    <button
                      onClick={() => setFilterModule('reinf')}
                      className={`px-2.5 py-1 rounded transition cursor-pointer ${
                        filterModule === 'reinf' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Reinf
                    </button>
                    <button
                      onClick={() => setFilterModule('sped')}
                      className={`px-2.5 py-1 rounded transition cursor-pointer ${
                        filterModule === 'sped' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      SPED
                    </button>
                  </div>
                </div>

                {/* Audit Table */}
                <div className="overflow-x-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="px-3 py-2.5">Data / Hora</th>
                        <th className="px-3 py-2.5">Usuário / Email</th>
                        <th className="px-3 py-2.5">Empresa / CNPJ</th>
                        <th className="px-3 py-2.5">Módulo</th>
                        <th className="px-3 py-2.5">Ação Executada</th>
                        <th className="px-3 py-2.5 text-right">Qtd</th>
                        <th className="px-3 py-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {filteredLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-900/50 transition">
                          <td className="px-3 py-2.5 whitespace-nowrap text-slate-400">{log.timestamp}</td>
                          <td className="px-3 py-2.5 font-sans font-semibold text-white">{log.userEmail}</td>
                          <td className="px-3 py-2.5 font-sans truncate max-w-[200px]" title={log.companyName}>
                            <span className="text-slate-200 block truncate">{log.companyName}</span>
                            <span className="text-[10px] text-slate-500 block">{log.cnpj}</span>
                          </td>
                          <td className="px-3 py-2.5 font-sans">
                            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-semibold text-[10px]">
                              {log.module}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 font-sans text-slate-300">{log.action}</td>
                          <td className="px-3 py-2.5 text-right font-bold text-amber-400">{log.count}</td>
                          <td className="px-3 py-2.5 text-center whitespace-nowrap">
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold text-[10px]">
                              {log.status} ({log.latencyMs}ms)
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Health & Control Footer */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Portal Nacional ADN: ONLINE
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    SERPRO mTLS Gateway: ONLINE
                  </span>
                </div>

                <div className="text-[11px] text-slate-500">
                  HelpUS Accounting Telemetry Engine v2.0 • Build 2026-09
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
