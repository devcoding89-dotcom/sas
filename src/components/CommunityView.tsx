'use client';

import React, { useState } from 'react';
import { Users, Search, Filter, UserPlus, Check, MessageSquare, Award, Flame, BookOpen, GraduationCap, Building2 } from 'lucide-react';
import { MOCK_STUDENTS, StudentPeer, CURRENT_STUDENT } from '../data/mockData';

interface CommunityViewProps {
  onOpenChat: (peerId: string) => void;
  onSelectCourseStudy?: (courseCode: string) => void;
}

export default function CommunityView({ onOpenChat, onSelectCourseStudy }: CommunityViewProps) {
  const [students, setStudents] = useState<StudentPeer[]>(MOCK_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUni, setSelectedUni] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [activeProfile, setActiveProfile] = useState<StudentPeer | null>(null);

  const universities = ['All', 'UNILAG', 'OAU', 'UI', 'ABU Zaria', 'UNIBEN'];
  const levels = ['All', '100 Level', '200 Level', '300 Level', '400 Level'];

  const handleToggleConnection = (peerId: string) => {
    setStudents(prev => prev.map(p => {
      if (p.id === peerId) {
        if (p.connectionStatus === 'none') {
          return { ...p, connectionStatus: 'pending' };
        } else if (p.connectionStatus === 'pending') {
          return { ...p, connectionStatus: 'connected' };
        } else {
          return { ...p, connectionStatus: 'none' };
        }
      }
      return p;
    }));
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.courses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesUni = selectedUni === 'All' || student.university.includes(selectedUni);
    const matchesLevel = selectedLevel === 'All' || student.level === selectedLevel;
    return matchesSearch && matchesUni && matchesLevel;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 1040, margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{
        padding: '28px 32px',
        borderRadius: 'var(--radius-lg)',
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderLeft: '6px solid var(--green-600)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span className="badge badge-green">Student Network</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Nigerian Universities Hub
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.3 }}>
            Find Classmates & Study Buddies
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Connect with students from UNILAG, OAU, UI, ABU, and more. Compare study notes, share past questions, and hold each other accountable.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: 16,
          background: 'var(--bg-green-tint)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-green)'
        }}>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--green-700)', display: 'block' }}>
              {students.filter(s => s.connectionStatus === 'connected').length}
            </span>
            <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 600 }}>Study Buddies</span>
          </div>
          <div style={{ width: 1, background: 'var(--border-green)' }} />
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--green-700)', display: 'block' }}>
              1,420
            </span>
            <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 600 }}>Your Points</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {/* Search Input */}
          <div style={{
            flex: '1 1 280px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: 14 }} />
            <input
              type="text"
              placeholder="Search by student name, department, or course (e.g. CSC201)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px 11px 40px',
                borderRadius: 'var(--radius-md)',
                background: '#FFFFFF',
                border: '1.5px solid var(--border-medium)',
                color: 'var(--text-dark)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* University Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)' }}>University:</span>
            <select
              value={selectedUni}
              onChange={(e) => setSelectedUni(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: '#FFFFFF',
                border: '1.5px solid var(--border-medium)',
                color: 'var(--text-dark)',
                fontSize: '0.88rem',
                fontWeight: 600,
                outline: 'none'
              }}
            >
              {universities.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: '#FFFFFF',
                border: '1.5px solid var(--border-medium)',
                color: 'var(--text-dark)',
                fontSize: '0.88rem',
                fontWeight: 600,
                outline: 'none'
              }}
            >
              {levels.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="community-students-grid">
        {filteredStudents.map(peer => {
          const isConnected = peer.connectionStatus === 'connected';
          const isPending = peer.connectionStatus === 'pending';

          return (
            <div
              key={peer.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 22,
                gap: 16,
                position: 'relative'
              }}
            >
              {/* Top row: Avatar & basic info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'var(--green-600)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1rem',
                        boxShadow: 'var(--shadow-xs)'
                      }}>
                        {peer.avatarInitials}
                      </div>
                      {peer.online && (
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: 13,
                          height: 13,
                          borderRadius: '50%',
                          background: '#22C55E',
                          border: '2px solid #FFFFFF'
                        }} title="Online now" />
                      )}
                    </div>

                    <div>
                      <h3
                        style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', cursor: 'pointer' }}
                        onClick={() => setActiveProfile(peer)}
                      >
                        {peer.name}
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>
                        {peer.level} • {peer.department}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '3px 8px',
                    borderRadius: 9999,
                    background: '#FEF3C7',
                    border: '1px solid #FCD34D',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#92400E'
                  }}>
                    <Flame size={12} fill="#F59E0B" color="#D97706" />
                    <span>{peer.streakDays}d</span>
                  </div>
                </div>

                {/* University Pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--green-700)', fontWeight: 600, marginBottom: 10 }}>
                  <Building2 size={14} />
                  <span>{peer.university}</span>
                </div>

                {/* Bio */}
                <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: 14 }}>
                  {peer.bio}
                </p>

                {/* Courses pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {peer.courses.map(c => (
                    <span key={c} className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 14,
                borderTop: '1px solid var(--border-light)',
                gap: 8
              }}>
                <button
                  onClick={() => handleToggleConnection(peer.id)}
                  className={`btn ${isConnected ? 'btn-secondary' : isPending ? 'btn-secondary' : 'btn-primary'}`}
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.82rem',
                    flex: 1,
                    background: isConnected ? '#F0FDF4' : isPending ? '#FEF9C3' : undefined,
                    borderColor: isConnected ? 'var(--border-green)' : isPending ? '#FCD34D' : undefined,
                    color: isConnected ? 'var(--green-700)' : isPending ? '#92400E' : undefined
                  }}
                >
                  {isConnected ? (
                    <>
                      <Check size={15} color="var(--green-600)" />
                      <span>Study Buddies</span>
                    </>
                  ) : isPending ? (
                    <span>Requested</span>
                  ) : (
                    <>
                      <UserPlus size={15} />
                      <span>Add Buddy</span>
                    </>
                  )}
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => onOpenChat(peer.id)}
                  style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                  title="Direct Message"
                >
                  <MessageSquare size={15} />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Peer Profile Modal */}
      {activeProfile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 250,
          padding: 16
        }}>
          <div className="card" style={{
            maxWidth: 480,
            width: '100%',
            padding: 28,
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'var(--green-600)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.2rem'
                }}>
                  {activeProfile.avatarInitials}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                    {activeProfile.name}
                  </h3>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    {activeProfile.level} • {activeProfile.department}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveProfile(null)}
                style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', padding: 4, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'flex',
              gap: 12,
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-elevated)',
              marginBottom: 16
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>University</span>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-dark)' }}>{activeProfile.university}</strong>
              </div>
              <div style={{ width: 1, background: 'var(--border-light)' }} />
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Study Points</span>
                <strong style={{ fontSize: '0.88rem', color: 'var(--green-700)' }}>{activeProfile.studyPoints} pts</strong>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: 18 }}>
              {activeProfile.bio}
            </p>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setActiveProfile(null)}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const id = activeProfile.id;
                  setActiveProfile(null);
                  onOpenChat(id);
                }}
              >
                <MessageSquare size={16} />
                <span>Message Student</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
