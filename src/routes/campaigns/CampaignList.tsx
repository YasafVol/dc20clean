import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { AuthGuard } from '../../components/auth/AuthGuard';
import { useMyCampaigns, useCampaignMutations } from '../../lib/hooks/useCampaigns';
import type { CampaignRole } from '../../lib/types/campaign';

const ROLE_LABELS: Record<CampaignRole, string> = {
  dm: 'DM',
  co_dm: 'Co-DM',
  player: 'Player',
};

export const CampaignList: React.FC = () => {
  const navigate = useNavigate();
  const { campaigns, isLoading } = useMyCampaigns();
  const { createCampaign, deleteCampaign } = useCampaignMutations();

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      const result = await createCampaign(newName.trim());
      setCreating(false);
      setNewName('');
      navigate(`/campaigns/${(result as { id: string }).id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create campaign');
    }
  };

  const handleDelete = async (campaignId: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await deleteCampaign(campaignId);
  };

  return (
    <AuthGuard feature="general">
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>My Campaigns</h1>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button onClick={() => navigate('/campaigns/join')}>Join Campaign</Button>
            <Button onClick={() => setCreating(true)}>Create Campaign</Button>
          </div>
        </div>

        {creating && (
          <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>New Campaign</h2>
            <input
              type="text"
              placeholder="Campaign name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
              autoFocus
            />
            {error && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button onClick={handleCreate} disabled={!newName.trim()}>Create</Button>
              <Button variant="outline" onClick={() => { setCreating(false); setNewName(''); setError(null); }}>Cancel</Button>
            </div>
          </div>
        )}

        {isLoading && <p>Loading campaigns...</p>}

        {!isLoading && campaigns.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No campaigns yet.</p>
            <p>Create a campaign or join one with a code.</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: '1rem' }}>
          {campaigns.map(({ campaign, role }) => (
            <div
              key={campaign.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
            >
              <div>
                <div style={{ fontWeight: 'bold' }}>{campaign.name}</div>
                <div style={{ fontSize: '0.875rem', color: '#888' }}>
                  Role: {ROLE_LABELS[role]} · Code: {campaign.code}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }} onClick={(e) => e.stopPropagation()}>
                <Button variant="outline" onClick={() => navigate(`/campaigns/${campaign.id}`)}>Open</Button>
                {role === 'dm' && (
                  <Button variant="destructive" onClick={() => handleDelete(campaign.id, campaign.name)}>
                    Delete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/menu')}>
          ← Back to Menu
        </Button>
      </div>
    </AuthGuard>
  );
};
