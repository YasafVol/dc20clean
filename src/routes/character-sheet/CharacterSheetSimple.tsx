import React from 'react';
import { useCharacterSheet, useCharacterResources, useCharacterDefenses } from './hooks/CharacterSheetProvider';

const CharacterSheetSimple: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const { state, updateHP, updateSP, updateMP, setManualDefense } = useCharacterSheet();
  const resources = useCharacterResources();
  const defenses = useCharacterDefenses();

  if (!state.character || !resources || !defenses) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading…</div>;
  }

  const { current, original } = resources;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem', fontFamily: 'sans-serif' }}>
      {onBack && (
        <button onClick={onBack} style={{ marginBottom: '1rem' }}>
          ← Back
        </button>
      )}
      <h2>
        {state.character.finalName} — Level {state.character.level} {state.character.className}
      </h2>

      {/* Resources */}
      <section>
        <h3>Resources</h3>
        <ResourceRow
          label="HP"
          value={current.currentHP}
          max={original.maxHP}
          onInc={() => updateHP(current.currentHP + 1)}
          onDec={() => updateHP(Math.max(0, current.currentHP - 1))}
        />
        <ResourceRow
          label="SP"
          value={current.currentSP}
          max={original.maxSP}
          onInc={() => updateSP(current.currentSP + 1)}
          onDec={() => updateSP(Math.max(0, current.currentSP - 1))}
        />
        <ResourceRow
          label="MP"
          value={current.currentMP}
          max={original.maxMP}
          onInc={() => updateMP(current.currentMP + 1)}
          onDec={() => updateMP(Math.max(0, current.currentMP - 1))}
        />
      </section>

      {/* Defenses */}
      <section style={{ marginTop: '1.5rem' }}>
        <h3>Defenses</h3>
        <DefenseRow
          label="PD"
          value={defenses.PD}
          onChange={(v) => setManualDefense(v, undefined, undefined)}
        />
        <DefenseRow
          label="AD"
          value={defenses.AD}
          onChange={(v) => setManualDefense(undefined, v, undefined)}
        />
        <DefenseRow
          label="PDR"
          value={defenses.PDR}
          onChange={(v) => setManualDefense(undefined, undefined, v)}
        />
      </section>
    </div>
  );
};

const ResourceRow: React.FC<{
  label: string;
  value: number;
  max: number;
  onInc: () => void;
  onDec: () => void;
}> = ({ label, value, max, onInc, onDec }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
    <strong style={{ width: 50 }}>{label}</strong>
    <button onClick={onDec} style={{ marginInline: 4 }}>-</button>
    <span style={{ minWidth: 60, textAlign: 'center' }}>
      {value} / {max}
    </span>
    <button onClick={onInc} style={{ marginInline: 4 }}>+</button>
  </div>
);

const DefenseRow: React.FC<{ label: string; value: number; onChange: (v: number) => void }> = ({ label, value, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
    <strong style={{ width: 50 }}>{label}</strong>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      style={{ width: 80 }}
    />
  </div>
);

export default CharacterSheetSimple;
