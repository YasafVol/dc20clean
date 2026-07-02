import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { Button } from '../../components/ui/button';
import { AuthGuard } from '../../components/auth/AuthGuard';
import { useCampaign, useCampaignRoster, useCampaignMutations, useCampaignEvents } from '../../lib/hooks/useCampaigns';
import { useCurrentUser } from '../../components/auth/CurrentUserContext';
import { api } from '../../../convex/_generated/api';
import type { CampaignRole, CampaignEvent } from '../../lib/types/campaign';
import { theme } from '../character-sheet/styles/theme';

const ROLE_LABELS: Record<CampaignRole, string> = { dm: 'DM', co_dm: 'Co-DM', player: 'Player' };

type FilterCategory = 'vitals' | 'dice' | 'combat' | 'spells' | 'rests' | 'conditions' | 'system';

const FILTER_CATEGORIES: Array<{ key: FilterCategory; label: string; types: string[] }> = [
  { key: 'vitals',     label: 'HP / Vitals',      types: ['bloodied', 'well_bloodied', 'deaths_door', 'dead', 'recovered'] },
  { key: 'dice',       label: 'Dice Rolls',        types: ['dice_roll'] },
  { key: 'combat',     label: 'Combat Actions',    types: ['rage_start', 'rage_end', 'wild_form_enter', 'wild_form_exit'] },
  { key: 'spells',     label: 'Spells & Maneuvers', types: ['spell_cast', 'maneuver_used'] },
  { key: 'rests',      label: 'Rests',             types: ['long_rest'] },
  { key: 'conditions', label: 'Conditions',        types: ['condition_gained', 'condition_cured', 'exhaustion_changed'] },
  { key: 'system',     label: 'System',            types: ['member_joined', 'character_shared'] },
];

const ALL_ENABLED: Record<FilterCategory, boolean> = {
  vitals: true, dice: true, combat: true, spells: true, rests: true, conditions: true, system: true,
};

function loadFilters(campaignId: string): Record<FilterCategory, boolean> {
  try {
    const raw = localStorage.getItem(`campaign-feed-filters-${campaignId}`);
    if (!raw) return { ...ALL_ENABLED };
    return { ...ALL_ENABLED, ...JSON.parse(raw) };
  } catch {
    return { ...ALL_ENABLED };
  }
}

function saveFilters(campaignId: string, filters: Record<FilterCategory, boolean>) {
  localStorage.setItem(`campaign-feed-filters-${campaignId}`, JSON.stringify(filters));
}

