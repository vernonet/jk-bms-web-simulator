import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  FileCode, 
  Cpu, 
  Copy, 
  Check, 
  Settings, 
  Flame, 
  Terminal,
  FolderArchive,
  ArrowRight
} from 'lucide-react';
import { downloadFile, copyToClipboard } from '../../utils/fileDownloader';
import { ENGLISH_CPP, PLATFORMIO_INI } from '../../data/sourceCode';

export const ArduinoGuide: React.FC = () => {
  const [copiedIno, setCopiedIno] = useState<boolean>(false);
  const [boardType, setBoardType] = useState<string>('wemos_d1_mini32');
  const [partitionScheme, setPartitionScheme] = useState<string>('min_spiffs');

  const handleDownloadIno = () => {
    downloadFile('esp32_jk_bms.ino', ENGLISH_CPP);
  };

  const handleCopyIno = async () => {
    const success = await copyToClipboard(ENGLISH_CPP);
    if (success) {
      setCopiedIno(true);
      setTimeout(() => setCopiedIno(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Affirmation */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/40 shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% Arduino Framework Compatible
                </span>
                <span className="text-xs text-slate-400 font-mono">framework = arduino</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Yes, this works natively with Arduino Framework!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                The original repository was designed specifically for the <strong>Arduino Framework on ESP32</strong>. You can compile and flash it using either <strong>Arduino IDE (v1.8.x or v2.x)</strong> or <strong>PlatformIO</strong> with zero external third-party library dependencies.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyIno}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
            >
              {copiedIno ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedIno ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownloadIno}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition shadow-lg shadow-emerald-600/30"
            >
              <Download className="w-4 h-4" />
              <span>Download esp32_jk_bms.ino</span>
            </button>
          </div>
        </div>
      </div>

      {/* Critical Setting Warning */}
      <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-5 shadow-lg">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 mt-0.5">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wide">
              Critical Setting for Arduino IDE: Partition Scheme
            </h3>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              Because this sketch compiles both the <strong>BLE Client stack</strong>, <strong>WiFi stack</strong>, and <strong>WebServer with OTA</strong>, the compiled binary is approximately <strong>~1.35 MB</strong>. The default Arduino IDE partition scheme allocates only 1.2 MB for the app, which will produce the error: <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">sketch too big: text section exceeds available space in flash</code>.
            </p>
            <div className="mt-3 p-3 bg-slate-950/80 rounded-lg border border-amber-500/30 font-mono text-xs text-emerald-300">
              🔧 In Arduino IDE Menu: <span className="text-white font-bold">Tools &gt; Partition Scheme &gt; "Minimal SPIFFS (1.9MB APP with OTA/190KB SPIFFS)"</span> or <span className="text-white font-bold">"Huge APP (3MB No OTA/1MB SPIFFS)"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step by Step Arduino IDE Setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Arduino IDE Instructions */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-slate-100 text-sm">
              How to compile in Arduino IDE (Step-by-Step)
            </h3>
          </div>

          <ol className="space-y-3.5 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-600/30 border border-cyan-500 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
              <div>
                <strong className="text-white">Create matching folder name:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Arduino requires the sketch file to be inside a folder with the same name:
                  <br />
                  <code className="text-cyan-300 font-mono bg-slate-950 px-1 rounded">esp32_jk_bms/esp32_jk_bms.ino</code>
                </p>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-600/30 border border-cyan-500 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
              <div>
                <strong className="text-white">Install ESP32 Board Core:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  In Arduino IDE: <em>Tools &gt; Board &gt; Boards Manager</em>, search for <strong className="text-slate-200">esp32</strong> by Espressif Systems and click Install.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-600/30 border border-cyan-500 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
              <div>
                <strong className="text-white">Select Your ESP32 Board:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Select <strong className="text-slate-200">ESP32 Dev Module</strong> or <strong className="text-slate-200">WEMOS D1 MINI ESP32</strong>.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-600/30 border border-cyan-500 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
              <div>
                <strong className="text-white">Select Partition Scheme:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  <em>Tools &gt; Partition Scheme</em> &gt; choose <strong>Minimal SPIFFS (1.9MB APP with OTA)</strong>.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-600/30 border border-cyan-500 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[11px]">5</span>
              <div>
                <strong className="text-white">Configure WiFi &amp; Click Upload:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Update your WiFi SSID and password at lines 22-23, then click <strong>Upload (Ctrl+U)</strong>. Open Serial Monitor at <strong className="text-slate-200">115200 baud</strong>.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Right Column: Built-in Libraries Verification */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-sm">
              Zero External Libraries Required
            </h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            You do <strong>not</strong> need to download any ZIP libraries or search the Library Manager. Every header included in this code comes bundled with the official Espressif ESP32 Arduino Core:
          </p>

          <div className="space-y-2 text-xs font-mono">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-pink-400">#include</span> <span className="text-emerald-300">"BLEDevice.h"</span>
              </div>
              <span className="text-emerald-400 text-[10px] font-sans">Core Built-in</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-pink-400">#include</span> <span className="text-emerald-300">&lt;WiFi.h&gt;</span>
              </div>
              <span className="text-emerald-400 text-[10px] font-sans">Core Built-in</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-pink-400">#include</span> <span className="text-emerald-300">&lt;WebServer.h&gt;</span>
              </div>
              <span className="text-emerald-400 text-[10px] font-sans">Core Built-in</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-pink-400">#include</span> <span className="text-emerald-300">&lt;Update.h&gt;</span>
              </div>
              <span className="text-emerald-400 text-[10px] font-sans">Core Built-in (OTA)</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-pink-400">#include</span> <span className="text-emerald-300">"esp_gattc_api.h"</span>
              </div>
              <span className="text-cyan-400 text-[10px] font-sans">ESP-IDF GATT Driver</span>
            </div>
          </div>

          <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-lg text-xs text-cyan-200">
            <strong>PlatformIO users:</strong> Simply copy the code into <code className="text-white font-mono">src/esp32_JK_BMS.cpp</code> and use the included <code className="text-white font-mono">platformio.ini</code>.
          </div>
        </div>
      </div>
    </div>
  );
};
