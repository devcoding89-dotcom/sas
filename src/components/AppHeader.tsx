'use client';

import React from 'react';
import { Search, Bell, Flame, UploadCloud, Menu, PanelLeftClose, PanelLeftOpen, Globe } from 'lucide-react';
import { CURRENT_STUDENT } from '../data/mockData';

interface AppHeaderProps {
  onOpenUpload: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToProfile?: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  onGoToLanding?: () => void;
}

export default function AppHeader({
  onOpenUpload,
  onNavigateToNotifications,
  onNavigateToProfile,
  onToggleSidebar,
  isSidebarCollapsed,
  onGoToLanding
}: AppHeaderProps) {
  return (
    <header style={{
      height: 64,
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(8px)',
      boxShadow: 'var(--shadow-xs)',
      gap: 12
    }}>
      {/* Left Search & Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="btn btn-secondary"
            style={{ padding: '8px 10px', borderRadius: 'var(--radius-sm)', flexShrink: 0 }}
            title={isSidebarCollapsed ? "Expand Sidebar Navigation" : "Collapse Sidebar Navigation"}
            aria-label="Toggle Navigation"
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen size={18} color="#65A30D" />
            ) : (
              <Menu size={18} color="var(--text-secondary)" />
            )}
          </button>
        )}

        {/* Global Search Input */}
        <div className="header-search-wrap" style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 420
        }}>
          <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 12 }} />
          <input
            type="text"
            placeholder="Search documents, courses..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 34px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-dark)',
              fontSize: '0.84rem',
              outline: 'none',
              transition: 'border-color 0.15s ease',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {/* Right Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {/* Website Landing Link */}
        {onGoToLanding && (
          <button
            onClick={onGoToLanding}
            className="btn btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.78rem', gap: 5, borderRadius: 'var(--radius-sm)' }}
            title="View Public Landing Page"
          >
            <Globe size={14} color="#65A30D" />
            <span className="header-desktop-label" style={{ fontWeight: 600 }}>Website</span>
          </button>
        )}

        {/* Streak Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '5px 9px',
          borderRadius: 9999,
          background: '#FEF3C7',
          border: '1px solid #FCD34D',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#92400E'
        }}>
          <Flame size={14} fill="#F59E0B" color="#D97706" style={{ animation: 'floatGentle 2s ease-in-out infinite' }} />
          <span className="header-streak-text">4 Days</span>
        </div>

        {/* Upload Button */}
        <button
          className="btn btn-primary"
          onClick={onOpenUpload}
          style={{ padding: '7px 12px', fontSize: '0.82rem', gap: 6 }}
          title="Upload PDF Document"
        >
          <UploadCloud size={16} />
          <span className="header-desktop-label">Upload</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onNavigateToNotifications}
          className="btn btn-secondary"
          style={{ padding: '7px 9px', borderRadius: 'var(--radius-md)', position: 'relative' }}
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={16} color="var(--text-secondary)" />
          <span style={{
            position: 'absolute',
            top: 5,
            right: 5,
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#EF4444'
          }} />
        </button>

        {/* User Pill */}
        <div
          onClick={onNavigateToProfile}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '3px 8px 3px 3px',
            borderRadius: 9999,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-light)',
            cursor: 'pointer'
          }}
          title="Profile & Settings"
        >
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#65A30D',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.75rem',
            overflow: 'hidden'
          }}>
            {CURRENT_STUDENT.avatarUrl ? (
              <img src={CURRENT_STUDENT.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : 'CO'}
          </div>

          <div className="header-user-name" style={{ lineHeight: 1.15 }}>
            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              {CURRENT_STUDENT.name.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
