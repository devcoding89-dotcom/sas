'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle2, Share2, UserPlus, BookOpen, Clock, Trash2, ArrowRight } from 'lucide-react';

interface NotificationsViewProps {
  onOpenStudyMaterial?: () => void;
  onOpenMessages?: () => void;
}

export default function NotificationsView({ onOpenStudyMaterial, onOpenMessages }: NotificationsViewProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'New Study Handout Shared',
      message: 'Blessing Okafor shared "Data Structures Notes.pdf" with you.',
      time: '2 hours ago',
      unread: true,
      type: 'share',
      action: onOpenStudyMaterial,
      actionLabel: 'View Handout'
    },
    {
      id: 'notif-2',
      title: 'Study Pack Ready',
      message: 'Your AI summary, 15 flashcards, and 10 quiz questions for CSC201 are ready.',
      time: '5 hours ago',
      unread: true,
      type: 'pack',
      action: onOpenStudyMaterial,
      actionLabel: 'Start Studying'
    },
    {
      id: 'notif-3',
      title: 'Study Buddy Request Accepted',
      message: 'Tunde Adebayo accepted your study buddy connection.',
      time: 'Yesterday',
      unread: false,
      type: 'friend',
      action: onOpenMessages,
      actionLabel: 'Send Message'
    },
    {
      id: 'notif-4',
      title: 'Exam Reminder',
      message: 'CSC201 Algorithms exam is in 14 days. 2 revision sessions remaining.',
      time: '2 days ago',
      unread: false,
      type: 'reminder',
      action: onOpenStudyMaterial,
      actionLabel: 'Review Notes'
    },
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
            Notifications & Alerts
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Stay updated on newly shared handouts, quiz completions, and classmate study buddy invites.
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={markAllRead}
          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
        >
          Mark all as read
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {notifications.map(item => (
          <div
            key={item.id}
            className="card"
            style={{
              padding: '18px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              borderLeft: item.unread ? '4px solid var(--primary)' : '1px solid var(--border-light)',
              background: item.unread ? 'var(--bg-card)' : 'var(--bg-elevated)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: item.unread ? 'var(--primary-soft)' : 'var(--bg-elevated)',
                color: item.unread ? 'var(--primary)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Bell size={20} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: item.unread ? 800 : 700, color: 'var(--text-dark)' }}>
                    {item.title}
                  </h4>
                  {item.unread && (
                    <span style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: 'var(--primary)'
                    }} />
                  )}
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                  {item.message}
                </p>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>
                  {item.time}
                </span>
              </div>
            </div>

            {item.action && (
              <button
                className="btn btn-secondary"
                onClick={item.action}
                style={{ padding: '6px 14px', fontSize: '0.78rem', flexShrink: 0 }}
              >
                <span>{item.actionLabel}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
