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

  // Defense thresholds & bloodied values
  const pd = Number(safe(character, 'finalPD') || 0);
  const ad = Number(safe(character, 'finalAD') || 0);
  const pdHeavy = safe(character, 'finalPDHeavyThreshold');
  const pdBrutal = safe(character, 'finalPDBrutalThreshold');
  const adHeavy = safe(character, 'finalADHeavyThreshold');
  const adBrutal = safe(character, 'finalADBrutalThreshold');
  await setText(form, 'PD Heavy Threshold', pdHeavy ?? (pd + 5));
  await setText(form, 'PD Brutal Threshold', pdBrutal ?? (pd + 10));
  await setText(form, 'MD Heavy Threshold', adHeavy ?? (ad + 5));
  await setText(form, 'MD Brutal Threshold', adBrutal ?? (ad + 10));
  const bloodied = safe(character, 'bloodiedValue');
  const wellBloodied = safe(character, 'wellBloodiedValue');
  const finalHPMax = Number(safe(character, 'finalHPMax') || 0);
  await setText(form, 'Bloodied', bloodied ?? Math.ceil(finalHPMax / 2));
  await setText(form, 'Well-Bloodied', wellBloodied ?? Math.ceil(finalHPMax / 4));

  // --- Skills & Knowledge Trades ---
  const skillTotals = safe(character, 'skillTotals') || {};
  const skillsData = safe(character, 'skillsData') || {};
  const tradesData = safe(character, 'tradesData') || {};
  const finalMight = safe(character, 'finalMight') || 0;
  const finalAgility = safe(character, 'finalAgility') || 0;
  const finalCharisma = safe(character, 'finalCharisma') || 0;
  const finalIntelligence = safe(character, 'finalIntelligence') || 0;
  const finalPrime = safe(character, 'finalPrimeModifierValue') || 0;
  const masteryLadders = safe(character, 'masteryLadders') || {};

  function totalForSkill(id, fallbackAttr) {
    if (typeof skillTotals[id] === 'number') return skillTotals[id];
    const rank = Number(skillsData[id] || 0);
    const mastery = rank * 2;
    const attrVal =
      fallbackAttr === 'might'
        ? finalMight
        : fallbackAttr === 'agility'
        ? finalAgility
        : fallbackAttr === 'charisma'
        ? finalCharisma
        : fallbackAttr === 'intelligence'
        ? finalIntelligence
        : finalPrime;
    return attrVal + mastery;
  }

  await setText(form, 'Awareness', totalForSkill('awareness', 'prime'));
  await setText(form, 'Athletics', totalForSkill('athletics', 'might'));
  await setText(form, 'Intimidation', totalForSkill('intimidation', 'might'));
  await setText(form, 'Acrobatics', totalForSkill('acrobatics', 'agility'));
  await setText(form, 'Trickery', totalForSkill('trickery', 'agility'));
  await setText(form, 'Stealth', totalForSkill('stealth', 'agility'));
  await setText(form, 'Animal', totalForSkill('animal', 'charisma'));
  await setText(form, 'Influence', totalForSkill('influence', 'charisma'));
  await setText(form, 'Insight', totalForSkill('insight', 'charisma'));
  await setText(form, 'Investigation', totalForSkill('investigation', 'intelligence'));
  await setText(form, 'Medicine', totalForSkill('medicine', 'intelligence'));
  await setText(form, 'Survival', totalForSkill('survival', 'intelligence'));

  function totalForKnowledge(id) {
    const kt = safe(character, 'knowledgeTradeMastery') || {};
    if (kt && kt[id] && typeof kt[id].finalValue === 'number') return kt[id].finalValue;
    const rank = Number(tradesData[id] || 0);
    return finalIntelligence + rank * 2;
  }
  await setText(form, 'Arcana', totalForKnowledge('arcana'));
  await setText(form, 'History', totalForKnowledge('history'));
  await setText(form, 'Nature', totalForKnowledge('nature'));
  await setText(form, 'Occultism', totalForKnowledge('occultism'));
  await setText(form, 'Religion', totalForKnowledge('religion'));

  function buildLadderFromLevel(level) {
    return {
      '2': level >= 2,
      '4': level >= 4,
      '6': level >= 6,
      '8': level >= 8,
      '10': level >= 10
    };
  }
  function ladderForSkill(id) {
    const ladders = (masteryLadders.skills || {});
    if (ladders && ladders[id]) return ladders[id];
    const level = Number(skillsData[id] || 0) * 2;
    return buildLadderFromLevel(level);
  }
  async function setSkillMastery(name, id) {
    const ladder = ladderForSkill(id);
    await setChecked(form, `Mastery-${name}-2`, !!ladder['2']);
    await setChecked(form, `Mastery-${name}-4`, !!ladder['4']);
    await setChecked(form, `Mastery-${name}-6`, !!ladder['6']);
    await setChecked(form, `Mastery-${name}-8`, !!ladder['8']);
    const tenName = name === 'Influence' ? 'Master-Influence-10' : `Mastery-${name}-10`;
    await setChecked(form, tenName, !!ladder['10']);
  }
  await setSkillMastery('Awareness', 'awareness');
  await setSkillMastery('Athletics', 'athletics');
  await setSkillMastery('Intimidation', 'intimidation');
  await setSkillMastery('Acrobatics', 'acrobatics');
  await setSkillMastery('Trickery', 'trickery');
  await setSkillMastery('Stealth', 'stealth');
  await setSkillMastery('Animal', 'animal');
  await setSkillMastery('Influence', 'influence');
  await setSkillMastery('Insight', 'insight');
  await setSkillMastery('Investigation', 'investigation');
  await setSkillMastery('Medicine', 'medicine');
  await setSkillMastery('Survival', 'survival');

  function ladderForKnowledge(id) {
    const kl = (masteryLadders.knowledgeTrades || {});
    if (kl && kl[id]) return kl[id];
    const level = Number(tradesData[id] || 0) * 2;
    return buildLadderFromLevel(level);
  }
  async function setKnowledgeMastery(name, id) {
    const ladder = ladderForKnowledge(id);
    await setChecked(form, `Mastery-${name}-2`, !!ladder['2']);
    await setChecked(form, `Mastery-${name}-4`, !!ladder['4']);
    await setChecked(form, `Mastery-${name}-6`, !!ladder['6']);
    await setChecked(form, `Mastery-${name}-8`, !!ladder['8']);
    await setChecked(form, `Mastery-${name}-10`, !!ladder['10']);
  }
  await setKnowledgeMastery('Arcana', 'arcana');
  await setKnowledgeMastery('History', 'history');
  await setKnowledgeMastery('Nature', 'nature');
  await setKnowledgeMastery('Occultism', 'occultism');
  await setKnowledgeMastery('Religion', 'religion');

  const practical = (masteryLadders.practicalTrades || {});
  if (practical.A) await setText(form, 'Trade A', practical.A.label || '');
  if (practical.B) await setText(form, 'Trade B', practical.B.label || '');
  if (practical.C) await setText(form, 'Trade C', practical.C.label || '');
  if (practical.D) await setText(form, 'Trade D', practical.D.label || '');
  async function setPractical(slot) {
    const entry = practical[slot];
    const ladder = entry?.ladder;
    if (!ladder) return;
    await setChecked(form, `Mastery-Trade-${slot}-2`, !!ladder['2']);
    await setChecked(form, `Mastery-Trade-${slot}-4`, !!ladder['4']);
    await setChecked(form, `Mastery-Trade-${slot}-6`, !!ladder['6']);
    await setChecked(form, `Mastery-Trade-${slot}-8`, !!ladder['8']);
    await setChecked(form, `Mastery-Trade-${slot}-10`, !!ladder['10']);
  }
  await setPractical('A');
  await setPractical('B');
  await setPractical('C');
  await setPractical('D');

  // Languages: names already set. Now set mastery checkboxes for A–D.
  const languageMastery = safe(character, 'languageMastery');
  function getLanguageSlot(i) {
    if (languageMastery) {
      const slot = i === 0 ? languageMastery.A : i === 1 ? languageMastery.B : i === 2 ? languageMastery.C : languageMastery.D;
      if (slot) return { name: slot.name || '', limited: !!slot.limited, fluent: !!slot.fluent };
    }
    const languagesData = safe(character, 'languagesData') || {};
    const keys = Object.keys(languagesData);
    const name = keys[i] || '';
    const fluency = (languagesData[name] && languagesData[name].fluency) || (name ? 'fluent' : '');
    return { name, limited: fluency === 'limited', fluent: fluency === 'fluent' };
  }
  async function setLanguageMastery(slotName, slotIndex) {
    const slot = getLanguageSlot(slotIndex);
    await setChecked(form, `Mastery-Language-${slotName}-Limited`, !!slot.limited);
    await setChecked(form, `Mastery-Language-${slotName}-Fluent`, !!slot.fluent);
  }
  await setLanguageMastery('A', 0);
  await setLanguageMastery('B', 1);
  await setLanguageMastery('C', 2);
  await setLanguageMastery('D', 3);

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

  const resources = (safe(character, 'characterState') || {}).resources || {};
  const current = resources.current || {};
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


