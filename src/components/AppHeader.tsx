'use client';

import React from 'react';
import { Search, Bell, Flame, UploadCloud, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { CURRENT_STUDENT } from '../data/mockData';

interface AppHeaderProps {
  onOpenUpload: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToProfile?: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export default function AppHeader({
  onOpenUpload,
  onNavigateToNotifications,
  onNavigateToProfile,
  onToggleSidebar,
  isSidebarCollapsed
}: AppHeaderProps) {
  return (
    <header style={{
      height: 64,
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(8px)',
      boxShadow: 'var(--shadow-xs)',
      gap: 16
    }}>
      {/* Left Search & Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, maxWidth: 520 }}>
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="btn btn-secondary"
            style={{ padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}
            title={isSidebarCollapsed ? "Expand Sidebar Navigation" : "Collapse Sidebar Navigation"}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen size={18} color="#65A30D" />
            ) : (
              <Menu size={18} color="var(--text-secondary)" />
            )}
          </button>
        )}

        {/* Global Search Input */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14 }} />
          <input
            type="text"
            placeholder="Search for students, documents, or courses..."
            style={{
              width: '100%',
              padding: '9px 14px 9px 38px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-dark)',
              fontSize: '0.86rem',
              outline: 'none',
              transition: 'border-color 0.15s ease',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {/* Right Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Streak Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 12px',
          borderRadius: 9999,
          background: '#FEF3C7',
          border: '1px solid #FCD34D',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#92400E'
        }}>
          <Flame size={15} fill="#F59E0B" color="#D97706" style={{ animation: 'floatGentle 2s ease-in-out infinite' }} />
          <span>4 Days</span>
        </div>

        {/* Upload Button */}
        <button
          className="btn btn-primary"
          onClick={onOpenUpload}
          style={{ padding: '8px 16px', fontSize: '0.84rem' }}
        >
          <UploadCloud size={16} />
          <span>Upload PDF</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onNavigateToNotifications}
          className="btn btn-secondary"
          style={{ padding: '8px 10px', borderRadius: 'var(--radius-md)', position: 'relative' }}
          title="Notifications"
        >
          <Bell size={16} color="var(--text-secondary)" />
          <span style={{
            position: 'absolute',
            top: 6,
            right: 6,
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
            gap: 10,
            padding: '4px 10px 4px 4px',
            borderRadius: 9999,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-light)',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#65A30D',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.78rem',
            overflow: 'hidden'
          }}>
            {CURRENT_STUDENT.avatarUrl ? (
              <img src={CURRENT_STUDENT.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : 'CO'}
          </div>

          <div style={{ lineHeight: 1.15 }}>
            <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              {CURRENT_STUDENT.name.split(' ')[0]}
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
              {CURRENT_STUDENT.level}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
