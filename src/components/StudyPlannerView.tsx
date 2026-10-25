'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Bell, CheckCircle2, AlertCircle, Plus, Sparkles, Smartphone, Check } from 'lucide-react';
import { MOCK_STUDY_SESSIONS, StudySession } from '../data/mockData';

export default function StudyPlannerView() {
  const [sessions, setSessions] = useState<StudySession[]>(MOCK_STUDY_SESSIONS);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('CSC201');
  const [newTime, setNewTime] = useState('Today, 6:00 PM');

  const toggleSessionStatus = (id: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: s.status === 'completed' ? 'scheduled' : 'completed',
        };
      }
      return s;
    }));
  };

  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        try {
          const perm = await Notification.requestPermission();
          if (perm === 'granted') {
            setNotificationsEnabled(true);
            alert('Study Reminders Enabled! You will receive push notifications for upcoming revision sessions.');
          } else {
            alert('Notification permission was dismissed or blocked in your browser settings.');
          }
        } catch {
          setNotificationsEnabled(true);
        }
      } else {
        setNotificationsEnabled(true);
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSession: StudySession = {
      id: `s-${Date.now()}`,
      courseCode: newCourse,
      courseTitle: newCourse === 'CSC201' ? 'Data Structures' : 'General Math',
      title: newTitle,
      scheduledAt: newTime,
      durationMinutes: 45,
      status: 'scheduled',
    };

    setSessions([newSession, ...sessions]);
    setNewTitle('');
    setShowAddForm(false);
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header & Reminders Toggle */}
      <div style={{
        padding: '24px 28px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-green">PWA & Push Reminders</span>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: 4, color: 'var(--text-dark)' }}>
            Personalized Study Planner
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Schedule revision sessions and receive automatic reminders on Android & laptop
          </p>
        </div>

        <button
          onClick={handleToggleNotifications}
          className={`btn ${notificationsEnabled ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '10px 18px' }}
        >
          <Bell size={18} />
          <span>{notificationsEnabled ? 'Reminders Active' : 'Enable Reminders'}</span>
        </button>
      </div>

      {/* Exam Countdown Widget */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16
      }}>
        <div className="card" style={{ padding: 20, borderLeft: '4px solid var(--green-600)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--green-700)', textTransform: 'uppercase' }}>
            Upcoming Exam
          </span>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: 4, color: 'var(--text-dark)' }}>CSC201 Algorithms</h4>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--green-700)', display: 'block', marginTop: 4 }}>
            14 Days Left
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Nov 8, 2026 • 9:00 AM (Main Aud)</span>
        </div>

        <div className="card" style={{ padding: 20, borderLeft: '4px solid #3B82F6' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>
            Upcoming Exam
          </span>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: 4, color: 'var(--text-dark)' }}>MTH201 ODEs</h4>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1D4ED8', display: 'block', marginTop: 4 }}>
            19 Days Left
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Nov 13, 2026 • 2:00 PM (Faculty Lab)</span>
        </div>

        <div className="card" style={{ padding: 20, borderLeft: '4px solid #F59E0B' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D97706', textTransform: 'uppercase' }}>
            Recommended Focus
          </span>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: 4, color: 'var(--text-dark)' }}>GST211 Fallacies</h4>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#B45309', display: 'block', marginTop: 4 }}>
            2 Sessions Needed
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Based on recent quiz scores</span>
        </div>
      </div>

      {/* Revision Sessions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--green-100)', color: 'var(--green-700)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Calendar size={18} />
            </div>
            <span>Planned Revision Sessions</span>
          </h3>

          <button
            className="btn btn-secondary"
            onClick={() => setShowAddForm(!showAddForm)}
            style={{ padding: '8px 16px', fontSize: '0.84rem' }}
          >
            <Plus size={16} />
            <span>Schedule Session</span>
          </button>
        </div>

        {/* Add Session Form */}
        {showAddForm && (
          <form onSubmit={handleAddSession} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)' }}>Schedule New Revision Session</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
              <input
                type="text"
                placeholder="Topic or task (e.g. Review AVL Rotations)"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFFFF',
                  border: '1.5px solid var(--border-medium)',
                  color: 'var(--text-dark)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
                required
              />
              <select
                value={newCourse}
                onChange={e => setNewCourse(e.target.value)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFFFF',
                  border: '1.5px solid var(--border-medium)',
                  color: 'var(--text-dark)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value="CSC201">CSC201 — Data Structures</option>
                <option value="MTH201">MTH201 — Math Methods</option>
                <option value="GST211">GST211 — Logic & Philosophy</option>
              </select>
              <input
                type="text"
                placeholder="Scheduled Time (e.g. Today, 5:00 PM)"
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFFFF',
                  border: '1.5px solid var(--border-medium)',
                  color: 'var(--text-dark)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Session
              </button>
            </div>
          </form>
        )}

        {/* Sessions Cards */}
        {sessions.map(s => {
          const isDone = s.status === 'completed';
          return (
            <div
              key={s.id}
              className="card"
              style={{
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: isDone ? 0.65 : 1,
                borderLeft: isDone ? '4px solid var(--green-600)' : '4px solid var(--border-medium)',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <button
                  onClick={() => toggleSessionStatus(s.id)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: `2px solid ${isDone ? 'var(--green-600)' : 'var(--border-medium)'}`,
                    background: isDone ? 'var(--green-600)' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                  title={isDone ? "Mark as Incomplete" : "Mark as Completed"}
                >
                  {isDone ? <Check size={18} /> : null}
                </button>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>{s.courseCode}</span>
                    <span style={{
                      fontSize: '0.96rem',
                      fontWeight: 700,
                      color: 'var(--text-dark)',
                      textDecoration: isDone ? 'line-through' : 'none'
                    }}>
                      {s.title}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                      <Clock size={13} color="var(--green-600)" />
                      {s.scheduledAt}
                    </span>
                    <span>• {s.durationMinutes} mins revision</span>
                  </div>
                </div>
              </div>

              <span className={`badge ${isDone ? 'badge-green' : 'badge-amber'}`}>
                {isDone ? 'Completed' : 'Scheduled'}
              </span>
            </div>
          );
        })}
      </div>

      {/* PWA Reminder Notice */}
      <div style={{
        padding: 18,
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-green-tint)',
        border: '1px solid var(--border-green)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontSize: '0.86rem',
        color: '#166534'
      }}>
        <Smartphone size={24} color="#16A34A" style={{ flexShrink: 0 }} />
        <span>
          <strong>PWA Push Notification Tip:</strong> Install StudyMate on your Android home screen via Chrome for reliable background alarms even when offline or when your browser is closed.
        </span>
      </div>
    </div>
  );
}
