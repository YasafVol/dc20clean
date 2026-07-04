import React, { useEffect } from 'react';
import { theme } from '../styles/theme';
import { formatEvent, getEventAccent } from '../utils/campaignFeedFormat';
import type { CampaignEvent } from '../../../lib/types/campaign';

interface CampaignFeedPanelProps {
  campaignName: string;
  events: CampaignEvent[];
  onClose: () => void;
}

export function CampaignFeedPanel({ campaignName, events, onClose }: CampaignFeedPanelProps) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 9998,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 'min(380px, 100vw)',
          height: '100vh',
          background: theme.colors.bg.secondary,
          borderLeft: `1px solid ${theme.colors.border.default}`,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: `1px solid ${theme.colors.border.default}`,
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: theme.colors.text.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.15rem' }}>
              Campaign Feed
            </div>
            <div style={{ fontWeight: 700, color: theme.colors.text.primary, fontSize: '1rem' }}>
              {campaignName}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: theme.colors.text.muted,
              fontSize: '1.25rem',
              lineHeight: 1,
              padding: '0.25rem',
            }}
            aria-label="Close feed"
          >
            ×
          </button>
        </div>

        {/* Events list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem', scrollbarWidth: 'thin' }}>
          {sorted.length === 0 ? (
            <p style={{ color: theme.colors.text.muted, fontSize: '0.875rem', textAlign: 'center', marginTop: '2rem' }}>
              No events yet.
            </p>
          ) : (
            sorted.map((event) => (
              <div
                key={event._id ?? event.createdAt}
                style={{
                  borderLeft: `3px solid ${getEventAccent(event.type)}`,
                  paddingLeft: '0.75rem',
                  marginBottom: '0.75rem',
                  paddingTop: '0.1rem',
                  paddingBottom: '0.1rem',
                }}
              >
                <div style={{ fontSize: '0.7rem', color: theme.colors.text.muted, marginBottom: '0.15rem' }}>
                  {new Date(event.createdAt).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div style={{ fontSize: '0.875rem', color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.mono }}>
                  {formatEvent(event)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
