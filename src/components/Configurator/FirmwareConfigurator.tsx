import React, { useState, useMemo } from 'react';
import { ENGLISH_CPP, PLATFORMIO_INI } from '../../data/sourceCode';
import { downloadFile, copyToClipboard } from '../../utils/fileDownloader';
import { 
  Sliders, 
  Wifi, 
  Key, 
  ShieldCheck, 
  Download, 
  Copy, 
  Check, 
  Battery, 
  Cpu, 
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

export const FirmwareConfigurator: React.FC = () => {
  const [ssid, setSsid] = useState<string>('MyWiFi_2.4GHz');
  const [password, setPassword] = useState<string>('MySecretWiFiPass');
  const [username, setUsername] = useState<string>('admin');
  const [webPassword, setWebPassword] = useState<string>('admin123');
  const [port, setPort] = useState<number>(8089);
  const [cellCount, setCellCount] = useState<number>(16);
  const [batteryCapacity, setBatteryCapacity] = useState<number>(280);
  const [preset, setPreset] = useState<'lifepo4' | 'liion' | 'custom'>('lifepo4');
  const [copied, setCopied] = useState<boolean>(false);

  // Generate customized C++ code
  const customizedCode = useMemo(() => {
    let code = ENGLISH_CPP;
    
    // Replace WiFi & Auth
    code = code.replace(
      'const char *ssid = "your_ssid";',
      `const char *ssid = "${ssid}";`
    );
    code = code.replace(
      'const char *password = "your_pass";',
      `const char *password = "${password}";`
    );
    code = code.replace(
      'const char *www_username = "your_admin";',
      `const char *www_username = "${username}";`
    );
    code = code.replace(
      'const char *www_password = "your_pass";',
      `const char *www_password = "${webPassword}";`
    );
    code = code.replace(
      'WebServer server(8089);',
      `WebServer server(${port});`
    );

    // Replace fallback cell count if needed
    if (cellCount !== 16) {
      code = code.replace(
        'c_count = 16;',
        `c_count = ${cellCount};`
      );
    }

    return code;
  }, [ssid, password, username, webPassword, port, cellCount]);

  const handleCopy = async () => {
    const success = await copyToClipboard(customizedCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCpp = () => {
    downloadFile('esp32_JK_BMS.cpp', customizedCode);
  };

  const applyPreset = (type: 'lifepo4' | 'liion') => {
    setPreset(type);
    if (type === 'lifepo4') {
      setCellCount(16);
      setBatteryCapacity(280);
    } else {
      setCellCount(14);
      setBatteryCapacity(100);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/30">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Custom Firmware Generator &amp; Credential Injector
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure your WiFi network credentials, Web Server login, port, and battery parameters to generate a ready-to-compile English firmware file.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownloadCpp}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download .cpp</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Settings */}
        <div className="lg:col-span-5 space-y-4">
          {/* Presets */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              Quick Battery Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => applyPreset('lifepo4')}
                className={`p-2.5 rounded-lg border text-left transition ${
                  preset === 'lifepo4'
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold text-xs flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LiFePO4 (16S 48V)</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">3.2V Nominal / 280Ah</div>
              </button>

              <button
                type="button"
                onClick={() => applyPreset('liion')}
                className={`p-2.5 rounded-lg border text-left transition ${
                  preset === 'liion'
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold text-xs flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5 text-amber-400" />
                  <span>NMC / Li-Ion (14S 48V)</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">3.7V Nominal / 100Ah</div>
              </button>
            </div>
          </div>

          {/* Network and Auth Parameters */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3.5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Wifi className="w-4 h-4 text-cyan-400" />
              <span>WiFi Network Settings</span>
            </h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">WiFi SSID (2.4 GHz only):</label>
              <input
                type="text"
                value={ssid}
                onChange={e => setSsid(e.target.value)}
                placeholder="WiFi Network Name"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">WiFi Password:</label>
              <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="WiFi Password"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Web Server Security */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3.5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Web Server Authentication</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Admin Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Admin Password:</label>
                <input
                  type="text"
                  value={webPassword}
                  onChange={e => setWebPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Web Server Port:</label>
                <input
                  type="number"
                  value={port}
                  onChange={e => setPort(parseInt(e.target.value) || 8089)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Cell Count (4-32):</label>
                <input
                  type="number"
                  min={4}
                  max={32}
                  value={cellCount}
                  onChange={e => setCellCount(parseInt(e.target.value) || 16)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Quick compilation note */}
          <div className="p-3.5 bg-blue-950/30 border border-blue-900/50 rounded-xl text-xs text-blue-200 space-y-1">
            <div className="font-semibold flex items-center gap-1 text-blue-400">
              <Info className="w-4 h-4" />
              <span>Compilation Guide</span>
            </div>
            <p className="text-[11px] leading-relaxed text-blue-300/80">
              In PlatformIO, copy this code to <code className="text-cyan-300">src/esp32_JK_BMS.cpp</code> and build with <code className="text-cyan-300">platformio run -t upload</code>. In Arduino IDE, save as <code className="text-cyan-300">esp32_jk_bms.ino</code>.
            </p>
          </div>
        </div>

        {/* Right Preview: Live Code Snippet */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl">
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-200 font-semibold">Configured C++ Header Preview</span>
            </div>
            <span className="text-emerald-400 text-[11px]">Auto-Synced</span>
          </div>

          <div className="p-4 bg-slate-950 font-mono text-xs text-slate-200 overflow-y-auto max-h-[480px] space-y-4">
            <div className="text-slate-500 italic">
              {"// --- 2. WIFI & WEB SERVER CONFIGURATION --------------------------------------"}
            </div>
            <div className="bg-cyan-950/30 border border-cyan-900/50 p-3 rounded-lg space-y-1.5">
              <div>
                <span className="text-pink-400 font-bold">const char</span> *ssid = <span className="text-emerald-300 font-bold">"{ssid}"</span>;
              </div>
              <div>
                <span className="text-pink-400 font-bold">const char</span> *password = <span className="text-emerald-300 font-bold">"{password}"</span>;
              </div>
              <div>
                <span className="text-pink-400 font-bold">const char</span> *www_username = <span className="text-emerald-300 font-bold">"{username}"</span>;
              </div>
              <div>
                <span className="text-pink-400 font-bold">const char</span> *www_password = <span className="text-emerald-300 font-bold">"{webPassword}"</span>;
              </div>
              <div>
                <span className="text-cyan-400">WebServer</span> server(<span className="text-amber-300 font-bold">{port}</span>);
              </div>
            </div>

            <div className="text-slate-500 italic">
              {"// --- 3. BLE GATT SETUP & CCCD DESCRIPTOR WORKAROUND --------------------------"}
            </div>
            <div className="text-slate-400 space-y-1">
              <div><span className="text-pink-400">static</span> BLEUUID serviceUUID(<span className="text-emerald-300">"0000ffe0-0000-1000-8000-00805f9b34fb"</span>);</div>
              <div><span className="text-pink-400">static</span> BLEUUID charWriteUUID(<span className="text-emerald-300">"0000ffe1-0000-1000-8000-00805f9b34fb"</span>);</div>
              <div><span className="text-pink-400">static</span> BLEUUID charNotifyUUID(<span className="text-emerald-300">"0000ffe1-0000-1000-8000-00805f9b34fb"</span>);</div>
              <div><span className="text-pink-400">#define</span> CCCD_UUID ((uint16_t)<span className="text-amber-300">0x2902</span>)</div>
            </div>

            <div className="text-slate-500 italic">
              {"// --- CELL COUNT FALLBACK ----------------------------------------------------"}
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg text-slate-300 space-y-1">
              <div><span className="text-pink-400">int</span> c_count = G_settings.cell_count;</div>
              <div><span className="text-pink-400">if</span> (c_count &lt;= 0 || c_count &gt; 32) &#123;</div>
              <div className="pl-4">c_count = <span className="text-amber-300 font-bold">{cellCount}</span>; <span className="text-slate-500">// Configured fallback</span></div>
              <div>&#125;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
