'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Brain,
  Users,
  MessageSquare,
  FileText,
  Zap,
  Shield,
  ArrowRight,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Star,
  Check,
  Menu,
  X,
  Calendar,
  BarChart3,
  Upload
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: '#FAFDF7', color: '#0F1E13', overflowX: 'hidden' }}>

      {/* ========== NAVBAR ========== */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 24px',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(250, 253, 247, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(132, 204, 22, 0.15)' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #84CC16 0%, #15803D 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#041C14',
            boxShadow: '0 4px 14px rgba(132, 204, 22, 0.3)'
          }}>
            <BookOpen size={20} strokeWidth={2.5} />
          </div>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F1E13', letterSpacing: '-0.02em' }}>StudyMate</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#65A30D' }}>AI</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="landing-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Features', 'How It Works', 'Pricing'].map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s/g, '-')}`} style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#526658',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>{link}</a>
          ))}
          <button onClick={onEnterApp} style={{
            padding: '10px 24px',
            borderRadius: 10,
            background: '#65A30D',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(101, 163, 13, 0.3)',
            transition: 'all 0.2s ease'
          }}>
            Open App
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="landing-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0F1E13' }}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="landing-mobile-menu" style={{
          position: 'fixed',
          top: 72,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(250, 253, 247, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 99,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}>
          {['Features', 'How It Works', 'Pricing'].map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '14px 16px',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#2C3B30',
                textDecoration: 'none',
                borderRadius: 10,
                background: '#F0F5EA'
              }}>{link}</a>
          ))}
          <button onClick={onEnterApp} style={{
            marginTop: 12,
            padding: '14px 24px',
            borderRadius: 12,
            background: '#65A30D',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(101, 163, 13, 0.3)'
          }}>
            Open App →
          </button>
        </div>
      )}

      {/* ========== HERO SECTION ========== */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(132, 204, 22, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(4, 28, 20, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 1100, width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 9999,
            background: '#ECFCCB',
            border: '1px solid #BEF264',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#3F6212',
            marginBottom: 28
          }}>
            <Sparkles size={14} />
            Built for Nigerian University Students
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#041C14',
            marginBottom: 20
          }}>
            Study Smarter with<br />
            <span style={{ color: '#65A30D' }}>AI-Powered</span> Learning
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#526658',
            maxWidth: 620,
            margin: '0 auto 36px',
            lineHeight: 1.7
          }}>
            Upload your PDFs, generate instant summaries, flashcards, and quizzes. 
            Connect with classmates, share notes, and ace your exams together.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={onEnterApp} style={{
              padding: '14px 32px',
              borderRadius: 12,
              background: '#041C14',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 8px 24px rgba(4, 28, 20, 0.2)',
              transition: 'all 0.2s ease'
            }}>
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <a href="#features" style={{
              padding: '14px 28px',
              borderRadius: 12,
              background: '#FFFFFF',
              color: '#2C3B30',
              fontWeight: 700,
              fontSize: '1rem',
              border: '1.5px solid #E2E8D8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}>
              See How It Works
            </a>
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            marginTop: 48,
            flexWrap: 'wrap'
          }}>
            {[
              { val: '2,400+', label: 'Active Students' },
              { val: '15,000+', label: 'PDFs Processed' },
              { val: '50+', label: 'Universities' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#041C14' }}>{stat.val}</div>
                <div style={{ fontSize: '0.78rem', color: '#839689', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* App Preview Card */}
          <div style={{
            marginTop: 60,
            borderRadius: 16,
            overflow: 'hidden',
            background: '#041C14',
            border: '1px solid rgba(132, 204, 22, 0.2)',
            boxShadow: '0 30px 80px rgba(4, 28, 20, 0.2), 0 0 0 1px rgba(132, 204, 22, 0.1)',
            padding: 4,
            maxWidth: 900,
            margin: '60px auto 0'
          }}>
            <div style={{
              borderRadius: 13,
              background: '#F5F8F0',
              padding: '32px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {[
                { icon: Upload, label: 'Upload PDF', color: '#65A30D' },
                { icon: ChevronRight, label: '', color: '#CBD5BF' },
                { icon: Brain, label: 'AI Processes', color: '#84CC16' },
                { icon: ChevronRight, label: '', color: '#CBD5BF' },
                { icon: FileText, label: 'Get Summary', color: '#15803D' },
                { icon: ChevronRight, label: '', color: '#CBD5BF' },
                { icon: Zap, label: 'Study & Ace!', color: '#041C14' },
              ].map((step, i) => {
                const Icon = step.icon;
                if (!step.label) return <Icon key={i} size={16} color={step.color} />;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: step.color === '#041C14' ? '#041C14' : '#ECFCCB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={18} color={step.color === '#041C14' ? '#84CC16' : step.color} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#2C3B30' }}>{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" style={{
        padding: '100px 24px',
        background: '#FFFFFF'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 14px',
              borderRadius: 9999,
              background: '#ECFCCB',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#3F6212',
              marginBottom: 16
            }}>
              <Zap size={13} /> Features
            </div>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              fontWeight: 800,
              color: '#041C14',
              letterSpacing: '-0.02em',
              marginBottom: 12
            }}>
              Everything you need to ace your exams
            </h2>
            <p style={{ fontSize: '1rem', color: '#526658', maxWidth: 540, margin: '0 auto' }}>
              From AI-powered study tools to student networking — all in one platform built for how you actually study.
            </p>
          </div>

          <div className="landing-features-grid">
            {[
              {
                icon: Brain,
                title: 'AI Summaries',
                desc: 'Upload any PDF and get an intelligent, condensed summary in seconds. Focus on what matters.',
                color: '#65A30D',
                bg: '#F7FEE7'
              },
              {
                icon: FileText,
                title: 'Smart Flashcards',
                desc: 'Auto-generated flashcards from your notes with spaced repetition for maximum retention.',
                color: '#15803D',
                bg: '#ECFDF5'
              },
              {
                icon: BarChart3,
                title: 'Practice Quizzes',
                desc: 'AI creates quiz questions from your materials. Track your score and identify weak areas.',
                color: '#047857',
                bg: '#F0FDF4'
              },
              {
                icon: Users,
                title: 'Find Classmates',
                desc: 'Discover and connect with students from your department, level, and university.',
                color: '#84CC16',
                bg: '#F7FEE7'
              },
              {
                icon: MessageSquare,
                title: 'Direct Messaging',
                desc: 'Chat with study buddies, share documents, and form study groups effortlessly.',
                color: '#3F6212',
                bg: '#ECFCCB'
              },
              {
                icon: Calendar,
                title: 'Study Planner',
                desc: 'Plan your revision sessions, set exam countdowns, and never miss a study deadline.',
                color: '#041C14',
                bg: '#F5F8F0'
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} style={{
                  padding: 28,
                  borderRadius: 14,
                  background: '#FFFFFF',
                  border: '1px solid #E2E8D8',
                  transition: 'all 0.25s ease',
                  cursor: 'default'
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(4, 28, 20, 0.08)';
                    (e.currentTarget as HTMLElement).style.borderColor = '#BEF264';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.borderColor = '#E2E8D8';
                  }}
                >
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: feature.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 18
                  }}>
                    <Icon size={22} color={feature.color} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#041C14', marginBottom: 8 }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#526658', lineHeight: 1.6 }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" style={{
        padding: '100px 24px',
        background: '#F5F8F0'
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              fontWeight: 800,
              color: '#041C14',
              letterSpacing: '-0.02em',
              marginBottom: 12
            }}>
              Start studying in 3 simple steps
            </h2>
            <p style={{ fontSize: '1rem', color: '#526658' }}>
              No complicated setup. Just upload and start learning.
            </p>
          </div>

          <div className="landing-steps" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              {
                step: '01',
                title: 'Upload Your PDF',
                desc: 'Drop your lecture notes, textbook chapters, or past questions. We support any PDF document.',
                icon: Upload
              },
              {
                step: '02',
                title: 'AI Processes Your Notes',
                desc: 'Our AI reads and understands your content, generating summaries, flashcards, and quiz questions automatically.',
                icon: Brain
              },
              {
                step: '03',
                title: 'Study & Share',
                desc: 'Review your materials, test yourself with quizzes, and share with classmates. Track your progress over time.',
                icon: GraduationCap
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 24,
                  padding: 28,
                  borderRadius: 14,
                  background: '#FFFFFF',
                  border: '1px solid #E2E8D8',
                  boxShadow: '0 2px 8px rgba(4, 28, 20, 0.04)'
                }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: '#041C14',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={24} color="#84CC16" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#65A30D', marginBottom: 4, letterSpacing: '0.05em' }}>
                      STEP {item.step}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#041C14', marginBottom: 6 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#526658', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== PRICING / CTA SECTION ========== */}
      <section id="pricing" style={{
        padding: '100px 24px',
        background: '#041C14',
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 14px',
            borderRadius: 9999,
            background: 'rgba(132, 204, 22, 0.15)',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#84CC16',
            marginBottom: 20
          }}>
            <Star size={13} /> 100% Free for Students
          </div>

          <h2 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: 16
          }}>
            Ready to study smarter?
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#A7F3D0',
            maxWidth: 500,
            margin: '0 auto 36px',
            lineHeight: 1.7
          }}>
            Join thousands of Nigerian students already using StudyMate AI to prepare for their exams and connect with classmates.
          </p>

          <div style={{
            padding: 32,
            borderRadius: 16,
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(132, 204, 22, 0.2)',
            marginBottom: 36,
            maxWidth: 420,
            margin: '0 auto 36px'
          }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#84CC16', marginBottom: 4 }}>Free</div>
            <div style={{ fontSize: '0.9rem', color: '#6EE7B7', marginBottom: 20 }}>Everything included, no hidden charges</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
              {[
                'Unlimited PDF uploads',
                'AI summaries & flashcards',
                'Practice quizzes',
                'Find & message classmates',
                'Study planner & reminders',
                'Share notes with friends'
              ].map(feat => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Check size={16} color="#84CC16" />
                  <span style={{ fontSize: '0.9rem', color: '#D1FAE5' }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={onEnterApp} style={{
            padding: '16px 40px',
            borderRadius: 12,
            background: '#84CC16',
            color: '#041C14',
            fontWeight: 800,
            fontSize: '1.05rem',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 8px 24px rgba(132, 204, 22, 0.3)',
            transition: 'all 0.2s ease'
          }}>
            Start Studying Now
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{
        padding: '48px 24px 32px',
        background: '#062E20',
        borderTop: '1px solid rgba(132, 204, 22, 0.1)'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="landing-footer-grid" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 32,
            marginBottom: 32
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #84CC16 0%, #15803D 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#041C14'
                }}>
                  <BookOpen size={16} strokeWidth={2.5} />
                </div>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF' }}>StudyMate</span>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: '#84CC16' }}>AI</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#6EE7B7', maxWidth: 280, lineHeight: 1.6 }}>
                AI-powered study companion for Nigerian university students. Study smarter, not harder.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#A7F3D0', marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Product</div>
                {['Features', 'How It Works', 'Pricing'].map(l => (
                  <a key={l} href={`#${l.toLowerCase().replace(/\s/g, '-')}`} style={{
                    display: 'block',
                    fontSize: '0.86rem',
                    color: '#6EE7B7',
                    textDecoration: 'none',
                    marginBottom: 8
                  }}>{l}</a>
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#A7F3D0', marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Support</div>
                {['Help Center', 'Contact Us', 'Report a Bug'].map(l => (
                  <a key={l} href="#" style={{
                    display: 'block',
                    fontSize: '0.86rem',
                    color: '#6EE7B7',
                    textDecoration: 'none',
                    marginBottom: 8
                  }}>{l}</a>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(132, 204, 22, 0.1)',
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <span style={{ fontSize: '0.78rem', color: '#6EE7B7' }}>
              © 2026 StudyMate AI. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy Policy', 'Terms of Service'].map(l => (
                <a key={l} href="#" style={{ fontSize: '0.78rem', color: '#6EE7B7', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
