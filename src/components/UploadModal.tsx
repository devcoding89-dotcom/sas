'use client';

import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2, Loader2, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { MOCK_COURSES } from '../data/mockData';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function UploadModal({ isOpen, onClose, onComplete }: UploadModalProps) {
  const [selectedCourse, setSelectedCourse] = useState(MOCK_COURSES[0].id);
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<'select' | 'processing' | 'done'>('select');
  const [processStage, setProcessStage] = useState(1);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== 'application/pdf') {
        alert('Please select a valid PDF file.');
        return;
      }
      if (selected.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB MVP limit.');
        return;
      }
      setFile(selected);
    }
  };

  const startProcessing = () => {
    if (!file) return;
    setStep('processing');
    setProcessStage(1);

    setTimeout(() => {
      setProcessStage(2);
    }, 1200);

    setTimeout(() => {
      setProcessStage(3);
    }, 2500);

    setTimeout(() => {
      setStep('done');
    }, 4200);
  };

  const handleReset = () => {
    setFile(null);
    setStep('select');
    setProcessStage(1);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: 16
    }}>
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: 520,
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#F8FAFC'
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
              Upload Study Document
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Transform your university lecture notes into summaries, flashcards & quizzes
            </p>
          </div>
          <button onClick={handleReset} style={{ color: 'var(--text-secondary)', padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 24 }}>
          {step === 'select' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Select Course */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: '#0F172A' }}>
                  Assign to Course:
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: '#FFFFFF',
                    border: '1.5px solid var(--border-medium)',
                    color: '#0F172A',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    outline: 'none'
                  }}
                >
                  {MOCK_COURSES.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.code} — {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Drop Zone */}
              <label style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '36px 20px',
                border: '2px dashed var(--accent-green)',
                borderRadius: 'var(--radius-md)',
                background: '#F0FDF4',
                cursor: 'pointer',
                textAlign: 'center'
              }}>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#15803D',
                  marginBottom: 12
                }}>
                  <UploadCloud size={28} />
                </div>
                {file ? (
                  <div>
                    <span style={{ fontWeight: 700, color: '#15803D', display: 'block' }}>{file.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to process
                    </span>
                  </div>
                ) : (
                  <div>
                    <span style={{ fontWeight: 700, color: '#0F172A', display: 'block' }}>
                      Click to choose or drag & drop PDF
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4, display: 'block' }}>
                      Max 10MB • Recommended 10–50 pages
                    </span>
                  </div>
                )}
              </label>

              {/* Nigerian university scanned note reminder */}
              <div style={{
                display: 'flex',
                gap: 10,
                padding: 12,
                borderRadius: 'var(--radius-sm)',
                background: '#FEF3C7',
                border: '1px solid #FCD34D',
                fontSize: '0.8rem',
                color: '#92400E'
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Tip for Nigerian university notes:</strong> Clean digital PDFs yield best results. For scanned photocopies, ensure text is clearly legible.
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button className="btn btn-secondary" onClick={handleReset}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  disabled={!file}
                  onClick={startProcessing}
                  style={{ opacity: file ? 1 : 0.5, cursor: file ? 'pointer' : 'not-allowed' }}
                >
                  <Sparkles size={16} />
                  <span>Generate Study Pack</span>
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: 60,
                height: 60,
                margin: '0 auto 18px',
                borderRadius: '50%',
                background: '#DCFCE7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#16A34A'
              }}>
                <Loader2 size={30} style={{ animation: 'spin 1s linear infinite' }} />
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
                AI Processing In Progress
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
                {file?.name || 'Lecture_04_Binary_Search_Trees.pdf'}
              </p>

              {/* Pipeline Step Indicators */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', maxWidth: 360, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: processStage >= 1 ? '#16A34A' : '#E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: processStage >= 1 ? '#fff' : '#64748B'
                  }}>
                    {processStage > 1 ? '✓' : '1'}
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: processStage >= 1 ? '#0F172A' : '#94A3B8' }}>
                    Validating & saving PDF privately
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: processStage >= 2 ? '#16A34A' : '#E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: processStage >= 2 ? '#fff' : '#64748B'
                  }}>
                    {processStage > 2 ? '✓' : '2'}
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: processStage >= 2 ? '#0F172A' : '#94A3B8' }}>
                    Extracting text & section headings
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: processStage >= 3 ? '#16A34A' : '#E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: processStage >= 3 ? '#fff' : '#64748B'
                  }}>
                    {processStage > 3 ? '✓' : '3'}
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: processStage >= 3 ? '#16A34A' : '#94A3B8' }}>
                    Generating summary, flashcards & quiz
                  </span>
                </div>
              </div>

              <style jsx>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {step === 'done' && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: 60,
                height: 60,
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: '#DCFCE7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#15803D'
              }}>
                <CheckCircle2 size={34} />
              </div>

              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
                Study Pack Generated!
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
                Your study materials for <strong>CSC201</strong> are saved and ready offline.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 10,
                marginBottom: 24,
                textAlign: 'center'
              }}>
                <div style={{ padding: 12, borderRadius: 'var(--radius-md)', background: '#F8FAFC', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16A34A' }}>1</span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Summary</span>
                </div>
                <div style={{ padding: 12, borderRadius: 'var(--radius-md)', background: '#F8FAFC', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16A34A' }}>15</span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Flashcards</span>
                </div>
                <div style={{ padding: 12, borderRadius: 'var(--radius-md)', background: '#F8FAFC', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16A34A' }}>10</span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>MCQ Questions</span>
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  handleReset();
                  onComplete();
                }}
                style={{ width: '100%', padding: '12px 20px', fontSize: '0.95rem' }}
              >
                <span>Start Studying Now</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
