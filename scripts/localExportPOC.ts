/*
  M0.3 Local Export (Manual E2E POC)
  - Loads test-character-complete.json
  - Fills a subset of fields in the 0.9.5 template
  - Writes test-results/local-export.pdf
*/
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument } from 'pdf-lib';

type AnyRecord = Record<string, any>;

function getPaths() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = here.endsWith('/scripts') ? path.dirname(here) : here;
  const pdfPath = path.resolve(
    repoRoot,
    'src/lib/pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf'
  );
  const characterPath = path.resolve(repoRoot, 'test-character-complete.json');
  const outDir = path.resolve(repoRoot, 'test-results');
  const outPath = path.resolve(outDir, 'local-export.pdf');
  return { pdfPath, characterPath, outDir, outPath };
}

function safeGet<T = any>(obj: AnyRecord, key: string): T | undefined {
  return obj?.[key] as T | undefined;
}

async function setText(form: any, fieldName: string, value: any) {
  if (value === undefined || value === null) return;
  try {
    const field = form.getField(fieldName);
    if (typeof (field as any).setText === 'function') {
      (field as any).setText(String(value));
    }
  } catch {
    // ignore missing fields in POC
  }
}

async function setChecked(form: any, fieldName: string, isChecked: boolean) {
  try {
    const field = form.getField(fieldName);
    if (typeof (field as any).check === 'function') {
      if (isChecked) (field as any).check();
      else if (typeof (field as any).uncheck === 'function') (field as any).uncheck();
    }
  } catch {
    // ignore
  }
}

async function main() {
  const { pdfPath, characterPath, outDir, outPath } = getPaths();

  const character: AnyRecord = JSON.parse(readFileSync(characterPath, 'utf8'));
  const pdfBytes = readFileSync(pdfPath);

  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  // Basic identity
  await setText(form, 'Character Name', safeGet(character, 'finalName'));
  await setText(form, 'Player Name', safeGet(character, 'finalPlayerName'));
  await setText(form, 'Level', safeGet(character, 'level'));
  await setText(form, 'Ancestry', safeGet(character, 'ancestry1Name'));
  await setText(form, 'Class & Subclass', safeGet(character, 'className'));

  // Attributes & core
  await setText(form, 'Prime', safeGet(character, 'finalPrimeModifierValue'));
  await setText(form, 'Might', safeGet(character, 'finalMight'));
  await setText(form, 'Agility', safeGet(character, 'finalAgility'));
  await setText(form, 'Charisma', safeGet(character, 'finalCharisma'));
  await setText(form, 'Intelligence', safeGet(character, 'finalIntelligence'));
  await setText(form, 'Combat Mastery', safeGet(character, 'finalCombatMastery'));

  // Saves
  await setText(form, 'Might Save', safeGet(character, 'finalSaveMight'));
  await setText(form, 'Agility Save', safeGet(character, 'finalSaveAgility'));
  await setText(form, 'Charisma Save', safeGet(character, 'finalSaveCharisma'));
  await setText(form, 'Intelligence Save', safeGet(character, 'finalSaveIntelligence'));

  // Combat stats
  await setText(form, 'Attack Check', safeGet(character, 'finalAttackSpellCheck'));
  await setText(form, 'Save DC', safeGet(character, 'finalSaveDC'));
  await setText(form, 'Initiative', safeGet(character, 'finalInitiativeBonus'));

  // Defense
  await setText(form, 'Physical Defense', safeGet(character, 'finalPD'));
  await setText(form, 'Mental Defense', safeGet(character, 'finalAD'));

  // Resources (max/current)
  const current = safeGet<any>(character.characterState, 'resources')?.current ?? {};
  const original = safeGet<any>(character.characterState, 'resources')?.original ?? {};
  await setText(form, 'Hit Points Max', original.maxHP);
  await setText(form, 'Hit Points Current', current.currentHP);
  await setText(form, 'Hit Points Temp', current.tempHP ?? 0);

  await setText(form, 'Stamina Points Max', original.maxSP);
  await setText(form, 'Stamina Points Current', current.currentSP);

  await setText(form, 'Mana Points Max', original.maxMP);
  await setText(form, 'Mana Points Current', current.currentMP);

  await setText(form, 'Grit Point Cap', original.maxGritPoints);
  await setText(form, 'Grit Point Current', current.currentGritPoints);

  await setText(form, 'Rest Point Cap', original.maxRestPoints);
  await setText(form, 'Rest Point Current', current.currentRestPoints);

  // Movement & misc
  await setText(form, 'Move Speed', safeGet(character, 'finalMoveSpeed'));
  await setText(form, 'Jump Distance', safeGet(character, 'finalJumpDistance'));
  await setText(form, 'Death Threshold', safeGet(character, 'finalDeathThreshold'));

  // Languages (up to 4)
  const languages = Object.keys(safeGet<any>(character, 'languagesData') ?? {});
  await setText(form, 'Language A', languages[0] ?? '');
  await setText(form, 'Language B', languages[1] ?? '');
  await setText(form, 'Language C', languages[2] ?? '');
  await setText(form, 'Language D', languages[3] ?? '');

  // One example attack filled from spells list (if any)
  const spells: any[] = safeGet(character, 'spells') ?? [];
  if (spells.length > 0) {
    const s = spells[0];
    await setText(form, 'Attack A', s.spellName ?? '');
    await setText(form, 'Attack A Type', s.school ?? '');
    await setText(form, 'Attack A Notes', s.range ?? '');
  }

  // Optionally mark exhaustion (none for test character)
  const exhaustion = current.exhaustionLevel ?? 0;
  await setChecked(form, 'Exhaustion -1', exhaustion <= -1);
  await setChecked(form, 'Exhaustion -2', exhaustion <= -2);
  await setChecked(form, 'Exhaustion -3', exhaustion <= -3);
  await setChecked(form, 'Exhaustion -4', exhaustion <= -4);
  await setChecked(form, 'Exhaustion -5', exhaustion <= -5);

  // Write out
  mkdirSync(outDir, { recursive: true });
  const outBytes = await pdfDoc.save();
  writeFileSync(outPath, outBytes);
  // eslint-disable-next-line no-console
  console.log(`Wrote PDF to: ${outPath}`);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});


