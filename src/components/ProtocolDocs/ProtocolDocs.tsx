import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Bluetooth, 
  AlertTriangle, 
  CheckCircle2, 
  Table, 
  Binary, 
  Code2, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const ProtocolDocs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'registers' | 'packets' | 'cccd_fix'>('registers');

  const registers = [
    { addr: '0x95', name: 'Telemetry Poll Request', type: 'Read', len: '0x00', desc: 'Requests live telemetry (~300 bytes frame). Sent every 2000ms in loop().' },
    { addr: '0x96', name: 'Settings Poll Request', type: 'Read', len: '0x00', desc: 'Requests current BMS protection and threshold settings frame.' },
    { addr: '0x97', name: 'Device Info Request', type: 'Read', len: '0x00', desc: 'Requests manufacturer info, serial number, HW/SW version.' },
    { addr: '0x1D', name: 'Charge Switch Toggle', type: 'Write', len: '0x04', desc: '1 = Enable charging MOSFETs, 0 = Disable charging MOSFETs.' },
    { addr: '0x1E', name: 'Discharge Switch Toggle', type: 'Write', len: '0x04', desc: '1 = Enable discharging MOSFETs, 0 = Disable discharging MOSFETs.' },
    { addr: '0x1F', name: 'Active Balance Switch', type: 'Write', len: '0x04', desc: '1 = Enable active balancing, 0 = Disable active balancing.' },
    { addr: '0x0A', name: 'Undervoltage Protection (UVP)', type: 'Write', len: '0x04', desc: 'Stored in mV (e.g. 2800 mV = 2.800V). Value * 1000.' },
    { addr: '0x0C', name: 'Overvoltage Protection (OVP)', type: 'Write', len: '0x04', desc: 'Stored in mV (e.g. 3650 mV = 3.650V). Value * 1000.' },
    { addr: '0x27', name: 'Configured Cell Count', type: 'Write', len: '0x04', desc: 'Number of series cells connected (e.g. 8, 16, 24).' },
    { addr: '0x41', name: 'Total Battery Capacity', type: 'Write', len: '0x04', desc: 'Stored in mAh (e.g. 280000 mAh = 280.0 Ah).' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/30">
            <Binary className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              Jikong (JK) BMS BLE Protocol &amp; ESP-IDF Architecture
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Protocol frame specification, command registers, and the ESP32 low-level CCCD GATT workaround.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('registers')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'registers'
              ? 'bg-cyan-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          Register Map (0x0A - 0x97)
        </button>
        <button
          onClick={() => setActiveTab('packets')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'packets'
              ? 'bg-cyan-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          Packet Framing (AA 55 EB 90)
        </button>
        <button
          onClick={() => setActiveTab('cccd_fix')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'cccd_fix'
              ? 'bg-purple-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          CCCD (0x2902) Low-Level Fix
        </button>
      </div>

      {/* Tab 1: Registers */}
      {activeTab === 'registers' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Jikong BMS Command &amp; Control Register Reference</span>
            <span className="text-slate-500 font-mono">writeRegister(addr, val, len)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950/70 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Address</th>
                  <th className="p-3">Register Name</th>
                  <th className="p-3">Operation</th>
                  <th className="p-3">Length</th>
                  <th className="p-3">Description &amp; Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono">
                {registers.map(reg => (
                  <tr key={reg.addr} className="hover:bg-slate-800/40">
                    <td className="p-3 text-cyan-400 font-bold">{reg.addr}</td>
                    <td className="p-3 text-slate-200 font-semibold font-sans">{reg.name}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        reg.type === 'Write' 
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}>
                        {reg.type}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{reg.len}</td>
                    <td className="p-3 text-slate-300 font-sans">{reg.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Packets */}
      {activeTab === 'packets' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Inbound Frame Structure (BMS to ESP32)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-cyan-400 font-bold">0x55 0xAA 0xEB 0x90</div>
                <div className="text-slate-400 text-[11px] mt-1 font-sans">Magic Header (4 Bytes)</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-emerald-400 font-bold">0x01 | 0x02 | 0x03</div>
                <div className="text-slate-400 text-[11px] mt-1 font-sans">Frame Type (Settings / Telemetry / Info)</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-amber-400 font-bold">Byte[6] ... Byte[299]</div>
                <div className="text-slate-400 text-[11px] mt-1 font-sans">Payload (Cells, Temps, SOC, Ah)</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-pink-400 font-bold">crc = sum(data) % 256</div>
                <div className="text-slate-400 text-[11px] mt-1 font-sans">8-Bit Additive Checksum</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed space-y-2">
              <div className="text-slate-500">// Telemetry decoding offsets (from parseBMSData()):</div>
              <div><span className="text-cyan-400">Cell Voltages:</span> Bytes 6-37 (16 words, uint16_t * 0.001V)</div>
              <div><span className="text-cyan-400">Wire Resistances:</span> Bytes 80-111 (16 words, uint16_t * 0.001Ω)</div>
              <div><span className="text-cyan-400">Battery Total Voltage:</span> Bytes 150-153 (uint32_t * 0.001V)</div>
              <div><span className="text-cyan-400">Current (A):</span> Bytes 158-161 (int32_t * 0.001A, &gt;0 charge, &lt;0 discharge)</div>
              <div><span className="text-cyan-400">MOSFET Temp (°C):</span> Bytes 144-145 (int16_t * 0.1°C)</div>
              <div><span className="text-cyan-400">Battery T1 &amp; T2:</span> Bytes 162-163 &amp; 164-165 (int16_t * 0.1°C)</div>
              <div><span className="text-cyan-400">SOC (%):</span> Byte 173 (uint8_t)</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: CCCD Low Level Fix */}
      {activeTab === 'cccd_fix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">
                Why Standard BLE Client Fails on Jikong BMS
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Most Arduino BLE sketches fail to receive notifications from Jikong BMS because the standard <code className="text-cyan-300">pNotifyCharacteristic-&gt;registerForNotify()</code> invokes a blocking descriptor search for UUID <code className="text-cyan-300">0x2902</code> (CCCD). Jikong BMS firmware often does not respond to standard descriptor discovery queries, causing timeouts and disconnections.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
            <div className="text-emerald-400 font-semibold flex items-center gap-2 font-sans">
              <CheckCircle2 className="w-4 h-4" />
              <span>The Low-Level ESP-IDF Solution in this Firmware:</span>
            </div>

            <pre className="text-slate-300 leading-relaxed overflow-x-auto p-3 bg-slate-900 rounded-lg">
{`// 1. Register notify callback without triggering descriptor scan
pNotifyCharacteristic->registerForNotify(notifyCallback, false);

// 2. Retrieve internal BLE stack handles
uint16_t char_handle = pNotifyCharacteristic->getHandle();
uint16_t gattc_if = pClient->getGattcIf();
uint16_t conn_id = pClient->getConnId();

// 3. Raw Little-Endian packet for CCCD notify enable: 0x0001
uint16_t notify_en_value = 0x0001; 

// 4. Directly write to descriptor: char_handle + 1 (always constant on Jikong hardware)
esp_err_t err = esp_ble_gattc_write_char_descr(
    gattc_if,
    conn_id,
    char_handle + 1,
    sizeof(notify_en_value),
    (uint8_t *)&notify_en_value,
    ESP_GATT_WRITE_TYPE_RSP,
    ESP_GATT_AUTH_REQ_NONE
);`}
            </pre>
            <p className="text-xs text-slate-400 font-sans">
              This completely bypasses the bug in Jikong's BLE stack and establishes an instantaneous, rock-solid telemetry stream without dropping connections.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
