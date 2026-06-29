import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { Button } from '../../components/ui/button';
import { AuthGuard } from '../../components/auth/AuthGuard';
import { useCampaign, useCampaignRoster, useCampaignMutations, useCampaignEvents } from '../../lib/hooks/useCampaigns';
import { useCurrentUser } from '../../components/auth/CurrentUserContext';
import { api } from '../../../convex/_generated/api';
import type { CampaignRole, CampaignEvent } from '../../lib/types/campaign';

const ROLE_LABELS: Record<CampaignRole, string> = { dm: 'DM', co_dm: 'Co-DM', player: 'Player' };

function formatEvent(event: CampaignEvent): string {
  const name = (event.payload as any)?.characterName ?? (event.payload as any)?.displayName ?? 'Someone';
  switch (event.type) {
    case 'well_bloodied': return `[!!] ${name} is well-bloodied!`;
    case 'bloodied': return `[~] ${name} is bloodied.`;
    case 'deaths_door': return `[!!] ${name} is on Death's Door!`;
    case 'dead': return `[*] ${name} has died.`;
    case 'recovered': return `[+] ${name} has recovered.`;
    case 'member_joined': return `[+] ${name} joined the campaign.`;
    case 'character_shared': return `[~] ${name} was shared.`;
    default: return `[*] ${event.type}: ${name}`;
  }
}

function getStatusPill(currentHP: number | null, maxHP: number | null) {
  if (currentHP === null || maxHP === null || maxHP === 0) {
    return { label: 'Unknown', bg: '#444', color: '#ccc' };
  }
  const quarterHP = Math.floor(maxHP / 4);
  const halfHP = Math.floor(maxHP / 2);
  if (currentHP <= 0) return { label: 'Down', bg: '#7f1d1d', color: '#fca5a5' };
  if (currentHP <= quarterHP) return { label: 'Well-Bloodied', bg: '#78350f', color: '#fcd34d' };
  if (currentHP <= halfHP) return { label: 'Bloodied', bg: '#7f1d1d', color: '#fca5a5' };
  return { label: 'Healthy', bg: '#14532d', color: '#86efac' };
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

  if (!id) return null;
  if (isLoading) return <div style={{ padding: '2rem' }}>Loading campaign...</div>;
  if (!detail) return <div style={{ padding: '2rem' }}>Campaign not found or access denied.</div>;

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
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{campaign.name}</h1>
            <span style={{ background: '#334', color: '#adf', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
              {ROLE_LABELS[myRole]}
            </span>
          </div>
          {campaign.description && (
            <p style={{ color: '#888', marginTop: '0.25rem' }}>{campaign.description}</p>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '0.15em' }}>
              {campaign.code}
            </span>
            <Button variant="outline" onClick={copyCode}>{copyFeedback ? 'Copied!' : 'Copy Code'}</Button>
            <Button variant="outline" onClick={copyLink}>Copy Invite Link</Button>
            {isManager && <Button variant="outline" onClick={handleRegenCode}>Regenerate Code</Button>}
            {isDm && <Button variant="destructive" onClick={handleDelete}>Delete Campaign</Button>}
            {!isDm && <Button variant="outline" onClick={handleLeave}>Leave Campaign</Button>}
          </div>
        </div>

        {/* Stub Roster */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Members & Characters</h2>
            <Button onClick={() => setShowSharePicker(true)}>+ Share a Character</Button>
          </div>

          {showSharePicker && (
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Choose a character to share</h3>
              {myCharacters.length === 0 && <p style={{ color: '#888' }}>No cloud-stored characters.</p>}
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {myCharacters.map((char: any) => {
                  const alreadyShared = mySharedIds.includes(char.id);
                  return (
                    <div key={char.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

          {/* Full Live Roster */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>Character</th>
                <th style={{ padding: '0.5rem' }}>Owner</th>
                <th style={{ padding: '0.5rem' }}>Class</th>
                <th style={{ padding: '0.5rem' }}>Level</th>
                <th style={{ padding: '0.5rem' }}>HP</th>
                <th style={{ padding: '0.5rem' }}>Status</th>
                <th style={{ padding: '0.5rem' }}>View</th>
              </tr>
            </thead>
            <tbody>
              {roster.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '1rem', color: '#888', textAlign: 'center' }}>
                    No shared characters yet.
                  </td>
                </tr>
              )}
              {roster.map((entry) => {
                const isOwner = entry.ownerUserId === currentUser?.userId;
                const statusPill = getStatusPill(entry.currentHP, entry.maxHP);
                return (
                  <tr key={`${entry.memberDocId}-${entry.characterId}`} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{entry.characterName}</td>
                    <td style={{ padding: '0.5rem' }}>
                      {isOwner ? 'You' : (entry.ownerDisplayName ?? 'Unknown')}
                    </td>
                    <td style={{ padding: '0.5rem' }}>{entry.className ?? '—'}</td>
                    <td style={{ padding: '0.5rem' }}>{entry.level ?? '—'}</td>
                    <td style={{ padding: '0.5rem' }}>
                      {entry.currentHP !== null && entry.maxHP !== null
                        ? `${entry.currentHP} / ${entry.maxHP}`
                        : '—'}
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <span style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        background: statusPill.bg,
                        color: statusPill.color,
                      }}>
                        {statusPill.label}
                      </span>
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      {isOwner
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

        {/* Event Feed */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Event Feed</h2>
          {events.length === 0 && (
            <p style={{ color: '#888' }}>No events yet.</p>
          )}
          <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
            {events.map((event) => (
              <div key={event._id} style={{
                padding: '0.5rem 0.75rem',
                background: '#1a1a2e',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.875rem',
              }}>
                <span>{formatEvent(event)}</span>
                <span style={{ color: '#666', fontSize: '0.75rem' }}>
                  {new Date(event.createdAt).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" onClick={() => navigate('/campaigns')}>← Back</Button>
      </div>
    </AuthGuard>
  );
};
