'use client';

import React from 'react';
import { BookOpen, UploadCloud, Flame, Palette } from 'lucide-react';
import { CURRENT_STUDENT } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenUpload: () => void;
  onOpenThemeModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ onOpenUpload, onOpenThemeModal, activeTab, setActiveTab }: NavbarProps) {
  const { activeThemeOption } = useTheme();

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'summary', label: 'Summary' },
    { id: 'flashcards', label: 'Flashcards' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'planner', label: 'Planner' },
    { id: 'community', label: 'Buddies' },
    { id: 'library', label: 'Shared PDFs' },
    { id: 'messages', label: 'Chat' },
  ];

  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        {/* Brand */}
        <div className="brand" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-green)',
            transition: 'transform 0.2s ease'
          }}>
            <BookOpen size={20} color="#fff" />
          </div>
          <span style={{ color: 'var(--text-dark)', fontWeight: 800 }}>StudyMate</span>
          <span style={{ color: 'var(--primary)', fontWeight: 800 }}>AI</span>
          <span className="brand-badge">MVP</span>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-links">
          {navTabs.map(t => (
            <button
              key={t.id}
              className={`nav-item ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Theme Palette Button */}
          <button
            onClick={onOpenThemeModal}
            className="btn btn-secondary"
            style={{
              padding: '6px 12px',
              borderRadius: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.82rem',
              fontWeight: 700
            }}
            title="Customize App Theme & Colors"
          >
            <div style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: activeThemeOption.color,
              boxShadow: `0 0 8px ${activeThemeOption.color}`
            }} />
            <Palette size={15} color="var(--primary)" />
            <span className="hidden-sm">Theme</span>
          </button>

          {/* Streak Indicator */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '5px 12px', borderRadius: 9999,
            background: '#FEF3C7', border: '1px solid #FCD34D',
            fontSize: '0.82rem', fontWeight: 700, color: '#92400E'
          }}>
            <Flame size={15} fill="#F59E0B" color="#D97706" style={{ animation: 'floatGentle 2s ease-in-out infinite' }} />
            <span>4 Days</span>
          </div>

          {/* Upload Button */}
          <button className="btn btn-primary" onClick={onOpenUpload} style={{ padding: '8px 16px', fontSize: '0.86rem' }}>
            <UploadCloud size={16} />
            <span>Upload PDF</span>
          </button>

          {/* Profile pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '4px 12px 4px 4px', borderRadius: 9999,
            background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)',
            cursor: 'pointer'
          }} onClick={() => setActiveTab('community')}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', background: 'var(--primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '0.78rem', color: '#fff'
            }}>EB</div>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dark)' }}>{CURRENT_STUDENT.name.split(' ')[0]}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 600 }}>UNILAG 200L</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
