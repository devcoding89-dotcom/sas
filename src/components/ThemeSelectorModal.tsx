'use client';

import React from 'react';
import { X, Check, Palette, Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme, THEME_OPTIONS, ThemeName } from '../context/ThemeContext';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeSelectorModal({ isOpen, onClose }: ThemeSelectorModalProps) {
  const { currentTheme, setTheme, activeThemeOption } = useTheme();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 300,
      padding: 16
    }}>
      <div className="card animate-scale-in" style={{
        maxWidth: 540,
        width: '100%',
        padding: 0,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-elevated)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Palette size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                Customize Your Study Theme
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Choose a palette that fits your focus style and personality
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ color: 'var(--text-secondary)', padding: 6, cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Theme Grid */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 12
          }}>
            {THEME_OPTIONS.map(theme => {
              const isSelected = theme.id === currentTheme;

              return (
                <div
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  style={{
                    padding: 14,
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? `2.5px solid ${theme.color}` : '1.5px solid var(--border-light)',
                    background: isSelected ? 'var(--primary-soft)' : 'var(--bg-card)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    boxShadow: isSelected ? `0 4px 14px ${theme.color}33` : 'var(--shadow-xs)',
                    transform: isSelected ? 'scale(1.02)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Swatch Pill */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: theme.color,
                        boxShadow: `0 2px 6px ${theme.color}66`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                      }}>
                        {theme.isDark && <Moon size={13} />}
                      </div>
                      <span style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                        {theme.name}
                      </span>
                    </div>

                    {isSelected && (
                      <div style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: theme.color,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Check size={14} />
                      </div>
                    )}
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {theme.description}
                  </p>

                  {/* Visual preview bar */}
                  <div style={{
                    display: 'flex',
                    height: 8,
                    borderRadius: 9999,
                    overflow: 'hidden',
                    background: theme.secondaryColor,
                    marginTop: 2
                  }}>
                    <div style={{ width: '40%', background: theme.color }} />
                    <div style={{ width: '60%', background: theme.secondaryColor }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active confirmation pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-light)',
            fontSize: '0.84rem'
          }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              Currently active: <strong style={{ color: 'var(--primary)' }}>{activeThemeOption.name}</strong>
            </span>
            <button className="btn btn-primary" onClick={onClose} style={{ padding: '6px 18px', fontSize: '0.82rem' }}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
