import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument } from 'pdf-lib';

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

function safe(obj, key) {
  return obj && Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
}

async function setText(form, fieldName, value) {
  if (value === undefined || value === null) return;
  try {
    const field = form.getField(fieldName);
    if (typeof field.setText === 'function') field.setText(String(value));
  } catch {}
}

async function setChecked(form, fieldName, isChecked) {
  try {
    const field = form.getField(fieldName);
    if (typeof field.check === 'function') {
      if (isChecked) field.check();
      else if (typeof field.uncheck === 'function') field.uncheck();
    }
  } catch {}
}

async function main() {
  const { pdfPath, characterPath, outDir, outPath } = getPaths();

  const character = JSON.parse(readFileSync(characterPath, 'utf8'));
  const pdfBytes = readFileSync(pdfPath);

  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  await setText(form, 'Character Name', safe(character, 'finalName'));
  await setText(form, 'Player Name', safe(character, 'finalPlayerName'));
  await setText(form, 'Level', safe(character, 'level'));
  await setText(form, 'Ancestry', safe(character, 'ancestry1Name'));
  await setText(form, 'Class & Subclass', safe(character, 'className'));

  await setText(form, 'Prime', safe(character, 'finalPrimeModifierValue'));
  await setText(form, 'Might', safe(character, 'finalMight'));
  await setText(form, 'Agility', safe(character, 'finalAgility'));
  await setText(form, 'Charisma', safe(character, 'finalCharisma'));
  await setText(form, 'Intelligence', safe(character, 'finalIntelligence'));
  await setText(form, 'Combat Mastery', safe(character, 'finalCombatMastery'));

  await setText(form, 'Might Save', safe(character, 'finalSaveMight'));
  await setText(form, 'Agility Save', safe(character, 'finalSaveAgility'));
  await setText(form, 'Charisma Save', safe(character, 'finalSaveCharisma'));
  await setText(form, 'Intelligence Save', safe(character, 'finalSaveIntelligence'));

  await setText(form, 'Attack Check', safe(character, 'finalAttackSpellCheck'));
  await setText(form, 'Save DC', safe(character, 'finalSaveDC'));
  await setText(form, 'Initiative', safe(character, 'finalInitiativeBonus'));

  await setText(form, 'Physical Defense', safe(character, 'finalPD'));
  await setText(form, 'Mental Defense', safe(character, 'finalAD'));

  const resources = (safe(character, 'characterState') || {}).resources || {};
  const current = resources.current || {};
  const original = resources.original || {};

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

  await setText(form, 'Move Speed', safe(character, 'finalMoveSpeed'));
  await setText(form, 'Jump Distance', safe(character, 'finalJumpDistance'));
  await setText(form, 'Death Threshold', safe(character, 'finalDeathThreshold'));

  const languagesData = safe(character, 'languagesData') || {};
  const languages = Object.keys(languagesData);
  await setText(form, 'Language A', languages[0] || '');
  await setText(form, 'Language B', languages[1] || '');
  await setText(form, 'Language C', languages[2] || '');
  await setText(form, 'Language D', languages[3] || '');

  const spells = safe(character, 'spells') || [];
  if (spells.length > 0) {
    const s = spells[0];
    await setText(form, 'Attack A', s.spellName || '');
    await setText(form, 'Attack A Type', s.school || '');
    await setText(form, 'Attack A Notes', s.range || '');
  }

  const exhaustion = current.exhaustionLevel ?? 0;
  await setChecked(form, 'Exhaustion -1', exhaustion <= -1);
  await setChecked(form, 'Exhaustion -2', exhaustion <= -2);
  await setChecked(form, 'Exhaustion -3', exhaustion <= -3);
  await setChecked(form, 'Exhaustion -4', exhaustion <= -4);
  await setChecked(form, 'Exhaustion -5', exhaustion <= -5);

  mkdirSync(outDir, { recursive: true });
  const outBytes = await pdfDoc.save();
  writeFileSync(outPath, outBytes);
  console.log(`Wrote PDF to: ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


