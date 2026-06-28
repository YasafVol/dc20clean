import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { Button } from '../../components/ui/button';
import { AuthGuard } from '../../components/auth/AuthGuard';
import { useCampaign, useCampaignMutations } from '../../lib/hooks/useCampaigns';
import { useCurrentUser } from '../../components/auth/CurrentUserContext';
import { api } from '../../../convex/_generated/api';
import type { CampaignRole } from '../../lib/types/campaign';

const ROLE_LABELS: Record<CampaignRole, string> = { dm: 'DM', co_dm: 'Co-DM', player: 'Player' };

export const CampaignDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { detail, isLoading } = useCampaign(id ?? null);
  const currentUser = useCurrentUser();
  const mutations = useCampaignMutations();

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

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>Member</th>
                <th style={{ padding: '0.5rem' }}>Role</th>
                <th style={{ padding: '0.5rem' }}>Shared Characters</th>
                {isManager && <th style={{ padding: '0.5rem' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => {
                const isMe = member.userId === currentUser?.userId;
                return (
                  <tr key={member._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>
                      {member.displayName ?? 'Unknown'} {isMe && '(You)'}
                    </td>
                    <td style={{ padding: '0.5rem' }}>{ROLE_LABELS[member.role]}</td>
                    <td style={{ padding: '0.5rem' }}>
                      {member.sharedCharacterIds.length === 0
                        ? <span style={{ color: '#888' }}>None</span>
                        : member.sharedCharacterIds.join(', ')}
                    </td>
                    {isManager && !isMe && member.role !== 'dm' && (
                      <td style={{ padding: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Button
                            variant="outline"
                            onClick={() =>
                              handleSetRole(member.userId, member.role === 'co_dm' ? 'player' : 'co_dm')
                            }
                          >
                            {member.role === 'co_dm' ? 'Demote' : 'Promote Co-DM'}
                          </Button>
                          <Button variant="destructive" onClick={() => handleKick(member.userId, member.displayName)}>
                            Kick
                          </Button>
                        </div>
                      </td>
                    )}
                    {isManager && (isMe || member.role === 'dm') && <td />}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Button variant="outline" onClick={() => navigate('/campaigns')}>← Back</Button>
      </div>
    </AuthGuard>
  );
};
