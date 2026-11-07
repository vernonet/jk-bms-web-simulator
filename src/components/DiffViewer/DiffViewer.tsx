import React, { useState, useMemo } from 'react';
import { DIFF_ITEMS, DiffItem } from '../../data/sourceCode';
import { 
  GitCompare, 
  Search, 
  Filter, 
  Layers, 
  MessageSquare, 
  Globe, 
  Terminal, 
  CheckCircle2,
  FileCode
} from 'lucide-react';

export const DiffViewer: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'ui' | 'comments' | 'logs'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categorizedDiffs = useMemo(() => {
    return DIFF_ITEMS.map((item) => {
      let category: 'ui' | 'comments' | 'logs' = 'comments';
      const orig = item.original.trim();

      if (orig.startsWith('//') || orig.startsWith('/*') || orig.startsWith('*')) {
        category = 'comments';
      } else if (orig.includes('Serial.print')) {
        category = 'logs';
      } else if (orig.includes('html') || orig.includes('<') || orig.includes('document.getElementById') || orig.includes('title') || orig.includes('btn')) {
        category = 'ui';
      }

      return {
        ...item,
        category,
      };
    });
  }, []);

  const filteredDiffs = useMemo(() => {
    return categorizedDiffs.filter(item => {
      if (filterCategory !== 'all' && item.category !== filterCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.original.toLowerCase().includes(q) ||
          item.english.toLowerCase().includes(q) ||
          item.line.toString().includes(q)
        );
      }
      return true;
    });
  }, [categorizedDiffs, filterCategory, searchQuery]);

  const stats = useMemo(() => {
    const total = categorizedDiffs.length;
    const ui = categorizedDiffs.filter(d => d.category === 'ui').length;
    const comments = categorizedDiffs.filter(d => d.category === 'comments').length;
    const logs = categorizedDiffs.filter(d => d.category === 'logs').length;
    return { total, ui, comments, logs };
  }, [categorizedDiffs]);

  return (
    <div className="space-y-4">
      {/* Diff Overview Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-100 font-mono">{stats.total}</div>
            <div className="text-xs text-slate-400">Total Localized Lines</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-100 font-mono">{stats.ui}</div>
            <div className="text-xs text-slate-400">HTML Web UI & Menus</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-100 font-mono">{stats.comments}</div>
            <div className="text-xs text-slate-400">Firmware Comments</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-100 font-mono">{stats.logs}</div>
            <div className="text-xs text-slate-400">Serial Log Notifications</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterCategory === 'all'
                ? 'bg-cyan-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Changes ({stats.total})
          </button>
          <button
            onClick={() => setFilterCategory('ui')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterCategory === 'ui'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            HTML Web UI & Menus ({stats.ui})
          </button>
          <button
            onClick={() => setFilterCategory('comments')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterCategory === 'comments'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Code Comments ({stats.comments})
          </button>
          <button
            onClick={() => setFilterCategory('logs')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterCategory === 'logs'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Serial Logs ({stats.logs})
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search diff (e.g. Напруга, OTA)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-slate-950 text-slate-200 placeholder-slate-500 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 w-48 sm:w-64 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
      </div>

      {/* Diff Table / Cards */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-200 font-semibold">Side-by-Side Localization Inspector</span>
            <span className="text-slate-500">|</span>
            <span>Showing {filteredDiffs.length} lines</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded bg-rose-500/30 border border-rose-500/50 inline-block"></span>
              Ukrainian Original
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-500/50 inline-block"></span>
              English Translated
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-800/80 max-h-[640px] overflow-y-auto">
          {filteredDiffs.map((diff) => (
            <div key={diff.line} className="p-3.5 hover:bg-slate-900/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-cyan-400 border border-slate-800">
                    Line {diff.line}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${
                    diff.category === 'ui'
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      : diff.category === 'comments'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                  }`}>
                    {diff.category === 'ui' ? 'Web UI Element' : diff.category === 'comments' ? 'Code Comment' : 'Serial Log'}
                  </span>
                </div>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                {/* Original Ukrainian */}
                <div className="bg-rose-950/20 border border-rose-900/40 rounded-lg p-2.5 text-rose-200/90 overflow-x-auto">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1 flex items-center gap-1">
                    <span>Original (UK):</span>
                  </div>
                  <pre className="whitespace-pre-wrap">{diff.original}</pre>
                </div>

                {/* English Translated */}
                <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-lg p-2.5 text-emerald-200/90 overflow-x-auto">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>English Localized:</span>
                  </div>
                  <pre className="whitespace-pre-wrap">{diff.english}</pre>
                </div>
              </div>
            </div>
          ))}

          {filteredDiffs.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-sm">
              No matching diff lines found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
