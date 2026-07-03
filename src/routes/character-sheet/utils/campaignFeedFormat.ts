import { theme } from '../styles/theme';
import type { CampaignEvent } from '../../../lib/types/campaign';

export function formatEvent(event: CampaignEvent): string {
  const p = event.payload as any;
  const name = p?.characterName ?? p?.displayName ?? 'Someone';
  switch (event.type) {
    case 'well_bloodied':      return `[!!] ${name} is well-bloodied!`;
    case 'bloodied':           return `[~] ${name} is bloodied.`;
    case 'deaths_door':        return `[!!] ${name} is on Death's Door!`;
    case 'dead':               return `[*] ${name} has died.`;
    case 'recovered':          return `[+] ${name} has recovered.`;
    case 'rage_start':         return `[>] ${name} enters a Rage!`;
    case 'rage_end':           return `[~] ${name} rage ends.`;
    case 'wild_form_enter':    return `[>] ${name} transforms into Wild Form!`;
    case 'wild_form_exit':     return `[~] ${name} returns from Wild Form.`;
    case 'spell_cast': {
      const sustained = p?.sustained ? ' (sustained)' : '';
      return `[*] ${name} casts ${p?.spellName ?? 'a spell'}${sustained}.`;
    }
    case 'maneuver_used':      return `[>] ${name} uses ${p?.maneuverName ?? 'a maneuver'}.`;
    case 'long_rest':          return `[+] ${name} takes a Long Rest.`;
    case 'condition_gained':   return `[!] ${name} gains condition: ${p?.conditionId ?? 'unknown'}.`;
    case 'condition_cured':    return `[+] ${name} is cured of: ${p?.conditionId ?? 'unknown'}.`;
    case 'exhaustion_changed': {
      const lvl = p?.level ?? '?';
      const prev = p?.prevLevel ?? '?';
      return (p?.level ?? 0) > (p?.prevLevel ?? 0)
        ? `[!] ${name} exhaustion → level ${lvl}.`
        : `[+] ${name} exhaustion → level ${lvl} (was ${prev}).`;
    }
    case 'dice_roll': {
      const label = p?.label ?? 'd20';
      const mode = p?.mode === 'advantage' ? ' (adv)' : p?.mode === 'disadvantage' ? ' (dis)' : '';
      const all = Array.isArray(p?.allResults) ? `[${p.allResults.join(', ')}]` : '';
      const mod = (p?.modifier ?? 0) !== 0
        ? ((p.modifier > 0 ? ' +' : ' ') + p.modifier)
        : '';
      return `[d] ${name}: ${label}${mode} ${all}${mod} = ${p?.total ?? '?'}`;
    }
    case 'member_joined':      return `[+] ${name} joined the campaign.`;
    case 'character_shared':   return `[~] ${name} shared a character.`;
    default:                   return `[*] ${event.type}: ${name}`;
  }
}

export function getEventAccent(type: string): string {
  switch (type) {
    case 'dead':
    case 'deaths_door':
    case 'well_bloodied':
      return theme.colors.accent.danger;
    case 'bloodied':
      return theme.colors.accent.warning;
    case 'recovered':
    case 'condition_cured':
    case 'long_rest':
      return theme.colors.accent.success;
    case 'dice_roll':
      return theme.colors.accent.primary;
    case 'rage_start':
    case 'wild_form_enter':
    case 'condition_gained':
    case 'exhaustion_changed':
      return theme.colors.accent.warning;
    case 'rage_end':
    case 'wild_form_exit':
      return theme.colors.text.muted;
    case 'spell_cast':
    case 'maneuver_used':
      return theme.colors.accent.secondary;
    default:
      return theme.colors.border.default;
  }
}
