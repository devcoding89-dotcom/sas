'use client';

import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Bell,
  Lock,
  Database,
  Trash2,
  Check,
  Save,
  Shield,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { CURRENT_STUDENT } from '../data/mockData';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState<'account' | 'academic' | 'notifications' | 'privacy' | 'storage'>('account');
  const [displayName, setDisplayName] = useState(CURRENT_STUDENT.name);
  const [email, setEmail] = useState('chinedu@example.com');
  const [university, setUniversity] = useState(CURRENT_STUDENT.university);
  const [department, setDepartment] = useState(CURRENT_STUDENT.department);
  const [level, setLevel] = useState(CURRENT_STUDENT.level);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'academic', label: 'Academic Profile', icon: GraduationCap },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Lock },
    { id: 'storage', label: 'Offline Storage', icon: Database },
  ] as const;

  const currentTabLabel = tabs.find(t => t.id === activeTab)?.label || 'Account';

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    background: 'var(--bg-elevated)',
    border: '1.5px solid var(--border-medium)',
    color: 'var(--text-dark)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    fontFamily: 'inherit'
  };

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
          Settings & Account
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: 4 }}>
          Manage your student profile, university preferences, study notifications, and privacy.
        </p>
      </div>

      {/* Mobile Tab Selector (shown only on small screens via CSS) */}
      <div className="settings-mobile-tab-selector">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)',
            border: '1.5px solid var(--border-medium)',
            color: 'var(--text-dark)',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <span>{currentTabLabel}</span>
          <ChevronRight size={16} style={{ transform: showMobileMenu ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }} />
        </button>

        {showMobileMenu && (
          <div style={{
            marginTop: 6,
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden'
          }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setShowMobileMenu(false); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '11px 16px',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#65A30D' : 'var(--text-secondary)',
                    background: isActive ? '#F7FEE7' : 'transparent',
                    borderBottom: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Settings 2-Column Card */}
      <div className="settings-card-grid">
        {/* Left Side Tab Navigation (hidden on mobile via CSS) */}
        <div className="settings-left-nav" style={{
          borderRight: '1px solid var(--border-light)',
          background: 'var(--bg-elevated)',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#65A30D' : 'var(--text-secondary)',
                  background: isActive ? 'var(--bg-card)' : 'transparent',
                  border: isActive ? '1px solid var(--border-light)' : '1px solid transparent',
                  boxShadow: isActive ? 'var(--shadow-xs)' : 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={17} color={isActive ? '#65A30D' : 'var(--text-muted)'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Pane: Settings Form */}
        <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          {/* TAB 1: ACCOUNT SETTINGS */}
          {activeTab === 'account' && (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: 14, flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                    Account Settings
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Update your student credentials and personal info
                  </span>
                </div>

                {savedSuccess && (
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#15803D',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    background: '#DCFCE7',
                    padding: '4px 12px',
                    borderRadius: 9999,
                    border: '1px solid #86EFAC'
                  }}>
                    <Check size={14} /> Saved!
                  </span>
                )}
              </div>

              {/* Profile Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #84CC16 0%, #15803D 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(132, 204, 22, 0.35)'
                }}>
                  {displayName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <strong style={{ fontSize: '1rem', color: 'var(--text-dark)', display: 'block' }}>{displayName}</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{university} • {level}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>
                    University / Institution
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>
                    Department & Level
                  </label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Department"
                      style={{ ...inputStyle, flex: 2 }}
                    />
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      style={{ ...inputStyle, flex: 1 }}
                    >
                      <option value="100 Level">100L</option>
                      <option value="200 Level">200L</option>
                      <option value="300 Level">300L</option>
                      <option value="400 Level">400L</option>
                      <option value="500 Level">500L</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div style={{
                padding: '16px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 10,
                marginTop: 6
              }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)', display: 'block' }}>
                    Password
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Last changed 2 months ago
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => alert('Password reset link sent to your registered student email.')}
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  Change Password
                </button>
              </div>

              {/* Save Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
                  <Save size={16} />
                  <span>Update Profile</span>
                </button>
              </div>

              {/* Danger Zone */}
              <div style={{
                marginTop: 20,
                padding: '18px 20px',
                borderRadius: 'var(--radius-md)',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12
              }}>
                <div>
                  <strong style={{ color: '#991B1B', display: 'block', fontSize: '0.9rem' }}>
                    Danger Zone
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#B91C1C' }}>
                    Permanently delete your uploaded handouts, flashcards, and student data.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset your local study cache?')) {
                      localStorage.clear();
                      alert('Local study data reset successfully.');
                    }
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: '#DC2626',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Reset Study Data
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ACADEMIC PROFILE */}
          {activeTab === 'academic' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: 14 }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Academic Courses & Exam Dates
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Your currently enrolled courses for 1st Semester 2026/2027:
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { code: 'CSC201', name: 'Data Structures and Algorithms', units: 3, exam: 'Nov 8, 2026' },
                  { code: 'MTH201', name: 'Mathematical Methods I (ODEs)', units: 3, exam: 'Nov 13, 2026' },
                  { code: 'GST211', name: 'Philosophy, Logic & Human Existence', units: 2, exam: 'Nov 20, 2026' },
                  { code: 'PHY202', name: 'Electric Circuits & Electronics', units: 3, exam: 'Nov 27, 2026' },
                ].map(c => (
                  <div key={c.code} style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 8
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: 9999,
                        background: '#ECFCCB',
                        color: '#3F6212',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        border: '1px solid #BEF264'
                      }}>{c.code}</span>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{c.name}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{c.units} Units</span>
                      <span style={{
                        fontSize: '0.78rem',
                        color: '#65A30D',
                        fontWeight: 700,
                        padding: '2px 10px',
                        borderRadius: 9999,
                        background: '#F7FEE7'
                      }}>Exam: {c.exam}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Course Button */}
              <button
                className="btn btn-secondary"
                style={{ alignSelf: 'flex-start', padding: '8px 18px', fontSize: '0.84rem', marginTop: 6 }}
                onClick={() => alert('Course registration integration coming soon!')}
              >
                + Add Course
              </button>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: 14 }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Notification Preferences
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Choose what you want to be alerted about.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { key: 'push', title: 'Revision Session Reminders', desc: 'Get browser notifications 15 minutes before study sessions', checked: pushEnabled, onChange: setPushEnabled },
                  { key: 'email', title: 'Classmate Notes Shared', desc: 'Alert when study buddies upload new lecture handouts', checked: emailAlerts, onChange: setEmailAlerts },
                ].map(item => (
                  <label key={item.key} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease',
                    gap: 12
                  }}>
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-dark)' }}>{item.title}</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                    </div>
                    {/* Custom toggle switch */}
                    <div
                      onClick={(e) => { e.preventDefault(); item.onChange(!item.checked); }}
                      style={{
                        width: 44,
                        height: 24,
                        borderRadius: 12,
                        background: item.checked ? '#65A30D' : 'var(--border-medium)',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                        flexShrink: 0
                      }}
                    >
                      <div style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        position: 'absolute',
                        top: 3,
                        left: item.checked ? 23 : 3,
                        transition: 'left 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                      }} />
                    </div>
                  </label>
                ))}

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-light)',
                  cursor: 'pointer',
                  gap: 12
                }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-dark)' }}>Quiz Score Reports</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Get a weekly summary of your quiz performance</span>
                  </div>
                  <div
                    style={{
                      width: 44,
                      height: 24,
                      borderRadius: 12,
                      background: '#65A30D',
                      position: 'relative',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      position: 'absolute',
                      top: 3,
                      left: 23,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                    }} />
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY */}
          {activeTab === 'privacy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: 14 }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Privacy & Peer Visibility
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Control who can see your study activity and profile information.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <Shield size={18} color="#65A30D" />
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>Document Sharing</strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Your study materials are <strong>private by default</strong>. Only files you explicitly click &ldquo;Share to Library&rdquo; are made available to classmates.
                  </p>
                </div>

                <div style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <Smartphone size={18} color="#65A30D" />
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>Active Sessions</strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                    You are currently logged in from 1 device.
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#84CC16' }} />
                      <span style={{ fontSize: '0.84rem', color: 'var(--text-dark)', fontWeight: 600 }}>This Device</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: '#65A30D', fontWeight: 700 }}>Active Now</span>
                  </div>
                </div>

                <div style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <Lock size={18} color="#65A30D" />
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>Two-Factor Auth</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Not enabled yet</span>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                      onClick={() => alert('2FA setup coming soon!')}
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: OFFLINE STORAGE */}
          {activeTab === 'storage' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: 14 }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Offline Document Cache (PWA)
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  Manage your cached study materials for offline access.
                </p>
              </div>

              <div style={{
                padding: 20,
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                    Storage Used
                  </span>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#65A30D' }}>
                    8.4 MB / 50 MB
                  </span>
                </div>

                {/* Progress Bar */}
                <div style={{
                  width: '100%',
                  height: 8,
                  borderRadius: 4,
                  background: '#E2E8D8',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '16.8%',
                    height: '100%',
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, #84CC16 0%, #65A30D 100%)'
                  }} />
                </div>

                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginTop: 8 }}>
                  All your active flashcards and summaries are available offline on this device.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                <div style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  textAlign: 'center'
                }}>
                  <Database size={20} color="#65A30D" style={{ margin: '0 auto 6px' }} />
                  <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--text-dark)' }}>12</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Cached Documents</span>
                </div>
                <div style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  textAlign: 'center'
                }}>
                  <Database size={20} color="#84CC16" style={{ margin: '0 auto 6px' }} />
                  <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--text-dark)' }}>48</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Cached Flashcards</span>
                </div>
              </div>

              <button
                className="btn btn-secondary"
                style={{ alignSelf: 'flex-start', padding: '8px 18px', fontSize: '0.84rem' }}
                onClick={() => {
                  if (confirm('Clear all cached study data from this device?')) {
                    alert('Cache cleared successfully.');
                  }
                }}
              >
                <Trash2 size={14} />
                Clear Cache
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
