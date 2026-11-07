import React, { useState, useMemo } from 'react';
import { ENGLISH_CPP, ORIGINAL_CPP, PLATFORMIO_INI } from '../../data/sourceCode';
import { downloadFile, copyToClipboard } from '../../utils/fileDownloader';
import { 
  Copy, 
  Check, 
  Download, 
  Search, 
  FileCode, 
  Code2, 
  Layers, 
  Terminal, 
  ArrowUpRight 
} from 'lucide-react';

export const CodeExplorer: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'original'>('english');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<string>('all');

  const currentCode = selectedLanguage === 'english' ? ENGLISH_CPP : ORIGINAL_CPP;
  const lines = useMemo(() => currentCode.split('\n'), [currentCode]);

  // Key navigation markers in code
  const codeMarkers = [
    { label: 'All Code (1,004 lines)', line: 1, id: 'all' },
    { label: 'WiFi & BLE Config', line: 20, id: 'config' },
    { label: 'BMS Data Structs', line: 73, id: 'structs' },
    { label: 'parseBMSData() [Telemetry]', line: 181, id: 'telemetry' },
    { label: 'parseBMSSettings()', line: 253, id: 'settings_parse' },
    { label: 'processBMSFrame() [Packet]', line: 310, id: 'frame_parser' },
    { label: 'connectToServer() & CCCD Fix', line: 406, id: 'cccd_fix' },
    { label: 'handleDataJson() [/data.json]', line: 488, id: 'json_api' },
    { label: 'handleRoot() [Dashboard]', line: 530, id: 'dashboard_html' },
    { label: 'handleSettings() [Chunked]', line: 660, id: 'settings_html' },
    { label: 'handleScan() [BLE Scanner]', line: 723, id: 'scanner_html' },
    { label: 'handleUpdateUpload() [OTA]', line: 793, id: 'ota_upload' },
    { label: 'handleSettingsUpdate()', line: 847, id: 'settings_write' },
    { label: 'setup() & loop()', line: 941, id: 'setup_loop' },
  ];

  const handleCopy = async () => {
    const success = await copyToClipboard(currentCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCpp = () => {
    downloadFile('esp32_JK_BMS.cpp', currentCode);
  };

  const handleDownloadIno = () => {
    downloadFile('esp32_jk_bms.ino', currentCode);
  };

  const handleDownloadPlatformIo = () => {
    downloadFile('platformio.ini', PLATFORMIO_INI);
  };

  const jumpToLine = (lineNumber: number) => {
    const el = document.getElementById(`code-line-${lineNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('bg-cyan-500/20');
      setTimeout(() => el.classList.remove('bg-cyan-500/20'), 2500);
    }
  };

  const filteredLineIndices = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const matches: number[] = [];
    lines.forEach((l, idx) => {
      if (l.toLowerCase().includes(q)) {
        matches.push(idx + 1);
      }
    });
    return matches;
  }, [lines, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Top Action & Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setSelectedLanguage('english')}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                selectedLanguage === 'english'
                  ? 'bg-cyan-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Check className="w-3.5 h-3.5 text-cyan-200" />
              <span>English (Translated)</span>
            </button>
            <button
              onClick={() => setSelectedLanguage('original')}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                selectedLanguage === 'original'
                  ? 'bg-amber-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Ukrainian (Original Repo)</span>
            </button>
          </div>

          {/* Jump to section */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="hidden sm:inline">Jump:</span>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                const marker = codeMarkers.find(m => m.id === e.target.value);
                if (marker) jumpToLine(marker.line);
              }}
              className="bg-slate-950 text-slate-300 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-cyan-500"
            >
              {codeMarkers.map(m => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search code..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-slate-950 text-slate-200 placeholder-slate-500 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 w-36 sm:w-48 focus:outline-none focus:border-cyan-500 font-mono"
            />
            {filteredLineIndices && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-cyan-400 font-mono">
                {filteredLineIndices.length} matches
              </span>
            )}
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownloadCpp}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition shadow"
            title="Download as esp32_JK_BMS.cpp for PlatformIO or ESP-IDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.cpp</span>
          </button>

          <button
            onClick={handleDownloadIno}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition shadow"
            title="Download as esp32_jk_bms.ino for Arduino IDE"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.ino</span>
          </button>

          <button
            onClick={handleDownloadPlatformIo}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
            title="Download platformio.ini configuration"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>ini</span>
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Code header bar */}
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-200 font-semibold">
              {selectedLanguage === 'english' ? 'esp32_JK_BMS.cpp (English Localized)' : 'esp32_JK_BMS.cpp (Original Ukrainian)'}
            </span>
            <span className="text-slate-500">|</span>
            <span>{lines.length} lines</span>
            <span className="text-slate-500">|</span>
            <span>UTF-8</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
              C++ / Arduino
            </span>
            {selectedLanguage === 'english' && (
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                0 Cyrillic Characters
              </span>
            )}
          </div>
        </div>

        {/* Code Lines Viewer */}
        <div className="overflow-x-auto max-h-[640px] font-mono text-xs leading-relaxed p-2 divide-y divide-transparent select-text">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isMatch = filteredLineIndices?.includes(lineNum);
            const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*');

            return (
              <div
                key={lineNum}
                id={`code-line-${lineNum}`}
                className={`flex hover:bg-slate-900/80 transition-colors py-0.5 px-2 rounded ${
                  isMatch ? 'bg-cyan-500/15 ring-1 ring-cyan-500/30' : ''
                }`}
              >
                {/* Line number */}
                <span className="w-12 shrink-0 text-slate-600 select-none text-right pr-4">
                  {lineNum}
                </span>

                {/* Line code content */}
                <span 
                  className={`whitespace-pre font-mono ${
                    isComment 
                      ? 'text-emerald-400/90 italic' 
                      : line.includes('html +=') || line.includes('String html')
                        ? 'text-amber-200'
                        : line.includes('Serial.print')
                          ? 'text-cyan-300'
                          : line.includes('#include')
                            ? 'text-pink-400 font-semibold'
                            : line.includes('writeRegister') || line.includes('parseBMSData')
                              ? 'text-blue-300'
                              : 'text-slate-200'
                  }`}
                >
                  {line || ' '}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
