'use client';

import React from 'react';
import { LayoutDashboard, Users, PlusCircle, Library, MessageSquare } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenUpload: () => void;
}

export default function MobileNav({ activeTab, setActiveTab, onOpenUpload }: MobileNavProps) {
  return (
    <nav className="mobile-nav">
      <button
        className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
        onClick={() => setActiveTab('dashboard')}
      >
        <LayoutDashboard size={19} />
        <span>Home</span>
      </button>

      <button
        className={`mobile-nav-item ${activeTab === 'community' ? 'active' : ''}`}
        onClick={() => setActiveTab('community')}
      >
        <Users size={19} />
        <span>Buddies</span>
      </button>

      {/* Floating Center Upload Button */}
      <button
        onClick={onOpenUpload}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginTop: -22,
          color: '#65A30D'
        }}
      >
        <div style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          background: '#65A30D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(101, 163, 13, 0.4)',
          color: '#FFFFFF',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <PlusCircle size={26} />
        </div>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#65A30D' }}>Upload</span>
      </button>

      <button
        className={`mobile-nav-item ${activeTab === 'library' ? 'active' : ''}`}
        onClick={() => setActiveTab('library')}
      >
        <Library size={19} />
        <span>PDFs</span>
      </button>

      <button
        className={`mobile-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
        onClick={() => setActiveTab('messages')}
      >
        <MessageSquare size={19} />
        <span>Chat</span>
      </button>
    </nav>
  );
}
