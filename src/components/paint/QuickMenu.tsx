/* QuickMenu: radial menu with six customizable buttons and switchable profiles.
 * Tap a button to run it; press-and-hold a button to change its action; tap the
 * centre to switch, create, rename or delete profiles. */
import { useEffect, useRef, useState } from 'react';
import { activeProfile, clampCentre, QUICK_ACTION_IDS, QUICK_ACTIONS, quickReducer, readQuick, SLOT_COUNT, writeQuick, type QuickAction, type QuickOp, type QuickState } from './quickmenu';
import './quickmenu.css';

const RADIUS = 104;

export function QuickMenu({ x, y, onRun, onClose }: { x: number; y: number; onRun: (a: QuickAction) => void; onClose: () => void }) {
  const [state, setState] = useState<QuickState>(() => readQuick());
  const [picking, setPicking] = useState<number | null>(null);
  const [profiles, setProfiles] = useState(false);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [closing, setClosing] = useState<null | number>(null);
  const hold = useRef<{ timer: number; fired: boolean } | null>(null);
  const prof = activeProfile(state);
  const c = clampCentre(x, y, RADIUS + 34, window.innerWidth, window.innerHeight);

  const apply = (op: QuickOp) => setState((s) => { const n = quickReducer(s, op); writeQuick(n); return n; });
  const close = (run?: QuickAction, slot = -1) => {
    if (closing !== null) return;
    setClosing(slot);
    window.setTimeout(() => { onClose(); if (run) onRun(run); }, 200);
  };
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`pp-qm ${closing !== null ? 'is-closing' : ''}`} role="dialog" aria-label="QuickMenu"
      onPointerDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="pp-qm-ring" style={{ left: c.x, top: c.y }}>
        {prof.slots.slice(0, SLOT_COUNT).map((a, i) => {
          const ang = -Math.PI / 2 + (i * Math.PI * 2) / SLOT_COUNT;
          return (
            <button key={i} type="button" className={`pp-qm-btn ${closing === i ? 'is-chosen' : ''} ${picking === i ? 'is-picking' : ''}`}
              style={{ '--qx': `${Math.cos(ang) * RADIUS}px`, '--qy': `${Math.sin(ang) * RADIUS}px`, animationDelay: `${i * 22}ms` } as React.CSSProperties}
              aria-label={`${QUICK_ACTIONS[a]} (hold to change)`}
              onPointerDown={() => {
                const h = { timer: 0, fired: false };
                h.timer = window.setTimeout(() => { h.fired = true; setProfiles(false); setPicking(i); }, 480);
                hold.current = h;
              }}
              onPointerUp={() => { const h = hold.current; hold.current = null; if (!h) return; window.clearTimeout(h.timer); if (!h.fired && picking === null) close(a, i); }}
              onPointerLeave={() => { if (hold.current) { window.clearTimeout(hold.current.timer); hold.current = null; } }}
              onContextMenu={(e) => e.preventDefault()}>
              <span>{QUICK_ACTIONS[a]}</span>
            </button>
          );
        })}
        <button type="button" className="pp-qm-hub" aria-label={`Profile: ${prof.name}. Tap to manage profiles.`} onClick={() => { setPicking(null); setProfiles((v) => !v); }}>
          <small>QuickMenu</small><b>{prof.name}</b>
        </button>
      </div>

      {(picking !== null || profiles) && (
        <div className="pp-qm-panel" style={{ left: Math.max(12, Math.min(window.innerWidth - 272, c.x - 130)), top: c.y + RADIUS + 46 > window.innerHeight - 260 ? Math.max(12, c.y - RADIUS - 300) : c.y + RADIUS + 46 }}
          onPointerDown={(e) => e.stopPropagation()}>
          {picking !== null ? <>
            <h3>Button {picking + 1}</h3>
            <div className="pp-qm-list">
              {QUICK_ACTION_IDS.map((id) => (
                <button key={id} type="button" className={prof.slots[picking] === id ? 'on' : ''} onClick={() => { apply({ type: 'assign', slot: picking, action: id }); setPicking(null); }}>{QUICK_ACTIONS[id]}</button>
              ))}
            </div>
          </> : <>
            <h3>Profiles</h3>
            <div className="pp-qm-list">
              {state.profiles.map((p) => (
                <div key={p.id} className={`pp-qm-prof ${p.id === state.active ? 'on' : ''}`}>
                  {renaming === p.id ? (
                    <input autoFocus value={draft} aria-label="Profile name" onChange={(e) => setDraft(e.target.value)}
                      onBlur={() => { apply({ type: 'rename', id: p.id, name: draft }); setRenaming(null); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); if (e.key === 'Escape') setRenaming(null); }} />
                  ) : (
                    <button type="button" className="pp-qm-prof-name" onClick={() => apply({ type: 'switch', id: p.id })}>{p.name}</button>
                  )}
                  <button type="button" className="pp-qm-mini" aria-label={`Rename ${p.name}`} onClick={() => { setDraft(p.name); setRenaming(p.id); }}>Rename</button>
                  {state.profiles.length > 1 && <button type="button" className="pp-qm-mini danger" aria-label={`Delete ${p.name}`} onClick={() => apply({ type: 'delete', id: p.id })}>Delete</button>}
                </div>
              ))}
              <button type="button" className="pp-qm-new" onClick={() => { const id = `q${Date.now().toString(36)}`; apply({ type: 'create', id }); setDraft(`Profile ${state.profiles.length + 1}`); setRenaming(id); }}>+ New profile</button>
            </div>
          </>}
        </div>
      )}
    </div>
  );
}