function formatEvent(event: CampaignEvent): string {
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

function getStatusPill(currentHP: number | null, maxHP: number | null) {
  if (currentHP === null || maxHP === null || maxHP === 0) {
    return {
      label: 'Unknown',
      bg: 'rgba(86,95,137,0.2)',
      color: theme.colors.text.muted,
      border: `1px solid ${theme.colors.border.default}`,
    };
  }
  const quarterHP = Math.floor(maxHP / 4);
  const halfHP = Math.floor(maxHP / 2);
  if (currentHP <= 0) return {
    label: 'Down',
    bg: theme.colors.accent.dangerAlpha30,
    color: theme.colors.accent.danger,
    border: `1px solid ${theme.colors.accent.dangerAlpha40}`,
  };
  if (currentHP <= quarterHP) return {
    label: 'Well-Bloodied',
    bg: theme.colors.accent.warningAlpha20,
    color: theme.colors.accent.warning,
    border: `1px solid ${theme.colors.accent.warningAlpha30}`,
  };
  if (currentHP <= halfHP) return {
    label: 'Bloodied',
    bg: theme.colors.accent.dangerAlpha20,
    color: theme.colors.accent.danger,
    border: `1px solid ${theme.colors.accent.dangerAlpha30}`,
  };
  return {
    label: 'Healthy',
    bg: 'rgba(158,206,106,0.15)',
    color: theme.colors.accent.success,
    border: '1px solid rgba(158,206,106,0.3)',
  };
}

function getEventAccent(type: string): string {
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

export const CampaignDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { detail, isLoading } = useCampaign(id ?? null);
  const currentUser = useCurrentUser();
  const { roster } = useCampaignRoster(id ?? null);
  const mutations = useCampaignMutations();
  const { events } = useCampaignEvents(id ?? null);

  // Character list for share picker (owner's cloud characters)
  const myCharacters = useQuery(api.characters.list) ?? [];

  const [showSharePicker, setShowSharePicker] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [filters, setFilters] = useState<Record<FilterCategory, boolean>>(
    () => loadFilters(id ?? '')
  );

  useEffect(() => {
    if (id) saveFilters(id, filters);
  }, [id, filters]);

  const toggleFilter = (key: FilterCategory) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allowedTypes = new Set(
    FILTER_CATEGORIES.filter(cat => filters[cat.key]).flatMap(cat => cat.types)
  );

  const filteredEvents = events.filter(e => allowedTypes.has(e.type));

  if (!id) return null;
  if (isLoading) return (
    <div style={{ background: theme.colors.bg.primary, color: theme.colors.text.secondary, padding: '2rem', minHeight: '100vh' }}>
      Loading campaign...
    </div>
  );
  if (!detail) return (
    <div style={{ background: theme.colors.bg.primary, color: theme.colors.text.secondary, padding: '2rem', minHeight: '100vh' }}>
      Campaign not found or access denied.
    </div>
  );

  const { campaign, members, myRole } = detail;
  const isManager = myRole === 'dm' || myRole === 'co_dm';
  const isDm = myRole === 'dm';

  const inviteLink = `${window.location.origin}/campaigns/join/${campaign.code}`;

  const copyCode = () => {
    navigator.clipboard.writeText(campaign.code);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const copyLink = () => navigator.clipboard.writeText(inviteLink);

  const handleRegenCode = async () => {
    if (!confirm('Regenerate join code? The old code and link will stop working.')) return;
    await mutations.regenerateCode(campaign.id);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${campaign.name}"? This cannot be undone.`)) return;
    await mutations.deleteCampaign(campaign.id);
    navigate('/campaigns');
  };

  const handleLeave = async () => {
    if (!confirm('Leave this campaign?')) return;
    await mutations.leaveCampaign(campaign.id);
    navigate('/campaigns');
  };

  const handleKick = async (targetUserId: string, displayName?: string) => {
    if (!confirm(`Kick ${displayName ?? 'this member'}?`)) return;
    await mutations.kickMember(campaign.id, targetUserId);
  };

  const handleSetRole = async (targetUserId: string, role: 'co_dm' | 'player') => {
    await mutations.setMemberRole(campaign.id, targetUserId, role);
  };

  // Determine which characters the current user has already shared in this campaign
  const myMember = members.find((m) => m.userId === currentUser?.userId);
  const mySharedIds = myMember?.sharedCharacterIds ?? [];

  const handleShareCharacter = async (characterId: string) => {
    await mutations.shareCharacter(campaign.id, characterId);
    setShowSharePicker(false);
  };

  const handleUnshare = async (characterId: string) => {
    await mutations.unshareCharacter(campaign.id, characterId);
  };

  return (
    <AuthGuard feature="general">
      <div style={{
        background: theme.colors.bg.primary,
        color: theme.colors.text.primary,
        fontFamily: theme.typography.fontFamily.primary,
        minHeight: '100vh',
        padding: '2rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme.colors.text.primary }}>{campaign.name}</h1>
            <span style={{
              background: theme.colors.accent.infoAlpha20,
              color: theme.colors.accent.info,
              border: `1px solid ${theme.colors.accent.infoAlpha30}`,
              padding: '0.2rem 0.6rem',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              {ROLE_LABELS[myRole]}
            </span>
          </div>
          {campaign.description && (
            <p style={{ color: theme.colors.text.muted, marginTop: '0.25rem' }}>{campaign.description}</p>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: theme.typography.fontFamily.mono,
              color: theme.colors.accent.primary,
              fontSize: '1.25rem',
              letterSpacing: '0.15em',
              fontWeight: 700,
            }}>
              {campaign.code}
            </span>
            <Button variant="outline" onClick={copyCode}>{copyFeedback ? 'Copied!' : 'Copy Code'}</Button>
            <Button variant="outline" onClick={copyLink}>Copy Invite Link</Button>
            {isManager && <Button variant="outline" onClick={handleRegenCode}>Regenerate Code</Button>}
            {isDm && <Button variant="destructive" onClick={handleDelete}>Delete Campaign</Button>}
            {!isDm && <Button variant="outline" onClick={handleLeave}>Leave Campaign</Button>}
          </div>
        </div>

        {/* Members & Characters card */}
        <div style={{
          background: theme.colors.bg.secondary,
          border: `1px solid ${theme.colors.border.default}`,
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: theme.colors.text.primary }}>Members & Characters</h2>
            <Button onClick={() => setShowSharePicker(true)}>+ Share a Character</Button>
          </div>

          {showSharePicker && (
            <div style={{
              background: theme.colors.bg.elevated,
              border: `1px solid ${theme.colors.border.default}`,
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1rem',
            }}>
              <h3 style={{ marginBottom: '0.5rem', color: theme.colors.text.primary }}>Choose a character to share</h3>
              {myCharacters.length === 0 && <p style={{ color: theme.colors.text.muted }}>No cloud-stored characters.</p>}
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {myCharacters.map((char: any) => {
                  const alreadyShared = mySharedIds.includes(char.id);
                  return (
                    <div key={char.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: theme.colors.text.primary }}>
                      <span>{char.finalName} (Lv {char.level} {char.classId})</span>
                      {alreadyShared
                        ? <Button variant="outline" onClick={() => handleUnshare(char.id)}>Unshare</Button>
                        : <Button onClick={() => handleShareCharacter(char.id)}>Share</Button>
                      }
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" style={{ marginTop: '0.5rem' }} onClick={() => setShowSharePicker(false)}>
                Close
              </Button>
            </div>
          )}

          {/* Member list with role management */}
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.text.secondary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Members</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {members.map((m: any) => {
                const isSelf = m.userId === currentUser?.userId;
                const isDmTarget = m.role === 'dm';
                const roleBadgeColor = m.role === 'dm'
                  ? { bg: theme.colors.accent.dangerAlpha20, color: theme.colors.accent.danger, border: `1px solid ${theme.colors.accent.danger}40` }
                  : m.role === 'co_dm'
                  ? { bg: theme.colors.accent.warningAlpha20, color: theme.colors.accent.warning, border: `1px solid ${theme.colors.accent.warning}40` }
                  : { bg: theme.colors.accent.infoAlpha20, color: theme.colors.accent.info, border: `1px solid ${theme.colors.accent.infoAlpha30}` };
                return (
                  <div key={m._id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.5rem', borderRadius: '0.375rem', background: theme.colors.bg.elevated }}>
                    <span style={{ flex: 1, fontSize: '0.875rem', color: theme.colors.text.primary }}>
                      {isSelf ? 'You' : (m.displayName ?? 'Unknown')}
                    </span>
                    <span style={{ padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600, ...roleBadgeColor }}>
                      {ROLE_LABELS[m.role as CampaignRole]}
                    </span>
                    {myRole === 'dm' && !isSelf && !isDmTarget && (
                      <>
                        {m.role === 'player' && (
                          <Button variant="outline" onClick={() => handleSetRole(m.userId, 'co_dm')} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                            Make Co-DM
                          </Button>
                        )}
                        {m.role === 'co_dm' && (
                          <Button variant="outline" onClick={() => handleSetRole(m.userId, 'player')} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                            Demote
                          </Button>
                        )}
                        <Button variant="outline" onClick={() => handleKick(m.userId, m.displayName)} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', color: theme.colors.accent.danger, borderColor: theme.colors.accent.danger }}>
                          Kick
                        </Button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full Live Roster */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', color: theme.colors.text.primary }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.colors.border.default}`, textAlign: 'left' }}>
                <th style={{ padding: '0.5rem 0.75rem', color: theme.colors.text.secondary, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Character</th>
                <th style={{ padding: '0.5rem 0.75rem', color: theme.colors.text.secondary, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Owner</th>
                <th style={{ padding: '0.5rem 0.75rem', color: theme.colors.text.secondary, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Class</th>
                <th style={{ padding: '0.5rem 0.75rem', color: theme.colors.text.secondary, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Level</th>
                <th style={{ padding: '0.5rem 0.75rem', color: theme.colors.text.secondary, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>HP</th>
                <th style={{ padding: '0.5rem 0.75rem', color: theme.colors.text.secondary, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '0.5rem 0.75rem', color: theme.colors.text.secondary, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>View</th>
              </tr>
            </thead>
            <tbody>
              {roster.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '1rem', color: theme.colors.text.muted, textAlign: 'center', fontSize: '0.875rem' }}>
                    No shared characters yet.
                  </td>
                </tr>
              )}
              {roster.map((entry) => {
                const isOwner = entry.ownerUserId === currentUser?.userId;
                const statusPill = getStatusPill(entry.currentHP, entry.maxHP);
                return (
                  <tr key={`${entry.memberDocId}-${entry.characterId}`} style={{ borderBottom: '1px solid rgba(59,66,97,0.4)' }}>
                    <td style={{ padding: '0.5rem 0.75rem', fontWeight: 'bold' }}>{entry.characterName}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      {isOwner ? 'You' : (entry.ownerDisplayName ?? 'Unknown')}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{entry.className ?? '—'}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>{entry.level ?? '—'}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      {entry.currentHP !== null && entry.maxHP !== null
                        ? `${entry.currentHP} / ${entry.maxHP}`
                        : '—'}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      <span style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        background: statusPill.bg,
                        color: statusPill.color,
                        border: statusPill.border,
                      }}>
                        {statusPill.label}
                      </span>
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      {currentUser === undefined
                        ? <Button variant="outline" disabled>...</Button>
                        : isOwner
                        ? <Button variant="outline" onClick={() => navigate(`/character/${entry.characterId}`)}>Open</Button>
                        : <Button variant="outline" onClick={() => navigate(`/campaigns/${id}/character/${entry.characterId}`)}>View</Button>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Event Feed card */}
        <div style={{
          background: theme.colors.bg.secondary,
          border: `1px solid ${theme.colors.border.default}`,
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '0.75rem' }}>Event Feed</h2>

          {/* Filter chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
            {FILTER_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => toggleFilter(cat.key)}
                style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: filters[cat.key] ? theme.colors.accent.infoAlpha20 : 'transparent',
                  border: filters[cat.key] ? `1px solid ${theme.colors.accent.infoAlpha30}` : `1px solid ${theme.colors.border.default}`,
                  color: filters[cat.key] ? theme.colors.accent.info : theme.colors.text.muted,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {events.length === 0 ? (
            <p style={{ color: theme.colors.text.muted, fontSize: '0.875rem', padding: '1rem 0' }}>No events yet.</p>
          ) : filteredEvents.length === 0 ? (
            <p style={{ color: theme.colors.text.muted, fontSize: '0.875rem', padding: '1rem 0' }}>No events match the current filter.</p>
          ) : null}
          <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
            {filteredEvents.map((event) => (
              <div key={event._id} style={{
                background: theme.colors.bg.elevated,
                borderRadius: '0.5rem',
                borderLeft: `3px solid ${getEventAccent(event.type)}`,
                padding: '0.5rem 0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.875rem',
                color: theme.colors.text.primary,
              }}>
                <span>{formatEvent(event)}</span>
                <span style={{ color: theme.colors.text.muted, fontSize: '0.75rem' }}>
                  {new Date(event.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Button variant="outline" onClick={() => navigate('/campaigns')}>← Back</Button>
        </div>
      </div>
    </AuthGuard>
  );
};
