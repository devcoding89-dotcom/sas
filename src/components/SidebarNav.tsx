'use client';

import React from 'react';
import {
  Home,
  Users,
  BookOpen,
  FolderOpen,
  Layers,
  HelpCircle,
  Calendar,
  MessageSquare,
  Bell,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Globe
} from 'lucide-react';
import { CURRENT_STUDENT } from '../data/mockData';

interface SidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadMessagesCount?: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onGoToLanding?: () => void;
}

export default function SidebarNav({
  activeTab,
  setActiveTab,
  unreadMessagesCount = 2,
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
  onGoToLanding
}: SidebarNavProps) {
  const mainNavItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'community', label: 'Discover Students', icon: Users },
    { id: 'library', label: 'My Library', icon: BookOpen },
    { id: 'shared', label: 'Shared with Me', icon: FolderOpen },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'quiz', label: 'Quizzes', icon: HelpCircle },
    { id: 'planner', label: 'Study Planner', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount },
  ];

  const bottomNavItems = [
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tabId: string) => {
    if (tabId === 'shared') setActiveTab('library');
    else setActiveTab(tabId);

    // AUTO-CLOSE SIDEBAR ON MOBILE/TABLET WHEN CLICKED!
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(2, 44, 34, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 190
          }}
        />
      )}

      {/* Sidebar Container — Dark Green Background with Lemon Green Accents */}
      <aside
        className={`saas-sidebar ${isMobileOpen ? 'mobile-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        style={{
          background: '#041C14',
          color: '#A7F3D0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 100,
          borderRight: '1px solid rgba(132, 204, 22, 0.15)',
          flexShrink: 0,
          userSelect: 'none',
          width: isCollapsed ? 74 : 250,
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Brand Header */}
        <div>
          <div style={{
            padding: isCollapsed ? '20px 12px' : '20px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div
              onClick={() => handleNavClick('dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                minWidth: 0
              }}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #84CC16 0%, #15803D 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#041C14',
                boxShadow: '0 4px 12px rgba(132, 204, 22, 0.35)',
                flexShrink: 0
              }}>
                <BookOpen size={20} strokeWidth={2.5} />
              </div>

              {!isCollapsed && (
                <div style={{ lineHeight: 1.15 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                      StudyMate
                    </span>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#84CC16' }}>
                      AI
                    </span>
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#6EE7B7', fontWeight: 600 }}>
                    Learning Hub
                  </span>
                </div>
              )}
            </div>

            {/* Close / Collapse Toggle Buttons */}
            {isMobileOpen ? (
              <button
                onClick={onCloseMobile}
                style={{ color: '#A7F3D0', padding: 4, cursor: 'pointer' }}
                title="Close Navigation"
              >
                <X size={20} />
              </button>
            ) : onToggleCollapse && !isCollapsed && (
              <button
                onClick={onToggleCollapse}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#A7F3D0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: 'none',
                  display: 'flex'
                }}
                title="Collapse Sidebar"
              >
                <ChevronLeft size={16} />
              </button>
            )}
          </div>

          {/* If collapsed, show expand button */}
          {isCollapsed && onToggleCollapse && !isMobileOpen && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
              <button
                onClick={onToggleCollapse}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#A7F3D0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Expand Sidebar"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Main Navigation Links */}
          <nav style={{ padding: '14px 10px 10px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {mainNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'shared' && activeTab === 'library');

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    padding: isCollapsed ? '12px' : '10px 14px',
                    borderRadius: 8,
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 800 : 500,
                    color: isActive ? '#041C14' : '#D1FAE5',
                    background: isActive ? '#84CC16' : 'transparent',
                    boxShadow: isActive ? '0 4px 14px rgba(132, 204, 22, 0.4)' : 'none',
                    transition: 'all 0.15s ease',
                    textAlign: 'left',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Icon size={19} color={isActive ? '#041C14' : '#34D399'} strokeWidth={isActive ? 2.5 : 2} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>

                  {item.badge ? (
                    isCollapsed ? (
                      <span style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#84CC16'
                      }} />
                    ) : (
                      <span style={{
                        padding: '2px 7px',
                        borderRadius: 9999,
                        background: isActive ? '#041C14' : '#84CC16',
                        color: isActive ? '#84CC16' : '#041C14',
                        fontSize: '0.7rem',
                        fontWeight: 800
                      }}>
                        {item.badge}
                      </span>
                    )
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Settings & User Section */}
        <div style={{
          padding: '12px 10px 16px 10px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
          {bottomNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isCollapsed ? 'center' : 'space-between',
                  padding: isCollapsed ? '10px' : '9px 14px',
                  borderRadius: 8,
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 800 : 500,
                  color: isActive ? '#041C14' : '#D1FAE5',
                  background: isActive ? '#84CC16' : 'transparent',
                  boxShadow: isActive ? '0 4px 14px rgba(132, 204, 22, 0.4)' : 'none',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
                }}
                title={isCollapsed ? item.label : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon size={18} color={isActive ? '#041C14' : '#34D399'} strokeWidth={isActive ? 2.5 : 2} />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>

                {item.badge && !isCollapsed ? (
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#EF4444'
                  }} />
                ) : null}
              </button>
            );
          })}

          {/* Website / Landing Page Link */}
          {onGoToLanding && (
            <button
              onClick={() => {
                if (onCloseMobile) onCloseMobile();
                onGoToLanding();
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                padding: isCollapsed ? '9px 0' : '9px 12px',
                borderRadius: 8,
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#6EE7B7',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(132, 204, 22, 0.15)',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
                marginTop: 6,
                gap: 12
              }}
              title={isCollapsed ? "Back to Landing Page" : undefined}
            >
              <Globe size={18} color="#84CC16" />
              {!isCollapsed && <span>Landing Page</span>}
            </button>
          )}

          {/* User Pill */}
          <div
            onClick={() => handleNavClick('settings')}
            style={{
              marginTop: 8,
              padding: isCollapsed ? '8px 0' : '8px 10px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(132, 204, 22, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: 10,
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#84CC16',
              color: '#041C14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.82rem',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              {CURRENT_STUDENT.avatarUrl ? (
                <img src={CURRENT_STUDENT.avatarUrl} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : 'CO'}
            </div>

            {!isCollapsed && (
              <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
                <span style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {CURRENT_STUDENT.name}
                </span>
                <span style={{ fontSize: '0.68rem', color: '#6EE7B7' }}>
                  {CURRENT_STUDENT.level} • UNILAG
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
