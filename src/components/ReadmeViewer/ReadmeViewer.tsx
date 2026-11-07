import React, { useState } from 'react';
import { README_MD, GITHUB_WORKFLOW_YML } from '../../data/sourceCode';
import { downloadFile, downloadBase64Image, copyToClipboard } from '../../utils/fileDownloader';
import { REAL_WEB_PNG_BASE64, DASHBOARD_SVG_CODE } from '../../data/embeddedImages';
import { 
  BookOpen, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Code, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Cpu, 
  ExternalLink,
  ShieldCheck,
  ImageIcon,
  Globe,
  Rocket
} from 'lucide-react';

export const ReadmeViewer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedYml, setCopiedYml] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleCopy = async () => {
    const success = await copyToClipboard(README_MD);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadFile('README.md', README_MD, 'text/markdown');
  };

  const handleDownloadPng = () => {
    downloadBase64Image('esp32_jkbms_real_web.png', REAL_WEB_PNG_BASE64, 'image/png');
    setDownloadSuccess('esp32_jkbms_real_web.png downloaded!');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleDownloadSvg = () => {
    downloadFile('esp32_jkbms_dashboard.svg', DASHBOARD_SVG_CODE, 'image/svg+xml');
    setDownloadSuccess('esp32_jkbms_dashboard.svg downloaded!');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleDownloadYml = () => {
    downloadFile('deploy.yml', GITHUB_WORKFLOW_YML, 'text/yaml');
    setDownloadSuccess('.github/workflows/deploy.yml downloaded!');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleCopyYml = async () => {
    const ok = await copyToClipboard(GITHUB_WORKFLOW_YML);
    if (ok) {
      setCopiedYml(true);
      setTimeout(() => setCopiedYml(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Download Alert Toast */}
      {downloadSuccess && (
        <div className="p-3 bg-emerald-600/90 border border-emerald-400 text-white rounded-xl shadow-lg flex items-center justify-between text-xs font-semibold animate-fade-in">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-200" />
            <span>{downloadSuccess} Clean genuine binary file generated from browser memory.</span>
          </div>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-100">
              Project Documentation (README.md)
            </h2>
            <p className="text-xs text-slate-400">
              Complete English guide for hardware, Arduino IDE &amp; PlatformIO setup, web routes, and BLE registers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setViewMode('formatted')}
              className={`px-3 py-1 rounded transition ${
                viewMode === 'formatted'
                  ? 'bg-cyan-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Document View
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-3 py-1 rounded transition ${
                viewMode === 'raw'
                  ? 'bg-cyan-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Raw Markdown
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadPng}
            className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition shadow"
            title="Download genuine binary PNG image directly from memory (no HTML cookie redirect)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .png (Binary)</span>
          </button>

          <button
            onClick={handleDownloadSvg}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition shadow"
            title="Download clean Vector SVG image (no filters, 100% compatible with GitHub Camo)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .svg</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-1.5 transition shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download README.md</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {viewMode === 'raw' ? (
          <div className="p-4 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto max-h-[700px] select-text whitespace-pre-wrap">
            {README_MD}
          </div>
        ) : (
          <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto text-slate-200 text-sm leading-relaxed">
            
            {/* Title Header */}
            <div className="border-b border-slate-800 pb-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  English Edition
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                  v2.0-localized
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                ESP32 Jikong (JK) BMS Monitor &amp; Web Server
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                A wireless ESP32 firmware solution for reading live telemetry, cell voltages, wire resistances, temperatures, and controlling <strong>Jikong (JK) Active Balance BMS</strong> units over <strong>Bluetooth Low Energy (BLE)</strong> with an embedded <strong>AJAX/JSON Web Server</strong> on port 8089.
              </p>
            </div>

            {/* Dashboard Screenshot Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <span>📸 Web Server Live Dashboard Preview</span>
                </h2>
                <span className="text-xs text-slate-500 font-mono">docs/images/esp32_jkbms_real_web.png</span>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-white p-2">
                <img 
                  src={`data:image/png;base64,${REAL_WEB_PNG_BASE64}`}
                  alt="ESP32 JK-BMS Web Server Dashboard" 
                  className="w-full h-auto object-contain rounded-xl"
                />
                <div className="p-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2 mt-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300 font-medium">Authentic ESP32 Web Server view (Port 8089) — Direct memory download</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadPng}
                      className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-[11px] font-semibold flex items-center gap-1 transition shadow cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download .png (Binary)</span>
                    </button>
                    <button
                      onClick={handleDownloadSvg}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold flex items-center gap-1 transition shadow cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download .svg (Vector)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* GitHub Image Attachment Guide Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-xs space-y-3">
                <div className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>How to attach this screenshot to your GitHub Repository</span>
                </div>

                <div className="bg-cyan-950/40 border border-cyan-800/40 p-3 rounded-lg text-slate-300 space-y-1">
                  <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Why did GitHub previously show "Invalid image source / Error rendering embedded code"?</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    When downloading via normal web links in sandbox preview, the platform's security gateway can return an authentication HTML file (<code className="text-amber-300">&lt;title&gt;Cookie check&lt;/title&gt;</code>) instead of binary bytes. The download buttons here now construct the binary PNG directly inside browser memory via <code>Uint8Array</code> Blob, guaranteeing 100% genuine image data that GitHub renders cleanly.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 space-y-1.5">
                    <div className="font-semibold text-emerald-400">Method 1: Commit into repository (Standard)</div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      1. Click <strong className="text-cyan-300">Download .png (Binary)</strong> or <strong className="text-emerald-300">Download .svg</strong>.<br />
                      2. Place the file into your repo under <code className="text-cyan-300">docs/images/esp32_jkbms_real_web.png</code>.<br />
                      3. In <code className="text-cyan-300">README.md</code>, write:
                    </p>
                    <div className="bg-slate-900 p-1.5 rounded font-mono text-[11px] text-slate-200 select-all border border-slate-800">
                      ![ESP32 JK-BMS Dashboard](docs/images/esp32_jkbms_real_web.png)
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 space-y-1.5">
                    <div className="font-semibold text-cyan-400">Method 2: Drag &amp; Drop into GitHub (Instant URL)</div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      1. Open any Issue, Discussion, or Release edit box on your GitHub repo.<br />
                      2. Drag and drop the downloaded <code className="text-cyan-300">.png</code> file directly into the editor.<br />
                      3. GitHub will upload it to its CDN and insert:
                    </p>
                    <div className="bg-slate-900 p-1.5 rounded font-mono text-[11px] text-slate-200 border border-slate-800">
                      ![Dashboard](https://github.com/user-attachments/assets/...)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub Pages Live Simulator Deployment Guide */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <span>🚀 How to Host &amp; Run the Simulator Live on GitHub (Free)</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        GitHub Pages
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      Run this interactive BMS emulator on GitHub so visitors can interact with telemetry directly in their browser!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyYml}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedYml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedYml ? 'Copied YAML!' : 'Copy Workflow'}</span>
                  </button>

                  <button
                    onClick={handleDownloadYml}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition shadow cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download deploy.yml</span>
                  </button>
                </div>
              </div>

              {/* 3 Simple Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">1</span>
                    <span>Add Workflow File</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Place <code className="text-cyan-300">deploy.yml</code> into your repository at:
                  </p>
                  <div className="bg-slate-900 p-2 rounded font-mono text-[11px] text-slate-200 border border-slate-800 select-all">
                    .github/workflows/deploy.yml
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">2</span>
                    <span>Enable GitHub Pages</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    In your repo on GitHub: Go to <strong>Settings</strong> &gt; <strong>Pages</strong>. Under <strong>Build and deployment</strong>, choose:
                  </p>
                  <div className="bg-slate-900 p-2 rounded font-mono text-[11px] text-emerald-300 border border-slate-800 font-bold">
                    Source: GitHub Actions
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-purple-400 font-bold">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">3</span>
                    <span>Your Live URL</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Commit &amp; push to <code className="text-purple-300">main</code>. GitHub Actions will build and publish your app at:
                  </p>
                  <div className="bg-slate-900 p-2 rounded font-mono text-[11px] text-purple-300 border border-slate-800 truncate">
                    https://&lt;username&gt;.github.io/&lt;repo&gt;/
                  </div>
                </div>
              </div>

              {/* Badge Snippet for README */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Rocket className="w-4 h-4 text-emerald-400" />
                    <span>Markdown Badge for your GitHub README</span>
                  </span>
                  <span className="text-[11px] text-slate-500">Insert this at the top of your README.md</span>
                </div>
                <div className="bg-slate-900 p-2 rounded font-mono text-[11px] text-slate-200 select-all border border-slate-800 overflow-x-auto">
                  [![Live Simulator](https://img.shields.io/badge/Live_Simulator-Online_Demo-2ea44f?style=for-the-badge&amp;logo=github)](https://&lt;your-username&gt;.github.io/&lt;your-repo&gt;/)
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>Key Features</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <div className="font-bold text-cyan-300">Wireless BLE Client</div>
                  <p className="text-slate-400 leading-relaxed">
                    Connects directly to Jikong BMS service UUID <code className="text-cyan-200">0000ffe0...</code> over Bluetooth. No physical UART wires or level shifters required.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <div className="font-bold text-emerald-300">ESP-IDF CCCD (0x2902) Workaround</div>
                  <p className="text-slate-400 leading-relaxed">
                    Bypasses Jikong's descriptor discovery timeout bug by writing directly to <code className="text-emerald-200">char_handle + 1</code> using low-level kernel calls.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <div className="font-bold text-amber-300">AJAX / JSON Web Server (Port 8089)</div>
                  <p className="text-slate-400 leading-relaxed">
                    Fast live updates every 2 seconds via <code className="text-amber-200">/data.json</code> without reloading the webpage, saving heap RAM.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1">
                  <div className="font-bold text-purple-300">OTA Firmware Updates (/update)</div>
                  <p className="text-slate-400 leading-relaxed">
                    Upload new <code className="text-purple-200">.bin</code> firmware directly from your browser. Automatically releases BLE RAM during flashing for rock-solid stability.
                  </p>
                </div>
              </div>
            </div>

            {/* Partition Scheme Callout */}
            <div className="bg-amber-950/25 border border-amber-500/40 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Crucial Arduino IDE Setting: Partition Scheme</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Because BLE + WiFi + WebServer requires ~1.35 MB flash space, select:
                <br />
                <span className="font-mono font-bold text-white bg-slate-950/80 px-2 py-0.5 rounded inline-block mt-1">
                  Tools &gt; Partition Scheme &gt; "Minimal SPIFFS (1.9MB APP with OTA/190KB SPIFFS)"
                </span>
              </p>
            </div>

            {/* Web Server Routes */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <span>Web Server Endpoints (Port 8089)</span>
              </h2>

              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 text-slate-300 font-mono">
                    <tr>
                      <th className="p-2.5">Endpoint</th>
                      <th className="p-2.5">Method</th>
                      <th className="p-2.5">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-2.5 text-cyan-400 font-bold">/</td>
                      <td className="p-2.5 text-emerald-400">GET</td>
                      <td className="p-2.5 text-slate-300 font-sans">Main live dashboard (telemetry, cell voltages, switches)</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-2.5 text-cyan-400 font-bold">/data.json</td>
                      <td className="p-2.5 text-emerald-400">GET</td>
                      <td className="p-2.5 text-slate-300 font-sans">JSON API endpoint for telemetry and cell arrays</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-2.5 text-cyan-400 font-bold">/settings</td>
                      <td className="p-2.5 text-emerald-400">GET</td>
                      <td className="p-2.5 text-slate-300 font-sans">Chunked HTML form for viewing &amp; editing safety thresholds</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-2.5 text-cyan-400 font-bold">/charge_on / charge_off</td>
                      <td className="p-2.5 text-emerald-400">GET</td>
                      <td className="p-2.5 text-slate-300 font-sans">Toggle charge MOSFETs (Register 0x1D)</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-2.5 text-cyan-400 font-bold">/discharge_on / discharge_off</td>
                      <td className="p-2.5 text-emerald-400">GET</td>
                      <td className="p-2.5 text-slate-300 font-sans">Toggle discharge MOSFETs (Register 0x1E)</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-2.5 text-cyan-400 font-bold">/balance_on / balance_off</td>
                      <td className="p-2.5 text-emerald-400">GET</td>
                      <td className="p-2.5 text-slate-300 font-sans">Toggle active balancing (Register 0x1F)</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-2.5 text-cyan-400 font-bold">/update</td>
                      <td className="p-2.5 text-emerald-400">GET/POST</td>
                      <td className="p-2.5 text-slate-300 font-sans">Web-based OTA firmware upload (.bin)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Credits */}
            <div className="border-t border-slate-800 pt-6 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3">
              <div>
                Based on work by <a href="https://github.com/taraskinua/JK-BMS-web-server-on-esp-32" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">taraskinua</a> &amp; <a href="https://github.com/vernonet/ESP32_PRJ/tree/main/esp32_jk_bms" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">vernonet</a>.
              </div>
              <div className="font-mono">
                Apache-2.0 License
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
