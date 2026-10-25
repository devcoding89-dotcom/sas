'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  FileText,
  CheckCircle,
  Layers,
  ArrowRight,
  Lightbulb,
  Bookmark,
  Download,
  Share2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  FileDown
} from 'lucide-react';
import { MOCK_SUMMARY } from '../data/mockData';
import FlashcardDeck from './FlashcardDeck';
import QuizPlayer from './QuizPlayer';

interface SummaryReaderProps {
  onGoToCards: () => void;
  onGoToQuiz: () => void;
}

export default function SummaryReader({ onGoToCards, onGoToQuiz }: SummaryReaderProps) {
  const [workspaceTab, setWorkspaceTab] = useState<'overview' | 'summary' | 'flashcards' | 'quiz' | 'pdf'>('overview');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1140, margin: '0 auto' }}>
      {/* Workspace Breadcrumbs & Header (exact from Figma top-right) */}
      <div style={{
        padding: '24px 28px',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Breadcrumb line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
          <span>Home</span>
          <ChevronRight size={14} />
          <span>My Library</span>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-dark)', fontWeight: 700 }}>Data Structures and Algorithms</span>
        </div>

        {/* Title and Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
                Data Structures and Algorithms
              </h1>
              <span style={{
                padding: '3px 10px',
                borderRadius: 9999,
                background: '#DCFCE7',
                color: '#15803D',
                border: '1px solid #86EFAC',
                fontSize: '0.72rem',
                fontWeight: 800
              }}>
                Ready
              </span>
            </div>

            <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Computer Science • Uploaded by you • 12 Apr 2025 • 2.4 MB • 28 Pages
            </span>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn btn-secondary"
              onClick={() => alert('Document link copied to clipboard!')}
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              <Share2 size={15} />
              <span>Share Document</span>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => alert('Downloading original lecture PDF...')}
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <Download size={15} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Sub-Tabs (Overview | Summary | Flashcards | Quiz | Original PDF) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginTop: 22,
          borderBottom: '1px solid var(--border-light)',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'summary', label: 'Summary' },
            { id: 'flashcards', label: 'Flashcards' },
            { id: 'quiz', label: 'Quiz' },
            { id: 'pdf', label: 'Original PDF' },
          ].map(tab => {
            const isActive = workspaceTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setWorkspaceTab(tab.id as any)}
                style={{
                  padding: '10px 18px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  background: 'transparent',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: OVERVIEW (Figma exact match) */}
      {workspaceTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
          {/* Left Column: Key Concepts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 14 }}>
                Key Concepts
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 6 }}>
                    1. Arrays
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.9rem', color: 'var(--text-body)', paddingLeft: 12 }}>
                    <li>• Collection of elements of the same type</li>
                    <li>• Indexed from 0</li>
                    <li>• Fixed size (in most low-level languages)</li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 6 }}>
                    2. Linked Lists
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.9rem', color: 'var(--text-body)', paddingLeft: 12 }}>
                    <li>• Collection of nodes containing data and reference to next node</li>
                    <li>• Types: Singly Linked, Doubly Linked, Circular</li>
                    <li>• Dynamic sizing with O(1) head insertion</li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 6 }}>
                    3. Stacks and Queues
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.9rem', color: 'var(--text-body)', paddingLeft: 12 }}>
                    <li>• <strong>Stack</strong>: LIFO (Last In, First Out)</li>
                    <li>• <strong>Queue</strong>: FIFO (First In, First Out)</li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 6 }}>
                    4. Trees and Binary Search Trees (BST)
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.9rem', color: 'var(--text-body)', paddingLeft: 12 }}>
                    <li>• Left subtree values &lt; Node &lt; Right subtree values</li>
                    <li>• In-order traversal visits keys in ascending sorted order</li>
                    <li>• Self-balancing mechanism: AVL rotations (LL, RR, LR, RL)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Formulas */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 14 }}>
                Key Formulas & Time Complexities
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>Array Access</span>
                  <strong style={{ display: 'block', fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>O(1) Constant</strong>
                </div>
                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>Binary Search</span>
                  <strong style={{ display: 'block', fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>O(log n)</strong>
                </div>
                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>Linear Search</span>
                  <strong style={{ display: 'block', fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>O(n) Linear</strong>
                </div>
                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>Merge Sort</span>
                  <strong style={{ display: 'block', fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>O(n log n)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Generated Study Materials Status & Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Generated Study Materials Card */}
            <div className="card" style={{ padding: '22px' }}>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 14 }}>
                Generated Study Materials
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div
                  onClick={() => setWorkspaceTab('summary')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FileText size={17} color="var(--primary)" />
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-dark)' }}>Summary</span>
                  </div>
                  <span className="badge badge-green">Ready</span>
                </div>

                <div
                  onClick={() => setWorkspaceTab('flashcards')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Layers size={17} color="#EC4899" />
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-dark)' }}>Flashcards</span>
                  </div>
                  <span className="badge badge-green">Ready (5)</span>
                </div>

                <div
                  onClick={() => setWorkspaceTab('quiz')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <HelpCircle size={17} color="#10B981" />
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-dark)' }}>Quiz</span>
                  </div>
                  <span className="badge badge-green">Ready (4)</span>
                </div>
              </div>
            </div>

            {/* Page References Box */}
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 12 }}>
                Page References
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Page 12</span>
                  <strong style={{ color: 'var(--text-dark)' }}>Arrays & Traversal</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Page 18</span>
                  <strong style={{ color: 'var(--text-dark)' }}>Linked Lists</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Page 27</span>
                  <strong style={{ color: 'var(--text-dark)' }}>Trees & BST Rotations</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: SUMMARY */}
      {workspaceTab === 'summary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 12 }}>
              Executive AI Summary
            </h3>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: 24 }}>
              {MOCK_SUMMARY.executiveSummary}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {MOCK_SUMMARY.sections.map((sec, idx) => (
                <div key={idx} style={{
                  padding: '18px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-light)'
                }}>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 8 }}>
                    {sec.title}
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.92rem', color: 'var(--text-body)' }}>
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={{ display: 'flex', gap: 10 }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 800 }}>•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: FLASHCARDS */}
      {workspaceTab === 'flashcards' && (
        <FlashcardDeck />
      )}

      {/* Tab 4: QUIZ */}
      {workspaceTab === 'quiz' && (
        <QuizPlayer />
      )}

      {/* Tab 5: ORIGINAL PDF */}
      {workspaceTab === 'pdf' && (
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <FileText size={48} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            Original PDF: Lecture_04_Binary_Search_Trees.pdf
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: 440, margin: '8px auto 24px' }}>
            28 pages • Clean digital handout with diagrams and tree rotation figures.
          </p>
          <button className="btn btn-primary" onClick={() => alert('Opening PDF in new browser tab...')}>
            <Download size={16} />
            <span>Open Full 28-Page PDF</span>
          </button>
        </div>
      )}
    </div>
  );
}
