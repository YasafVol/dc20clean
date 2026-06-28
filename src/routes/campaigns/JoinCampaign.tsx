import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { AuthGuard } from '../../components/auth/AuthGuard';
import { useCampaignMutations } from '../../lib/hooks/useCampaigns';

export const JoinCampaign: React.FC = () => {
  const navigate = useNavigate();
  const { code: urlCode } = useParams<{ code?: string }>();
  const { joinByCode } = useCampaignMutations();

  const [code, setCode] = useState(urlCode ?? '');
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  const handleJoin = async (joinCode: string) => {
    if (!joinCode.trim()) return;
    setJoining(true);
    setError(null);
    try {
      const result = await joinByCode(joinCode.trim().toUpperCase());
      navigate(`/campaigns/${result.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid or expired code');
      setJoining(false);
    }
  };

  // Auto-join when arriving via deep link
  useEffect(() => {
    if (urlCode) {
      handleJoin(urlCode);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (urlCode && joining && !error) {
    return (
      <AuthGuard feature="general">
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Joining campaign...</p>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard feature="general">
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Join Campaign</h1>
        <input
          type="text"
          placeholder="Enter 6-character code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && handleJoin(code)}
          maxLength={6}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1.25rem',
            letterSpacing: '0.2em',
            textAlign: 'center',
            textTransform: 'uppercase',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '0.75rem',
          }}
          autoFocus
        />
        {error && (
          <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            {error === 'Invalid or expired join code'
              ? 'Invalid or expired code. Check the code and try again.'
              : error}
          </p>
        )}
        <Button
          style={{ width: '100%' }}
          onClick={() => handleJoin(code)}
          disabled={code.length !== 6 || joining}
        >
          {joining ? 'Joining...' : 'Join'}
        </Button>
        <Button
          variant="outline"
          style={{ width: '100%', marginTop: '0.5rem' }}
          onClick={() => navigate('/campaigns')}
        >
          Cancel
        </Button>
      </div>
    </AuthGuard>
  );
};
