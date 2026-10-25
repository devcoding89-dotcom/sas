'use client';

import React from 'react';
import {
  UploadCloud,
  Users,
  Layers,
  HelpCircle,
  Calendar,
  FileText,
  Package,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Share2,
  UserPlus
} from 'lucide-react';
import { CURRENT_STUDENT } from '../data/mockData';

interface DashboardTabProps {
  onOpenUpload: () => void;
  onSelectMaterial: (tab: string) => void;
}

export default function DashboardTab({
  onOpenUpload,
  onSelectMaterial
}: DashboardTabProps) {
  const quickActions = [
    {
      id: 'upload',
      title: 'Upload PDF',
      desc: 'Start studying',
      icon: UploadCloud,
      color: '#4F46E5',
      bg: '#EEF2FF',
      onClick: onOpenUpload
    },
    {
      id: 'community',
      title: 'Discover Students',
      desc: 'Find your classmates',
      icon: Users,
      color: '#06B6D4',
      bg: '#ECFEFF',
      onClick: () => onSelectMaterial('community')
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      desc: 'Review your cards',
      icon: Layers,
      color: '#EC4899',
      bg: '#FDF2F8',
      onClick: () => onSelectMaterial('flashcards')
    },
    {
      id: 'quiz',
      title: 'Quizzes',
      desc: 'Test your knowledge',
      icon: HelpCircle,
      color: '#10B981',
      bg: '#ECFDF5',
      onClick: () => onSelectMaterial('quiz')
    },
    {
      id: 'planner',
      title: 'Study Planner',
      desc: 'Plan your sessions',
      icon: Calendar,
      color: '#F59E0B',
      bg: '#FFFBEB',
      onClick: () => onSelectMaterial('planner')
    },
  ];

  const continueStudyingDocs = [
    {
      id: 'doc-cn',
      title: 'Computer Networks Lecture Notes',
      course: 'Computer Networks',
      time: '2 hours ago',
      status: 'processing',
      statusLabel: 'Processing',
      color: '#6366F1'
    },
    {
      id: 'doc-dsa',
      title: 'Data Structures and Algorithms',
      course: 'Computer Science',
      time: '1 day ago',
      status: 'ready',
      statusLabel: 'Ready',
      color: '#10B981'
    },
    {
      id: 'doc-os',
      title: 'Operating Systems Summary',
      course: 'Computer Science',
      time: '3 days ago',
      status: 'ready',
      statusLabel: 'Ready',
      color: '#3B82F6'
    },
  ];

  const upcomingSessions = [
    {
      id: 'up-1',
      title: 'Data Structures Revision',
      time: 'Today • 10:00 AM - 12:00 PM',
      color: '#10B981'
    },
    {
      id: 'up-2',
      title: 'Computer Networks',
      time: 'Tomorrow • 3:00 PM - 5:00 PM',
      color: '#6366F1'
    },
    {
      id: 'up-3',
      title: 'Operating Systems',
      time: 'Fri, 26 Apr • 10:00 AM - 12:00 PM',
      color: '#3B82F6'
    },
  ];

  const recentActivity = [
    {
      id: 'act-1',
      text: 'Sarah shared a document with you',
      time: '2 hours ago',
      icon: Share2,
      color: '#06B6D4',
      bg: '#ECFEFF'
    },
    {
      id: 'act-2',
      text: 'Your study pack is ready',
      time: '5 hours ago',
      icon: CheckCircle2,
      color: '#10B981',
      bg: '#ECFDF5'
    },
    {
      id: 'act-3',
      text: 'Tunde sent you a friend request',
      time: '1 day ago',
      icon: UserPlus,
      color: '#8B5CF6',
      bg: '#F5F3FF'
    },
    {
      id: 'act-4',
      text: 'You completed a quiz',
      time: '1 day ago',
      icon: Award,
      color: '#F59E0B',
      bg: '#FFFBEB'
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 1180, margin: '0 auto' }}>
      {/* 1. Greeting & Hero Header (exact from Figma) */}
      <div>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: 'var(--text-dark)',
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          Good morning, {CURRENT_STUDENT.name.split(' ')[0]} 👋
        </h1>
        <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', marginTop: 4 }}>
          What would you like to study today?
        </p>
      </div>

      {/* 2. Quick Actions 5-Card Grid (exact from Figma) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 14
      }}>
        {quickActions.map(action => {
          const Icon = action.icon;
          return (
            <div
              key={action.id}
              onClick={action.onClick}
              className="card"
              style={{
                padding: '20px 18px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-card)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: action.bg,
                color: action.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 2px 8px ${action.color}22`
              }}>
                <Icon size={22} />
              </div>

              <div>
                <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 2 }}>
                  {action.title}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {action.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Main 2-Column Section (Progress & Continue vs Upcoming & Activity) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: 24,
        alignItems: 'start'
      }}>
        {/* LEFT MAIN COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Your Progress Row (Figma: 12 Documents | 5 Study Packs | 3 Quizzes | 8 Study Sessions) */}
          <div className="card" style={{ padding: '20px 24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 16 }}>
              Your Progress
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
              textAlign: 'center'
            }}>
              <div style={{
                padding: '12px 8px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-light)'
              }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>
                  12
                </span>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Documents
                </span>
              </div>

              <div style={{
                padding: '12px 8px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-light)'
              }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#6366F1', display: 'block' }}>
                  5
                </span>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Study Packs
                </span>
              </div>

              <div style={{
                padding: '12px 8px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-light)'
              }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10B981', display: 'block' }}>
                  3
                </span>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Quizzes
                </span>
              </div>

              <div style={{
                padding: '12px 8px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-light)'
              }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F59E0B', display: 'block' }}>
                  8
                </span>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Study Sessions
                </span>
              </div>
            </div>
          </div>

          {/* Continue Studying List (Figma exact document rows) */}
          <div className="card" style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                Continue Studying
              </h3>
              <button
                className="btn btn-ghost"
                onClick={() => onSelectMaterial('library')}
                style={{ fontSize: '0.8rem', padding: '4px 8px' }}
              >
                View all
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {continueStudyingDocs.map(doc => {
                const isReady = doc.status === 'ready';

                return (
                  <div
                    key={doc.id}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-card)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 14,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${doc.color}18`,
                        color: doc.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <FileText size={20} />
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <span style={{
                          display: 'block',
                          fontSize: '0.94rem',
                          fontWeight: 700,
                          color: 'var(--text-dark)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {doc.title}
                        </span>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          {doc.course} • {doc.time}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                      {/* Status badge */}
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: 9999,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: isReady ? '#DCFCE7' : '#FEF3C7',
                        color: isReady ? '#15803D' : '#B45309',
                        border: `1px solid ${isReady ? '#86EFAC' : '#FCD34D'}`
                      }}>
                        {doc.statusLabel}
                      </span>

                      {/* Action button */}
                      <button
                        className={`btn ${isReady ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => onSelectMaterial('summary')}
                        style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                      >
                        {isReady ? 'Open' : 'Continue'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (SIDEBAR WIDGETS) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Upcoming Sessions Widget (Figma exact) */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                Upcoming Sessions
              </h3>
              <button
                className="btn btn-ghost"
                onClick={() => onSelectMaterial('planner')}
                style={{ fontSize: '0.75rem', padding: '2px 6px' }}
              >
                View all
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {upcomingSessions.map(session => (
                <div
                  key={session.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <span style={{
                      display: 'block',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      color: 'var(--text-dark)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {session.title}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {session.time}
                    </span>
                  </div>

                  <button
                    className="btn btn-secondary"
                    onClick={() => onSelectMaterial('planner')}
                    style={{
                      padding: '5px 12px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Widget (Figma exact) */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                Recent Activity
              </h3>
              <button
                className="btn btn-ghost"
                style={{ fontSize: '0.75rem', padding: '2px 6px' }}
              >
                View all
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recentActivity.map(act => {
                const Icon = act.icon;
                return (
                  <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: act.bg,
                      color: act.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2
                    }}>
                      <Icon size={16} />
                    </div>

                    <div style={{ minWidth: 0, lineHeight: 1.3 }}>
                      <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                        {act.text}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {act.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
